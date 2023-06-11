// import modules/packages
const express = require("express");
const multer = require("multer");
const Image = require("../model/image");

// multer configuration
const upload = multer({
    storage: multer.memoryStorage()
});

// router instance
const router = express.Router();

// endpoints
router.get("/test", (req, res)=>{
    res.status(200).send("Working");
});

// export router instance
module.exports = router;