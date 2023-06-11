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

router.get("/", async (req, res)=>{
    try {
        // get the images
        const imageFiles = await Image.find({});
        if(imageFiles.length === 0){
            return res.status(200).redirect("/upload");
        };
        res.render("pages/index", {imageFiles: imageFiles});
    } catch (error) {
        console.error(err);
        res.status(500).send("Something broke");
    };
});

router.get("/upload", (req, res)=>{
    res.render("pages/upload");
});

router.get("/image/:imageId", async (req, res)=>{
    try {
        // get the requested id
        const imageId = req.params.imageId;

        // retrieve a single image based on the id
        const image = await Image.findById(imageId);
        if(!image){
            return res.status(404).send("Image not found");
        };
        res.status(200).render("pages/image", {image});
    } catch (err) {
        console.error(err);
        res.status(500).send("Something broke.");
    };
})

router.post("/upload", upload.single("image"), async (req, res)=>{
    try {
        // get submitted data
        const { description } = req.body;

        // file uploaded
        const file = req.file;

        const fileData = {
            originalName: file.originalname,
            description: description,
            mimeType: file.mimetype,
            size: file.size,
            img: file.buffer
        };

        // preview the data before submit
        // console.log(fileData);

        // save the data to database
        await Image(fileData).save();
        res.redirect("/");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Something broke");
    };
});

router.delete("/delete/image/:imageId", async (req, res)=>{
    try{
        // get image id
        const imageId = req.params.imageId;

        // find image and delete it
        await Image.findByIdAndDelete(imageId);
        res.status(200).redirect("/");
    }catch(err){
        console.error(err);
        res.status(500).send("Something broke.");
    };
});

// export router instance
module.exports = router;