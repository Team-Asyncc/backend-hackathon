const Team = require("../models/team");
const User = require("../models/user");
const bcryt = require("bcrypt");
const { validateUsername } = require("../utils/auth");
const loginBatchLeader = async (req, res) => {
  const { username, password } = req.body;
  const user = await validateUsername(username);

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