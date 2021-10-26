//node package manager (npm) dependencies
const express = require('express')
const cors = require("cors")
// const fs = require('fs')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('./schema/db')

const port = 7000

// Initializing express to app variable
const app = express()

// Enabling access to the body params
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

//using mongoose to connect to mongo db atlas
mongoose.connect(
    "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
    }
);

//to make shure that db is connect or not
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to Db successfully");
});

// Get all the routes requests from the router file 
app.use(router);



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`) //Printing PORT number to know that server is up.
})