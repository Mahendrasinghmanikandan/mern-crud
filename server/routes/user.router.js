const express = require('express');
const router = express.Router();

// import Controllers

const {
  getUser,
  addUser,
  removeUser,
  updateUser,
} = require("../controller/user.controller");

router.get("/", getUser);
router.post("/createUser", addUser);
router.delete("/removeUser", removeUser);
router.put("/updateUser",updateUser);

module.exports = router;