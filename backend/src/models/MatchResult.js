const mongoose = require('mongoose');

const matchResultSchema = new mongoose.Schema({
    winningTeam: {
        type: String,
        required: true
    },
    finalScoreTeam1: {
        type: Number,
        required: true
    },
    finalScoreTeam2: {
        type: Number,
        required: true
    },
    winningMargin: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('MatchResult', matchResultSchema);
