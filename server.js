// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = new express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`server running on localhost: ${port}`);
})


app.post('/gen', postData);

function postData(req, res)
{
    console.log('server recived new data');

    console.log(req.body.main);

    try {
        projectData['temp'] = req.body.main.temp;
    } catch (error) {
        projectData['temp'] = "undefined";
    }

    try {
        projectData['description'] = req.body.weather[0].description;
    } catch (error) {
        projectData['description'] = "undefined";
    }
  

    projectData['fav'] = req.body.fav;
    
    res.send("request recived");


}

app.get('/getData', getData);

function getData(req, res)
{
    console.log("date has been sent to client>> ");
    console.log(projectData);
    
    res.send(projectData);
}