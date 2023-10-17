// require('dotenv').config();
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');

const app = express();



// Define a route to handle GET requests at the "/todos" path


const PORT = process.env.PORT || 4000;


// ---------------------------------------------------------SCHEMA FOR JSON /matches-----------------------------
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

// ---------------------------------------------------------SCHEMA FOR JSON /matches-----------------------------










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







const Todo = mongoose.model("livescoredk", matchSchema);




const currentDate = new Date();

// Extract date components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// Format the date
var formattedDate = `${year}-${month}-${day}`;







// Get the current date
const currentDatet = new Date();

// Get the date after two days
const twoDaysLater = new Date();
twoDaysLater.setDate(currentDatet.getDate() - 1);

// Extract date components
const tyear = twoDaysLater.getFullYear();
const tmonth = String(twoDaysLater.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
const tday = String(twoDaysLater.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// Format the date
var tformattedDate = `${tyear}-${tmonth}-${tday}`;
console.log(tformattedDate, "tformatrdate")
console.log(formattedDate, "formateeddate")

















// -------------------------------------------------------api to save match list -------------------------

const fetchDataAndSave = async () => {
  try {
    let currentPage = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      // Fetch data from the external API for the specified date and page
      console.log(`Fetching data from the external API for date ${tformattedDate} and page ${currentPage}...`);
      const response = await axios.get(
        `https://rest.entitysport.com/v2/matches?date=2023-09-30_2023-10-01&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
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
            { upsert: true, maxTimeMS: 60000 } // Set a higher timeout (20 seconds)
          );

        }

        console.log(`Data fetched successfully fro.`);

        // Increment the page number for the next iteration
        currentPage++;
      }
    }

    console.log("Data saved in MongoDB.");
  } catch (error) {
    console.error("Error fetching and saving data:", error);
  }
};

// fetchDataAndSave();


// -----------------------------api to save match list ---------------------------------------------------









// -------------------------------------schema for teams -------------------------------------------

const teamsSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  alt_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  thumb_url: {
    type: String,
    required: true,
  },
  logo_url: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  etag: {
    type: String,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  api_version: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Teamtt', teamsSchema);




// ----------------------------------------------------TEAMS API -------------------------------------
const fetchTeamsAndSave = async () => {
  try {
    let currentPage = 1;

    // Fetch data from the external Teams API
    const response = await axios.get(
      'https://rest.entitysport.com/v2/teams/?per_page=10&token=73d62591af4b3ccb51986ff5f8af5676'
    );

    const totalItems = response.data.response.total_items;
    const totalPages = response.data.response.total_pages;
    console.log(totalItems, totalPages, "datatttttttttttt")

    console.log(`Total items: ${totalItems}, Total pages: ${totalPages}`);

    while (currentPage <= totalPages) {
      console.log(`Fetching teams data from the external API for page ${currentPage}...`);

      const pageResponse = await axios.get(
        `https://rest.entitysport.com/v2/teams/?per_page=10&paged=${currentPage}&token=73d62591af4b3ccb51986ff5f8af5676`
      );

      const items = pageResponse.data.response.items;
      console.log(items)

      for (const team of items) {
        await Team.findOneAndUpdate(
          { tid: team.tid },
          team,
          { upsert: true, maxTimeMS: 200000 } // Set a higher timeout (20 seconds)
        );
      }

      console.log(`Teams data for page ${currentPage} fetched successfully.`);

      currentPage++;
    }

    const totalCount = await Team.countDocuments();
    console.log(`Total number of documents in the collection: ${totalCount}`);

    console.log("Teams data saved in MongoDB.");
  } catch (error) {
    console.error("Error fetching and saving teams data:", error.response ? error.response.data : error.message);
    console.log("Error details:", error);
  } finally {
    mongoose.disconnect();
  }
};


// fetchTeamsAndSave()












// ------------------------------------schema for player-------------------------------------------------const playerSchema = new mongoose.Schema({

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






// ----------------------------------------player---------------------------------------------------


const fetchPlayersAndSave = async () => {
  try {
    let currentPage = 1;

    // Fetch data from the external Teams API
    const response = await axios.get(
      'https://rest.entitysport.com/v2/players/?per_page=80&token=73d62591af4b3ccb51986ff5f8af5676'
    );

    const totalItems = response.data.response.total_items;
    const totalPages = response.data.response.total_pages;

    console.log(`Total items: ${totalItems}, Total pages: ${totalPages}`);

    while (currentPage <= totalPages) {
      console.log(`Fetching players data from the external API for page ${currentPage}...`);

      const pageResponse = await axios.get(
        `https://rest.entitysport.com/v2/players/?per_page=${totalItems}&paged=${currentPage}&token=73d62591af4b3ccb51986ff5f8af5676`
      );

      const items = pageResponse.data.response.items;

      for (const player of items) {
        await Player.findOneAndUpdate(
          { pid: player.pid },
          player,
          { upsert: true, maxTimeMS: 200000 } // Set a higher timeout (20 seconds)
        );
      }

      console.log(`Players data for page ${currentPage} fetched successfully.`);

      currentPage++;
    }

    const totalCount = await Player.countDocuments();
    console.log(`Total number of documents in the collection: ${totalCount}`);

    console.log("Players data saved in MongoDB.");
  } catch (error) {
    console.error("Error fetching and saving Players data:", error.response ? error.response.data : error.message);
  } finally {
    mongoose.disconnect();
  }
};



// fetchPlayersAndSave()






























// -----------------------------------------------fetch competition-------------------------------------------------------------------





















const competitionS = new mongoose.Schema({
  cid: {
    type: Number,
    allowNull: false,
  },
  title: {
    type: String,
    allowNull: false,
  },
  abbr: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  game_format: {
    type: String,
  },
  status: {
    type: String,
  },
  season: {
    type: String,
  },
  datestart: {
    type: Date,
  },
  dateend: {
    type: Date,
  },
  country: {
    type: String,
  },
  total_matches: {
    type: Number,
  },
  total_rounds: {
    type: Number,
  },
  total_teams: {
    type: Number,
  },
  table: {
    type: Number,
  },
  man_of_the_series: {
    type: Object,
  },
  rounds: {
    type: Object, // Assuming 'rounds' is an array of objects containing round information
  },
  venue_list: {
    type: Object, // Assuming 'venue_list' is an array of objects containing venue information
  },
});

const Competition = mongoose.model('Competitiont', competitionS);



const fetchCompetitionsAndSave = async () => {
  try {
    let currentPage = 1;

    // Fetch data from the external Competitions API
    const response = await axios.get(
      'https://rest.entitysport.com/v2/competitions/?per_page=80&token=73d62591af4b3ccb51986ff5f8af5676'
    );

    const totalItems = response.data.response.total_items;
    const totalPages = response.data.response.total_pages;


    console.log(`Total items: ${totalItems}, Total pages: ${totalPages}`);

    while (currentPage <= totalPages) {
      console.log(`Fetching competitions data from the external API for page ${currentPage}...`);

      const pageResponse = await axios.get(
        `https://rest.entitysport.com/v2/competitions/?per_page=80&paged=${currentPage}&token=73d62591af4b3ccb51986ff5f8af5676`
      );

      const items = pageResponse.data.response.items;
      console.log(items, "itemsdata")

      for (const competition of items) {
        await Competition.findOneAndUpdate(
          { cid: competition.cid },
          competition,
          { upsert: true, maxTimeMS: 200000 } // Set a higher timeout (20 seconds)
        );
      }

      console.log(`Competitions data for page ${currentPage} fetched successfully.`);

      currentPage++;
    }

    const totalCount = await Competition.countDocuments();
    console.log(`Total number of documents in the collection: ${totalCount}`);

    console.log("Competitions data saved in MongoDB.");
  } catch (error) {
    console.error("Error fetching and saving Competitions data:", error.response ? error.response.data : error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Call the function to fetch and process competition data
// fetchCompetitionsAndSave()





// ----------------------Team player model-------------------------------------------------------------------------------
// Player schema
const playerSchema1 = new mongoose.Schema({
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

// Team schema
const teamSchemaM = new mongoose.Schema({
  tid: { type: Number, required: true },
  title: { type: String, required: true },
  abbr: { type: String, required: true },
  alt_name: { type: String, required: true },
  type: { type: String, required: true },
  thumb_url: { type: String, required: true },
  logo_url: { type: String, required: true },
  country: { type: String, required: true },
  sex: { type: String, required: true },
  players: {
    t20i: [playerSchema1],
    test: [playerSchema1],
    odi: [playerSchema1]
  }
});

const TeamM = mongoose.model('TeamMP3', teamSchemaM);
















// ---------------------------------fetch team and player data -----------------------------------------------------------------



const teamId = [
  {
    name: "india",
    id: 25,
  },
  {
    name: "australia",
    id: 5,
  },
  {
    name: "pakistan",
    id: 13,
  },
  {
    name: "southafrica",
    id: 19,
  },
  {
    name: "westindies",
    id: 17,
  },
  {
    name: "newzealand",
    id: 7,
  },
  {
    name: "srilanka",
    id: 21,
  },
  {
    name: "ireland",
    id: 11,
  },
  {
    name: "uae",
    id: 15,
  },
  {
    name: "bangladesh",
    id: 23,
  },
  {
    name: "scotland",
    id: 9,
  },
];



















const fetchTeamPlayersAndSave = async () => {
  const PLAYER_ENDPOINT = 'https://rest.entitysport.com/v2/teams/{}/player';
  const TOKEN = '73d62591af4b3ccb51986ff5f8af5676';

  try {
    // Iterate over the teamId array
    for (const teamObj of teamId) {
      const tid = teamObj.id;
      console.log(`Fetching data for team ${tid}...`);

      // Fetch players for the current team
      const url = PLAYER_ENDPOINT.replace('{}', tid);
      const playerResponse = await axios.get(url, { params: { token: TOKEN } });

      const playersData = {
        t20i: playerResponse.data.response.items.players.t20i || [],
        test: playerResponse.data.response.items.players.test || [],
        odi: playerResponse.data.response.items.players.odi || []
      };
      const teamData = {
        ...playerResponse.data.response.items.team,
        players: playersData
      };

      // Update/Add team details and players in DB
      await TeamM.findOneAndUpdate(
        { tid: teamData.tid },
        { $set: teamData },
        { upsert: true, maxTimeMS: 200000 }
      );

      console.log(`Data fetched and saved for team ${tid}.`);
    }

    const totalCount = await TeamM.countDocuments();
    console.log(`Total number of teams in the collection: ${totalCount}`);
    console.log("Team and player data saved in MongoDB.");

  } catch (error) {
    console.error("Error fetching and saving data:", error.response ? error.response.data : error.message);
  } finally {
    mongoose.disconnect();
  }
};

fetchTeamPlayersAndSave();


















// ------------------------------PLAYER STATS SCHEMA --------------------------------------------------------------------



const statsSchema = {
  match_id: Number,
  inning_id: Number,
  matches: Number,
  innings: Number,
  notout: Number,
  runs: Number,
  balls: Number,
  highest: Number,
  run100: Number,
  run50: Number,
  run4: Number,
  run6: Number,
  average: String,
  strike: String,
  catches: Number,
  stumpings: Number,
  fastest50balls: Number,
  fastest100balls: Number,
  overs: String,
  econ: String,
  wickets: Number,
  bestinning: String,
  bestmatch: String,
  wicket4i: Number,
  wicket5i: Number,
  wicket10m: Number,
  hattrick: Number
};

const playerStatsSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  title: { type: String, required: true },
  short_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  middle_name: { type: String, default: '' },
  birthdate: { type: mongoose.Schema.Types.Mixed, required: true },
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
  batting: {
    test: statsSchema,
    odi: statsSchema,
    t20i: statsSchema,
    t20: statsSchema,
    lista: statsSchema,
    firstclass: statsSchema,
    t10: statsSchema
  },
  bowling: {
    test: statsSchema,
    odi: statsSchema,
    t20i: statsSchema,
    t20: statsSchema,
    lista: statsSchema,
    firstclass: statsSchema,
    t10: statsSchema
  },
  // etag: { type: String, default: '' },
  // modified: { type: Date, default: null },
  // datetime: { type: Date, default: null },
  // api_version: { type: String, default: '' }
});

const Playerstats = mongoose.model('PlayerStats', playerStatsSchema);




const teamIdp = [
  {
    name: "india",
    id: 25,
  },
  {
    name: "australia",
    id: 5,
  },
  {
    name: "pakistan",
    id: 13,
  },
  {
    name: "southafrica",
    id: 19,
  },
  {
    name: "westindies",
    id: 17,
  },
  {
    name: "newzealand",
    id: 7,
  },
  {
    name: "srilanka",
    id: 21,
  },
  {
    name: "ireland",
    id: 11,
  },
  {
    name: "uae",
    id: 15,
  },
  {
    name: "bangladesh",
    id: 23,
  },
  {
    name: "scotland",
    id: 9,
  },
];


const PLAYER_ENDPOINT = 'https://rest.entitysport.com/v2/teams/{}/player';
const PLAYER_STATS_ENDPOINT = 'https://rest.entitysport.com/v2/players/{}/stats';
const TOKEN = '73d62591af4b3ccb51986ff5f8af5676';


async function fetchPlayersForTeam(teamId) {
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
  try {
    const url = PLAYER_ENDPOINT.replace('{}', teamId);
    const response = await axios.get(url, { params: { token: TOKEN } });

    // Check if players object exists
    if (!response.data.response.items.players) {
      console.log(`No players found for team ${teamId}`);
      return [];
    }

    const players = [];
    ['t20i', 'odi', 'test'].forEach(category => {
      if (response.data.response.items.players[category]) {
        players.push(...response.data.response.items.players[category]);
      }
    });
    console.log(players, "players")
    return players;
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return [];
  }
}

async function fetchStatsForPlayer(playerId) {
  const url = PLAYER_STATS_ENDPOINT.replace('{}', playerId);
  const response = await axios.get(url, { params: { token: TOKEN } });
  console.log(response.data.response)

  return response.data.response;
}
async function fetchAndSaveAllPlayersAndStats(teamIds) {
  for (const team of teamIds) {
    console.log(`Fetching players for team ${team.name}...`);
    const players = await fetchPlayersForTeam(team.id);
    for (const player of players) {
      console.log(`Fetching stats for player ${player.title}...`);
      const statsData = await fetchStatsForPlayer(player.pid);
      const playerStats = new Playerstats({
        pid: player.pid,
        title: player.title,
        short_name: player.short_name,
        first_name: player.first_name,
        last_name: player.last_name,
        middle_name: player.middle_name,
        birthdate: new Date(player.birthdate),
        birthplace: player.birthplace,
        country: player.country,
        primary_team: player.primary_team,
        logo_url: player.logo_url,
        playing_role: player.playing_role,
        batting_style: player.batting_style,
        bowling_style: player.bowling_style,
        fielding_position: player.fielding_position,
        recent_match: player.recent_match,
        recent_appearance: new Date(player.recent_appearance),
        fantasy_player_rating: player.fantasy_player_rating,
        alt_name: player.alt_name,
        facebook_profile: player.facebook_profile,
        twitter_profile: player.twitter_profile,
        instagram_profile: player.instagram_profile,
        debut_data: player.debut_data,
        thumb_url: player.thumb_url,
        nationality: player.nationality,
        batting: statsData.batting,
        bowling: statsData.bowling,
        // etag: statsData.etag,
        // modified: new Date(statsData.modified),
        // datetime: new Date(statsData.datetime),
        // api_version: statsData.api_version
      });
      await playerStats.save();
      console.log(`Saved stats for player ${player.title}.`);
    }
  }
}

// fetchAndSaveAllPlayersAndStats(teamIdp)