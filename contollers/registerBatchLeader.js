const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const registerBatchLeader = async (req, res)=>{
    const {firstName, lastName, email, password, username} = req.body;
    try {
        const alreadyExists = await User.findOne({ where: {email: email } });
        console.log("checking of aldready exists", alreadyExists);
        if (alreadyExists) {
          res.status(401).send("Oops! Email already exists");
        } else {
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);
          const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            role: "bl",
            email: email,
            password: hash,
            username: username
          });

          const savedUser = await newUser.save();
          res.status(201).json({
            message: "You have been registered",
            user : savedUser,
            success: true
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    };


module.exports = registerBatchLeader;
