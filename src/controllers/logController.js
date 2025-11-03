import db from "../config/db.js";

export const getAllLogData = async (req, res) => {
    const query = `
        SELECT user_logs.id, users.full_name, user_logs.action, user_logs.timestamp
        FROM user_logs
        JOIN users ON user_logs.user_id = users.user_id
    `;

    try {
        const [result] = await db.query(query);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching user logs:", err);
        res.status(500).json({ error: "Failed to retrieve user logs" });
    }
};
