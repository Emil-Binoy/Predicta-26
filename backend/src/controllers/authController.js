const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new participant
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    return res.status(403).json({
        success: false,
        message: "Registration has been closed."
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Submit prediction
// @route   POST /api/auth/predict
// @access  Public
const submitPrediction = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { predictionId, winningTeam, winningMargin } = req.body;

        const user = await User.findOne({ predictionId });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Participant not found' });
        }

        if (user.winningTeam && user.winningMargin) {
            return res.status(400).json({ success: false, message: 'You have already submitted a prediction' });
        }

        user.winningTeam = winningTeam;
        user.winningMargin = winningMargin;
        await user.save();

        res.json({ success: true, message: 'Prediction saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Verify if participant exists
// @route   GET /api/auth/verify/:predictionId
// @access  Public
const verifyParticipant = async (req, res) => {
    try {
        const { predictionId } = req.params;
        const user = await User.findOne({ predictionId });
        if (user) {
            res.json({ success: true, exists: true });
        } else {
            res.json({ success: true, exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { registerUser, loginAdmin, submitPrediction, verifyParticipant };
