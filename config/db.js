const mongoose = require("mongoose");
const config = require("config");

const mongoURI = config.get("MongoURI");
// const mongoURI = "mongodb://localhost:27017/devsocial";
module.exports = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("mongodb connected");
  } catch (err) {
    console.error(err.message);
    //exit process when fail to connect to db
    process.exit(1);
  }
};
