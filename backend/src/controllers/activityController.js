const Activity = require('../models/activityModel');

exports.log = async (req, res) => {
    try {
        const { employeeId, status } = req.body;
        const result = await Activity.logActivity(employeeId, status);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.today = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const logs = await Activity.getTodayActivity(employeeId);
        res.json({ success: true, logs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};
const Activity = require('../models/activityModel');
const calculateHours = require('../utils/calculateHours');

exports.today = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const logs = await Activity.getTodayActivity(employeeId);
        const hours = calculateHours(logs);
        res.json({ success: true, logs, hours });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};
