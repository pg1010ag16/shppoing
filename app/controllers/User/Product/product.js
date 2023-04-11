const formidable = require("formidable");
const Product = require("../../../models/product_model");
const Category = require("../../../models/Category");
const otpGenerator = require("otp-generator");

/*------For productAdd Creation Api------*/
exports.productAdd = async (req, res) => {
  try {
    const host = req.hostname;
    const url = req.headers.host;
    let code = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    let productCode = new Date().getDate() + code + new Date().getFullYear();
    let price = req.body.price.trim();
    let available = req.body.available.trim();
    let category = req.body.category.trim();
    let title = req.body.title;
    let quantity = req.body.quantity.trim();
    let imagePath = url + "/" + req.files[0].path;
    let description = req.body.description;
    let manufacturer = req.body.manufacturer.trim();
    let alreadyExist = await Product.findOne({ productCode: productCode });
    if (alreadyExist) {
      return res.status(400).json({
        result: [],
        success: false,
        message: `${alreadyExist.productCode} is already exists`,
      });
    }
    let categoryData = await Category.find({ title: category });
    if (req.user.role == "Admin") {
      await Product.create({
        productCode: productCode,
        price: price,
        available: available,
        category: category,
        categoryCode: categoryData[0].categoryCode,
        title: title,
        imagePath: imagePath,
        description: description,
        manufacturer: manufacturer,
        quantity: quantity,
      });
      return res.status(200).json({
        //   result: data,
        success: true,
        message: `${productCode} is registered successfully`,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: `User doesn't have right to add products`,
      });
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};
/*------------------------------*/

exports.productEdit = async (req, res) => {
  try {
    const host = req.hostname;
    const url = req.headers.host;

    let productCode = req.body.productCode.trim();
    let price = req.body.price.trim();
    let available = req.body.available.trim();
    let category = req.body.category.trim();
    let title = req.body.title.trim();
    let quantity = req.body.quantity.trim();
    let imagePath = url + "/" + req.files[0].path;
    let description = req.body.description;
    let manufacturer = req.body.manufacturer.trim();

    if (req.user.role == "Admin") {
      await Product.findOneAndUpdate(
        { productCode: productCode },
        {
          $set: {
            price: price,
            available: available,
            //   category:category,
            title: title,
            imagePath: imagePath,
            description: description,
            manufacturer: manufacturer,
            quantity: quantity,
          },
        }
      );
      return res.status(200).json({
        //   result: data,
        success: true,
        message: `${productCode} is updated `,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: `User doesn't have right to change products`,
      });
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};

exports.productList = async (req, res) => {
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

exports.deleteProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let deleteProductCode = fields["deleteProductCode"].split(",");
      if (req.user.role == "Admin") {
        let delete_product = await Product.deleteMany({
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


exports.globalSearch = async (req, res) => {
  try {
    
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let search = fields["search"]

     let searchProduct = await Product.find(
      {
        $or: [
          { productCode: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { manufacturer: { $regex: search, $options: "i" } },
        ],
      },
     
    )
      return res.status(400).json({
        result:searchProduct,
        success: true,
        message: `User doesn't have right to change products`,
      });
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
