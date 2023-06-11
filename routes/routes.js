// import modules/packages
const express = require("express");

// router instance
const router = express.Router();

// endpoints
router.get("/test", (req, res)=>{
    res.status(200).send("Working");
});

// export router instance
module.exports = router;