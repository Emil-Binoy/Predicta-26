const express = require('express');
const router = express.Router();
const { getParticipants, getDashboardStats, setMatchResult, getWinners, getAnalytics, deleteParticipant } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes below are protected

router.get('/participants', getParticipants);
router.delete('/participants/:id', deleteParticipant);
router.get('/dashboard', getDashboardStats);
router.post('/match-result', setMatchResult);
router.get('/winners', getWinners);
router.get('/analytics', getAnalytics);

module.exports = router;
