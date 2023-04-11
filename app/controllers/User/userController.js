const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let env = process.env;
const otpGenerator = require('otp-generator')

const User = require("../../models/user_model");
const { response } = require("../../../app");
/*------For User Creation Api------*/

exports.createUser = async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let name = fields["name"];
      let email = fields["email"].toLowerCase();
      let password = fields["password"];
      password = bcrypt.hashSync(fields["password"], 10);
      let alreadyExist = await User.findOne({ email: email });
      if (alreadyExist) {
        return res.status(400).json({
          result: [],
          success: false,
          message: `${alreadyExist.name} is already exists`,
        });
      }
      console.log("first");
      let data = await User.create({
        name: name,
        email: email,
        password: password,
      });
      return res.status(200).json({
        result: data,
        success: true,
        message: `${name} is registered successfully`,
      });
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
/*------------------------------*/

/*------For User Login Api------*/

exports.login = async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let email = fields["email"].toLowerCase();
      let password = fields["password"];
      let query = { email: { $regex: new RegExp(email, "i") } };
      let user = await User.findOne(query);
      if (!user) {
        return res.status(400).json({
          result: [],
          success: false,
          message: `User is not exists`,
        });
      }

      let isAuthenticated = bcrypt.compare(password, user.password);
      if (!isAuthenticated) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect Password" });
      }
      const payload = {
        user: {
          id: user.id,
          role:user.role
        },
      };
      console.log(env.ACCESS_TOKEN_SECRET_EXPIRES_IN)
      let token =   jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "0.5h",
        }
        );
      const refreshToken = jwt.sign(
        payload,
       env.REFRESH_TOKEN_PRIVATE_KEY,
       {
        expiresIn: "1d",
       }
    );
      return res.json({
        success: true,
        message: "Login Sucessfull",
        authToken: token,
        refreshToken:refreshToken,
        status: "true",
        user: user,
      });
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
/*------------------------------*/


/*------For editUser Api------*/

exports.editUser = async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let email = fields["email"].toLowerCase();
      let password = fields["password"];
      let query = { email: { $regex: new RegExp(email, "i") } };
      let user = await User.findOne(query);
      if (!user) {
        return res.status(400).json({
          result: [],
          success: false,
          message: `User is not exists`,
        });
      }

      let isAuthenticated = bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect Password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      let token =  jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.AUTH_EXPIRY,
      });
      return res.json({
        success: true,
        message: "Login Sucessfull",
        authToken: token,
        status: "true",
        user: user,
      });
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
/*------------------------------*/


/*------------Request Otp for user----------------------*/
exports.requestOTP =   async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req,async (err, fields, files) => {

    let otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
console.log(otp,'------')

    let email = fields["email"]
      ? fields["email"].toLowerCase().trim()
      : undefined;
  console.log("EMAIL For Request OTP : "+email);
  await User.findOne({ email: email })
      .then((user) => {
         console.log(user); 
        if (user == null || user == undefined) {
          return res
            .status(400)
            .json({ success: false, message: "User not registered" });
        } else {
          //console.log("OTP : "+otp);
          User.updateOne(
            { email: email },
            { $set: { otp: otp, otpVerified: false } }
          )
            .then(async (response) => {
              //  console.log(response);
             return  res.status(200).json({
                success: true,
                message:
                  "OTP has been successfully sent to registered email and mobile",
              });
              // await mail
              //   .sendCustomerOtpForgetPassword(otp, email, user.name)
              //   .then((result) => {
              //     //    console.log("Email Success" + result);
              //     mailResponse = result;
              //   })
                // .catch((err) => {
                //   //  console.log("Email Error" + err);
                //   mailResponse = err;
                // });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: "User not registered  " + email });
      });
  });
};
/*------------------------------------------------------------------------------------------- */


/** ----------Verify otp api----------------------*/
exports.verifyOTP = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) res.json({ err });
    let email = fields["email"]
      ? fields["email"].toLowerCase().trim()
      : undefined;
    let otp = fields["otp"];
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "please enter email id." });

    User.findOne({ email: email })
      .then((result) => {
        if (result.otp == otp.toString()) {
          User.updateOne({ email: email }, { otpVerified: true })
            .then((response) => {
              res.status(200).json({ success: true, message:'Otp verified successfully.' });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        } else {
          res.status(400).json({ success: false, message: "Wrong OTP" });
        }
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
};

/** --------------------------------*/




/*-----------------Change password api ------------------------------*/
exports.changePassword = async (req, res) => {
  let form = new formidable.IncomingForm();
  
  form.parse(req,async (err, fields, fielss) => {
  

    let email = fields["email"]
      ? fields["email"].toLowerCase().trim()
      : undefined;
    let newPassword = fields["password"];
    let validatedPassword = validatePasswordRegex(newPassword);
    if (!validatedPassword) {
      return res.status(200).json({
        success: false,
        message:
          "password must have at least 8 characters, at least 1 Uppercase, 1 Lowercase, 1 numeric digit, and 1 special character.",
      });
    }
    let encryptedPassword = bcrypt.hashSync(newPassword, 10);
    // let encryptedPassword = bcrypt.hashSync(fields["newpassword"].trim(), 10);

    User
      .findOne({ email: email })
      .then(async (user) => {
        if (user == undefined || user == null) {
          res
            .status(400)
            .json({ succes: false, message: "User not registered." });
        } else {
        User.updateOne({ email: email},{$set:{password: encryptedPassword}})
        .then(async (user) => {
          if(response.nModified ===1)
          return res.status(200).json({ 
            result:response,
            success: true, message:'password has been successfully changed'})
        })
         
        }
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, message: "Something went wrong " + err });
      });
  });
};
/*----------------------------------------------*/