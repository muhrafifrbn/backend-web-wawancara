import db from '../config/db.js';
import bcrypt from "bcryptjs/dist/bcrypt.js";

// Register User
export const createUser = async (req, res) => {
    const user_id = req.user_id;
    try {
        const { username, password, full_name, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (username, password, full_name, role, created_at, is_active) VALUES (?, ?, ?, ?, NOW(), 0)",
            [username, hashedPassword, full_name, role]
        );

        const newUser = {
            id: result.insertId,
            username,
            full_name,
            role,
        };

        await db.query(
            'INSERT INTO user_logs (user_id, action) VALUES (?, ?)',
            [user_id, `Add User Data ID-${result.insertId} Name ${username}`]
        );

        return res.status(201).json({
            msg: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Registration Failed",
            error: error.message,
        });
    }
};

// Get All Users
export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to retrieve users",
            error: error.message,
        });
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);

        if (user.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(user[0]);
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to retrieve user",
            error: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params;
    const { username, full_name, role, is_active, password } = req.body;
    try {

        let query = "UPDATE users SET username = ?, full_name = ?, role = ?, is_active = ? WHERE user_id = ?";
        let params = [username, full_name, role, is_active, id];

        // Jika password dikirim, hash dan update password baru
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = "UPDATE users SET username = ?, full_name = ?, role = ?, is_active = ?, password = ? WHERE user_id = ?";
            params = [username, full_name, role, is_active, hashedPassword, id];
        }

        const [result] = await db.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        await db.query(
            'INSERT INTO user_logs (user_id, action) VALUES (?, ?)',
            [user_id, `Updated User Data ID-${id} Name ${username}`]
        );

        return res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({
            msg: "Failed to update user",
            error: error.message,
        });
    }
};
export const deleteUser = async (req, res) => {
    const user_id = req.user_id;
    try {
        const { id } = req.params;

        
        await db.query(
            'INSERT INTO user_logs (user_id, action) VALUES (?, ?)',
            [user_id, `Deleted User Data ID-${id}`]
        );

     
        const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to delete user",
            error: error.message,
        });
    }
};
