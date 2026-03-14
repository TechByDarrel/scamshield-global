const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  entity: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema); 