const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://harpreetllg:harpreetllg@cluster0.4gj2jam.mongodb.net/mock6test?retryWrites=true&w=majority"
    );
    console.log(" db connection done");
  } catch (error) {
    console.log("error from db connection", error);
  }
}
module.exports = dbConnection;
