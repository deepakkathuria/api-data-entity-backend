const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

// Connect to your MongoDB database
mongoose.connect(
    "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
);



const competitionSchema = new mongoose.Schema({
  cid: Number,
  title: String,
  abbr: String,
  type: String,
  category: String,
  match_format: String,
  season: String,
  status: String,
  datestart: String,
  dateend: String,
  country: String,
  total_matches: String,
  total_rounds: String,
  total_teams: String,
});

const teamSchema = new mongoose.Schema({
  team_id: Number,
  name: String,
  short_name: String,
  logo_url: String,
  scores_full: String,
});

const venueSchema = new mongoose.Schema({
  venue_id: String,
  name: String,
  location: String,
  country: String,
  timezone: String,
});

const weatherSchema = new mongoose.Schema({
  weather: String,
  weather_desc: String,
  temp: Number,
  humidity: Number,
  visibility: Number,
  wind_speed: Number,
  clouds: Number,
});

const pitchSchema = new mongoose.Schema({
  pitch_condition: String,
  batting_condition: String,
  pace_bowling_condition: String,
  spine_bowling_condition: String,
});

const tossSchema = new mongoose.Schema({
  winner: Number,
  decision: Number,
});

const matchSchema = new mongoose.Schema({
  match_id: Number,
  title: String,
  short_title: String,
  subtitle: String,
  match_number: String,
  format: Number,
  format_str: String,
  status: Number,
  status_str: String,
  status_note: String,
  verified: Boolean,
  pre_squad: Boolean,
  odds_available: Boolean,
  game_state: Number,
  game_state_str: String,
  domestic: String,
  competition: competitionSchema,
  teama: teamSchema,
  teamb: teamSchema,
  date_start: Date,
  date_end: Date,
  timestamp_start: Number,
  timestamp_end: Number,
  date_start_ist: String,
  date_end_ist: String,
  venue: venueSchema,
  umpires: String,
  referee: String,
  equation: String,
  live: String,
  result: String,
  result_type: Number,
  win_margin: String,
  winning_team_id: Number,
  commentary: Number,
  wagon: Number,
  latest_inning_number: Number,
  presquad_time: Date,
  verify_time: Date,
  match_dls_affected: Boolean,
  weather: weatherSchema,
  pitch: pitchSchema,
  toss: tossSchema,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;


const Todo = mongoose.model("livescore1", matchSchema);



const fetchDataAndSave = async () => {
    try {
      let currentPage = 1;
      let hasMoreData = true;
  
      while (hasMoreData) {
        // Fetch data from the external API for the specified date and page
        console.log(`Fetching data from the external API for date and page ${currentPage}...`);
        const response = await axios.get(
          `https://rest.entitysport.com/v2/matches?date=2023-09-20_2023-09-27&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
        );
        const todos = response.data.response.items;
  
        if (todos.length === 0) {
          // If no more data is returned, exit the loop
          hasMoreData = false;
        } else {
          // Update or create documents based on match_id
          for (const todo of todos) {
            await Todo.findOneAndUpdate(
              { match_id: todo.match_id },
              todo,
              { upsert: true }
            );
          }
  
          console.log(`Data fetched successfully from the external API for date ${date} and page ${currentPage}.`);
  
          // Increment the page number for the next iteration
          currentPage++;
        }
      }
  
      console.log("Data saved in MongoDB.");
    } catch (error) {
      console.error("Error fetching and saving data:", error);
    }
  };

  fetchDataAndSave();
