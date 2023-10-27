// require('dotenv').config();
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');
const cache = require("./routeCache/routeCache");
const Team = require('./models/teams.model');
const TeamM = require('./models/teamPlayer.model')
const Playerstats = require('./models/playerStats.model')



const app = express();



// Define a route to handle GET requests at the "/todos" path


const PORT = process.env.PORT || 3000;

// --------------------------------------------------MATCH API SCHEMA--------------------------------------

// Define the Mongoose schemas for nested objects
const venueSchema = new mongoose.Schema({
  venue_id: String,
  name: String,
  location: String,
  country: String,
  timezone: String,
});

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
  scores: String,
  overs: String,
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
  verified: String,
  pre_squad: String,
  odds_available: String,
  game_state: Number,
  game_state_str: String,
  domestic: String,
  competition: competitionSchema,
  teama: teamSchema,
  teamb: teamSchema,
  date_start: String,
  date_end: String,
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
  presquad_time: String,
  verify_time: String,
  match_dls_affected: String,
  weather: [],
  pitch: {
    pitch_condition: String,
    batting_condition: String,
    pace_bowling_condition: String,
    spine_bowling_condition: String,
  },
  toss: {
    text: String,
    winner: Number,
    decision: Number,
  },
});

// -------------------------------------------------MATCH API SCHEMA------------------------------------------------

// Connect to your MongoDB database
mongoose.connect(
  // "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
  "mongodb+srv://sportzwikigpt:4tuQOABGdPzEwexX@sportzwikidata.ecmvuoz.mongodb.net/?retryWrites=true&w=majority"

);

const Todo = mongoose.model("livescoredk", matchSchema);


// ------------------------------------MATCH LIST API---------------------------------------------
app.get('/list',async(req,res)=>{
    try{
        const matches = await Todo.find({}).exec()
        res.json(matches)
    }catch(err){
        console.error(err)
    }
})
// -------------------------------------------MATCH LIST API ---------------------------------------


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});








// ---------------------------------------------------TEAM  SCHEMA------------------------------------- 






// const teamsSchema = new mongoose.Schema({
//   tid: {
//     type: Number,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   abbr: {
//     type: String,
//     required: true,
//   },
//   alt_name: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   thumb_url: {
//     type: String,
//     required: true,
//   },
//   logo_url: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   sex: {
//     type: String,
//     required: true,
//   },
//   etag: {
//     type: String,
//     required: true,
//   },
//   modified: {
//     type: Date,
//     required: true,
//   },
//   datetime: {
//     type: Date,
//     required: true,
//   },
//   api_version: {
//     type: String,
//     required: true,
//   },
// });

// const Team = mongoose.model('Teamtt', teamsSchema);



// ---------------------------------TEAM  list API and team/teamid details --------------------------------------------------------

app.get('/teams', async (req, res) => {
  try {
    const { type, sex } = req.query;

    // Initialize an empty query object
    const query = {};

    // Add conditions to the query based on the presence of parameters
    if (type) {
      query.type = type;
    }

    if (sex) {
      query.sex = sex;
    }
console.log(query,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqu")
    // Perform the query
    const teams = await Team.find(query);

    // Send the response
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/teams/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findOne({ tid: id });
    if (!team) {
      return res.status(404).send('Team not found');
    }
    res.json(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// -----------------------------------------api for players------------------------------------------
const playerSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  title: { type: String, required: true },
  short_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  middle_name: { type: String, default: '' },
  birthdate: { type: Date, required: true },
  birthplace: { type: String, default: '' },
  country: { type: String, required: true },
  primary_team: [{ tid: Number, name: String, short_name: String }],
  logo_url: { type: String, default: '' },
  playing_role: { type: String, default: '' },
  batting_style: { type: String, default: '' },
  bowling_style: { type: String, default: '' },
  fielding_position: { type: String, default: '' },
  recent_match: { type: Number, default: null },
  recent_appearance: { type: Date, default: null },
  fantasy_player_rating: { type: Number, default: null },
  alt_name: { type: String, default: '' },
  facebook_profile: { type: String, default: '' },
  twitter_profile: { type: String, default: '' },
  instagram_profile: { type: String, default: '' },
  debut_data: { type: String, default: '' },
  thumb_url: { type: String, default: '' },
  nationality: { type: String, default: '' },
});

const Player = mongoose.model('Player', playerSchema);








// app.get('/api/players', async (req, res) => {
//   try {
//     const { country } = req.params;
//     const players = await Player.find({ nationality: 'India' }).exec();
//     res.json(players);
//     console.log(players,"pppppppppppppppppppppppppppp")
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.get('/players', async (req, res) => {
//   console.log(req.params,"rwqeqqqqqqqqqqqqqq")
//   try {
//     const { country } = req.params;
//     const players = await Player.find({ nationality: 'India' }).exec();
//     res.json(players);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.get('/players/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
     console.log(pid)
    // Query the database to find a player with the specified pid
    const player = await Player.findOne({ pid }).exec();

    // Check if the player was found
    if (player) {
      // Respond with the retrieved player in JSON format
      res.json(player);
    } else {
      // If player with the specified pid is not found, respond with an appropriate message
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (err) {
    // Handle errors and log them to the console
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});








// ------------------------------------------------competitionSchema---------------------------------------------------------




// const competitionS = new mongoose.Schema({
//   cid: {
//     type: Number,
//     allowNull: false,
//   },
//   title: {
//     type: String,
//     allowNull: false,
//   },
//   abbr: {
//     type: String,
//   },
//   type: {
//     type:String,
//   },
//   category: {
//     type: String,
//   },
//   game_format: {
//     type: String,
//   },
//   status: {
//     type: String,
//   },
//   season: {
//     type: String,
//   },
//   datestart: {
//     type: Date,
//   },
//   dateend: {
//     type: Date,
//   },
//   country: {
//     type: String,
//   },
//   total_matches: {
//     type: Number,
//   },
//   total_rounds: {
//     type: Number,
//   },
//   total_teams: {
//     type: Number,
//   },
//   table: {
//     type: Number,
//   },
//   man_of_the_series: {
//     type: Object,
//   },
//   rounds: {
//     type: Object, // Assuming 'rounds' is an array of objects containing round information
//   },
//   venue_list: {
//     type: Object, // Assuming 'venue_list' is an array of objects containing venue information
//   },
// });

// const Competition = mongoose.model('Competitiont', competitionS);



// app.get('/competition',async(req,res)=>{
//   try{
//       const matches = await Competition.find({}).exec()
//       res.json(matches)
//   }catch(err){
//       console.error(err)
//   }
// })



































// ----------------------------------------player according to team-----------------------------------------------------------------




// const teamSchemaM = new mongoose.Schema({
//   tid: { type: Number, required: true },
//   title: { type: String, required: true },
//   abbr: { type: String, required: true },
//   alt_name: { type: String, required: true },
//   type: { type: String, required: true },
//   thumb_url: { type: String, required: true },
//   logo_url: { type: String, required: true },
//   country: { type: String, required: true },
//   sex: { type: String, required: true },
  
//   players: [{
//     pid: { type: Number, required: true },
//     title: { type: String, required: true },
//     short_name: { type: String, required: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, default: '' },
//     middle_name: { type: String, default: '' },
//     birthdate: { type: Date, required: true },
//     birthplace: { type: String, default: '' },
//     country: { type: String, required: true },
//     primary_team: [{ tid: Number, name: String, short_name: String }],
//     logo_url: { type: String, default: '' },
//     playing_role: { type: String, default: '' },
//     batting_style: { type: String, default: '' },
//     bowling_style: { type: String, default: '' },
//     fielding_position: { type: String, default: '' },
//     recent_match: { type: Number, default: null },
//     recent_appearance: { type: Date, default: null },
//     fantasy_player_rating: { type: Number, default: null },
//     alt_name: { type: String, default: '' },
//     facebook_profile: { type: String, default: '' },
//     twitter_profile: { type: String, default: '' },
//     instagram_profile: { type: String, default: '' },
//     debut_data: { type: String, default: '' },
//     thumb_url: { type: String, default: '' },
//     nationality: { type: String, default: '' },
//   }]
// });

// const TeamM = mongoose.model('TeamMP3', teamSchemaM);





app.get('/teamm',async(req,res)=>{
  try{
      const matches = await TeamM.find({}).exec()
      res.json(matches)
  }catch(err){
      console.error(err)
  }
})


app.get('/v2/teams/:teamId/player', async (req, res) => {
  try {
      const teamId = req.params.teamId;
      console.log("Team ID:", teamId); // Logging team ID
      
      const team = await TeamM.findOne({ tid: teamId });
      console.log("Team Data:", team); // Logging the fetched data

      if (!team) {
          return res.status(404).json({ message: 'Team not found' });
      }

      res.json({ players: team.players });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});





















// ------------------------------------------------players stats data -----------------------------------------------------------


// const statsSchema = {
//   match_id: Number,
//   inning_id: Number,
//   matches: Number,
//   innings: Number,
//   notout: Number,
//   runs: Number,
//   balls: Number,
//   highest: Number,
//   run100: Number,
//   run50: Number,
//   run4: Number,
//   run6: Number,
//   average: String,
//   strike: String,
//   catches: Number,
//   stumpings: Number,
//   fastest50balls: Number,
//   fastest100balls: Number,
//   overs: String,
//   econ: String,
//   wickets: Number,
//   bestinning: String,
//   bestmatch: String,
//   wicket4i: Number,
//   wicket5i: Number,
//   wicket10m: Number,
//   hattrick: Number
// };

// const playerStatsSchema = new mongoose.Schema({
//   pid: { type: Number, required: true },
//   title: { type: String, required: true },
//   short_name: { type: String, required: true },
//   first_name: { type: String, required: true },
//   last_name: { type: String, default: '' },
//   middle_name: { type: String, default: '' },
//   birthdate: { type: mongoose.Schema.Types.Mixed, required: true },
//   country: { type: String, required: true },
//   primary_team: [{ tid: Number, name: String, short_name: String }],
//   logo_url: { type: String, default: '' },
//   playing_role: { type: String, default: '' },
//   batting_style: { type: String, default: '' },
//   bowling_style: { type: String, default: '' },
//   fielding_position: { type: String, default: '' },
//   recent_match: { type: Number, default: null },
//   recent_appearance: { type: Date, default: null },
//   fantasy_player_rating: { type: Number, default: null },
//   alt_name: { type: String, default: '' },
//   facebook_profile: { type: String, default: '' },
//   twitter_profile: { type: String, default: '' },
//   instagram_profile: { type: String, default: '' },
//   debut_data: { type: String, default: '' },
//   thumb_url: { type: String, default: '' },
//   nationality: { type: String, default: '' },
//   batting: {
//     test: statsSchema,
//     odi: statsSchema,
//     t20i: statsSchema,
//     t20: statsSchema,
//     lista: statsSchema,
//     firstclass: statsSchema,
//     t10: statsSchema
//   },
//   bowling: {
//     test: statsSchema,
//     odi: statsSchema,
//     t20i: statsSchema,
//     t20: statsSchema,
//     lista: statsSchema,
//     firstclass: statsSchema,
//     t10: statsSchema
//   },
//   // etag: { type: String, default: '' },
//   // modified: { type: Date, default: null },
//   // datetime: { type: Date, default: null },
//   // api_version: { type: String, default: '' }
// });

// const Playerstats = mongoose.model('PlayerStats', playerStatsSchema);

app.get('/api/playerstats/:pid', async (req, res) => {
  try {
      const playerId = req.params.pid;
      const stats = await Playerstats.findOne({ pid: playerId });

      if (!stats) {
          return res.status(404).json({ message: 'Player not found' });
      }

      res.json(stats);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});






















// ----------------------------------------------PROXY ------------------------------------------------------------------------------



const token = "73d62591af4b3ccb51986ff5f8af5676";
//comment

// Define the API endpoint you want to proxy
const apiEndpoint = `https://rest.entitysport.com/v2/matches?token=${token}`;

// Apply the middleware to the specific route
app.use("/matches", cache(60));

// Set up a route to proxy requests
app.get("/matches", async (req, res) => {
  try {
    // Extract query parameters from the client request
    const queryParams = req.query;

    // Make a request to the API endpoint with the extracted query parameters
    const apiResponse = await axios.get(apiEndpoint, { params: queryParams });

    // Send the API response to the client
    res.json(apiResponse.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
