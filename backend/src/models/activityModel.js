const db = require('../config/db');

exports.logActivity = async (employeeId, status) => {
    const [result] = await db.execute(
        'INSERT INTO activity_logs (employee_id, status) VALUES (?, ?)',
        [employeeId, status]
    );
    return result;
};

exports.getTodayActivity = async (employeeId) => {
    const [rows] = await db.execute(
        `SELECT * FROM activity_logs 
         WHERE employee_id=? 
           AND DATE(timestamp) = CURDATE() 
         ORDER BY timestamp ASC`,
        [employeeId]
    );
    return rows;
};
