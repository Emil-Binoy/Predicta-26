const express = require('express');
const router = express.Router();
const upload = require('../services/uploadService');
const { registerUser, loginAdmin, submitPrediction } = require('../controllers/authController');
const { registerValidation, predictValidation } = require('../middleware/validationMiddleware');

router.post('/register', upload.single('idCardImage'), registerValidation, registerUser);
router.post('/predict', predictValidation, submitPrediction);
router.post('/admin/login', loginAdmin);

module.exports = router;
