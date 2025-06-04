
const mongoose = require('mongoose');
const { roles } = require("../config/config");
const Schema = mongoose.Schema;

const policyCategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true }
  });
  
  module.exports = mongoose.model('policyCategory', policyCategorySchema);