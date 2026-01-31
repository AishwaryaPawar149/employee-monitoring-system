const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.createUser = async (name, email, password, role) => {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashed, role]
    );
    return result;
};

exports.getUserByEmail = async (email) => {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?', [email]
    );
    return rows[0];
};
