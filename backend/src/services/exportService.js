const exceljs = require('exceljs');
const User = require('../models/User');

const generateParticipantsExport = async () => {
    const participants = await User.find().lean();
    
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Participants');
    
    // Define all possible fields across all documents just in case of schema variations
    let allKeys = new Set();
    if (participants.length > 0) {
        participants.forEach(p => {
            Object.keys(p).forEach(key => {
                if (key !== '__v' && key !== 'password') {
                    allKeys.add(key);
                }
            });
        });
    } else {
        // Fallback fields if no participants
        const schemaPaths = Object.keys(User.schema.paths).filter(key => key !== '__v' && key !== 'password');
        schemaPaths.forEach(key => allKeys.add(key));
    }
    
    const columns = Array.from(allKeys);
    
    // Format headers
    worksheet.columns = columns.map(key => {
        // Capitalize and format key name for header
        let header = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (key === '_id') header = 'ID';
        
        return {
            header,
            key,
            width: header.length + 10, // Initial width
            style: { alignment: { horizontal: 'left', vertical: 'middle' } }
        };
    });
    
    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF003366' } // Dark blue
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    
    // Freeze the first row
    worksheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: 1 }
    ];
    
    // Enable auto filter for all columns
    if (columns.length > 0) {
        // e.g., 'A1:M1'
        worksheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: columns.length }
        };
    }
    
    // Add rows
    participants.forEach((p, index) => {
        const rowData = {};
        columns.forEach(key => {
            let value = p[key];
            
            if (value === null || value === undefined || value === '') {
                rowData[key] = 'N/A';
            } else if (typeof value === 'boolean') {
                rowData[key] = value ? 'Yes' : 'No';
            } else if (value instanceof Date) {
                const day = String(value.getDate()).padStart(2, '0');
                const month = String(value.getMonth() + 1).padStart(2, '0');
                const year = value.getFullYear();
                const hours = String(value.getHours()).padStart(2, '0');
                const minutes = String(value.getMinutes()).padStart(2, '0');
                rowData[key] = `${day}-${month}-${year} ${hours}:${minutes}`;
            } else {
                rowData[key] = String(value);
            }
        });
        
        const row = worksheet.addRow(rowData);
        
        // Alternating row colors
        if (index % 2 === 0) {
            row.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF5F5F5' } // Light gray
            };
        } else {
            row.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFFFF' } // White
            };
        }
        
        // Borders
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                right: { style: 'thin', color: { argb: 'FFDDDDDD' } }
            };
        });
    });
    
    // Adjust column widths dynamically based on content
    worksheet.columns.forEach((col) => {
        let maxLen = col.header.length;
        col.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
            if (rowNumber > 1) { // Skip header row for calculating width since we initialized it
                const cellValue = cell.value ? cell.value.toString() : '';
                if (cellValue.length > maxLen) {
                    maxLen = cellValue.length;
                }
            }
        });
        col.width = Math.min(maxLen + 5, 50); // Cap width at 50
    });
    
    return workbook;
};

module.exports = {
    generateParticipantsExport
};
