const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
      },
      qty: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        default: 0,
      },
      title: {
        type: String,
      },
      productCode: {
        type: String,
      },
      status: {
        type: String,
      },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartModel);
