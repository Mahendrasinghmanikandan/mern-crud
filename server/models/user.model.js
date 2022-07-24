const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
    },
    email: {
      type: "string",
      require: true,
    },
    age: {
      type: "number",
      require: true,
    },
    password: {
      type: "string",
      require: true,
    },
    contact: {
      type: "number",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);