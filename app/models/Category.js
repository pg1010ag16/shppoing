const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  categoryCode: {
    type: String,
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model("Category", categorySchema);  
