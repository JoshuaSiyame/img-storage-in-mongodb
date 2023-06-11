// import packages/modules
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes
const appRoutes = require("./routes/routes");

// dotenv configuration
dotenv.config();

// connection to database
mongoose.set("strictQuery", true);
if(process.env.MODE !=="production"){
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.error("Failed to connect to Database", err);
    });
}else{
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI_PROD).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.error("Failed to connect to Database", err);
    });
}

// app instance
const app = express();

// app configurations
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes configuration
app.use("/", appRoutes);

// server instance
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server up and listening on port: ${process.env.PORT}`);
});