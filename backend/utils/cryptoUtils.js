const crypto = require('crypto');

function generateSalt(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = {
    generateSalt
};