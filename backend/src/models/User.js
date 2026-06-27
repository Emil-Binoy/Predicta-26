const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    predictionId: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    winningTeam: {
        type: String,
        default: null
    },
    winningMargin: {
        type: String,
        default: null
    },
    idCardImage: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    rank: {
        type: Number,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
