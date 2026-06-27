const Tesseract = require('tesseract.js');

const extractStudentId = async (imagePath) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng'
        );
        
        // Clean text and extract standard Student ID format (e.g. 24BCA61)
        const cleanText = text.replace(/\s+/g, '').toUpperCase();
        
        // Look for the specific pattern: 2 numbers, 2-3 letters, 1-3 numbers
        const regex = /[0-9]{2}[A-Z]{2,3}[0-9]{1,3}/g;
        const matches = cleanText.match(regex);
        
        if (matches && matches.length > 0) {
            return matches[0];
        }
        
        // Fallback: look for any alphanumeric block of length 6-9
        const fallbackRegex = /[A-Z0-9]{6,9}/g;
        const fallbackMatches = cleanText.match(fallbackRegex);
        if (fallbackMatches && fallbackMatches.length > 0) {
            return fallbackMatches[0];
        }

        return null;
    } catch (error) {
        console.error('OCR Error:', error);
        return null;
    }
};

module.exports = { extractStudentId };
