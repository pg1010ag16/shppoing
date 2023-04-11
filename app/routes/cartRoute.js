const express = require("express");
const {
    cartAdd,
    cartDelete,
    cartList,
    removeAll,
    cartDec,
} = require("../controllers/User/Cart/Cart");
let auth = require("../../middleware/auth")

const router = express.Router();
/*------For User Creation Api------*/
 router
  .route("/cartAdd")
  .post(auth, cartAdd);
/*------------------------------*/


/*------For editUser Api------*/
router
.route("/removeAll")
.post( auth,removeAll);
/*------------------------------*/

/*------For categoryList Api------*/
router
.route("/cartList")
.post(auth,cartList);
/*------------------------------*/

/*------For removeAll Api------*/
router
.route("/removeAll")
.post( auth,removeAll);
/*------------------------------*/
/*------For   Cart increment Decrement Api------*/
router
.route("/cartDec")
.post( 
  //auth,
  cartDec);
/*-----------------------*/

module.exports = router;