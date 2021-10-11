const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");
const loginBatchLeader = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ where: { username: username } });
  // User.update
  console.log("user =", user);

  if (!user) {
    return res.status(404).json({
      message: "You are not registered",
      success: false,
    });
  }

  if (user.role !== "bl") {
    return res.status(403).json({
      message: "Make sure you are in the correct portal",
      success: false,
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    //Making jwt token
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      secret,
      {
        expiresIn: "15 days",
      }
    );

    const result = {
      role: user.role,
      username: user.username,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "Logedin",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      success: false,
    });
  }
};
module.exports = loginBatchLeader;