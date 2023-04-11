
    //  (String)
    //  (String)
    //  (String)
    //  (String)
    //  (Number)
    // category (ObjectId - a reference to the category schema)
    //  (String)
    //  (Boolean)
    //  (Date)
    const mongoose = require("mongoose");

    const productModel = mongoose.Schema(
      {
          productCode: {
              type: String,
              required: true,
              unique: true,
            },
     price: {
               type: Number,
             },
        available: {
          type: Boolean,
        },
        quantity: {
          type: Number,
        },
        category: {
            type: String,
          },
        title: {
          type: String,
        },
        imagePath: {
          type: String,
        },
        description: {
          type: String,
        },
        manufacturer: {
          type: String,
        },
        createdAt:{
            type: Date,
            default:Date.now
        },
        categoryCode: {
          type: String,
        },
      },
      { timestamps: true }
    );
    
    module.exports = mongoose.model("productModel", productModel);
    