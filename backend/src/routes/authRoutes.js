const express = require('express');
const router = express.Router();
const { registerUser, loginAdmin, submitPrediction, verifyParticipant } = require('../controllers/authController');
const { registerValidation, predictValidation } = require('../middleware/validationMiddleware');

router.post('/register', registerValidation, registerUser);
router.post('/predict', predictValidation, submitPrediction);
router.post('/admin/login', loginAdmin);
router.get('/verify/:predictionId', verifyParticipant);

module.exports = router;
