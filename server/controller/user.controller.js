const userModel = require("../models/user.model");
const getUser = async (req, res) => {
    
  try {
    const result = await userModel.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const addUser = async (req, res) => {
    
    try {
          const result = await userModel.create(req.body);
          res.send(result);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

const removeUser = async (req, res) => {
    
  try {
    const result = await userModel.deleteOne({id: req.body.id});
    res.send(result);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const updateUser = async (req, res) => {
  const newData = { name, email, contact, age } = req.body;

   try {
     const result = await userModel.findByIdAndUpdate(
       { _id: req.body.id },
       { ...newData }
     );
    res.send(result);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
}

module.exports = { getUser, addUser, removeUser, updateUser };
