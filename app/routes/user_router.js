const express = require("express");
const {
  createUser,
  login,
  editUser,
  requestOTP,
  changePassword,
  verifyOTP
} = require("../controllers/User/userController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
/*------For User Creation Api------*/
 router
  .route("/createUser")
  .post( createUser);
/*------------------------------*/

/*------For User Login Api------*/
router
.route("/login")
.post( login);
/*------------------------------*/

/*------For editUser Api------*/
router
.route("/editUser")
.post( editUser);
/*------------------------------*/

/*------For requestOTP Api------*/
router
.route("/requestOTP")
.post( requestOTP);
/*------------------------------*/

/*------For VerifyOtp Api------*/
router
.route("/verifyOTP")
.post( verifyOTP);
/*------------------------------*/

/*------For requestOTP Api------*/
router
.route("/changePassword")
.post( changePassword);
/*------------------------------*/


module.exports = router;