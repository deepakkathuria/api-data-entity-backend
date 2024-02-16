const moment = require("moment");
const mongoose = require("mongoose");
const axios = require("axios");
// Update these paths according to your project structure
// const Match = require("./models/match.model");
const Commentary = require("./models/commentary.model");

// Ensure to replace with your actual MongoDB connection string


// Connect to your MongoDB database
mongoose.connect(
    "mongodb+srv://sportzwikigpt:4tuQOABGdPzEwexX@sportzwikidata.ecmvuoz.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
  )  
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const API_URL = "https://rest.entitysport.com/v2/matches/";
const SCORECARD_API_URL = "https://api.sportzwiki.com/getMatchScorebyid/";
const API_TOKEN = "73d62591af4b3ccb51986ff5f8af5676"; // Use your actual API token

const fetchInningsDetails = async (matchId) => {
  try {
    const scorecardResponse = await axios.get(`${SCORECARD_API_URL}${matchId}`);
    const innings = scorecardResponse.data.innings; // Assuming this is how the API response is structured
    return innings;
  } catch (error) {
    console.error(`Error fetching innings details for match ID ${matchId}:`, error);
    return []; // Return an empty array in case of an error to avoid further processing
  }
};

const fetchMatchCommentaryAndSave = async (matchId, inningNumber) => {
  try {
    const commentaryResponse = await axios.get(
      `${API_URL}${matchId}/innings/${inningNumber}/commentary?token=${API_TOKEN}`
    );
    const commentaries = commentaryResponse.data.response.commentaries;

    for (const commentary of commentaries) {
      const newCommentary = new Commentary(commentary); // Assuming your Commentary model matches the API response
      await newCommentary.save();
    }

    console.log(`Commentary saved for match ID: ${matchId}, Inning: ${inningNumber}`);
  } catch (error) {
    console.error(`Error fetching or saving commentary for match ID ${matchId}, Inning: ${inningNumber}:`, error);
  }
};

const fetchDataAndSave = async () => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - (24 * 60 * 60 * 1000)); // Previous day
  const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  const endDateFormatted = moment(endDate).format("YYYY-MM-DD");

  try {
    const matchesResponse = await axios.get(
      `https://api.sportzwiki.com/matchfilter?page=1&date=${startDateFormatted}_${endDateFormatted}`
    );
    const matches = matchesResponse.data.matches;

    for (const match of matches) {
      const innings = await fetchInningsDetails(match.match_id);
      for (const inning of innings) {
        await fetchMatchCommentaryAndSave(match.match_id, inning.number); // Assuming `inning.number` is available and correct
      }
    }

    console.log("All match commentaries updated in MongoDB.");
  } catch (error) {
    console.error("Error fetching and updating data:", error);
  }
};

fetchDataAndSave();
// Optionally, set an interval to run this function periodically
// setInterval(fetchDataAndSave, 1800000); // 30 minutes
