const express = require("express");
const {
   
} = require("../controllers/User/Cart/Cart");
let auth = require("../../middleware/auth")

const router = express.Router();
/*------For User Creation Api------*/
 router
  .route("/cartAdd")
  .post(auth, cartAdd);
/*------------------------------*/




module.exports = router;