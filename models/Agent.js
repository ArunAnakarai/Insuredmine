const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true }
  });
  
  module.exports = mongoose.model('agent', agentSchema);
