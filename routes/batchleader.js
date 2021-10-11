const express = require("express");
const router = express.Router();
const initialChecks = require('../middlewares/initialChecks');
const loginBatchLeader = require("../contollers/registerBatchLeader.js/loginBatchLeader");;
const getData = require("../contollers/registerBatchLeader.js/getData");
router.get("/", (req,res)=>{
    req.status(200).send("welcome to batchleader Route");
})
const registerBatchLeader = require('../contollers/registerBatchLeader.js/registerBatchLeader');
router.post("/batch-leader-register",initialChecks,registerBatchLeader);
router.post("batch-leader-login" ,loginBatchLeader); 
router.post("/get-data",getData);

module.exports = router;