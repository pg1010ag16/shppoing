const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema({
  name: {
    type: String,
  },
  mobileNo: {
    type: Number,   
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

module.exports = mongoose.model("orderSchema", orderSchema);  
