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

router.get("/upload", (req, res)=>{
    res.render("pages/upload");
});

router.post("/upload", upload.single("image"), async (req, res)=>{
    try {
        // get submitted data
        const { name, description } = req.body;

        // file uploaded
        const file = req.file;

        console.table([name, description, file]);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Something broke");
    };
});

// export router instance
module.exports = router;