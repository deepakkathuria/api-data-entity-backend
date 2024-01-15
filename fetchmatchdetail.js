const moment = require('moment')
const mongoose = require("mongoose");
const express = require('express');
const axios = require('axios')
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


const API_URL = 'https://rest.entitysport.com/v2/matches/';
const API_TOKEN = '73d62591af4b3ccb51986ff5f8af5676';


// "https://rest.entitysport.com/v2/matches/49689/scorecard?token=ec471071441bb2ac538a0ff901abd249"

const fetchMatchDetailsAndSave = async (matchId) => {
    try {
        const matchDetailsResponse = await axios.get(`${API_URL}${matchId}/info?token=${API_TOKEN}`);
        const matchDetails = matchDetailsResponse.data.response;

        // Convert date_start_ist to ISO format if it exists and is valid
        console.log(matchDetails.date_start_ist,"sbfbjasjlfabasjf")
        // if (matchDetails.date_start_ist) {
        //     try {
        //         matchDetails.date_start_ist = getFormattedDate(matchDetails.date_start_ist);
        //         console.log( matchDetails.date_start_ist,"vakkkkkkkkkkkkkk")
        //     } catch (dateError) {
        //         console.error(`Error converting date for match ID ${matchId}:`, dateError);
        //         // You might want to handle the error appropriately here
        //     }
        // }

        await Liveinfo.findOneAndUpdate(
            { match_id: matchDetails.match_id },
            matchDetails,
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(`Error fetching or saving details for match ID ${matchId}:`, error);
    }
};


const getFormattedDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.toISOString();
    } else {
        throw new Error('Invalid date format');
    }
};



// Main function to fetch all match IDs and their details
const fetchDataAndSave1 = async () => {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 1); // Set to previous day

        const formattedStartDate = getFormattedDate(startDate);
        const formattedEndDate = getFormattedDate(endDate);
        let currentPage = 1;
        let hasMoreData = true;

        while (hasMoreData) {
            const matchesResponse = await axios.get(
                // `${API_URL}?date=${formattedStartDate}_${formattedEndDate}&paged=${currentPage}&per_page=80&token=${API_TOKEN}`
                // `${API_URL}?date=29-11-23_06-12-23&paged=${currentPage}&per_page=80&token=${API_TOKEN}`
                `https://rest.entitysport.com/v2/matches?date=2023-11-27_2023-12-06&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`


            );
            const matches = matchesResponse.data.response.items;
            if (matches.length === 0) {
                hasMoreData = false;
            } else {
                for (const match of matches) {
                    await fetchMatchDetailsAndSave(match.match_id);
                }
                currentPage++;
            }
        }

        console.log("All available match data updated in MongoDB.");
    } catch (error) {
        console.error("Error fetching and updating data:", error);
    }
};

fetchDataAndSave1()

// setInterval(fetchDataAndSave1);
