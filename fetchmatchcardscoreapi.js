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



// mongoose.connect("mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   poolSize: 10, // Adjust the poolSize based on your requirements
// });







// const Todo = mongoose.model("livescoredk", matchSchema);


const CricketMatchScorecard = require('./models/livescorecard.model'); // Update with the correct path to your Mongoose model file

const API_URL = 'https://rest.entitysport.com/v2/matches/';
const API_TOKEN = '73d62591af4b3ccb51986ff5f8af5676';

// Function to fetch match scorecard and save to MongoDB
const fetchMatchScorecardAndSave = async (matchId) => {
  try {
      const scorecardResponse = await axios.get(`${API_URL}${matchId}/scorecard?token=${API_TOKEN}`);

      let matchScorecard = scorecardResponse.data.response;
      // console.log(matchScorecard,"fsjafhkadghkasgkdgaskdgkshagdkagkjdsgkjagjkdsgkjas")
      // Check if 'man_of_the_match' is an empty string and set it to null
      if (matchScorecard.man_of_the_match === '') {
          matchScorecard.man_of_the_match = null;
      }
      if (matchScorecard.man_of_the_series === '') {
        matchScorecard.man_of_the_series = null; // or {} based on what's appropriate
      }

      await CricketMatchScorecard.findOneAndUpdate(
          { match_id: matchScorecard.match_id },
          matchScorecard,
          { upsert: true, new: true }
      );
  } catch (error) {
      console.error(`Error fetching or saving scorecard for match ID ${matchId}:`, error);
  }
};


// Function to get formatted date
const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0];
};

// Main function to fetch all match IDs and their scorecards
const fetchDataAndSaveScorecards = async () => {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 1); // Set to the previous day

        const formattedStartDate = getFormattedDate(startDate);
        const formattedEndDate = getFormattedDate(endDate);
        let currentPage = 1;
        let hasMoreData = true;

        while (hasMoreData) {
            const matchesResponse = await axios.get(
                // `${API_URL}?date=${formattedStartDate}_${formattedEndDate}&paged=${currentPage}&per_page=80&token=${API_TOKEN}`
                `https://rest.entitysport.com/v2/matches?date=2023-11-27_2023-12-06&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`

            );
            const matches = matchesResponse.data.response.items;
            if (matches.length === 0) {
                hasMoreData = false;
            } else {
                for (const match of matches) {
                    await fetchMatchScorecardAndSave(match.match_id);
                }
                currentPage++;
            }
        }

        console.log("All available match scorecard data updated in MongoDB.");
    } catch (error) {
        console.error("Error fetching and updating scorecard data:", error);
    }
};

// Run the main function
fetchDataAndSaveScorecards();
