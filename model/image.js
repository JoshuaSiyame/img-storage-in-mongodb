// import modules/packages
const mongoose = require("mongoose");

// image schema
const imageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mimeType: {
        type: String, 
        required: true
    },
    size: {
        type: Number,
        required: true
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