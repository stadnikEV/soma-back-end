const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bitrix');

module.exports = mongoose
