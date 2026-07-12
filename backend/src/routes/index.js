const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const statisticsRoutes = require('./statisticsRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/statistics', statisticsRoutes);

module.exports = router;
