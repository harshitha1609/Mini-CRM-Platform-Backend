 
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  spend: Number,
  visits: Number,
  last_active: Date,
});

module.exports = mongoose.model('Customer', CustomerSchema);