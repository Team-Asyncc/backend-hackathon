const express = require("express");
const router = express.Router();
const initialChecks = require('../middlewares/initialChecks');
const loginBatchLeader = require("../controllers/loginBatchLeader");;
const getData = require("../controllers/getData");
router.get("/", (req,res)=>{
    req.status(200).send("welcome to batchleader Route");
})
const registerBatchLeader = require('../controllers/registerBatchLeader');
router.post("/batch-leader-register",initialChecks,registerBatchLeader);
router.get("batch-leader-login" ,loginBatchLeader); 
router.post("/get-data",getData);

module.exports = router;