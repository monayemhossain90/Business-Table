const express = require("express");
const mongoose = require("mongoose");
const app = new express();
const router = require( './src/routes/api');
const path= require('path');

//Security middleware import

const rateLimit =  require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");


// Security middleware  implement
    app.use(helmet());
    app.use(mongoSanitize());
    app.use(xss());
    app.use(hpp());
    app.use(cors())

// body parser
app.use(bodyParser.json());
    // Request rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// database connection

const URI ="mongodb+srv://<username>:<password>@cluster0.j7kvy.mongodb.net/CRUD-2?retryWrites=true&w=majority";
const OPTIONS = {user:"crud-2",pass:"oLSB2rmpBuZKmnu5", autoIndex:true};

mongoose.connect(URI,OPTIONS, (error)=>{
    console.log("Database connection success");
    console.log(error)
})


// Routing Implement
app.use("/api/v1",router);

//Undefined Route
app.use('*',(req,res)=>{
    res.status(404).json({status:"fail",data:"Not found"})
})

module.exports=app;
