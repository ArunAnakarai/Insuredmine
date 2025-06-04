const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;

const policyCarrierSchema = new mongoose.Schema({
    company_name: { type: String, required: true }
  });
  
  module.exports = mongoose.model('policyCarrier', policyCarrierSchema);
