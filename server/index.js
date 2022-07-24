const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors=require("cors");
const app = express();
const port = process.env.port || 4000;

const userRouter = require("./routes/user.router");

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use("/user",userRouter);

mongoose
  .connect(`${process.env.uri}`)
  .then(() =>
    app.listen(port, () => {
      console.log("Server listening on Port " + port);
    })
  )
  .catch((err) => console.log(err));
