const User = require('../models/User');

const normalizeTeamName = (name) => {
    if (!name) return 'Unknown';
    let clean = name.toLowerCase().trim();
    // Remove emojis/flags
    clean = clean.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    clean = clean.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '');
    // Remove text in parentheses or brackets
    clean = clean.replace(/\(.*?\)/g, '');
    clean = clean.replace(/\[.*?\]/g, '');
    clean = clean.trim();
    
    if (clean.includes('argentina') || clean.includes('arg')) return 'Argentina';
    if (clean.includes('france') || clean.includes('fra')) return 'France';
    if (clean.includes('brazil') || clean.includes('brasil')) return 'Brazil';
    if (clean.includes('portugal') || clean.includes('por')) return 'Portugal';
    if (clean.includes('spain') || clean.includes('esp')) return 'Spain';
    if (clean.includes('germany') || clean.includes('ger')) return 'Germany';
    if (clean.includes('england') || clean.includes('eng')) return 'England';
    if (clean.includes('netherlands') || clean.includes('ned')) return 'Netherlands';
    if (clean.includes('belgium') || clean.includes('bel')) return 'Belgium';
    if (clean.includes('croatia') || clean.includes('cro')) return 'Croatia';
    if (clean.includes('morocco') || clean.includes('mar')) return 'Morocco';
    if (clean.includes('uruguay') || clean.includes('uru')) return 'Uruguay';
    
    if (clean.length === 0) return 'Unknown';
    return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const getStatistics = async (req, res) => {
    try {
        const totalParticipants = await User.countDocuments();
        // Assuming a prediction is made when winningTeam is set and not null
        const totalPredictions = await User.countDocuments({ winningTeam: { $ne: null } });

        const usersWithPredictions = await User.find({ winningTeam: { $ne: null } }, 'winningTeam');
        
        const teamCounts = {};
        usersWithPredictions.forEach(user => {
            const team = normalizeTeamName(user.winningTeam);
            teamCounts[team] = (teamCounts[team] || 0) + 1;
        });

        let teamPopularity = Object.keys(teamCounts).map(team => ({
            team: team,
            count: teamCounts[team],
            percentage: totalPredictions > 0 ? Math.round((teamCounts[team] / totalPredictions) * 100) : 0
        })).sort((a, b) => b.count - a.count);

        let mostPopularTeam = null;
        let leastPopularTeam = null;

        if (teamPopularity.length > 0) {
            mostPopularTeam = teamPopularity[0];
            leastPopularTeam = teamPopularity[teamPopularity.length - 1];
        }

        res.status(200).json({
            totalParticipants,
            totalPredictions,
            totalTeamsPredicted: teamPopularity.length,
            teamPopularity,
            mostPopularTeam,
            leastPopularTeam
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Failed to fetch statistics' });
    }
};

module.exports = {
    getStatistics
};
