const formidable = require("formidable");
const Cart = require("../../../models/cartModel");
const Product = require("../../../models/product_model");

const Category = require("../../../models/Category");
const otpGenerator = require("otp-generator");
const mongoose = require("mongoose");

/*------For  Add Cart Api------*/
exports.cartAdd = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let userId = fields["userId"];
      let productId = fields["productId"].split(",");
      let quantity = fields["quantity"] ? fields["quantity"]:1;
      if (req.user.id == userId) {
        let cartAdded;
        let product = await Product.find({ _id: { $in: productId } });
        for (const item of product) {
          let cartExist = await Cart.find({ productId: new mongoose.Types.ObjectId(item._id)});
          console.log(cartExist)
          if(cartExist.length > 0) {
            console.log('first')
             cartAdded = await Cart.updateMany({productId: new mongoose.Types.ObjectId(item._id)},{$set:{          
              qty:  cartExist[0].qty + 1,           
             status:"Pending"
            }}); 
          }  
       
          if(cartExist.length == 0) {

           cartAdded = await Cart.create({
            productCode: item.productCode,
            price: item.price,
            qty:  quantity,
            productId: item._id,
            title: item.title,
            user: req.name,
            status:"Pending"

          });
        }

          return res.status(200).json({
            result: cartAdded,
            statusCode: 200,
            success: true,
            message: "Added successfully",
          });
        }
      } else {
        return res.status(400).json({
          result: [],
          statusCode: 400,
          success: false,
          message: "User is not authorized to add product in the cart",
        });
      }
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
/*------------------------------*/

/*------For   Cart List Api------*/

exports.cartList = async (req, res) => {
  try {
    console.log("first");

    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let limit = 10; // number of records per page
      let offset = 0;

      let page = fields["page"] == 0 ? 1 : fields["page"] || 1; // page number
      offset = limit * (page - 1);
      let exist_user = await Product.aggregate([
        { $skip: offset },
        { $limit: limit },
      ]);
      return res.status(200).json({
        result: exist_user,
        statusCode: 200,
        success: true,
        message: "Data fetched succesfully",
      });
    });
  } catch (error) {
    return next(error);
  }
};

/*------------------------------*/

/*------For   Cart remove Api------*/

exports.cartDelete = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let deleteProductCode = fields["deleteProductCode"].split(",");
      if (req.user.role == "User") {
        let delete_product = await Cart.deleteMany({
          productCode: { $in: deleteProductCode },
        });
        return res.status(200).json({
          result: delete_product,
          statusCode: 200,
          success: true,
          message: "Product deleted successfully",
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};
/*------------------------------*/

exports.removeAll = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (req.user.role == "User") {
        let CartDeleteId = await Cart.find({}, { productCode: 1, _id: 0 });
        let removeId = [];
        for (const item of CartDeleteId) {
          console.log(item.productCode);
          removeId.push(item.productCode);
        }
        let delete_product = await Cart.deleteMany({
          productCode: { $in: removeId },
        });
        return res.status(200).json({
          result: delete_product,
          statusCode: 200,
          success: true,
          message: "Product deleted successfully",
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};



exports.cartDec = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        let productId = fields["productId"];
        let cartExist =    await Cart.updateOne({
          productId: new mongoose.Types.ObjectId(productId)
      }, {
          $inc: {
            qty: -1
          }
      })

        return res.status(200).json({
          result: cartExist,
          statusCode: 200,
          success: true,
          message: "Product deleted successfully",
        });
      
    });
  } catch (error) {
    return next(error);
  }
};