const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  date: Date,
});

module.exports = mongoose.model('Order', OrderSchema); 
