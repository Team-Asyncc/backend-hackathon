const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { secret } = require("../config/index");

const userRegister = async (userDetails, role, res) => {
  try {
    let userExists = await validateUsername(userDetails.username);
    if (userExists) {
      return res.status(400).json({
        message: "Username is already Registered.",
        success: false,
      });
    }

    let isEmailTaken = await validateEmail(userDetails.email);
    if (isEmailTaken) {
      return res.status(400).json({
        message: "Email is already Registered.",
        success: false,
      });
    }

    const password = await bcrypt.hash(userDetails.password, 12);

    const newUser = new User({
      ...userDetails,
      password,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "You have been registered",
      success: true,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create account",
      success: false,
      err: err,
    });
  }
};

const userLogin = async (userDetails, role, res) => {
  const { username, password } = userDetails;
  const user = await validateUsername(username);

  if (!user) {
    return res.status(404).json({
      message: "You are not registered",
      success: false,
    });
  }

  if (user.role !== role) {
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

const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = (roles) => (req, res, next) => {
  console.log(req.user.role, "role bta na");
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};

const validateUsername = async (username) => {
  //find the row where the username is found
  let user = await User.findOne({ where: { username } });
  console.log("validate username ", user);

  //will return null if user not found
  return user;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ where: { email } });
  console.log("validate email: ", user);
  return user;
};

// const serializeUser = (user) => {
//   return {
//     username: user.username,
//     email: user.email,
//     name: user.name,
//     _id: user.id,
//     updatedAt: user.updatedAt,
//     createdAt: user.createdAt,
//   };
// };

module.exports = {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  // serializeUser,
};
