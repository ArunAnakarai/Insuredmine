const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;

const policySchema = new mongoose.Schema({
  policy_number: String,
  policy_start_date: Date,
  policy_end_date: Date,
  policy_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
  policy_carrier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('policy', policySchema);
  
