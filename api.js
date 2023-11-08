// require('dotenv').config();
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');
const cache = require("./routeCache/routeCache");
const teamController = require('./controllers/teamsController');
const playerController = require('./controllers/playerController')
const teamPlayerController = require('./controllers/teamPlayerController')
const playerStatsController = require('./controllers/playerStatsController')
require('dotenv').config();
const cors = require('cors');



const app = express();
app.use(cors());


const PORT = process.env.PORT || 4003;

// Connect to your MongoDB database
// mongoose.connect(
//   // "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
//   "mongodb+srv://sportzwikigpt:4tuQOABGdPzEwexX@sportzwikidata.ecmvuoz.mongodb.net/?retryWrites=true&w=majority"

// );
mongoose.connect(process.env.MONGO_URI);





// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.use('/js', express.static('/var/www/myjsfiles'));



// ---------------------------------TEAM  list API and team/teamid details --------------------------------------------------------

app.get('/teams', teamController.getTeams);
app.get('/teams/:id', teamController.getTeamById);

//-----------------------------------------api for players------------------------------------------------

app.get('/players/:pid', playerController.getPlayerById);


// ----------------------------------------player according to team-----------------------------------------------------------------

app.get('/teamm', teamPlayerController.getAllTeams);
app.get('/v2/teams/:teamId/player', teamPlayerController.getTeamPlayers);


// ------------------------------------------------players stats data -----------------------------------------------------------

app.get('/api/playerstats/:pid', playerStatsController.getPlayerStatsById);





// ----------------------------------------------PROXY ------------------------------------------------------------------------------
const token = "73d62591af4b3ccb51986ff5f8af5676";


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
