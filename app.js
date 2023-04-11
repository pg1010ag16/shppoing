const express = require("express");

const app = express();

// module import
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// enviorment variable setup
dotenv.config();

// middleware for request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use('/uploads',express.static('uploads'))
app.use(cookieParser());
//import route
const user = require("./app/routes/user_router");
app.use('/api/v1',user);
const product = require("./app/routes/productRoute");
app.use('/api/v1/product',product);

const category = require("./app/routes/category");
app.use('/api/v1/category',category);

const cart = require("./app/routes/cartRoute")
app.use('/api/v1/cart',cart);


// Error Middleware
const ErrorMiddleware = require("./middleware/ErrorMiddleware");
app.use(ErrorMiddleware);

module.exports = app;
