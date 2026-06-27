const User = require('../models/User');

const calculateWinners = async (winningTeam, winningMargin) => {
    try {
        // Find all users who predicted the exact winning team and exact winning margin
        const potentialWinners = await User.find({
            winningTeam: winningTeam,
            winningMargin: winningMargin.toString(),
            isVerified: true
        }).sort({ createdAt: 1 }); // Rank by earliest registration time

        // Assign ranks
        const winners = [];
        for (let i = 0; i < potentialWinners.length; i++) {
            potentialWinners[i].rank = i + 1;
            await potentialWinners[i].save();
            if (i < 3) {
                winners.push(potentialWinners[i]);
            }
        }
        
        return {
            success: true,
            totalWinners: potentialWinners.length,
            topWinners: winners
        };

    } catch (error) {
        console.error('Winner Calculation Error:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { calculateWinners };
