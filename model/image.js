// import modules/packages
const mongoose = require("mongoose");

// image schema
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    img: {
        type: Buffer,
        contentType: String,
    },
    uploaded: {
        type: Date,
        default: Date.now
    }
});

// schema model instance
const Image = mongoose.model("image", imageSchema);

// export model instance
module.exports = Image;