const User = require('../models/User');
const MatchResult = require('../models/MatchResult');
const { calculateWinners } = require('../services/winnerCalculationService');

// @desc    Get all participants
// @route   GET /api/admin/participants
// @access  Private/Admin
const getParticipants = async (req, res) => {
    try {
        const filter = {};
        if (req.query.class) filter.class = req.query.class;
        if (req.query.batch) filter.batch = req.query.batch;
        if (req.query.winningTeam) filter.winningTeam = req.query.winningTeam;
        if (req.query.winningMargin) filter.winningMargin = req.query.winningMargin;
        if (req.query.isVerified !== undefined) filter.isVerified = req.query.isVerified === 'true';

        // Search
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { name: searchRegex },
                { predictionId: searchRegex },
                { phone: searchRegex }
            ];
        }

        const participants = await User.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: participants.length, data: participants });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalRegistrations = await User.countDocuments();
        const verifiedStudents = await User.countDocuments({ isVerified: true });
        
        // Count registrations today
        const today = new Date();
        today.setHours(0,0,0,0);
        const registrationsToday = await User.countDocuments({ createdAt: { $gte: today } });

        res.json({
            success: true,
            data: {
                totalRegistrations,
                verifiedStudents,
                pendingVerification: totalRegistrations - verifiedStudents,
                totalPredictions: totalRegistrations,
                registrationsToday,
                duplicateAttempts: 0 
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Set official match result & calculate winners
// @route   POST /api/admin/match-result
// @access  Private/Admin
const setMatchResult = async (req, res) => {
    try {
        const { winningTeam, finalScoreTeam1, finalScoreTeam2 } = req.body;
        
        const winningMargin = Math.abs(finalScoreTeam1 - finalScoreTeam2);

        const result = await MatchResult.create({
            winningTeam,
            finalScoreTeam1,
            finalScoreTeam2,
            winningMargin
        });

        // Calculate winners
        const calculationResult = await calculateWinners(winningTeam, winningMargin);

        if (!calculationResult.success) {
            return res.status(500).json({ success: false, message: 'Failed to calculate winners' });
        }

        res.json({
            success: true,
            message: 'Match result saved and winners calculated',
            data: {
                matchResult: result,
                winners: calculationResult
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get winners list
// @route   GET /api/admin/winners
// @access  Private/Admin
const getWinners = async (req, res) => {
    try {
        const winners = await User.find({ rank: { $ne: null } }).sort({ rank: 1 });
        res.json({ success: true, count: winners.length, data: winners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const teamDistribution = await User.aggregate([
            { $group: { _id: "$winningTeam", count: { $sum: 1 } } }
        ]);

        const marginDistribution = await User.aggregate([
            { $group: { _id: "$winningMargin", count: { $sum: 1 } } }
        ]);

        const classParticipation = await User.aggregate([
            { $group: { _id: "$class", count: { $sum: 1 } } }
        ]);

        const batchParticipation = await User.aggregate([
            { $group: { _id: "$batch", count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                teamDistribution,
                marginDistribution,
                classParticipation,
                batchParticipation
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a participant
// @route   DELETE /api/admin/participants/:id
// @access  Private/Admin
const deleteParticipant = async (req, res) => {
    try {
        const participant = await User.findByIdAndDelete(req.params.id);
        if (!participant) {
            return res.status(404).json({ success: false, message: 'Participant not found' });
        }
        res.json({ success: true, message: 'Participant deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getParticipants, getDashboardStats, setMatchResult, getWinners, getAnalytics, deleteParticipant };
