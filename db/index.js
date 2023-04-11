const mongoose = require("mongoose");

const MONGO_URI = 
// `mongodb+srv://dev-user:CAySHJ6heKvRtvqH@dims-uat.rabja.mongodb.net/dims-dev`;
`mongodb+srv://pg1010ag16:Princegarg@cluster0.rvvw16l.mongodb.net/test`;

const connecting = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  } catch (err) {
    console.log(err);
  }
};

const db = mongoose.connection;

db.once("open", () => console.log("DB is Connected"));
db.on("error", (err) => console.log("Connection Error", err));

module.exports = connecting;
