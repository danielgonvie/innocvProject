const express = require('express');
const router  = express.Router();

const User = require("../models/User");

// Get all users
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Get a specific user
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
});
module.exports = router;

//Edit a especific user
router.put("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const {username} = req.body;
  const {name} = req.body;
  const {birthdate} = req.body;

  

  User.findByIdAndUpdate(
    { _id: id },
    {  
      username: username, 
      name: name,
      birthdate: birthdate,
    }
  )
    .then(user => {
      console.log("User has been updated successfully");
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
});

//Delete a especific user
router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(user => {
      console.log("User has been deleted successfully");
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
});