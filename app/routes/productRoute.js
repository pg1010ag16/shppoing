const express = require("express");
const {
    productAdd,
    productEdit,
    productList,
    deleteProduct,
    globalSearch
} = require("../controllers/User/Product/product");
const path = require("path");
const multer = require("multer");
let auth = require("../../middleware/auth")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let uploadFile = multer({
    storage: storage,
  });
const router = express.Router();


/*------For productAdd Creation Api------*/
 router
  .route("/productAdd")
  .post(auth, 
    uploadFile.any("file"),
    productAdd);
/*------------------------------*/

/*------For productEdit Api------*/
router
.route("/productEdit")
.post(auth, 
  uploadFile.any("file"),
  productEdit);
/*------------------------------*/

/*------For productList Api------*/
router
.route("/productList")
.post(auth,productList);
/*------------------------------*/

/*------For Delete Product Api------*/
router
.route("/deleteProduct")
.post(auth, deleteProduct);
/*------------------------------*/

/*------For Search Product Api------*/
router
.route("/globalSearch")
.post(auth, globalSearch);
/*------------------------------*/

module.exports = router;