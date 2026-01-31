const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./src/routes/auth');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

module.exports = app;
const activityRoutes = require('./src/routes/activity');
app.use('/api/activity', activityRoutes);
