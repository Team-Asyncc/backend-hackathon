var express = require("express");
var router = express.Router();
var initialChecks = require("../middlewares/initialChecks");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  // serializeUser,
} = require("../utils/auth.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Registeration
router.post("/register/:role", initialChecks, async (req, res) => {
  const { role } = req.params;
  await userRegister(req.body, role, res);
});

// router.post("/team-leader-register", async (req, res) => {
//   await userRegister(req.body, "team-leader", res);
// });

// router.post("/vice-team-leader-register", async (req, res) => {
//   await userRegister(req.body, "vice-team-leader", res);
// });

// router.post("/batch-leader-register", async (req, res) => {
//   await userRegister(req.body, "batch-leader", res);
// });

//login
router.post("/login/:role", initialChecks, async (req, res) => {
  const { role } = req.params;
  await userLogin(req.body, role, res);
});

// router.post("/team-leader-login", async (req, res) => {
//   await userLogin(req.body, "team-leader", res);
// });

// router.post("/vice-team-leader-login", async (req, res) => {
//   await userLogin(req.body, "vice-team-leader", res);
// });

// router.post("/batch-leader-login", async (req, res) => {
//   await userLogin(req.body, "batch-leader", res);
// });

//protected routes
router.get(
  "/student-protected",
  userAuth,
  checkRole(["student"]),
  async (req, res) => {
    return res.send("only students can access this route");
  }
);

router.get(
  "/team-leader-protected",
  userAuth,
  checkRole(["team-leader"]),
  async (req, res) => {
    return res.send("only team-leaders can access this route");
  }
);

router.get(
  "/vice-team-leader-protected",
  userAuth,
  checkRole(["vice-team-leader"]),
  async (req, res) => {
    return res.send("only vice-team-leader can access this route");
  }
);

router.get(
  "/batch-leader-protected",
  userAuth,
  checkRole(["batch-leader"]),
  async (req, res) => {
    return res.send("only batch-leader can access this route");
  }
);

module.exports = router;
