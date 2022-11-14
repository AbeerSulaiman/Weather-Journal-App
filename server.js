// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express");

/* Dependencies */
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Set up and Spin up the server
const port = 8000;
app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

// POST route
app.post('/add', addData);

function addData(req, res) {
    console.log(req.body);
    userData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData.push(userData);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
  projectData =[];
}


