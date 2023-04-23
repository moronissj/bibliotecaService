const mongoose = require("mongoose");

const conexionDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log("base de datos online")
  } catch (error) {
    console.log(error);
    throw new Error("error al conectar la base de datos");
  }
};

module.exports = { conexionDB };
