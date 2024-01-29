const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const Live = require("./models/live.model");
const Liveinfo = require("./models/liveinfo.model"); // Update the path according to your project structure
const Competition = require("./models/competition.model"); // Adjust the path according to your project structure
const CompetitionStats = require("./models/competitionStats.model");

const app = express();

// Define a route to handle GET requests at the "/todos" path

const PORT = process.env.PORT || 4000;

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://sportzwikigpt:4tuQOABGdPzEwexX@sportzwikidata.ecmvuoz.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
);

const API_URL = "https://rest.entitysport.com/v2/matches/";
const API_TOKEN = "73d62591af4b3ccb51986ff5f8af5676";

// "https://rest.entitysport.com/v2/matches/49689/scorecard?token=ec471071441bb2ac538a0ff901abd249"
const fetchMatchDetailsAndSave = async (matchId) => {
    try {
      const matchDetailsResponse = await axios.get(
        `${API_URL}${matchId}/info?token=${API_TOKEN}`
      );
  
      const matchDetails = matchDetailsResponse.data.response;
  
      await Liveinfo.findOneAndUpdate(
        { match_id: matchDetails.match_id },
        matchDetails,
        { upsert: true, new: true }
      );
  
      console.log(`Match details updated for match ID: ${matchId}`);
    } catch (error) {
      console.error(
        `Error fetching or saving details for match ID ${matchId}:`,
        error
      );
    }
  };
  
  const getFormattedDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      return momentDate.toISOString();
    } else {
      throw new Error("Invalid date format");
    }
  };
  
  const fetchDataAndSave1 = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 1); // Set to the previous day
      const startDate1 = moment(startDate).format("YYYY-MM-DD");
      const endDate1 = moment(endDate).format("YYYY-MM-DD");
  
      let totalMatchesProcessed = 0;
      let currentPage = 1;
  
      const matchesResponse = await axios.get(
        `https://api.sportzwiki.com/matchfilter?page=${currentPage}&date=${startDate1}_${endDate1}`
      );
      const matches = matchesResponse.data.matches;
      console.log(matches.length, "matcheslength");
  
      for (const match of matches) {
        await fetchMatchDetailsAndSave(match.match_id);
        totalMatchesProcessed++;
        console.log(`Total matches processed: ${totalMatchesProcessed}`);
      }
  
      console.log("All available match data updated in MongoDB.");
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  };
  
  fetchDataAndSave1();
  setInterval(fetchDataAndSave1, 1800000); // 1800000 milliseconds = 30 minutes

  


















  