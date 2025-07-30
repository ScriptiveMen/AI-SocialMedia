const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected DB");
    })
    .catch((err) => console.log("Error connecting DB", err));
}

module.exports = connectDB;
