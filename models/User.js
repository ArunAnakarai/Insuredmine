
const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    first_name: String,
    dob: Date,
    address: String,
    phone_number: String,
    state: String,
    zip_code: String,
    email: { type: String, unique: true },
    gender: String,
    user_type: String
  });
  
  module.exports = mongoose.model('user', userSchema);