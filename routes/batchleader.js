const express = require("express");
const router = express.Router();
const initialChecks = require('../middlewares/initialChecks');
const getData = require("../contollers/getData");
const loginBatchLeader = require("../contollers/loginBatchLeader");;
const registerBatchLeader = require('../contollers/registerBatchLeader');
router.get("/bl", (req,res)=>{
    res.status(200).send("welcome to batchleader Route");
})
router.post("/batch-leader-login" ,loginBatchLeader); 
router.post("/batch-leader-register",initialChecks,registerBatchLeader);
router.post("/get-data",getData);
router.post("/updata-data",)

module.exports = router;