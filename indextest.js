// require('dotenv').config();
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const Live = require('./models/live.model');
const Liveinfo = require('./models/liveinfo.model') // Update the path according to your project structure
const Competition = require('./models/competition.model'); // Adjust the path according to your project structure
const CompetitionStats = require('./models/competitionStats.model')



const app = express();



// Define a route to handle GET requests at the "/todos" path


const PORT = process.env.PORT || 4000;




// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://sportzwikigpt:4tuQOABGdPzEwexX@sportzwikidata.ecmvuoz.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
);



// Function to find the oldest document
const findOldestDocument = async () => {
    try {
        const oldestDocument = await Liveinfo.find().sort({ date_start: 1 }).limit(1);
        console.log('Oldest document:', oldestDocument);
    } catch (error) {
        console.error('Error finding the oldest document:', error);
    }
};

// Call the function
findOldestDocument();
