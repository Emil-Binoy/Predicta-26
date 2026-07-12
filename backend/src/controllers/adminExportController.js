const { generateParticipantsExport } = require('../services/exportService');

const exportParticipants = async (req, res) => {
    try {
        const workbook = await generateParticipantsExport();

        // Generate filename
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const timeStr = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
        const fileName = `Participants_${dateStr}_${timeStr}.xlsx`;

        // Set Headers
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${fileName}`
        );

        // Write to response
        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error('Error exporting participants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export participant data.'
        });
    }
};

module.exports = {
    exportParticipants
};
