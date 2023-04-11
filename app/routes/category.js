const express = require("express");
const {
    addCategory,
    editCategory,
    categoryList
} = require("../controllers/User/Category/category");
let auth = require("../../middleware/auth")

const router = express.Router();
/*------For User Creation Api------*/
 router
  .route("/addCategory")
  .post(auth, addCategory);
/*------------------------------*/


/*------For editUser Api------*/
router
.route("/editCategory")
.post( auth,editCategory);
/*------------------------------*/

/*------For categoryList Api------*/
router
.route("/categoryList")
.post(categoryList);
/*------------------------------*/



module.exports = router;