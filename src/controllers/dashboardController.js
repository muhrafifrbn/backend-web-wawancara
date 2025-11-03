import db from "../config/db.js";

export const countDataTable = async (req, res) => {
    try {
        const [medicalRows] = await db.query('SELECT COUNT(*) as count FROM medical_check_form');
        const [studentRows] = await db.query('SELECT COUNT(*) as count FROM student_form');
        const [parentRows] = await db.query('SELECT COUNT(*) as count FROM parents_form');

        res.json({
        medical: medicalRows[0].count,
        students: studentRows[0].count,
        parents: parentRows[0].count
        });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const countDataForChart = async (req, res) => {
    try {
        const query = `
            SELECT 
                YEAR(created_at) AS year,
                MONTH(created_at) AS month,
                CASE 
                    WHEN DAY(created_at) BETWEEN 1 AND 7 THEN 1
                    WHEN DAY(created_at) BETWEEN 8 AND 14 THEN 2
                    WHEN DAY(created_at) BETWEEN 15 AND 21 THEN 3
                    ELSE 4
                END AS week,
                COUNT(*) AS count,
                'medical' AS type
            FROM medical_check_form
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)
            GROUP BY year, month, week

            UNION ALL

            SELECT 
                YEAR(created_at) AS year,
                MONTH(created_at) AS month,
                CASE 
                    WHEN DAY(created_at) BETWEEN 1 AND 7 THEN 1
                    WHEN DAY(created_at) BETWEEN 8 AND 14 THEN 2
                    WHEN DAY(created_at) BETWEEN 15 AND 21 THEN 3
                    ELSE 4
                END AS week,
                COUNT(*) AS count,
                'students' AS type
            FROM student_form
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)
            GROUP BY year, month, week

            UNION ALL

            SELECT 
                YEAR(created_at) AS year,
                MONTH(created_at) AS month,
                CASE 
                    WHEN DAY(created_at) BETWEEN 1 AND 7 THEN 1
                    WHEN DAY(created_at) BETWEEN 8 AND 14 THEN 2
                    WHEN DAY(created_at) BETWEEN 15 AND 21 THEN 3
                    ELSE 4
                END AS week,
                COUNT(*) AS count,
                'parents' AS type
            FROM parents_form
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)
            GROUP BY year, month, week;
        `;

        const [rows] = await db.query(query);

        // Format data agar cocok untuk Chart
        const formattedData = [];

        rows.forEach((row) => {
            const existingEntry = formattedData.find(
                (item) => item.year === row.year && item.month === row.month && item.week === row.week
            );

            if (existingEntry) {
                existingEntry[row.type] = row.count;
            } else {
                formattedData.push({
                    year: row.year,
                    month: row.month,
                    week: row.week,
                    [row.type]: row.count
                });
            }
        });

        res.json(formattedData);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const countOnlineUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as count FROM users WHERE is_active = 1');
        res.json({
            online_users: rows[0].count
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const countUser = async (req,res) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as count FROM users');
        res.json({
            count_users: rows[0].count
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}