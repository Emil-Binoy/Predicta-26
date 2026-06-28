const { check } = require('express-validator');

const registerValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isLength({ min: 10 }),
    check('course', 'Course is required').not().isEmpty(),
    check('semester', 'Semester is required').not().isEmpty(),
    check('batch', 'Batch is required').not().isEmpty()
];

const predictValidation = [
    check('predictionId', 'Prediction ID is required').not().isEmpty(),
    check('winningTeam', 'Winning team is required').not().isEmpty(),
    check('winningMargin', 'Winning margin must be a valid integer').isInt()
];

module.exports = { registerValidation, predictValidation };
