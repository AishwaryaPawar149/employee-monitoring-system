const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.createUser(name, email, password, role);
        res.json({ success: true, userId: user.insertId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid email' });

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });

        res.json({ token, role: user.role });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
