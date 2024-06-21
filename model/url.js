//creating a model in mongodb for our project
const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [{ timeStamp: { type: Number, required: true } }], //is an array with timestamps so we can see how many times it has been visited
  //   {timeStamps: true}

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const URL = mongoose.model("url", urlschema); //url is name of model , urlschema is schema definition for the model and the model is being stored in the variable URL

module.exports = URL; //exporting the model
