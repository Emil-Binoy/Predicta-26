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
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, studentId, email, phone, course, semester, batch } = req.body;

        if (!studentId) {
            return res.status(400).json({ success: false, message: 'Student ID is required' });
        }

        // 2. Check duplicates
        const existingStudent = await User.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ success: false, message: 'This Student ID has already been registered.' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'This Email has already been registered.' });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ success: false, message: 'This Phone number has already been registered.' });
        }

        // 3. Generate Prediction ID (e.g., P26-0001)
        const lastUser = await User.findOne({}, {}, { sort: { 'predictionId': -1 } });
        let newIdNumber = 1;
        if (lastUser && lastUser.predictionId) {
            const lastIdParts = lastUser.predictionId.split('-');
            if (lastIdParts.length === 2 && !isNaN(lastIdParts[1])) {
                newIdNumber = parseInt(lastIdParts[1], 10) + 1;
            }
        }
        const predictionId = `P26-${String(newIdNumber).padStart(4, '0')}`;

        // 4. Save User
        const user = await User.create({
            predictionId,
            studentId,
            name,
            email,
            phone,
            course,
            semester,
            batch
        });

        res.status(201).json({
            success: true,
            data: {
                predictionId: user.predictionId,
                studentId: user.studentId,
                name: user.name
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
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

module.exports = { registerUser, loginAdmin, submitPrediction };
