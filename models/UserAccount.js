const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;

const userAccountSchema = new mongoose.Schema({
    account_name: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model('userAccount', userAccountSchema);