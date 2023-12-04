// require('dotenv').config();
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const Live = require('./models/live.model'); // Update the path according to your project structure


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




// const currentDate = new Date();

// // Extract date components
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
// const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// // Format the date
// var formattedDate = `${year}-${month}-${day}`;







// // Get the current date
// const currentDatet = new Date();

// // Get the date after two days
// const twoDaysLater = new Date();
// twoDaysLater.setDate(currentDatet.getDate() - 1);

// // Extract date components
// const tyear = twoDaysLater.getFullYear();
// const tmonth = String(twoDaysLater.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
// const tday = String(twoDaysLater.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// // Format the date
// var tformattedDate = `${tyear}-${tmonth}-${tday}`;
// console.log(tformattedDate, "tformatrdate")
// console.log(formattedDate, "formateeddate")

















// -------------------------------------------------------api to save match list -------------------------

// const fetchDataAndSave = async () => {
//   try {
//     let currentPage = 1;
//     let hasMoreData = true;

//     while (hasMoreData) {
//       // Fetch data from the external API for the specified date and page
//       console.log(`Fetching data from the external API for date ${tformattedDate} and page ${currentPage}...`);
//       const response = await axios.get(
//         `https://rest.entitysport.com/v2/matches?date=2023-11-24_2023-12-27&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
//       );
//       const todos = response.data.response.items;

//       if (todos.length === 0) {
//         // If no more data is returned, exit the loop
//         hasMoreData = false;
//       } else {
//         // Update or create documents based on match_id
//         for (const todo of todos) {
//           await Live.findOneAndUpdate(
//             { match_id: todo.match_id },
//             todo,
//             { upsert: true, maxTimeMS: 60000 } // Set a higher timeout (20 seconds)
//           );

//         }

//         console.log(`Data fetched successfully fro.`);

//         // Increment the page number for the next iteration
//         currentPage++;
//       }
//     }

//     console.log("Data saved in MongoDB.");
//   } catch (error) {
//     console.error("Error fetching and saving data:", error);
//   }
// };
const fetchDataAndSave = async () => {
    function getFormattedDate(date) {
        return date.toISOString().split('T')[0];
      }
    try {
      // Calculate dates for fetching data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 1); // Set to previous day
  
      const formattedStartDate = getFormattedDate(startDate);
      const formattedEndDate = getFormattedDate(endDate);
  
      let currentPage = 1;
      let hasMoreData = true;
  
      while (hasMoreData) {
        console.log(`Fetching data for dates between ${formattedStartDate} and ${formattedEndDate}, page ${currentPage}...`);
  
        const response = await axios.get(
        //   `https://rest.entitysport.com/v2/matches?date=${formattedStartDate}_${formattedEndDate}&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
          `https://rest.entitysport.com/v2/matches?date=2023-12-01_2023-12-02&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`

        );
        

        // console.log(`https://rest.entitysport.com/v2/matches?date=${formattedStartDate}_${formattedEndDate}&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`,'gthdsfuygsufgfuygryfkuergfkugiug')
  
        const matches = response.data.response.items;
        const m = matches.map((item)=>{
            return item.match_id
        })
        console.log(m,"mdtaaa")

  
        // if (matches.length === 0) {
        //   hasMoreData = false;
        // } else {
        //   for (const match of matches) {
        //     await Live.findOneAndUpdate(
        //       { match_id: match.match_id },
        //       match,
        //       { upsert: true, maxTimeMS: 60000 }
        //     );
        //   }
  
        //   console.log(`Data fetched and updated for page ${currentPage}.`);
        //   currentPage++;
        // }
      }
  
      console.log("Data updated in MongoDB.");
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  };
  
setInterval(fetchDataAndSave, 100000000000);

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
      "name": "brazilwomenu-19",
      "id": 127857
  },
  {
      "name": "1.kielerhtc",
      "id": 120141
  },
  {
      "name": "11ace",
      "id": 126112
  },
  {
      "name": "12starscc",
      "id": 125920
  },
  {
      "name": "91yardclub",
      "id": 127634
  },
  {
      "name": "aonecricketclub",
      "id": 115953
  },
  {
      "name": "aachenrisingstars",
      "id": 119932
  },
  {
      "name": "aakashtigersmws",
      "id": 113011
  },
  {
      "name": "abahanilimited",
      "id": 23723
  },
  {
      "name": "abbottabad",
      "id": 33204
  },
  {
      "name": "abbottabadfalcons",
      "id": 17818
  },
  {
      "name": "abbottabadregion",
      "id": 13645
  },
  {
      "name": "abbottabadrhinos",
      "id": 105881
  },
  {
      "name": "abudhabi",
      "id": 116220
  },
  {
      "name": "abudhabiknightriders",
      "id": 127169
  },
  {
      "name": "acbkeralakombans",
      "id": 125595
  },
  {
      "name": "accb",
      "id": 120574
  },
  {
      "name": "acecapitalcricketclub",
      "id": 118786
  },
  {
      "name": "acecapitalcricketclub",
      "id": 12061
  },
  {
      "name": "actcomets",
      "id": 127952
  },
  {
      "name": "actinvitationalxi",
      "id": 105494
  },
  {
      "name": "act/nswxi",
      "id": 126881
  },
  {
      "name": "active",
      "id": 124722
  },
  {
      "name": "adelaidestrikers",
      "id": 14205
  },
  {
      "name": "adelaidestrikerswomen",
      "id": 15804
  },
  {
      "name": "adib",
      "id": 127708
  },
  {
      "name": "adoreclub",
      "id": 127944
  },
  {
      "name": "advancebalanceriders",
      "id": 115165
  },
  {
      "name": "aettuskers",
      "id": 128120
  },
  {
      "name": "affies",
      "id": 16249
  },
  {
      "name": "afghancheetas",
      "id": 74228
  },
  {
      "name": "afghanrangerscricketclub",
      "id": 27138
  },
  {
      "name": "afghanwirelesscricketclub",
      "id": 27132
  },
  {
      "name": "afghanxi",
      "id": 128092
  },
  {
      "name": "afghanistan",
      "id": 498
  },
  {
      "name": "afghanistana",
      "id": 16621
  },
  {
      "name": "afghanistancricketboardxi",
      "id": 123624
  },
  {
      "name": "afghanistanemergingteam",
      "id": 112047
  },
  {
      "name": "afghanistanunder-19s",
      "id": 1146
  },
  {
      "name": "afghanistanunder-19s",
      "id": 127932
  },
  {
      "name": "afghanistanunder-25s",
      "id": 71290
  },
  {
      "name": "afghanistanxi",
      "id": 113620
  },
  {
      "name": "agorc",
      "id": 124487
  },
  {
      "name": "agranibankcricketclub",
      "id": 111104
  },
  {
      "name": "agrikingsknights",
      "id": 127916
  },
  {
      "name": "agriculturedevelopmentbankofpakistan",
      "id": 14792
  },
  {
      "name": "aisayer",
      "id": 127827
  },
  {
      "name": "airindia",
      "id": 71776
  },
  {
      "name": "airstrikers",
      "id": 115916
  },
  {
      "name": "ajkjaguars",
      "id": 24692
  },
  {
      "name": "ajman",
      "id": 116221
  },
  {
      "name": "ajmanheroes",
      "id": 123575
  },
  {
      "name": "alazizdevelopers",
      "id": 123138
  },
  {
      "name": "alhajery",
      "id": 126290
  },
  {
      "name": "almoharbthewarriors",
      "id": 124374
  },
  {
      "name": "almullaexchangethrissurlions",
      "id": 127936
  },
  {
      "name": "almuzainiexcangecompany",
      "id": 128052
  },
  {
      "name": "al-rashedinternationalshippingco",
      "id": 128053
  },
  {
      "name": "albania",
      "id": 120752
  },
  {
      "name": "albano",
      "id": 118986
  },
  {
      "name": "albyzalmicc",
      "id": 115845
  },
  {
      "name": "albyzalmicricketclubu23",
      "id": 116102
  },
  {
      "name": "alesconcometssc",
      "id": 124562
  },
  {
      "name": "algeria",
      "id": 120754
  },
  {
      "name": "aliyoungstars",
      "id": 126946
  },
  {
      "name": "alifpharma",
      "id": 127786
  },
  {
      "name": "allindiaelectricityboard",
      "id": 71791
  },
  {
      "name": "allsaintspythons",
      "id": 127360
  },
  {
      "name": "allstars",
      "id": 71684
  },
  {
      "name": "allappeycricketclub",
      "id": 121290
  },
  {
      "name": "alleppeyunited",
      "id": 127937
  },
  {
      "name": "almhultcc",
      "id": 116134
  },
  {
      "name": "almoraflamingbirdswomen",
      "id": 128083
  },
  {
      "name": "almullaexchangecc",
      "id": 127707
  },
  {
      "name": "alphaquashersyokohama",
      "id": 127903
  },
  {
      "name": "alubondtigers",
      "id": 123102
  },
  {
      "name": "alvaladecc",
      "id": 116746
  },
  {
      "name": "alwarphantom",
      "id": 121995
  },
  {
      "name": "amjaincollege",
      "id": 127574
  },
  {
      "name": "amasimbihawkswomen",
      "id": 127870
  },
  {
      "name": "amazonswomen",
      "id": 127679
  },
  {
      "name": "amberelephants",
      "id": 125082
  },
  {
      "name": "ambernathavengers",
      "id": 127666
  },
  {
      "name": "amcabbottabad",
      "id": 30685
  },
  {
      "name": "amdocscc",
      "id": 116179
  },
  {
      "name": "ameratroyals",
      "id": 122621
  },
  {
      "name": "americaneducationcenter",
      "id": 38277
  },
  {
      "name": "americansamoa",
      "id": 120756
  },
  {
      "name": "americanuniversityofmalta",
      "id": 117072
  },
  {
      "name": "ameyasports",
      "id": 117535
  },
  {
      "name": "amigosccansiao",
      "id": 116758
  },
  {
      "name": "amoregion",
      "id": 14774
  },
  {
      "name": "amosharks",
      "id": 15710
  },
  {
      "name": "amparadistrict",
      "id": 108058
  },
  {
      "name": "amsterdamkings",
      "id": 113406
  },
  {
      "name": "amsterdamschecricketclub",
      "id": 119909
  },
  {
      "name": "anandacollege",
      "id": 15527
  },
  {
      "name": "andhra",
      "id": 12975
  },
  {
      "name": "andhracricketassociationxi",
      "id": 72389
  },
  {
      "name": "andhrawomen",
      "id": 15970
  },
  {
      "name": "andorra",
      "id": 120758
  },
  {
      "name": "andycornfordsxi",
      "id": 115856
  },
  {
      "name": "angelswomen",
      "id": 124963
  },
  {
      "name": "angikaavengers",
      "id": 118644
  },
  {
      "name": "angola",
      "id": 120760
  },
  {
      "name": "anguilla",
      "id": 105473
  },
  {
      "name": "annauniversity",
      "id": 127571
  },
  {
      "name": "antigua&barbudapresident'sxi",
      "id": 128086
  },
  {
      "name": "antiguaandbarbuda",
      "id": 105486
  },
  {
      "name": "antiguahawksbills",
      "id": 29441
  },
  {
      "name": "antonianssportsclub",
      "id": 38722
  },
  {
      "name": "antwerp",
      "id": 125919
  },
  {
      "name": "anuradhapuracentralcollege",
      "id": 38186
  },
  {
      "name": "anuradhauradistrict",
      "id": 108053
  },
  {
      "name": "apinstituteofinformationtechnology",
      "id": 38285
  },
  {
      "name": "aptechcricketclub",
      "id": 27136
  },
  {
      "name": "arabislamicinsurance",
      "id": 128054
  },
  {
      "name": "arabianeagleskozhikode",
      "id": 127934
  },
  {
      "name": "arabianknights",
      "id": 127751
  },
  {
      "name": "aranguezsportsclub",
      "id": 124637
  },
  {
      "name": "arcsandheri",
      "id": 113026
  },
  {
      "name": "argentina",
      "id": 9123
  },
  {
      "name": "argentinaunder-19s",
      "id": 127979
  },
  {
      "name": "argentinawomen",
      "id": 69559
  },
  {
      "name": "arianaakif",
      "id": 116337
  },
  {
      "name": "arianacricketclub",
      "id": 116333
  },
  {
      "name": "arizonasuns",
      "id": 120508
  },
  {
      "name": "armedpoliceforceclub",
      "id": 118017
  },
  {
      "name": "armenia",
      "id": 120763
  },
  {
      "name": "aroraaces",
      "id": 115209
  },
  {
      "name": "arqumcricketclub",
      "id": 123140
  },
  {
      "name": "artechbluestar",
      "id": 127828
  },
  {
      "name": "aruba",
      "id": 120765
  },
  {
      "name": "arunachalpradesh",
      "id": 111568
  },
  {
      "name": "arunachalpradeshwomen",
      "id": 122023
  },
  {
      "name": "aryagurukul(cbse)",
      "id": 16411
  },
  {
      "name": "aryanclubwomen",
      "id": 123091
  },
  {
      "name": "asialions",
      "id": 122751
  },
  {
      "name": "asiapacificuniversity",
      "id": 124711
  },
  {
      "name": "asiaxi",
      "id": 26857
  },
  {
      "name": "asianall-stars",
      "id": 127686
  },
  {
      "name": "asiancc",
      "id": 127737
  },
  {
      "name": "asianlatinacricketclub",
      "id": 116557
  },
  {
      "name": "asianxi",
      "id": 69364
  },
  {
      "name": "assakcc",
      "id": 122366
  },
  {
      "name": "assam",
      "id": 12987
  },
  {
      "name": "assamcc",
      "id": 128042
  },
  {
      "name": "assamcricketassociationxi",
      "id": 72318
  },
  {
      "name": "assamwomen",
      "id": 15985
  },
  {
      "name": "assupoltuks(southafrica)",
      "id": 16677
  },
  {
      "name": "athenscricketacademy",
      "id": 121921
  },
  {
      "name": "athreyacricketclub",
      "id": 124572
  },
  {
      "name": "atlantafire",
      "id": 120511
  },
  {
      "name": "atlantalightning",
      "id": 125281
  },
  {
      "name": "atlanticregion",
      "id": 31071
  },
  {
      "name": "atlasutcknightscc",
      "id": 117070
  },
  {
      "name": "aucklanda",
      "id": 38075
  },
  {
      "name": "aucklandaces",
      "id": 13231
  },
  {
      "name": "aucklandhearts",
      "id": 15334
  },
  {
      "name": "aucklandunder-21swomen",
      "id": 38050
  },
  {
      "name": "australia",
      "id": 5
  },
  {
      "name": "australiaa",
      "id": 8532
  },
  {
      "name": "australiaawomen",
      "id": 27802
  },
  {
      "name": "australiagovernor-general'sxi",
      "id": 108597
  },
  {
      "name": "australialegends",
      "id": 114572
  },
  {
      "name": "australiaover-50s",
      "id": 114667
  },
  {
      "name": "australiaunder-19s",
      "id": 8688
  },
  {
      "name": "australiawomen",
      "id": 8652
  },
  {
      "name": "australiawomenunder-19s",
      "id": 127109
  },
  {
      "name": "australia-v",
      "id": 115470
  },
  {
      "name": "australiancapitalterritory",
      "id": 25965
  },
  {
      "name": "australiancapitalterritoryunder-23s",
      "id": 37672
  },
  {
      "name": "australiancapitalterritorywomen",
      "id": 26270
  },
  {
      "name": "australiancricketersassociationmasters",
      "id": 41359
  },
  {
      "name": "australianinstituteofsport",
      "id": 81240
  },
  {
      "name": "australianuniversities",
      "id": 31212
  },
  {
      "name": "australianxi",
      "id": 17527
  },
  {
      "name": "australians",
      "id": 91589
  },
  {
      "name": "austria",
      "id": 42842
  },
  {
      "name": "austriaccwien",
      "id": 116434
  },
  {
      "name": "austriawomen",
      "id": 116426
  },
  {
      "name": "austriancrickettigers",
      "id": 123049
  },
  {
      "name": "austriandaredevils",
      "id": 127801
  },
  {
      "name": "avengers",
      "id": 124741
  },
  {
      "name": "azadjammu&kashmirregion",
      "id": 13596
  },
  {
      "name": "azaibaxi",
      "id": 122623
  },
  {
      "name": "azerbaijan",
      "id": 120767
  },
  {
      "name": "baislabie'sxi",
      "id": 3747
  },
  {
      "name": "b-lovekandy",
      "id": 117009
  },
  {
      "name": "bablastingnamibia",
      "id": 114865
  },
  {
      "name": "ba11sytrichy",
      "id": 127799
  },
  {
      "name": "babonneauleatherbacks",
      "id": 116001
  },
  {
      "name": "badalonashaheencc",
      "id": 116798
  },
  {
      "name": "badulla&monaragalacombineschools",
      "id": 27018
  },
  {
      "name": "badulladistrict",
      "id": 108054
  },
  {
      "name": "badullaladies",
      "id": 15614
  },
  {
      "name": "badullaseaeagles",
      "id": 116078
  },
  {
      "name": "badureliyasportsclub",
      "id": 12050
  },
  {
      "name": "baggybluescricketclub",
      "id": 116472
  },
  {
      "name": "baghstallions",
      "id": 125810
  },
  {
      "name": "bagmatiprovince",
      "id": 118020
  },
  {
      "name": "bahamas",
      "id": 66759
  },
  {
      "name": "bahawalpur",
      "id": 33201
  },
  {
      "name": "bahawalpurandmultan",
      "id": 128031
  },
  {
      "name": "bahawalpurregion",
      "id": 13605
  },
  {
      "name": "bahawalpurroyals",
      "id": 126350
  },
  {
      "name": "bahawalpurstags",
      "id": 21311
  },
  {
      "name": "bahrain",
      "id": 30519
  },
  {
      "name": "bahrainunder-19s",
      "id": 42223
  },
  {
      "name": "bahrainwomen",
      "id": 125027
  },
  {
      "name": "bajajkhadakwarriors",
      "id": 127866
  },
  {
      "name": "bakersfieldstrikers",
      "id": 120531
  },
  {
      "name": "balanbihulsuperkings",
      "id": 127869
  },
  {
      "name": "balkhlegends",
      "id": 111756
  },
  {
      "name": "balkhprovince",
      "id": 116446
  },
  {
      "name": "balochistan",
      "id": 29521
  },
  {
      "name": "balochistan2ndxi",
      "id": 117159
  },
  {
      "name": "baltimoreroyals",
      "id": 127965
  },
  {
      "name": "baluchistan",
      "id": 106987
  },
  {
      "name": "baluchistanbears",
      "id": 105865
  },
  {
      "name": "baluchistanwarriors",
      "id": 24138
  },
  {
      "name": "band-e-amirdragons",
      "id": 15707
  },
  {
      "name": "band-e-amirregion",
      "id": 14772
  },
  {
      "name": "bandelwarriors",
      "id": 127808
  },
  {
      "name": "baneasacricketclub",
      "id": 116708
  },
  {
      "name": "bangkokblues",
      "id": 114890
  },
  {
      "name": "bangkokwarriors",
      "id": 114892
  },
  {
      "name": "banglatigers",
      "id": 113857
  },
  {
      "name": "bangladesh",
      "id": 23
  },
  {
      "name": "bangladesha",
      "id": 11385
  },
  {
      "name": "bangladeshawomen",
      "id": 127842
  },
  {
      "name": "bangladeshaustria",
      "id": 119309
  },
  {
      "name": "bangladeshcricketboardacademy",
      "id": 67022
  },
  {
      "name": "bangladeshcricketboardgreen",
      "id": 63273
  },
  {
      "name": "bangladeshcricketboardpresident'sxi",
      "id": 128075
  },
  {
      "name": "bangladeshcricketboardred",
      "id": 63274
  },
  {
      "name": "bangladeshcricketboardunder-17s",
      "id": 16421
  },
  {
      "name": "bangladeshcricketboardxi",
      "id": 65982
  },
  {
      "name": "bangladeshdeaf",
      "id": 127783
  },
  {
      "name": "bangladeshemergingteam",
      "id": 40394
  },
  {
      "name": "bangladeshkingscc",
      "id": 116821
  },
  {
      "name": "bangladeshkrirashikkhaprotisthan",
      "id": 112555
  },
  {
      "name": "bangladeshlegends",
      "id": 118242
  },
  {
      "name": "bangladeshtiger",
      "id": 127687
  },
  {
      "name": "bangladeshunder-19s",
      "id": 127929
  },
  {
      "name": "bangladeshunder-19s",
      "id": 1010
  },
  {
      "name": "bangladeshunder-23s",
      "id": 113658
  },
  {
      "name": "bangladeshwomen",
      "id": 10712
  },
  {
      "name": "bangladeshwomenemerging",
      "id": 113802
  },
  {
      "name": "bangladeshwomenunder-19s",
      "id": 127110
  },
  {
      "name": "bangladeshxi",
      "id": 68833
  },
  {
      "name": "bankurahorses",
      "id": 122297
  },
  {
      "name": "baraccaprato",
      "id": 118521
  },
  {
      "name": "barakbravehearts",
      "id": 121576
  },
  {
      "name": "barakqueenswomen",
      "id": 123285
  },
  {
      "name": "baranaautewarriors",
      "id": 124768
  },
  {
      "name": "baranagarsportingclubwomen",
      "id": 127069
  },
  {
      "name": "barbados",
      "id": 11851
  },
  {
      "name": "barbadospride",
      "id": 123179
  },
  {
      "name": "barbadosroyals",
      "id": 121142
  },
  {
      "name": "barbadosroyalswomen",
      "id": 125861
  },
  {
      "name": "barbadostridents",
      "id": 18243
  },
  {
      "name": "barbadosunder-19s",
      "id": 19586
  },
  {
      "name": "barbadoswomen",
      "id": 30643
  },
  {
      "name": "barbariancc",
      "id": 116646
  },
  {
      "name": "barcelonagladiators",
      "id": 118138
  },
  {
      "name": "barisalbulls",
      "id": 14096
  },
  {
      "name": "barisalburners",
      "id": 65154
  },
  {
      "name": "barisaldivisionunder-14s",
      "id": 63093
  },
  {
      "name": "barisaldivisionunder-18s",
      "id": 63228
  },
  {
      "name": "barishaldivision",
      "id": 11282
  },
  {
      "name": "barmyarmywomen",
      "id": 124532
  },
  {
      "name": "barnaroyals",
      "id": 118130
  },
  {
      "name": "baroda",
      "id": 12994
  },
  {
      "name": "barodaavengerswomen",
      "id": 127609
  },
  {
      "name": "barodabelieverswomen",
      "id": 127610
  },
  {
      "name": "barodabraverswomen",
      "id": 127606
  },
  {
      "name": "barodacricketassociationxi",
      "id": 72356
  },
  {
      "name": "barodarivalswomen",
      "id": 127608
  },
  {
      "name": "barodaunder-19",
      "id": 126444
  },
  {
      "name": "barodawarriorswomen",
      "id": 127607
  },
  {
      "name": "barodawomen",
      "id": 15991
  },
  {
      "name": "barrackporebashers",
      "id": 121462
  },
  {
      "name": "basnahira",
      "id": 63979
  },
  {
      "name": "basnahiracricketdundee",
      "id": 68878
  },
  {
      "name": "basnahiragreens",
      "id": 41137
  },
  {
      "name": "batticaloadistrict",
      "id": 108059
  },
  {
      "name": "bauhiniastarswomen",
      "id": 119995
  },
  {
      "name": "bavaria",
      "id": 123007
  },
  {
      "name": "bawngkawnsouthcricketclub",
      "id": 124254
  },
  {
      "name": "bayblazers",
      "id": 125228
  },
  {
      "name": "bayleafblasters",
      "id": 120149
  },
  {
      "name": "bayerspartans",
      "id": 125772
  },
  {
      "name": "bayeruerdingenboosters",
      "id": 119930
  },
  {
      "name": "bayeruerdingenwolves",
      "id": 119946
  },
  {
      "name": "bcchampions",
      "id": 116295
  },
  {
      "name": "bcapresident'sxi",
      "id": 106110
  },
  {
      "name": "bcbselectxi",
      "id": 90533
  },
  {
      "name": "bdtigersxi",
      "id": 124651
  },
  {
      "name": "bdmtcc",
      "id": 123563
  },
  {
      "name": "bedfordshire",
      "id": 7532
  },
  {
      "name": "belagavipanthers",
      "id": 26727
  },
  {
      "name": "belapurblasters",
      "id": 127670
  },
  {
      "name": "belarus",
      "id": 120769
  },
  {
      "name": "belfasttitans",
      "id": 113408
  },
  {
      "name": "belgium",
      "id": 42854
  },
  {
      "name": "belgiumunder-19s",
      "id": 81136
  },
  {
      "name": "belgrade",
      "id": 121785
  },
  {
      "name": "belize",
      "id": 120771
  },
  {
      "name": "belizewomen",
      "id": 127618
  },
  {
      "name": "bellarytuskers",
      "id": 26729
  },
  {
      "name": "bengal",
      "id": 12990
  },
  {
      "name": "bengalcricketassociationxi",
      "id": 72347
  },
  {
      "name": "bengaltigerscc",
      "id": 115869
  },
  {
      "name": "bengalunder-19",
      "id": 121734
  },
  {
      "name": "bengalunder-19",
      "id": 126445
  },
  {
      "name": "bengalwomen",
      "id": 16010
  },
  {
      "name": "bengalicc",
      "id": 116801
  },
  {
      "name": "bengalurubadhshahs",
      "id": 115476
  },
  {
      "name": "bengalurublasters",
      "id": 104908
  },
  {
      "name": "bengalurublasterswomen",
      "id": 125895
  },
  {
      "name": "benin",
      "id": 120773
  },
  {
      "name": "benonizalmi",
      "id": 104943
  },
  {
      "name": "bergamocricketclub",
      "id": 116556
  },
  {
      "name": "bergamosuperxi",
      "id": 125203
  },
  {
      "name": "bergamounitedcricketclub",
      "id": 116944
  },
  {
      "name": "berkshire",
      "id": 7551
  },
  {
      "name": "berkshirewomen",
      "id": 19247
  },
  {
      "name": "berkshirexi",
      "id": 2810
  },
  {
      "name": "berlincc",
      "id": 121195
  },
  {
      "name": "berlincricketacademy",
      "id": 125672
  },
  {
      "name": "berlineaglescc",
      "id": 116324
  },
  {
      "name": "bermuda",
      "id": 9138
  },
  {
      "name": "bermudaselectxi",
      "id": 128020
  },
  {
      "name": "bermudaunder-19s",
      "id": 42334
  },
  {
      "name": "bermudawomen",
      "id": 69560
  },
  {
      "name": "bestoftherest",
      "id": 120041
  },
  {
      "name": "bethesdagoldeneagles",
      "id": 127361
  },
  {
      "name": "beverencc",
      "id": 116423
  },
  {
      "name": "beximcodhaka",
      "id": 117031
  },
  {
      "name": "bezawadatigers",
      "id": 125262
  },
  {
      "name": "bhagalpurbulls",
      "id": 118641
  },
  {
      "name": "bhairahawagladiators",
      "id": 112083
  },
  {
      "name": "bharatpetroleumcorporationlimited",
      "id": 71782
  },
  {
      "name": "bharatsancharnigamlimited",
      "id": 71796
  },
  {
      "name": "bhilwarabulls",
      "id": 127997
  },
  {
      "name": "bhilwarakings",
      "id": 126137
  },
  {
      "name": "bhiratnagarsuperkings",
      "id": 127231
  },
  {
      "name": "bhutan",
      "id": 30525
  },
  {
      "name": "bhutanunder-19s",
      "id": 79651
  },
  {
      "name": "bhutanunder-25s",
      "id": 71277
  },
  {
      "name": "bhutanwomen",
      "id": 112340
  },
  {
      "name": "bigeasyxi",
      "id": 127659
  },
  {
      "name": "bihar",
      "id": 12985
  },
  {
      "name": "biharwomen",
      "id": 118291
  },
  {
      "name": "bijapurbulls",
      "id": 26730
  },
  {
      "name": "bikanablaster",
      "id": 121996
  },
  {
      "name": "biplabichandarnagore",
      "id": 122341
  },
  {
      "name": "biratnagarkings",
      "id": 112253
  },
  {
      "name": "biratnagartitans",
      "id": 114085
  },
  {
      "name": "biratnagartitanswomen",
      "id": 113783
  },
  {
      "name": "biratnagarwarriors",
      "id": 112081
  },
  {
      "name": "birbbhumironman",
      "id": 122293
  },
  {
      "name": "birminghambears",
      "id": 124523
  },
  {
      "name": "birminghamphoenix(men)",
      "id": 120618
  },
  {
      "name": "birminghamphoenix(women)",
      "id": 120635
  },
  {
      "name": "bjorvika",
      "id": 123165
  },
  {
      "name": "bk-55",
      "id": 121295
  },
  {
      "name": "blackcaps",
      "id": 121574
  },
  {
      "name": "blackpanthers",
      "id": 118164
  },
  {
      "name": "blindersblizzards",
      "id": 120422
  },
  {
      "name": "bloemcityblazers",
      "id": 104944
  },
  {
      "name": "bloomfieldcricketandathleticclub",
      "id": 12067
  },
  {
      "name": "blueavengers",
      "id": 127900
  },
  {
      "name": "bluedevils",
      "id": 123295
  },
  {
      "name": "bluesquadrons",
      "id": 128039
  },
  {
      "name": "blvblasters",
      "id": 127917
  },
  {
      "name": "boerilakeaceswomen",
      "id": 127246
  },
  {
      "name": "bogliasco",
      "id": 118912
  },
  {
      "name": "bohemiancc",
      "id": 115928
  },
  {
      "name": "bokaroblasters",
      "id": 116737
  },
  {
      "name": "bokaroblossomswomen",
      "id": 118153
  },
  {
      "name": "boland",
      "id": 12699
  },
  {
      "name": "bolandunder-13s",
      "id": 14895
  },
  {
      "name": "bolandunder-15s",
      "id": 37874
  },
  {
      "name": "bolandunder-17s",
      "id": 15040
  },
  {
      "name": "bolandunder-19s",
      "id": 16723
  },
  {
      "name": "bolandwomen",
      "id": 15244
  },
  {
      "name": "bolansblasters",
      "id": 127362
  },
  {
      "name": "bolivia",
      "id": 120775
  },
  {
      "name": "bollywoodkings",
      "id": 123024
  },
  {
      "name": "bolognacricketclub",
      "id": 116946
  },
  {
      "name": "bonnbluestar",
      "id": 119942
  },
  {
      "name": "boostdefenders",
      "id": 15714
  },
  {
      "name": "boostregion",
      "id": 14769
  },
  {
      "name": "border",
      "id": 12706
  },
  {
      "name": "borderunder-13s",
      "id": 14891
  },
  {
      "name": "borderunder-15s",
      "id": 37883
  },
  {
      "name": "borderunder-17s",
      "id": 15037
  },
  {
      "name": "borderunder-19s",
      "id": 16727
  },
  {
      "name": "borderwomen",
      "id": 15227
  },
  {
      "name": "bosniaandherzegovina",
      "id": 120777
  },
  {
      "name": "botanicalgardenrangers",
      "id": 115767
  },
  {
      "name": "botkyrka",
      "id": 120687
  },
  {
      "name": "botswana",
      "id": 19678
  },
  {
      "name": "botswanaunder-19s",
      "id": 42274
  },
  {
      "name": "botswanawomen",
      "id": 120221
  },
  {
      "name": "bousherbusters",
      "id": 122618
  },
  {
      "name": "bpcl",
      "id": 127648
  },
  {
      "name": "bradhaddinxii",
      "id": 113403
  },
  {
      "name": "brahmaputraboys",
      "id": 121581
  },
  {
      "name": "bramptonwolves",
      "id": 113380
  },
  {
      "name": "brazil",
      "id": 120780
  },
  {
      "name": "brazilwomen",
      "id": 69549
  },
  {
      "name": "brendantaylorxi",
      "id": 38166
  },
  {
      "name": "brescia",
      "id": 113434
  },
  {
      "name": "bresciacricketclub",
      "id": 116554
  },
  {
      "name": "brigade",
      "id": 123161
  },
  {
      "name": "brighton",
      "id": 2700
  },
  {
      "name": "brisbaneheat",
      "id": 14208
  },
  {
      "name": "brisbaneheatwomen",
      "id": 15792
  },
  {
      "name": "britanniacc",
      "id": 116414
  },
  {
      "name": "britishuniversities",
      "id": 128076
  },
  {
      "name": "britishvirginislands",
      "id": 105457
  },
  {
      "name": "brnocc",
      "id": 124842
  },
  {
      "name": "brnoraiders",
      "id": 116097
  },
  {
      "name": "brnorangers",
      "id": 116096
  },
  {
      "name": "brnoraptors",
      "id": 116094
  },
  {
      "name": "brothergas",
      "id": 122729
  },
  {
      "name": "brothersunion",
      "id": 23718
  },
  {
      "name": "brothersxiportugal",
      "id": 123981
  },
  {
      "name": "bruneidarussalam",
      "id": 120783
  },
  {
      "name": "bruneiunder-19s",
      "id": 79657
  },
  {
      "name": "bscrehberge",
      "id": 116410
  },
  {
      "name": "bsvbritannia",
      "id": 125673
  },
  {
      "name": "bucharestgladiators",
      "id": 120573
  },
  {
      "name": "bucharestsuperkings",
      "id": 127858
  },
  {
      "name": "bucharestzalmi",
      "id": 127859
  },
  {
      "name": "buckinghamshire",
      "id": 7528
  },
  {
      "name": "buckinghamshirewomen",
      "id": 19217
  },
  {
      "name": "budcc",
      "id": 127625
  },
  {
      "name": "budapestblinders",
      "id": 120424
  },
  {
      "name": "budapestkings",
      "id": 127909
  },
  {
      "name": "budejovicebarracudascc",
      "id": 116050
  },
  {
      "name": "buffaloblaster",
      "id": 116372
  },
  {
      "name": "buffalogladiators",
      "id": 119747
  },
  {
      "name": "bugibbablasters",
      "id": 122260
  },
  {
      "name": "bukhatirxi",
      "id": 122730
  },
  {
      "name": "bukitjalilsportsschool",
      "id": 124658
  },
  {
      "name": "bulawayoathleticclub",
      "id": 126097
  },
  {
      "name": "bulawayobraves",
      "id": 127923
  },
  {
      "name": "bulgaria",
      "id": 69632
  },
  {
      "name": "bullsxi",
      "id": 116990
  },
  {
      "name": "burdwanblues",
      "id": 122388
  },
  {
      "name": "burgherrecreationclub",
      "id": 54749
  },
  {
      "name": "burkinafino",
      "id": 120785
  },
  {
      "name": "burmaunder-19s",
      "id": 79666
  },
  {
      "name": "burundi",
      "id": 120787
  },
  {
      "name": "businessmanagementschool",
      "id": 38274
  },
  {
      "name": "bustacupxi",
      "id": 128104
  },
  {
      "name": "butwalblasters",
      "id": 114083
  },
  {
      "name": "byron",
      "id": 127656
  },
  {
      "name": "clennox'sxi",
      "id": 3110
  },
  {
      "name": "cag",
      "id": 127647
  },
  {
      "name": "calcuttacustomsclub",
      "id": 117053
  },
  {
      "name": "caldracclub",
      "id": 124634
  },
  {
      "name": "californiaknights",
      "id": 127959
  },
  {
      "name": "calpegiants",
      "id": 123001
  },
  {
      "name": "cambodia",
      "id": 120789
  },
  {
      "name": "cambodiawomen",
      "id": 127616
  },
  {
      "name": "cambridgecricketclub",
      "id": 3944
  },
  {
      "name": "cambridgemccu",
      "id": 9792
  },
  {
      "name": "cambridgetownandcountyclub",
      "id": 5617
  },
  {
      "name": "cambridgetownxi",
      "id": 4806
  },
  {
      "name": "cambridgeunionclub",
      "id": 4499
  },
  {
      "name": "cambridgeuniversity",
      "id": 3945
  },
  {
      "name": "cambridgeuniversitywomen",
      "id": 19938
  },
  {
      "name": "cambridgeshire",
      "id": 8915
  },
  {
      "name": "cambridgeshireandhuntingdonshirewomen",
      "id": 19250
  },
  {
      "name": "cameroon",
      "id": 120791
  },
  {
      "name": "cameroonwomen",
      "id": 121527
  },
  {
      "name": "canada",
      "id": 6791
  },
  {
      "name": "canadaover-50s",
      "id": 114679
  },
  {
      "name": "canadaunder-19s",
      "id": 1119
  },
  {
      "name": "canadawomen",
      "id": 41222
  },
  {
      "name": "canoesprint",
      "id": 121015
  },
  {
      "name": "canterburya",
      "id": 38083
  },
  {
      "name": "canterburykings",
      "id": 13223
  },
  {
      "name": "canterburymagicians",
      "id": 15332
  },
  {
      "name": "canterburyunder-21swomen",
      "id": 38047
  },
  {
      "name": "cantu",
      "id": 125160
  },
  {
      "name": "capecobras",
      "id": 12330
  },
  {
      "name": "capetownblitz",
      "id": 111907
  },
  {
      "name": "capetownknightriders",
      "id": 104937
  },
  {
      "name": "capetownsamparmy",
      "id": 127924
  },
  {
      "name": "capeverde",
      "id": 120793
  },
  {
      "name": "capricorncommanders",
      "id": 16163
  },
  {
      "name": "captainblagrave'sxi",
      "id": 3708
  },
  {
      "name": "cardiffmccu",
      "id": 9804
  },
  {
      "name": "caribbeerxi",
      "id": 128098
  },
  {
      "name": "carlton",
      "id": 123264
  },
  {
      "name": "carolinasmashers",
      "id": 127875
  },
  {
      "name": "casilina",
      "id": 128024
  },
  {
      "name": "catalunya",
      "id": 113423
  },
  {
      "name": "catalunyatigerscc",
      "id": 116802
  },
  {
      "name": "caymanislands",
      "id": 19688
  },
  {
      "name": "caymanislandswomen",
      "id": 69553
  },
  {
      "name": "cbcc",
      "id": 127738
  },
  {
      "name": "cecc-b",
      "id": 128055
  },
  {
      "name": "centralafricanrepublic",
      "id": 120795
  },
  {
      "name": "centralcastries",
      "id": 116003
  },
  {
      "name": "centraldistrictsa",
      "id": 38080
  },
  {
      "name": "centraldistrictsunder-21swomen",
      "id": 38044
  },
  {
      "name": "centraleastregion",
      "id": 31063
  },
  {
      "name": "centralexcise&customs",
      "id": 71777
  },
  {
      "name": "centralhinds",
      "id": 15331
  },
  {
      "name": "centralprovincewomen",
      "id": 42565
  },
  {
      "name": "centralpunjab(pakistan)",
      "id": 113752
  },
  {
      "name": "centralpunjab2ndxi(pakistan)",
      "id": 117164
  },
  {
      "name": "centralsmashers",
      "id": 116326
  },
  {
      "name": "centralsparks",
      "id": 116532
  },
  {
      "name": "centralsports",
      "id": 124559
  },
  {
      "name": "centralstags",
      "id": 13222
  },
  {
      "name": "centralwestregion",
      "id": 31068
  },
  {
      "name": "centralzone",
      "id": 8228
  },
  {
      "name": "centralzone",
      "id": 126053
  },
  {
      "name": "centralzone(bangladesh)",
      "id": 12445
  },
  {
      "name": "centralzonewomen",
      "id": 126782
  },
  {
      "name": "centurionsunited",
      "id": 128056
  },
  {
      "name": "ceylincoexpresscc",
      "id": 126304
  },
  {
      "name": "cfxacademy",
      "id": 128107
  },
  {
      "name": "chad",
      "id": 120797
  },
  {
      "name": "challenger",
      "id": 122691
  },
  {
      "name": "challengers",
      "id": 126036
  },
  {
      "name": "chamoliprincesswomen",
      "id": 128084
  },
  {
      "name": "champagnereefdivers",
      "id": 124769
  },
  {
      "name": "championsxi",
      "id": 116894
  },
  {
      "name": "chandanacricketclub",
      "id": 118330
  },
  {
      "name": "chandigarh",
      "id": 113656
  },
  {
      "name": "chandigarhchamps",
      "id": 127697
  },
  {
      "name": "chandigarhwomen",
      "id": 124339
  },
  {
      "name": "chandigarhwomencc",
      "id": 128048
  },
  {
      "name": "chanmarianscricketclub",
      "id": 124256
  },
  {
      "name": "chargers",
      "id": 127791
  },
  {
      "name": "chargers",
      "id": 127598
  },
  {
      "name": "chargerscc",
      "id": 127752
  },
  {
      "name": "chargersxi",
      "id": 116892
  },
  {
      "name": "charityccwomen",
      "id": 127677
  },
  {
      "name": "charliebears",
      "id": 119955
  },
  {
      "name": "chattogramchallengers",
      "id": 14091
  },
  {
      "name": "chaudierpooldiamondswomen",
      "id": 127247
  },
  {
      "name": "chemplast",
      "id": 71799
  },
  {
      "name": "chengalpattu",
      "id": 127408
  },
  {
      "name": "chennaichallengers",
      "id": 115474
  },
  {
      "name": "chennaifireboys",
      "id": 128057
  },
  {
      "name": "chennaisuperkings",
      "id": 610
  },
  {
      "name": "chepauksupergillies",
      "id": 89955
  },
  {
      "name": "chertsey",
      "id": 2224
  },
  {
      "name": "cheshirewomen",
      "id": 19208
  },
  {
      "name": "chhatrapatisambhajikings",
      "id": 127854
  },
  {
      "name": "chhattisgarh",
      "id": 90075
  },
  {
      "name": "chhattisgarhblue",
      "id": 128113
  },
  {
      "name": "chhattisgarhbluewomen",
      "id": 128046
  },
  {
      "name": "chhattisgarhcc",
      "id": 128043
  },
  {
      "name": "chhattisgarhred",
      "id": 128112
  },
  {
      "name": "chhattisgarhredwomen",
      "id": 128047
  },
  {
      "name": "chhattisgarhwomen",
      "id": 127557
  },
  {
      "name": "chhindwaralions",
      "id": 126958
  },
  {
      "name": "chhingavengcricketclub",
      "id": 124258
  },
  {
      "name": "chiayiswingers",
      "id": 115488
  },
  {
      "name": "chibasharks",
      "id": 125970
  },
  {
      "name": "chicagoblasters",
      "id": 125563
  },
  {
      "name": "chicagokingsmen",
      "id": 127964
  },
  {
      "name": "chicagotigers",
      "id": 125610
  },
  {
      "name": "chilawmarianscricketclub",
      "id": 12073
  },
  {
      "name": "chile",
      "id": 120799
  },
  {
      "name": "chillowwarriors",
      "id": 116013
  },
  {
      "name": "china",
      "id": 15697
  },
  {
      "name": "chinaunder-19s",
      "id": 79652
  },
  {
      "name": "chinawomen",
      "id": 14618
  },
  {
      "name": "chinesetaipei",
      "id": 120801
  },
  {
      "name": "chinnamastalions",
      "id": 127865
  },
  {
      "name": "chiplunstrikers",
      "id": 128058
  },
  {
      "name": "chittagongdivision",
      "id": 11293
  },
  {
      "name": "chittagongdivisionunder-14s",
      "id": 63101
  },
  {
      "name": "chittagongdivisionunder-18s",
      "id": 63192
  },
  {
      "name": "chittagongkings",
      "id": 127834
  },
  {
      "name": "chittagongkings",
      "id": 65162
  },
  {
      "name": "chitwanrhinos",
      "id": 114089
  },
  {
      "name": "chitwanrhinoswomen",
      "id": 113782
  },
  {
      "name": "chitwantigers",
      "id": 112085
  },
  {
      "name": "choiseulclaypots",
      "id": 116004
  },
  {
      "name": "chuchuralions",
      "id": 127805
  },
  {
      "name": "chuichallengers",
      "id": 116376
  },
  {
      "name": "chuiriders",
      "id": 119751
  },
  {
      "name": "cinnamonpacers",
      "id": 120151
  },
  {
      "name": "cityclub",
      "id": 123618
  },
  {
      "name": "citycricketclub",
      "id": 123565
  },
  {
      "name": "citycyclones",
      "id": 125170
  },
  {
      "name": "citykaitak",
      "id": 90788
  },
  {
      "name": "citylions",
      "id": 118131
  },
  {
      "name": "citynazimxi",
      "id": 128097
  },
  {
      "name": "citypalacetigers",
      "id": 125080
  },
  {
      "name": "cividate",
      "id": 119032
  },
  {
      "name": "ciyms",
      "id": 125848
  },
  {
      "name": "clarioneagles",
      "id": 127885
  },
  {
      "name": "clarkeroadunited",
      "id": 124561
  },
  {
      "name": "classiccricketclub",
      "id": 116218
  },
  {
      "name": "clovechallengers",
      "id": 120153
  },
  {
      "name": "club71kriketti",
      "id": 115895
  },
  {
      "name": "clubtriranga",
      "id": 123444
  },
  {
      "name": "cluj",
      "id": 113431
  },
  {
      "name": "clujcricketclub",
      "id": 116709
  },
  {
      "name": "coastdolphins",
      "id": 125727
  },
  {
      "name": "coastpekee",
      "id": 69863
  },
  {
      "name": "coastalriders",
      "id": 125257
  },
  {
      "name": "cobracricketclub",
      "id": 116470
  },
  {
      "name": "cobrascubs",
      "id": 15423
  },
  {
      "name": "cochinhurricanes",
      "id": 127776
  },
  {
      "name": "cocricocavaliers",
      "id": 123297
  },
  {
      "name": "coimbraknights",
      "id": 118982
  },
  {
      "name": "colattachocolates",
      "id": 123841
  },
  {
      "name": "collazebakehouse",
      "id": 127844
  },
  {
      "name": "colombia",
      "id": 120803
  },
  {
      "name": "colombo",
      "id": 111245
  },
  {
      "name": "colombocommandos",
      "id": 14441
  },
  {
      "name": "colombocricketclub",
      "id": 12053
  },
  {
      "name": "colombodistrict",
      "id": 108064
  },
  {
      "name": "colombostrikers",
      "id": 117008
  },
  {
      "name": "colombounder-19s",
      "id": 113399
  },
  {
      "name": "colonelbyng'sxi",
      "id": 3709
  },
  {
      "name": "coltscricketclub",
      "id": 12066
  },
  {
      "name": "coltscricketclubwomen",
      "id": 30617
  },
  {
      "name": "combinedcampusesandcolleges",
      "id": 13311
  },
  {
      "name": "combineddistricts",
      "id": 127719
  },
  {
      "name": "combinedeasterns-northernsxi",
      "id": 128090
  },
  {
      "name": "combinedgauteng-northwestxi",
      "id": 128089
  },
  {
      "name": "combinedgirlsschools",
      "id": 15615
  },
  {
      "name": "combinednswandactxi",
      "id": 126887
  },
  {
      "name": "combinedprovincewomen",
      "id": 42561
  },
  {
      "name": "combinedprovinces",
      "id": 107184
  },
  {
      "name": "combinedschools",
      "id": 127363
  },
  {
      "name": "combineduniversities",
      "id": 6997
  },
  {
      "name": "comillavictorians",
      "id": 114137
  },
  {
      "name": "commonwealthbankcricketacademy",
      "id": 128101
  },
  {
      "name": "comoros",
      "id": 120805
  },
  {
      "name": "comptrollerandauditorgeneral",
      "id": 71781
  },
  {
      "name": "comsatsislamabad",
      "id": 30690
  },
  {
      "name": "congo",
      "id": 120808
  },
  {
      "name": "conquerorswomen",
      "id": 127028
  },
  {
      "name": "cookislands",
      "id": 120810
  },
  {
      "name": "cookislandswomen",
      "id": 128011
  },
  {
      "name": "coolboys",
      "id": 126681
  },
  {
      "name": "corkharlequins",
      "id": 125847
  },
  {
      "name": "cornwall",
      "id": 8927
  },
  {
      "name": "cornwallwarriors",
      "id": 124337
  },
  {
      "name": "cornwallwomen",
      "id": 19233
  },
  {
      "name": "coronations",
      "id": 117145
  },
  {
      "name": "cossonaycc",
      "id": 116053
  },
  {
      "name": "costadelsol",
      "id": 122028
  },
  {
      "name": "costarica",
      "id": 120812
  },
  {
      "name": "costaricawomen",
      "id": 127619
  },
  {
      "name": "cotedlvorie",
      "id": 120814
  },
  {
      "name": "countyselectxi",
      "id": 115945
  },
  {
      "name": "courtsgladiators",
      "id": 113768
  },
  {
      "name": "cricketassociationofbengalunder-17s",
      "id": 16422
  },
  {
      "name": "cricketaustraliachairmansxi",
      "id": 105206
  },
  {
      "name": "cricketaustraliainvitationxi",
      "id": 107765
  },
  {
      "name": "cricketaustraliawomen'sxi",
      "id": 108596
  },
  {
      "name": "cricketaustraliaxi",
      "id": 12519
  },
  {
      "name": "cricketclubofdibrugarh",
      "id": 127693
  },
  {
      "name": "cricketclubofindia",
      "id": 31093
  },
  {
      "name": "cricketcoachingschool",
      "id": 35086
  },
  {
      "name": "cricketsouthafricainvitationxi",
      "id": 90704
  },
  {
      "name": "cricketstars",
      "id": 116061
  },
  {
      "name": "cricketstars",
      "id": 118523
  },
  {
      "name": "cricketercc",
      "id": 119317
  },
  {
      "name": "croatia",
      "id": 117273
  },
  {
      "name": "croatia",
      "id": 69730
  },
  {
      "name": "csniwomen",
      "id": 125844
  },
  {
      "name": "cssgroup",
      "id": 127662
  },
  {
      "name": "cuba",
      "id": 105452
  },
  {
      "name": "cumberland",
      "id": 7544
  },
  {
      "name": "cumbriawomen",
      "id": 19318
  },
  {
      "name": "cumillawarriors",
      "id": 14094
  },
  {
      "name": "cwibteam",
      "id": 111359
  },
  {
      "name": "cycattariya",
      "id": 112260
  },
  {
      "name": "cyclingtrack",
      "id": 121027
  },
  {
      "name": "cyprus",
      "id": 69750
  },
  {
      "name": "cypruseaglesctl",
      "id": 116487
  },
  {
      "name": "cyprusmoufflonscc",
      "id": 116185
  },
  {
      "name": "cyprussuperkings",
      "id": 127758
  },
  {
      "name": "czechrepublic",
      "id": 81086
  },
  {
      "name": "dbjaincollege",
      "id": 127559
  },
  {
      "name": "dharrisxi",
      "id": 3035
  },
  {
      "name": "d.a.vcollege(chandigarh)",
      "id": 66921
  },
  {
      "name": "dallasallstar",
      "id": 127902
  },
  {
      "name": "dallasgiants",
      "id": 127978
  },
  {
      "name": "dallasmustangs",
      "id": 125229
  },
  {
      "name": "dambulla",
      "id": 111247
  },
  {
      "name": "dambullaaura",
      "id": 117012
  },
  {
      "name": "dambullaunder-19s",
      "id": 113400
  },
  {
      "name": "danubelions",
      "id": 16658
  },
  {
      "name": "daredevildakshindinajpur",
      "id": 122301
  },
  {
      "name": "daredervilescricketfaridabad",
      "id": 116217
  },
  {
      "name": "darkviewexplorers",
      "id": 115768
  },
  {
      "name": "darmstadtcc",
      "id": 116769
  },
  {
      "name": "darsaittitans",
      "id": 122624
  },
  {
      "name": "darwincricket",
      "id": 115888
  },
  {
      "name": "darwincricketclub",
      "id": 115892
  },
  {
      "name": "dataulipanther",
      "id": 115282
  },
  {
      "name": "dchawks",
      "id": 125546
  },
  {
      "name": "dcaalappuzha",
      "id": 127725
  },
  {
      "name": "dcaeranakulam",
      "id": 127727
  },
  {
      "name": "dcaidukki",
      "id": 127734
  },
  {
      "name": "dcakannur",
      "id": 127718
  },
  {
      "name": "dcakazaragode",
      "id": 127728
  },
  {
      "name": "dcakollam",
      "id": 127721
  },
  {
      "name": "dcakottayam",
      "id": 127729
  },
  {
      "name": "dcakozhikode",
      "id": 127722
  },
  {
      "name": "dcamalappuram",
      "id": 127730
  },
  {
      "name": "dcapalakkad",
      "id": 127731
  },
  {
      "name": "dcapathanamthitta",
      "id": 127726
  },
  {
      "name": "dcatrichur",
      "id": 127720
  },
  {
      "name": "dcatrivandrum",
      "id": 127732
  },
  {
      "name": "dcawayanad",
      "id": 127733
  },
  {
      "name": "dccstarlets",
      "id": 123842
  },
  {
      "name": "debarawewacentralcollege",
      "id": 15530
  },
  {
      "name": "debrecenvikings",
      "id": 124991
  },
  {
      "name": "deccan",
      "id": 124725
  },
  {
      "name": "deccanchargers",
      "id": 68312
  },
  {
      "name": "deccangladiators",
      "id": 113851
  },
  {
      "name": "defentassportingclub",
      "id": 116949
  },
  {
      "name": "dehradundabangs",
      "id": 127881
  },
  {
      "name": "dehradunqueenwomen",
      "id": 128081
  },
  {
      "name": "dekathlon",
      "id": 121917
  },
  {
      "name": "delhi",
      "id": 12995
  },
  {
      "name": "delhibulls",
      "id": 115475
  },
  {
      "name": "delhibulls",
      "id": 111999
  },
  {
      "name": "delhicapitals",
      "id": 612
  },
  {
      "name": "delhicapitalswomen",
      "id": 127612
  },
  {
      "name": "delhiu-19",
      "id": 126541
  },
  {
      "name": "delhiwomen",
      "id": 15988
  },
  {
      "name": "denmark",
      "id": 9125
  },
  {
      "name": "denmarkunder-19s",
      "id": 42405
  },
  {
      "name": "denmarkwomen",
      "id": 124850
  },
  {
      "name": "dennerysegmentrisingstars",
      "id": 124582
  },
  {
      "name": "deramuradjamaliibexes",
      "id": 24670
  },
  {
      "name": "deramuradjamaliregion",
      "id": 13606
  },
  {
      "name": "derbyshire",
      "id": 104949
  },
  {
      "name": "derbyshire2ndxi",
      "id": 18490
  },
  {
      "name": "derbyshirewomen",
      "id": 19204
  },
  {
      "name": "desertblaze",
      "id": 125168
  },
  {
      "name": "desertraiders",
      "id": 126291
  },
  {
      "name": "desertriders",
      "id": 113966
  },
  {
      "name": "desertspartans",
      "id": 114912
  },
  {
      "name": "desertvipers",
      "id": 127173
  },
  {
      "name": "devapathirajacollege",
      "id": 27009
  },
  {
      "name": "devon",
      "id": 7539
  },
  {
      "name": "devonwomen",
      "id": 19230
  },
  {
      "name": "dgvaishnav",
      "id": 127591
  },
  {
      "name": "dhakadivision",
      "id": 11287
  },
  {
      "name": "dhakadivisionnorthunder-14s",
      "id": 63083
  },
  {
      "name": "dhakadivisionnorthunder-18s",
      "id": 63217
  },
  {
      "name": "dhakadivisionsouthunder-14s",
      "id": 63109
  },
  {
      "name": "dhakadivisionsouthunder-18s",
      "id": 63212
  },
  {
      "name": "dhakadominators",
      "id": 14093
  },
  {
      "name": "dhakagladiators",
      "id": 65149
  },
  {
      "name": "dhakaleopards",
      "id": 127748
  },
  {
      "name": "dhakametrounder-14s",
      "id": 63089
  },
  {
      "name": "dhakametrounder-18s",
      "id": 63194
  },
  {
      "name": "dhakametropolis",
      "id": 11290
  },
  {
      "name": "dhalaiwarriorswomen",
      "id": 127261
  },
  {
      "name": "dhanbaddaffodilswomen",
      "id": 118151
  },
  {
      "name": "dhanbaddynamos",
      "id": 116736
  },
  {
      "name": "dhangadhistars",
      "id": 112262
  },
  {
      "name": "dhansiridasherswomen",
      "id": 123286
  },
  {
      "name": "dharbhangadiamonds",
      "id": 118643
  },
  {
      "name": "dharmarajacollege",
      "id": 15520
  },
  {
      "name": "dharmashokacollege",
      "id": 38193
  },
  {
      "name": "dhlcricketclub",
      "id": 122357
  },
  {
      "name": "dhruvcricketacademy",
      "id": 126930
  },
  {
      "name": "diamondswomen",
      "id": 124966
  },
  {
      "name": "diasqualittlesaiwancricketclub",
      "id": 15164
  },
  {
      "name": "digaruviranganaswomen",
      "id": 123281
  },
  {
      "name": "dihingpatkairiders",
      "id": 121580
  },
  {
      "name": "dikhoutigresswomen",
      "id": 123287
  },
  {
      "name": "dindiguldragons",
      "id": 89960
  },
  {
      "name": "djibouti",
      "id": 120818
  },
  {
      "name": "djksgsolingen",
      "id": 119944
  },
  {
      "name": "djurgardensif",
      "id": 115840
  },
  {
      "name": "djwkinnaird'sxi",
      "id": 3772
  },
  {
      "name": "dksuperkings",
      "id": 127650
  },
  {
      "name": "dolphins",
      "id": 12342
  },
  {
      "name": "dolphinsacademy",
      "id": 18862
  },
  {
      "name": "dolphinscubs",
      "id": 15411
  },
  {
      "name": "dominica",
      "id": 105458
  },
  {
      "name": "dominicawomen",
      "id": 30642
  },
  {
      "name": "dominicanrepublic",
      "id": 120820
  },
  {
      "name": "donaustadt",
      "id": 125074
  },
  {
      "name": "dorset",
      "id": 8895
  },
  {
      "name": "dorsetwomen",
      "id": 19218
  },
  {
      "name": "dosticc",
      "id": 120158
  },
  {
      "name": "drcongo",
      "id": 120822
  },
  {
      "name": "drdypatilsportsacademy",
      "id": 67060
  },
  {
      "name": "dragonswomen",
      "id": 124475
  },
  {
      "name": "dreux",
      "id": 113425
  },
  {
      "name": "dssenanayakecollege",
      "id": 15539
  },
  {
      "name": "dubai",
      "id": 116224
  },
  {
      "name": "dubaiaviators",
      "id": 123852
  },
  {
      "name": "dubaicapitals",
      "id": 127168
  },
  {
      "name": "dubaidaredevils",
      "id": 125818
  },
  {
      "name": "dubaigymkhana",
      "id": 125821
  },
  {
      "name": "dubaiwanderers",
      "id": 127709
  },
  {
      "name": "dublinchiefs",
      "id": 113410
  },
  {
      "name": "duchessofnorfolk'sinvitationxi",
      "id": 9645
  },
  {
      "name": "duchesses",
      "id": 117144
  },
  {
      "name": "dukeofdorset'sxi",
      "id": 2282
  },
  {
      "name": "dumkadaisieswomen",
      "id": 118152
  },
  {
      "name": "dumkadaredevils",
      "id": 116735
  },
  {
      "name": "dunabogdanycricketclub",
      "id": 116469
  },
  {
      "name": "durbanheat",
      "id": 111911
  },
  {
      "name": "durbanqalandars",
      "id": 127925
  },
  {
      "name": "durbanqalanders",
      "id": 104941
  },
  {
      "name": "durbansupergiants",
      "id": 127099
  },
  {
      "name": "durgapurdazzlers",
      "id": 121463
  },
  {
      "name": "durham",
      "id": 7548
  },
  {
      "name": "durham2ndxi",
      "id": 18450
  },
  {
      "name": "durhammccu",
      "id": 9798
  },
  {
      "name": "durhamuniversity",
      "id": 43209
  },
  {
      "name": "durhamwomen",
      "id": 19270
  },
  {
      "name": "durontorajshahi",
      "id": 107589
  },
  {
      "name": "dussledorfblackcaps",
      "id": 119937
  },
  {
      "name": "dvultimatexi",
      "id": 127910
  },
  {
      "name": "dypatilgroupa",
      "id": 127644
  },
  {
      "name": "dypatilgroupb",
      "id": 127645
  },
  {
      "name": "ebligh'sxi",
      "id": 2822
  },
  {
      "name": "eaglenashiktitans",
      "id": 127853
  },
  {
      "name": "eaglethanestrikers",
      "id": 113019
  },
  {
      "name": "eagles",
      "id": 105767
  },
  {
      "name": "eagles",
      "id": 124742
  },
  {
      "name": "eagles",
      "id": 115331
  },
  {
      "name": "eagles",
      "id": 116200
  },
  {
      "name": "earlofdarnley'sxi",
      "id": 2613
  },
  {
      "name": "earlofwinchilsea'sxi",
      "id": 2614
  },
  {
      "name": "east",
      "id": 122171
  },
  {
      "name": "eastafrica",
      "id": 9131
  },
  {
      "name": "eastbayblazers",
      "id": 127975
  },
  {
      "name": "eastbengalclub",
      "id": 117057
  },
  {
      "name": "eastbengalclubwomen",
      "id": 123090
  },
  {
      "name": "eastcentralrailway(india)",
      "id": 126929
  },
  {
      "name": "eastkantosunrisers",
      "id": 116250
  },
  {
      "name": "eastkent",
      "id": 2317
  },
  {
      "name": "eastzone",
      "id": 8229
  },
  {
      "name": "eastzone(bangladesh)",
      "id": 12444
  },
  {
      "name": "eastzonewomen",
      "id": 126780
  },
  {
      "name": "easternprovince",
      "id": 12703
  },
  {
      "name": "easternprovinceinvitationxi",
      "id": 75104
  },
  {
      "name": "easternprovinceunder-13s",
      "id": 14904
  },
  {
      "name": "easternprovinceunder-15s",
      "id": 37875
  },
  {
      "name": "easternprovinceunder-17s",
      "id": 15033
  },
  {
      "name": "easternprovinceunder-19s",
      "id": 16730
  },
  {
      "name": "easternprovincewomen",
      "id": 15239
  },
  {
      "name": "easternwaves",
      "id": 127927
  },
  {
      "name": "easterns",
      "id": 12702
  },
  {
      "name": "easternsunder-13s",
      "id": 14901
  },
  {
      "name": "easternsunder-15s",
      "id": 37886
  },
  {
      "name": "easternsunder-17s",
      "id": 15028
  },
  {
      "name": "easternsunder-19s",
      "id": 16735
  },
  {
      "name": "easternswomen",
      "id": 15237
  },
  {
      "name": "ecovertfmasians",
      "id": 127835
  },
  {
      "name": "ecovertfm",
      "id": 127601
  },
  {
      "name": "ecuador",
      "id": 120823
  },
  {
      "name": "edexknights",
      "id": 126621
  },
  {
      "name": "edinburghrocks",
      "id": 113411
  },
  {
      "name": "edmontonroyals",
      "id": 111356
  },
  {
      "name": "eestitigers",
      "id": 116232
  },
  {
      "name": "egmorantsxi",
      "id": 3021
  },
  {
      "name": "egypt",
      "id": 120825
  },
  {
      "name": "ehbuddsxi",
      "id": 3874
  },
  {
      "name": "elsalvador",
      "id": 120827
  },
  {
      "name": "elbetigers",
      "id": 127982
  },
  {
      "name": "elitefleetcarrental",
      "id": 127833
  },
  {
      "name": "eliteinternationalcricketacademy",
      "id": 18561
  },
  {
      "name": "emburhinos",
      "id": 125729
  },
  {
      "name": "emclxi",
      "id": 124108
  },
  {
      "name": "emergingcapecobras",
      "id": 107490
  },
  {
      "name": "emersoncollegemultan",
      "id": 30692
  },
  {
      "name": "emiratesblues",
      "id": 73292
  },
  {
      "name": "emiratesnbdcktclub",
      "id": 126624
  },
  {
      "name": "emiratesred",
      "id": 127816
  },
  {
      "name": "empireblades",
      "id": 116308
  },
  {
      "name": "empirecc",
      "id": 115872
  },
  {
      "name": "empiregroup",
      "id": 116098
  },
  {
      "name": "empirenation",
      "id": 127364
  },
  {
      "name": "empirestatetitans",
      "id": 125414
  },
  {
      "name": "england",
      "id": 490
  },
  {
      "name": "englandawomen",
      "id": 122919
  },
  {
      "name": "englandacademywomen",
      "id": 27801
  },
  {
      "name": "englandcricketboardxi",
      "id": 111339
  },
  {
      "name": "englanddevelopmentprogrammeunder-19s",
      "id": 42704
  },
  {
      "name": "englanddevelopmentsquadwomen",
      "id": 43237
  },
  {
      "name": "englandlegends",
      "id": 118244
  },
  {
      "name": "englandlions",
      "id": 10051
  },
  {
      "name": "englandover-50s",
      "id": 114683
  },
  {
      "name": "englandperformanceprogramme",
      "id": 67061
  },
  {
      "name": "englandunder-19s",
      "id": 1038
  },
  {
      "name": "englandunder-19swomen",
      "id": 70547
  },
  {
      "name": "englandwomen",
      "id": 9534
  },
  {
      "name": "englandwomendevelopment",
      "id": 128010
  },
  {
      "name": "englandwomenunder-19s",
      "id": 127123
  },
  {
      "name": "englandxi",
      "id": 105217
  },
  {
      "name": "england-v",
      "id": 115471
  },
  {
      "name": "entainers",
      "id": 127594
  },
  {
      "name": "epsom",
      "id": 3774
  },
  {
      "name": "equatorialguinea",
      "id": 120829
  },
  {
      "name": "eranakulamcricketclub",
      "id": 121298
  },
  {
      "name": "eritrea",
      "id": 120831
  },
  {
      "name": "erode",
      "id": 127339
  },
  {
      "name": "essex",
      "id": 104950
  },
  {
      "name": "essex2ndxi",
      "id": 18426
  },
  {
      "name": "essexwomen",
      "id": 19231
  },
  {
      "name": "essexxi",
      "id": 2558
  },
  {
      "name": "estonia",
      "id": 69630
  },
  {
      "name": "estoniawomen",
      "id": 127811
  },
  {
      "name": "eswatini",
      "id": 120833
  },
  {
      "name": "eswatiniwomen",
      "id": 127620
  },
  {
      "name": "ethiopia",
      "id": 120835
  },
  {
      "name": "etisalatcricketclub",
      "id": 27133
  },
  {
      "name": "etoncollege",
      "id": 29731
  },
  {
      "name": "etoshawildcats",
      "id": 128026
  },
  {
      "name": "europeanuniversityofbangladesh",
      "id": 16672
  },
  {
      "name": "eventyoddhaazentertainment",
      "id": 124107
  },
  {
      "name": "eventon",
      "id": 124111
  },
  {
      "name": "everest",
      "id": 127759
  },
  {
      "name": "evergreencricketclub",
      "id": 116273
  },
  {
      "name": "excelsior20",
      "id": 116728
  },
  {
      "name": "exilescc",
      "id": 116419
  },
  {
      "name": "expertdhangadi",
      "id": 114087
  },
  {
      "name": "expressndovus",
      "id": 42496
  },
  {
      "name": "fairdealdefenders",
      "id": 123141
  },
  {
      "name": "fairbreakwomenxi",
      "id": 125888
  },
  {
      "name": "fairmont",
      "id": 124105
  },
  {
      "name": "faisalabad",
      "id": 17827
  },
  {
      "name": "faisalabadandrawalpindi",
      "id": 128032
  },
  {
      "name": "faisalabadregion",
      "id": 13647
  },
  {
      "name": "falco",
      "id": 116805
  },
  {
      "name": "falconhunters",
      "id": 113968
  },
  {
      "name": "falconscc",
      "id": 127739
  },
  {
      "name": "falconscc",
      "id": 127740
  },
  {
      "name": "falconswomen",
      "id": 124529
  },
  {
      "name": "farwestunited",
      "id": 127230
  },
  {
      "name": "farmers",
      "id": 123418
  },
  {
      "name": "farrukhabadsikandar",
      "id": 127639
  },
  {
      "name": "faryabprovince",
      "id": 116454
  },
  {
      "name": "fastbowlers",
      "id": 5848
  },
  {
      "name": "fatacheetas",
      "id": 24633
  },
  {
      "name": "fatehcc",
      "id": 116803
  },
  {
      "name": "fatehgarhyodhas",
      "id": 127637
  },
  {
      "name": "fcgermaniabieber",
      "id": 116782
  },
  {
      "name": "fcladbrokesxi",
      "id": 3673
  },
  {
      "name": "fcviktoria",
      "id": 121192
  },
  {
      "name": "fca04darmstadt",
      "id": 116166
  },
  {
      "name": "fcc",
      "id": 127702
  },
  {
      "name": "fccformosans",
      "id": 115487
  },
  {
      "name": "federalareas",
      "id": 11408
  },
  {
      "name": "federalareasleopards",
      "id": 105863
  },
  {
      "name": "federalunited",
      "id": 24130
  },
  {
      "name": "federatedstatesofmicronesia",
      "id": 120837
  },
  {
      "name": "fighter",
      "id": 122690
  },
  {
      "name": "fighterscc",
      "id": 121443
  },
  {
      "name": "fiji",
      "id": 9140
  },
  {
      "name": "fijiunder-19s",
      "id": 1040
  },
  {
      "name": "fijiwomen",
      "id": 127763
  },
  {
      "name": "findorff",
      "id": 113427
  },
  {
      "name": "finland",
      "id": 69731
  },
  {
      "name": "finlandwomen",
      "id": 128002
  },
  {
      "name": "fireoxcc",
      "id": 127741
  },
  {
      "name": "firstabudhabibank",
      "id": 127710
  },
  {
      "name": "firstcontact",
      "id": 120143
  },
  {
      "name": "fishrivereagles",
      "id": 128027
  },
  {
      "name": "flyemirates",
      "id": 127787
  },
  {
      "name": "flyemiratesxi",
      "id": 66825
  },
  {
      "name": "flyingoryx",
      "id": 113964
  },
  {
      "name": "fog-seenigama",
      "id": 27017
  },
  {
      "name": "fog-seenigamaladies",
      "id": 15602
  },
  {
      "name": "footprintdefenders",
      "id": 126626
  },
  {
      "name": "forenomroyals",
      "id": 120689
  },
  {
      "name": "forfarshire",
      "id": 127653
  },
  {
      "name": "forge",
      "id": 121920
  },
  {
      "name": "fortcharlottestrikers",
      "id": 115769
  },
  {
      "name": "fortunebarisal",
      "id": 117033
  },
  {
      "name": "fossum",
      "id": 127654
  },
  {
      "name": "fourfirstchosenwithsevenothers",
      "id": 3675
  },
  {
      "name": "fpcfinnishpakistaniclub",
      "id": 115876
  },
  {
      "name": "france",
      "id": 19824
  },
  {
      "name": "franceunder-19s",
      "id": 81152
  },
  {
      "name": "francewomen",
      "id": 120547
  },
  {
      "name": "frankfurtcricketclub",
      "id": 116163
  },
  {
      "name": "freeforesters",
      "id": 18542
  },
  {
      "name": "freestate",
      "id": 12715
  },
  {
      "name": "freestateunder-13s",
      "id": 14907
  },
  {
      "name": "freestateunder-15s",
      "id": 37890
  },
  {
      "name": "freestateunder-17s",
      "id": 15046
  },
  {
      "name": "freestateunder-19s",
      "id": 16733
  },
  {
      "name": "freestatewomen",
      "id": 15230
  },
  {
      "name": "freedomfightercochin",
      "id": 127938
  },
  {
      "name": "freetown",
      "id": 127365
  },
  {
      "name": "freshtropical",
      "id": 118984
  },
  {
      "name": "friendshipcc",
      "id": 121442
  },
  {
      "name": "ft.lauderdalelions",
      "id": 125366
  },
  {
      "name": "fuchseberlinlions",
      "id": 121189
  },
  {
      "name": "fujairah",
      "id": 116223
  },
  {
      "name": "futuremattress",
      "id": 123839
  },
  {
      "name": "futurestars",
      "id": 126306
  },
  {
      "name": "gforcelions",
      "id": 126679
  },
  {
      "name": "gleycester'sxi",
      "id": 3412
  },
  {
      "name": "glouch'sxi",
      "id": 2904
  },
  {
      "name": "gosbaldeston'sxi",
      "id": 3748
  },
  {
      "name": "g.e.k",
      "id": 121918
  },
  {
      "name": "gabon",
      "id": 120839
  },
  {
      "name": "gahangaqueenswomen",
      "id": 127676
  },
  {
      "name": "galaxygladiatorslantau",
      "id": 90787
  },
  {
      "name": "galfaralmisnad",
      "id": 127742
  },
  {
      "name": "galle",
      "id": 111243
  },
  {
      "name": "gallecricketclub",
      "id": 12078
  },
  {
      "name": "galledistrict",
      "id": 108063
  },
  {
      "name": "galleguardians",
      "id": 14442
  },
  {
      "name": "galletitans",
      "id": 117010
  },
  {
      "name": "galleunder-19s",
      "id": 113402
  },
  {
      "name": "gallioncktclub",
      "id": 126536
  },
  {
      "name": "gambia",
      "id": 120841
  },
  {
      "name": "gamblerssc",
      "id": 125502
  },
  {
      "name": "gamphadistrict",
      "id": 108073
  },
  {
      "name": "gandakiprovince",
      "id": 118015
  },
  {
      "name": "gangawarriors",
      "id": 127641
  },
  {
      "name": "gardenroutebadgers",
      "id": 126261
  },
  {
      "name": "gat",
      "id": 128093
  },
  {
      "name": "gauhatitownclub",
      "id": 127627
  },
  {
      "name": "gauteng",
      "id": 12708
  },
  {
      "name": "gautengunder-13s",
      "id": 14894
  },
  {
      "name": "gautengunder-15s",
      "id": 37877
  },
  {
      "name": "gautengunder-17s",
      "id": 15047
  },
  {
      "name": "gautengunder-19s",
      "id": 16732
  },
  {
      "name": "gautengwomen",
      "id": 15257
  },
  {
      "name": "gayagladiators",
      "id": 118642
  },
  {
      "name": "gazigroupchattogram",
      "id": 117035
  },
  {
      "name": "gazigroupcricketers",
      "id": 86848
  },
  {
      "name": "gekcorfu",
      "id": 123420
  },
  {
      "name": "gemconkhulna",
      "id": 117034
  },
  {
      "name": "geminiarabians",
      "id": 16158
  },
  {
      "name": "gemseducationcc",
      "id": 126560
  },
  {
      "name": "geneva",
      "id": 127957
  },
  {
      "name": "gent",
      "id": 125930
  },
  {
      "name": "gentlemen",
      "id": 3550
  },
  {
      "name": "gentlemenofengland",
      "id": 2561
  },
  {
      "name": "gentlemenofkent",
      "id": 2724
  },
  {
      "name": "gentlemenofnottinghamshire",
      "id": 6135
  },
  {
      "name": "gentlemenofsussex",
      "id": 5770
  },
  {
      "name": "georgia",
      "id": 120843
  },
  {
      "name": "germany",
      "id": 41704
  },
  {
      "name": "germanyunder-19s",
      "id": 81147
  },
  {
      "name": "germanywomen",
      "id": 114382
  },
  {
      "name": "getafe",
      "id": 126190
  },
  {
      "name": "ghana",
      "id": 27319
  },
  {
      "name": "ghanawomen",
      "id": 127714
  },
  {
      "name": "ghaniinstituteofcricket",
      "id": 126691
  },
  {
      "name": "ghubrahgiants",
      "id": 122620
  },
  {
      "name": "giantlegends",
      "id": 116023
  },
  {
      "name": "giantslayers",
      "id": 116065
  },
  {
      "name": "giantst&t",
      "id": 127837
  },
  {
      "name": "giarmata",
      "id": 127860
  },
  {
      "name": "gibraltar",
      "id": 9129
  },
  {
      "name": "gibraltarunder-19s",
      "id": 81141
  },
  {
      "name": "gibraltarwomen",
      "id": 127630
  },
  {
      "name": "gingergenerals",
      "id": 120150
  },
  {
      "name": "gladiators",
      "id": 122704
  },
  {
      "name": "gladiators",
      "id": 126066
  },
  {
      "name": "gladiatorscc",
      "id": 127749
  },
  {
      "name": "glamorgan",
      "id": 7020
  },
  {
      "name": "glamorgan2ndxi",
      "id": 18454
  },
  {
      "name": "glasgowgiants",
      "id": 113409
  },
  {
      "name": "glitztravel",
      "id": 124109
  },
  {
      "name": "globalchamps",
      "id": 128059
  },
  {
      "name": "globalriders",
      "id": 116015
  },
  {
      "name": "globalstars",
      "id": 122364
  },
  {
      "name": "gloucestershire",
      "id": 7017
  },
  {
      "name": "gloucestershire2ndxi",
      "id": 18440
  },
  {
      "name": "gloucestershireacademy",
      "id": 85957
  },
  {
      "name": "gloucestershirewomen",
      "id": 19234
  },
  {
      "name": "goa",
      "id": 12991
  },
  {
      "name": "goaveterans",
      "id": 126877
  },
  {
      "name": "goawomen",
      "id": 16019
  },
  {
      "name": "goawomencc",
      "id": 128049
  },
  {
      "name": "godalming",
      "id": 4119
  },
  {
      "name": "godavarititans",
      "id": 125258
  },
  {
      "name": "gohilwadgladiators",
      "id": 113048
  },
  {
      "name": "golchagymkhana",
      "id": 118326
  },
  {
      "name": "goldcoast",
      "id": 127984
  },
  {
      "name": "goldenstarbonn",
      "id": 125771
  },
  {
      "name": "goldenstategrizzlies",
      "id": 125236
  },
  {
      "name": "goodrichgladiators",
      "id": 127735
  },
  {
      "name": "gorakhpurlions",
      "id": 128005
  },
  {
      "name": "gorbatcricketclub",
      "id": 27128
  },
  {
      "name": "gorkha11",
      "id": 118983
  },
  {
      "name": "gorkhacricketclub",
      "id": 127767
  },
  {
      "name": "goteborgroyals",
      "id": 121148
  },
  {
      "name": "gothenburgcricketclub",
      "id": 116339
  },
  {
      "name": "gourbadshamalda",
      "id": 122377
  },
  {
      "name": "governmentcollegemurree",
      "id": 30686
  },
  {
      "name": "governor-generalxl-women",
      "id": 127537
  },
  {
      "name": "gozo",
      "id": 120362
  },
  {
      "name": "gozozalmi",
      "id": 127596
  },
  {
      "name": "graciacc",
      "id": 116827
  },
  {
      "name": "graemehickxii",
      "id": 113404
  },
  {
      "name": "granadacc",
      "id": 123775
  },
  {
      "name": "grassrootscricketacademy",
      "id": 128021
  },
  {
      "name": "grazcricketacademy",
      "id": 127804
  },
  {
      "name": "greatbritain",
      "id": 120846
  },
  {
      "name": "greatbritaincombineduniversityteam",
      "id": 66934
  },
  {
      "name": "greatzimbabwecricketclub",
      "id": 126069
  },
  {
      "name": "greaterhelsinkicc",
      "id": 115874
  },
  {
      "name": "greaterhelsinkimarkhors",
      "id": 116310
  },
  {
      "name": "greece",
      "id": 69763
  },
  {
      "name": "greecewomen",
      "id": 127973
  },
  {
      "name": "greengramcc",
      "id": 127750
  },
  {
      "name": "greeninvaders",
      "id": 127895
  },
  {
      "name": "grenada",
      "id": 105474
  },
  {
      "name": "grenadawomen",
      "id": 30653
  },
  {
      "name": "grenadinesdivers",
      "id": 115764
  },
  {
      "name": "greycollege",
      "id": 16247
  },
  {
      "name": "greyhighschool",
      "id": 16251
  },
  {
      "name": "griffins",
      "id": 123163
  },
  {
      "name": "griqualandwestunder-13s",
      "id": 14892
  },
  {
      "name": "griqualandwestunder-15s",
      "id": 37868
  },
  {
      "name": "griqualandwestunder-17s",
      "id": 15034
  },
  {
      "name": "griqualandwestunder-19s",
      "id": 16736
  },
  {
      "name": "grosisletcannonblasters",
      "id": 116000
  },
  {
      "name": "guam",
      "id": 120849
  },
  {
      "name": "guam",
      "id": 120851
  },
  {
      "name": "guardians",
      "id": 127074
  },
  {
      "name": "guatemala",
      "id": 120852
  },
  {
      "name": "guernsey",
      "id": 10528
  },
  {
      "name": "guernseyunder-15s",
      "id": 81321
  },
  {
      "name": "guernseyunder-19s",
      "id": 42407
  },
  {
      "name": "guernseywomen",
      "id": 125133
  },
  {
      "name": "guinea",
      "id": 120854
  },
  {
      "name": "guinea-bissau",
      "id": 120856
  },
  {
      "name": "gujarat",
      "id": 13029
  },
  {
      "name": "gujaratcricketassociationxi",
      "id": 72319
  },
  {
      "name": "gujaratcricketclub",
      "id": 128094
  },
  {
      "name": "gujaratgiants",
      "id": 126135
  },
  {
      "name": "gujaratgiantswomen",
      "id": 127613
  },
  {
      "name": "gujaratlions",
      "id": 128040
  },
  {
      "name": "gujaratlions",
      "id": 10062
  },
  {
      "name": "gujaratpresident'sxi",
      "id": 128072
  },
  {
      "name": "gujarattitans",
      "id": 123216
  },
  {
      "name": "gujaratveterans",
      "id": 126882
  },
  {
      "name": "gujaratwomen",
      "id": 15986
  },
  {
      "name": "gujranwalagiants",
      "id": 126348
  },
  {
      "name": "gulbargamystics",
      "id": 125661
  },
  {
      "name": "gulfgiants",
      "id": 127172
  },
  {
      "name": "gurunanakcollege",
      "id": 127592
  },
  {
      "name": "guwahatiavengers",
      "id": 127695
  },
  {
      "name": "guyana",
      "id": 11844
  },
  {
      "name": "guyanaamazonwarriors",
      "id": 18245
  },
  {
      "name": "guyanaamazonwarriorswomen",
      "id": 125863
  },
  {
      "name": "guyanaboardpresident'sxi",
      "id": 128103
  },
  {
      "name": "guyanaharpyeagels",
      "id": 127602
  },
  {
      "name": "guyanapresident'sselectxi",
      "id": 105669
  },
  {
      "name": "guyanaunder-19s",
      "id": 19582
  },
  {
      "name": "guyanawomen",
      "id": 30650
  },
  {
      "name": "gwadarsharks",
      "id": 126353
  },
  {
      "name": "gymhelsinkigymkhana",
      "id": 115867
  },
  {
      "name": "gymkhanaclub",
      "id": 126957
  },
  {
      "name": "gymkhanawomen",
      "id": 127068
  },
  {
      "name": "haagsecc",
      "id": 119878
  },
  {
      "name": "haagsevoetbalcricket",
      "id": 116655
  },
  {
      "name": "habibbanklimited",
      "id": 11409
  },
  {
      "name": "hafnarfjoraurhimmers",
      "id": 116256
  },
  {
      "name": "haidreelions",
      "id": 122148
  },
  {
      "name": "haiti",
      "id": 120858
  },
  {
      "name": "halarheroes",
      "id": 113050
  },
  {
      "name": "hambantotadistrict",
      "id": 108066
  },
  {
      "name": "hambantotatroopers",
      "id": 14438
  },
  {
      "name": "hamiltonmasakadzaxi",
      "id": 38165
  },
  {
      "name": "hammarby",
      "id": 124766
  },
  {
      "name": "hampshire",
      "id": 7047
  },
  {
      "name": "hampshire2ndxi",
      "id": 18447
  },
  {
      "name": "hampshireandkent",
      "id": 2451
  },
  {
      "name": "hampshireandmarylebonecricketclub",
      "id": 2621
  },
  {
      "name": "hampshireandsurrey",
      "id": 2628
  },
  {
      "name": "hampshirewomen",
      "id": 19277
  },
  {
      "name": "hampshirexi",
      "id": 1980
  },
  {
      "name": "hamptonfalcons",
      "id": 127918
  },
  {
      "name": "hapurhurricanses",
      "id": 115837
  },
  {
      "name": "hapurpoliceyodhas",
      "id": 115792
  },
  {
      "name": "harare",
      "id": 115376
  },
  {
      "name": "hararehurricanes",
      "id": 127922
  },
  {
      "name": "haridwarheroes",
      "id": 127879
  },
  {
      "name": "haridwarpaltanwomen",
      "id": 128082
  },
  {
      "name": "harrowschool",
      "id": 29732
  },
  {
      "name": "haryana",
      "id": 12982
  },
  {
      "name": "haryanaunder-19",
      "id": 121870
  },
  {
      "name": "haryanaveterans",
      "id": 126884
  },
  {
      "name": "haryanawomen",
      "id": 15994
  },
  {
      "name": "hasseltcc",
      "id": 116421
  },
  {
      "name": "hattonnationalbank",
      "id": 128023
  },
  {
      "name": "hawamahalcricketclub",
      "id": 118331
  },
  {
      "name": "hawamahalreindeer",
      "id": 125078
  },
  {
      "name": "hawkscc",
      "id": 116800
  },
  {
      "name": "hawksbills",
      "id": 127792
  },
  {
      "name": "hbs",
      "id": 119908
  },
  {
      "name": "hbscraeyenhout",
      "id": 123416
  },
  {
      "name": "hcwoolridge'sxi",
      "id": 3428
  },
  {
      "name": "heatstormers",
      "id": 113969
  },
  {
      "name": "helmandprovince",
      "id": 116448
  },
  {
      "name": "helsingborgsportsclub",
      "id": 116271
  },
  {
      "name": "helsingborgstars",
      "id": 124503
  },
  {
      "name": "helsinkicricketclub",
      "id": 116312
  },
  {
      "name": "helsinkicricketclub",
      "id": 115860
  },
  {
      "name": "helsinkititans",
      "id": 123051
  },
  {
      "name": "hementproperties",
      "id": 124978
  },
  {
      "name": "herefordshire",
      "id": 18592
  },
  {
      "name": "heriot-wattuniversitydubai(uae)",
      "id": 16681
  },
  {
      "name": "heronsports",
      "id": 117536
  },
  {
      "name": "heros",
      "id": 115328
  },
  {
      "name": "hertfordshire",
      "id": 7553
  },
  {
      "name": "hertfordshirewomen",
      "id": 19239
  },
  {
      "name": "highfywarriors",
      "id": 115788
  },
  {
      "name": "highlanders",
      "id": 19765
  },
  {
      "name": "highveldlions",
      "id": 121679
  },
  {
      "name": "hiltoncollege",
      "id": 27232
  },
  {
      "name": "himachalpradesh",
      "id": 12997
  },
  {
      "name": "himachalpradeshcc",
      "id": 128034
  },
  {
      "name": "himachalpradeshcricketassociationxi",
      "id": 16205
  },
  {
      "name": "himachalpradeshwomen",
      "id": 15981
  },
  {
      "name": "himalcc",
      "id": 120513
  },
  {
      "name": "hindmotorheroes",
      "id": 127806
  },
  {
      "name": "hindokushstrikers",
      "id": 124602
  },
  {
      "name": "hindukushstars",
      "id": 125425
  },
  {
      "name": "hiraccsabadell",
      "id": 116804
  },
  {
      "name": "hisingenscc",
      "id": 116138
  },
  {
      "name": "hitmachine",
      "id": 116063
  },
  {
      "name": "hklaranjuezsc",
      "id": 127821
  },
  {
      "name": "hkszstars",
      "id": 123840
  },
  {
      "name": "hobarthurricanes",
      "id": 14212
  },
  {
      "name": "hobarthurricaneswomen",
      "id": 15800
  },
  {
      "name": "hoervolkskool",
      "id": 27234
  },
  {
      "name": "hollywoodmasterblasters",
      "id": 125241
  },
  {
      "name": "homabayeagles",
      "id": 125730
  },
  {
      "name": "homerton",
      "id": 3640
  },
  {
      "name": "honduras",
      "id": 120860
  },
  {
      "name": "hongkong",
      "id": 1544
  },
  {
      "name": "hongkonga",
      "id": 15694
  },
  {
      "name": "hongkongcricketassociationunder-19s",
      "id": 15167
  },
  {
      "name": "hongkongcricketclub",
      "id": 15163
  },
  {
      "name": "hongkongdragons",
      "id": 15695
  },
  {
      "name": "hongkongemergingteam",
      "id": 112045
  },
  {
      "name": "hongkongislandunited",
      "id": 90790
  },
  {
      "name": "hongkongislanders",
      "id": 118770
  },
  {
      "name": "hongkongunder-19s",
      "id": 42212
  },
  {
      "name": "hongkongwomen",
      "id": 26771
  },
  {
      "name": "hooghlyriver",
      "id": 122375
  },
  {
      "name": "hornchurch",
      "id": 2511
  },
  {
      "name": "housebuildingfinancecorporation",
      "id": 8591
  },
  {
      "name": "houstonhurricanes",
      "id": 125448
  },
  {
      "name": "houstonstars",
      "id": 127876
  },
  {
      "name": "howarhdiamonds",
      "id": 122394
  },
  {
      "name": "howrahdiamond",
      "id": 122339
  },
  {
      "name": "hsinchutitans",
      "id": 115484
  },
  {
      "name": "hublitigers",
      "id": 26724
  },
  {
      "name": "hublitigerswomen",
      "id": 125896
  },
  {
      "name": "huddinge",
      "id": 120693
  },
  {
      "name": "hunghomjaguars",
      "id": 90786
  },
  {
      "name": "hungary",
      "id": 120862
  },
  {
      "name": "hurricaneblasters",
      "id": 116020
  },
  {
      "name": "hurricanemasters",
      "id": 114914
  },
  {
      "name": "hurricanes",
      "id": 127743
  },
  {
      "name": "hyderabad(india)",
      "id": 13000
  },
  {
      "name": "hyderabad(india)women",
      "id": 15989
  },
  {
      "name": "hyderabad(pakistan)",
      "id": 106979
  },
  {
      "name": "hyderabad(pakistan)andkarachi",
      "id": 128030
  },
  {
      "name": "hyderabadcc",
      "id": 128035
  },
  {
      "name": "hyderabadcricketassociationxi",
      "id": 128080
  },
  {
      "name": "hyderabaddivisioncricketassociation",
      "id": 11419
  },
  {
      "name": "hyderabadhawks",
      "id": 107936
  },
  {
      "name": "hyderabadhunters",
      "id": 115477
  },
  {
      "name": "hyderabadhunters",
      "id": 126351
  },
  {
      "name": "hyderabadregion",
      "id": 13642
  },
  {
      "name": "hyderabadunder-19",
      "id": 121746
  },
  {
      "name": "hyderabadveterans",
      "id": 126883
  },
  {
      "name": "hyderabadwomen",
      "id": 118300
  },
  {
      "name": "i&mbanknyatis",
      "id": 42486
  },
  {
      "name": "icaberlin",
      "id": 121197
  },
  {
      "name": "icbtcampus(srilanka)",
      "id": 16678
  },
  {
      "name": "iccamericas",
      "id": 13305
  },
  {
      "name": "icccombinedassociateandaffiliatexi",
      "id": 74986
  },
  {
      "name": "icctsmashers",
      "id": 115491
  },
  {
      "name": "iceland",
      "id": 120864
  },
  {
      "name": "idreamkaraikudikaalai",
      "id": 89957
  },
  {
      "name": "idreamtiruppurtamizhans",
      "id": 120609
  },
  {
      "name": "ifirasharks",
      "id": 115772
  },
  {
      "name": "iitmadras",
      "id": 127590
  },
  {
      "name": "ilt20blitzers",
      "id": 128114
  },
  {
      "name": "ilt20braves",
      "id": 128118
  },
  {
      "name": "ilt20dynamos",
      "id": 128116
  },
  {
      "name": "ilt20marvels",
      "id": 128115
  },
  {
      "name": "ilt20pearls",
      "id": 128117
  },
  {
      "name": "ilt20thunderbolts",
      "id": 128119
  },
  {
      "name": "imanziguardians",
      "id": 127904
  },
  {
      "name": "imenacenturions",
      "id": 127905
  },
  {
      "name": "imenaheronswomen",
      "id": 127871
  },
  {
      "name": "impi",
      "id": 75315
  },
  {
      "name": "incometax(india)",
      "id": 71786
  },
  {
      "name": "indatwahampshirewomen",
      "id": 127673
  },
  {
      "name": "independents",
      "id": 15169
  },
  {
      "name": "india",
      "id": 25
  },
  {
      "name": "indiaa",
      "id": 11383
  },
  {
      "name": "indiaaunder-19s",
      "id": 112595
  },
  {
      "name": "indiaawomen",
      "id": 114019
  },
  {
      "name": "indiaawomensu-19s",
      "id": 122062
  },
  {
      "name": "indiab",
      "id": 13572
  },
  {
      "name": "indiabunder-19s",
      "id": 112594
  },
  {
      "name": "indiabwomen",
      "id": 114139
  },
  {
      "name": "indiabwomensu-19s",
      "id": 122063
  },
  {
      "name": "indiablue",
      "id": 35306
  },
  {
      "name": "indiabluewomen",
      "id": 19567
  },
  {
      "name": "indiac",
      "id": 111902
  },
  {
      "name": "indiacunder-19s",
      "id": 122073
  },
  {
      "name": "indiacwomen",
      "id": 114140
  },
  {
      "name": "indiacwomensu-19s",
      "id": 122070
  },
  {
      "name": "indiacapitals",
      "id": 126134
  },
  {
      "name": "indiacements",
      "id": 71766
  },
  {
      "name": "indiaclub",
      "id": 123560
  },
  {
      "name": "indiadunder-19s",
      "id": 122102
  },
  {
      "name": "indiadwomen",
      "id": 122480
  },
  {
      "name": "indiadwomensu-19s",
      "id": 122072
  },
  {
      "name": "indiadeaf",
      "id": 127782
  },
  {
      "name": "indiaeunder-19s",
      "id": 122079
  },
  {
      "name": "indiaemergingplayers",
      "id": 81241
  },
  {
      "name": "indiaemergingteam",
      "id": 40398
  },
  {
      "name": "indiafunder-19s",
      "id": 122074
  },
  {
      "name": "indiagreen",
      "id": 75446
  },
  {
      "name": "indiagreenwomen",
      "id": 19570
  },
  {
      "name": "indialegends",
      "id": 114570
  },
  {
      "name": "indiamaharajas",
      "id": 122750
  },
  {
      "name": "indiaover-50s",
      "id": 114685
  },
  {
      "name": "indiared",
      "id": 35309
  },
  {
      "name": "indiaredwomen",
      "id": 19568
  },
  {
      "name": "indiaunder-19s",
      "id": 1093
  },
  {
      "name": "indiaunder-19s",
      "id": 127930
  },
  {
      "name": "indiawomen",
      "id": 9536
  },
  {
      "name": "indiawomenemergingplayers",
      "id": 113803
  },
  {
      "name": "indiawomenunder-19s",
      "id": 126969
  },
  {
      "name": "indiaxi",
      "id": 124867
  },
  {
      "name": "india-v",
      "id": 115404
  },
  {
      "name": "indianboardpresident'swomenxi",
      "id": 112315
  },
  {
      "name": "indianboardpresident'sxi",
      "id": 104971
  },
  {
      "name": "indianccvienna",
      "id": 116432
  },
  {
      "name": "indiancricketclub",
      "id": 116711
  },
  {
      "name": "indiankings",
      "id": 127685
  },
  {
      "name": "indianoil",
      "id": 127643
  },
  {
      "name": "indianoilcorporationxi",
      "id": 71797
  },
  {
      "name": "indianriverrowers",
      "id": 124770
  },
  {
      "name": "indianroyals",
      "id": 119026
  },
  {
      "name": "indiantuskers",
      "id": 116650
  },
  {
      "name": "indians",
      "id": 107384
  },
  {
      "name": "indiskacc",
      "id": 115848
  },
  {
      "name": "indo-bulgarian",
      "id": 116648
  },
  {
      "name": "indonesia",
      "id": 112687
  },
  {
      "name": "indonesiaunder-19s",
      "id": 127843
  },
  {
      "name": "indonesiawomen",
      "id": 112338
  },
  {
      "name": "indonesiawomenunder-19s",
      "id": 127121
  },
  {
      "name": "indoreknights",
      "id": 127700
  },
  {
      "name": "informaticsinstituteoftechnology",
      "id": 38287
  },
  {
      "name": "infusioninvergylions",
      "id": 126561
  },
  {
      "name": "ingaboknightswomen",
      "id": 127872
  },
  {
      "name": "ingabotitans",
      "id": 127906
  },
  {
      "name": "ingenzidefenders",
      "id": 127907
  },
  {
      "name": "ingenziheroeswomen",
      "id": 127873
  },
  {
      "name": "int",
      "id": 114532
  },
  {
      "name": "intellectualscc",
      "id": 122010
  },
  {
      "name": "interglobemarine",
      "id": 122727
  },
  {
      "name": "internationalccbrussels",
      "id": 125931
  },
  {
      "name": "internationalschoolscombined",
      "id": 15524
  },
  {
      "name": "internationalwarriors",
      "id": 126625
  },
  {
      "name": "internationalxi",
      "id": 69362
  },
  {
      "name": "invictusdesruisseaux",
      "id": 124583
  },
  {
      "name": "invincibleswomen",
      "id": 127026
  },
  {
      "name": "iprckigalicc",
      "id": 127691
  },
  {
      "name": "ipswich",
      "id": 127988
  },
  {
      "name": "iran",
      "id": 114479
  },
  {
      "name": "iranunder-19s",
      "id": 79667
  },
  {
      "name": "iraq",
      "id": 120867
  },
  {
      "name": "ireland",
      "id": 11
  },
  {
      "name": "irelanda",
      "id": 108531
  },
  {
      "name": "irelandunder-15s",
      "id": 81325
  },
  {
      "name": "irelandunder-19s",
      "id": 1095
  },
  {
      "name": "irelandwomen",
      "id": 10511
  },
  {
      "name": "irelandwomenunder-19s",
      "id": 127119
  },
  {
      "name": "irelandxi",
      "id": 126142
  },
  {
      "name": "irelandswolves",
      "id": 123683
  },
  {
      "name": "islamabad",
      "id": 11416
  },
  {
      "name": "islamabadleopards",
      "id": 20878
  },
  {
      "name": "islamabadlions",
      "id": 127788
  },
  {
      "name": "islamabadregion",
      "id": 13636
  },
  {
      "name": "islamabadunited",
      "id": 14464
  },
  {
      "name": "islamiacollegepeshawar",
      "id": 30689
  },
  {
      "name": "islamiacollegesialkot",
      "id": 30704
  },
  {
      "name": "islamiauniversitybahawalpur",
      "id": 19859
  },
  {
      "name": "isleofman",
      "id": 42857
  },
  {
      "name": "isleofmanunder-19s",
      "id": 81160
  },
  {
      "name": "isleofmanwomen",
      "id": 126803
  },
  {
      "name": "israel",
      "id": 9146
  },
  {
      "name": "israelunder-19s",
      "id": 81153
  },
  {
      "name": "istanbulksk",
      "id": 127652
  },
  {
      "name": "italy",
      "id": 19818
  },
  {
      "name": "italyunder-19s",
      "id": 81148
  },
  {
      "name": "italywomen",
      "id": 126802
  },
  {
      "name": "itefaqcricketclub",
      "id": 27129
  },
  {
      "name": "jgibbons'xi",
      "id": 3356
  },
  {
      "name": "jaanbaazkotachallengers",
      "id": 127998
  },
  {
      "name": "jabalpurchampions",
      "id": 126954
  },
  {
      "name": "jadejetswomen",
      "id": 119996
  },
  {
      "name": "jaffna",
      "id": 122984
  },
  {
      "name": "jaffnacombineschools",
      "id": 15538
  },
  {
      "name": "jaffnadistrict",
      "id": 108050
  },
  {
      "name": "jaffnakings",
      "id": 117011
  },
  {
      "name": "jaigarheagles",
      "id": 125079
  },
  {
      "name": "jainirrigation",
      "id": 127646
  },
  {
      "name": "jaipurcricketclub",
      "id": 118333
  },
  {
      "name": "jaipurindians",
      "id": 127996
  },
  {
      "name": "jaipursports",
      "id": 118327
  },
  {
      "name": "jalmahalbears",
      "id": 125081
  },
  {
      "name": "jalpaigurirhinocers",
      "id": 122390
  },
  {
      "name": "jamaica",
      "id": 11852
  },
  {
      "name": "jamaicainter-collegiatesportsassoc",
      "id": 31011
  },
  {
      "name": "jamaicascorpions",
      "id": 123131
  },
  {
      "name": "jamaicaselectxi",
      "id": 105016
  },
  {
      "name": "jamaicatallawahs",
      "id": 18253
  },
  {
      "name": "jamaicaunder-19s",
      "id": 19581
  },
  {
      "name": "jamaicawomen",
      "id": 30651
  },
  {
      "name": "jammu&kashmir",
      "id": 12984
  },
  {
      "name": "jammu&kashmirwomen",
      "id": 15992
  },
  {
      "name": "jammujanbaz",
      "id": 125809
  },
  {
      "name": "jammu&kashmiru-19",
      "id": 126581
  },
  {
      "name": "jamshedpurjasmineswomen",
      "id": 118159
  },
  {
      "name": "jamshedpurjugglers",
      "id": 116734
  },
  {
      "name": "janakpurroyals",
      "id": 127232
  },
  {
      "name": "janjuabresciacricketclub",
      "id": 116611
  },
  {
      "name": "japan",
      "id": 15698
  },
  {
      "name": "japanunder-19s",
      "id": 114101
  },
  {
      "name": "japanwomen",
      "id": 26777
  },
  {
      "name": "jawaharrhinos",
      "id": 125087
  },
  {
      "name": "jcxi",
      "id": 124104
  },
  {
      "name": "jenningstigers",
      "id": 127366
  },
  {
      "name": "jersey",
      "id": 10538
  },
  {
      "name": "jerseyunder-15s",
      "id": 81327
  },
  {
      "name": "jerseyunder-19s",
      "id": 42413
  },
  {
      "name": "jerseywomen",
      "id": 124545
  },
  {
      "name": "jharkhand",
      "id": 105780
  },
  {
      "name": "jharkhandcc",
      "id": 128036
  },
  {
      "name": "jharkhandwomen",
      "id": 15997
  },
  {
      "name": "jhyerichardson",
      "id": 119272
  },
  {
      "name": "jinnahbresciacricketclub",
      "id": 116553
  },
  {
      "name": "jinnahcc",
      "id": 127831
  },
  {
      "name": "jinnahdegreecollegekarachi(pakistan)",
      "id": 16683
  },
  {
      "name": "jjclub",
      "id": 124110
  },
  {
      "name": "jksuperstrikers",
      "id": 127919
  },
  {
      "name": "jksuperxi",
      "id": 127703
  },
  {
      "name": "joburgbuffaloes",
      "id": 127926
  },
  {
      "name": "joburgsuperkings",
      "id": 127100
  },
  {
      "name": "jodhanaking",
      "id": 121990
  },
  {
      "name": "jodhpursunrisers",
      "id": 128001
  },
  {
      "name": "johar",
      "id": 126183
  },
  {
      "name": "johor",
      "id": 128015
  },
  {
      "name": "jollyrovers",
      "id": 121296
  },
  {
      "name": "jonkoping",
      "id": 116157
  },
  {
      "name": "jordan",
      "id": 120870
  },
  {
      "name": "jovesunitscc",
      "id": 116816
  },
  {
      "name": "jozistars",
      "id": 111909
  },
  {
      "name": "jo’burggiants",
      "id": 104940
  },
  {
      "name": "jsr",
      "id": 116331
  },
  {
      "name": "jubileekonaseemacc",
      "id": 127777
  },
  {
      "name": "juniorchampions",
      "id": 127780
  },
  {
      "name": "jvcstallions",
      "id": 126588
  },
  {
      "name": "k&mcombinedschools",
      "id": 15528
  },
  {
      "name": "kabuleagles",
      "id": 15715
  },
  {
      "name": "kabulprovince",
      "id": 116445
  },
  {
      "name": "kabulzalmilivestar",
      "id": 123103
  },
  {
      "name": "kabulzwanan",
      "id": 111752
  },
  {
      "name": "kakamegabuffalos",
      "id": 125731
  },
  {
      "name": "kalabagancricketacademy",
      "id": 23720
  },
  {
      "name": "kalabagankrirachakra",
      "id": 23696
  },
  {
      "name": "kalighatclub",
      "id": 117055
  },
  {
      "name": "kalighatclubwomen",
      "id": 123117
  },
  {
      "name": "kallitheasixersathens",
      "id": 121919
  },
  {
      "name": "kalutaradistrict",
      "id": 108065
  },
  {
      "name": "kalutaraphysicalcultureclub",
      "id": 108047
  },
  {
      "name": "kalutaratownclub",
      "id": 108048
  },
  {
      "name": "kalyantuskers",
      "id": 127664
  },
  {
      "name": "kanbistigers",
      "id": 69872
  },
  {
      "name": "kanchanruprhinos",
      "id": 127868
  },
  {
      "name": "kancheepuram",
      "id": 127395
  },
  {
      "name": "kanchenjungawarriors",
      "id": 121461
  },
  {
      "name": "kandaharknights",
      "id": 111754
  },
  {
      "name": "kandaharprovince",
      "id": 116453
  },
  {
      "name": "kandurata",
      "id": 107183
  },
  {
      "name": "kanduratamaroons",
      "id": 36473
  },
  {
      "name": "kanduratawarriors",
      "id": 68879
  },
  {
      "name": "kandurata-uvacombined",
      "id": 63984
  },
  {
      "name": "kandy",
      "id": 111241
  },
  {
      "name": "kandycrusaders",
      "id": 14439
  },
  {
      "name": "kandycustomscricketclub",
      "id": 118787
  },
  {
      "name": "kandydistrict",
      "id": 108060
  },
  {
      "name": "kandyunder-19s",
      "id": 113401
  },
  {
      "name": "kannurbluedragons",
      "id": 127939
  },
  {
      "name": "kanpursuperstars",
      "id": 128003
  },
  {
      "name": "kansaichargers",
      "id": 116242
  },
  {
      "name": "kansaichargers",
      "id": 127797
  },
  {
      "name": "kanyakumari",
      "id": 127398
  },
  {
      "name": "kapiliprincesswomen",
      "id": 123284
  },
  {
      "name": "karachiblues",
      "id": 14845
  },
  {
      "name": "karachicricketassociation",
      "id": 128111
  },
  {
      "name": "karachikings",
      "id": 14469
  },
  {
      "name": "karachiporttrust",
      "id": 14790
  },
  {
      "name": "karachiregionblues",
      "id": 13593
  },
  {
      "name": "karachiregionwhites",
      "id": 13638
  },
  {
      "name": "karachiuniversity",
      "id": 30696
  },
  {
      "name": "karachiwhites",
      "id": 11422
  },
  {
      "name": "karachizebras",
      "id": 105916
  },
  {
      "name": "karaikalxi",
      "id": 126718
  },
  {
      "name": "karandeniyacentralcollege",
      "id": 27025
  },
  {
      "name": "karavaliunitedcricketclub",
      "id": 127658
  },
  {
      "name": "kariakalveteransxi",
      "id": 127274
  },
  {
      "name": "karlskronacricketclub",
      "id": 116267
  },
  {
      "name": "karlskronazalmicricketforening",
      "id": 116344
  },
  {
      "name": "karnaliprovince",
      "id": 118019
  },
  {
      "name": "karnataka",
      "id": 12978
  },
  {
      "name": "karnatakainstituteofcricket",
      "id": 71295
  },
  {
      "name": "karnatakastatecricketassociationpresident'sxi",
      "id": 86130
  },
  {
      "name": "karnatakastatecricketassociationxi",
      "id": 72376
  },
  {
      "name": "karnatakatuskers",
      "id": 113859
  },
  {
      "name": "karnatakaunder-19",
      "id": 121812
  },
  {
      "name": "karnatakawomen",
      "id": 15995
  },
  {
      "name": "karwanblues",
      "id": 122889
  },
  {
      "name": "karwancc",
      "id": 125822
  },
  {
      "name": "karwanstrikers",
      "id": 122742
  },
  {
      "name": "kashirudras",
      "id": 128007
  },
  {
      "name": "katqueenskathmandu",
      "id": 113781
  },
  {
      "name": "kathmandugoldenwarriors",
      "id": 114079
  },
  {
      "name": "kathmandugoldens",
      "id": 112257
  },
  {
      "name": "kathmandukingsxi",
      "id": 112086
  },
  {
      "name": "kathmanduknights",
      "id": 127227
  },
  {
      "name": "kawasakiknightridercc",
      "id": 127819
  },
  {
      "name": "kayamganjroyals",
      "id": 127638
  },
  {
      "name": "kazakhstan",
      "id": 120872
  },
  {
      "name": "kazirangaheroes",
      "id": 121578
  },
  {
      "name": "kcgandhienglishschool",
      "id": 16410
  },
  {
      "name": "kcaeagles",
      "id": 118260
  },
  {
      "name": "kcalions",
      "id": 118255
  },
  {
      "name": "kcapanthers",
      "id": 118258
  },
  {
      "name": "kcaroyals",
      "id": 118257
  },
  {
      "name": "kcatigers",
      "id": 118256
  },
  {
      "name": "kcatuskers",
      "id": 118261
  },
  {
      "name": "kedah",
      "id": 126184
  },
  {
      "name": "kegalledistrict",
      "id": 108057
  },
  {
      "name": "keiwomen",
      "id": 15242
  },
  {
      "name": "kelantan",
      "id": 126180
  },
  {
      "name": "kent",
      "id": 104948
  },
  {
      "name": "kent2ndxi",
      "id": 18539
  },
  {
      "name": "kentandsussex",
      "id": 5388
  },
  {
      "name": "kentlankacricketclub",
      "id": 116551
  },
  {
      "name": "kentwomen",
      "id": 19236
  },
  {
      "name": "kentxi",
      "id": 2021
  },
  {
      "name": "kenya",
      "id": 9160
  },
  {
      "name": "kenyaunder-19s",
      "id": 42275
  },
  {
      "name": "kenyawomen",
      "id": 120223
  },
  {
      "name": "kerala",
      "id": 12981
  },
  {
      "name": "keralacc",
      "id": 128044
  },
  {
      "name": "keralacricketassociationxi",
      "id": 72348
  },
  {
      "name": "keralakings",
      "id": 111997
  },
  {
      "name": "keralaunder-19",
      "id": 121735
  },
  {
      "name": "keralawomen",
      "id": 15974
  },
  {
      "name": "kersney",
      "id": 16253
  },
  {
      "name": "kesariyodhaz",
      "id": 120471
  },
  {
      "name": "khanresearchlaboratories",
      "id": 105831
  },
  {
      "name": "khanresearchlaboratories",
      "id": 11405
  },
  {
      "name": "khandanxi",
      "id": 127723
  },
  {
      "name": "kharagpurblasters",
      "id": 121493
  },
  {
      "name": "kharian",
      "id": 118160
  },
  {
      "name": "khelagharsamajkallyansamity",
      "id": 35078
  },
  {
      "name": "khostprovince",
      "id": 116447
  },
  {
      "name": "khubdutigers",
      "id": 115254
  },
  {
      "name": "khulnadivision",
      "id": 11286
  },
  {
      "name": "khulnadivisionunder-14s",
      "id": 63084
  },
  {
      "name": "khulnadivisionunder-18s",
      "id": 63240
  },
  {
      "name": "khulnaroyalbengals",
      "id": 65150
  },
  {
      "name": "khulnatigers",
      "id": 90438
  },
  {
      "name": "khuwairwarriors",
      "id": 122622
  },
  {
      "name": "khyberpakhtunkhwa",
      "id": 29524
  },
  {
      "name": "khyberpakhtunkhwa2ndxi",
      "id": 117163
  },
  {
      "name": "khyber-pakhtunkhwafighters",
      "id": 24127
  },
  {
      "name": "khyber-pakhtunkhwapanthers",
      "id": 105868
  },
  {
      "name": "kicukirocc",
      "id": 115413
  },
  {
      "name": "kidscricketclub",
      "id": 121288
  },
  {
      "name": "kigalicc",
      "id": 125987
  },
  {
      "name": "kiglitigers",
      "id": 115411
  },
  {
      "name": "kilimanjaroqueens",
      "id": 128130
  },
  {
      "name": "kilinochchicombinedschools",
      "id": 38181
  },
  {
      "name": "kilinochchidistrict",
      "id": 108051
  },
  {
      "name": "kingpricekings",
      "id": 114868
  },
  {
      "name": "kingstars",
      "id": 116099
  },
  {
      "name": "kingfishers",
      "id": 116198
  },
  {
      "name": "kings",
      "id": 124743
  },
  {
      "name": "kings11kelowna",
      "id": 116284
  },
  {
      "name": "kingsxi",
      "id": 116889
  },
  {
      "name": "kingsxicricketclub",
      "id": 116552
  },
  {
      "name": "kingsmen",
      "id": 127682
  },
  {
      "name": "kingsmenx",
      "id": 127887
  },
  {
      "name": "kingswoodcollege",
      "id": 26821
  },
  {
      "name": "kinirrsports",
      "id": 117539
  },
  {
      "name": "kiribati",
      "id": 120874
  },
  {
      "name": "kistacricketclub",
      "id": 115962
  },
  {
      "name": "kisumupythons",
      "id": 127141
  },
  {
      "name": "kites",
      "id": 116199
  },
  {
      "name": "kkstadinjakeravankriketti",
      "id": 115865
  },
  {
      "name": "klstars",
      "id": 122359
  },
  {
      "name": "knights",
      "id": 12332
  },
  {
      "name": "knightscubs",
      "id": 15419
  },
  {
      "name": "knightswomen",
      "id": 71118
  },
  {
      "name": "knightsxi",
      "id": 124654
  },
  {
      "name": "kochituskerskerala",
      "id": 82203
  },
  {
      "name": "kolakatatigers",
      "id": 115478
  },
  {
      "name": "kolhapurtuskers",
      "id": 127852
  },
  {
      "name": "kolkataheroes",
      "id": 121492
  },
  {
      "name": "kolkataknightriders",
      "id": 591
  },
  {
      "name": "kolncc",
      "id": 119940
  },
  {
      "name": "kolnchallengers",
      "id": 119925
  },
  {
      "name": "kongonis",
      "id": 69871
  },
  {
      "name": "konnagarkings",
      "id": 127807
  },
  {
      "name": "koparkairnetitans",
      "id": 127667
  },
  {
      "name": "kopavogurpuffins",
      "id": 116255
  },
  {
      "name": "kopavogurpuffins",
      "id": 116258
  },
  {
      "name": "kosovo",
      "id": 120876
  },
  {
      "name": "kotakiller",
      "id": 121992
  },
  {
      "name": "kotelawaladefenceuniversity",
      "id": 38278
  },
  {
      "name": "kotlilions",
      "id": 125812
  },
  {
      "name": "kowlooncantons",
      "id": 90789
  },
  {
      "name": "kowlooncricketclub",
      "id": 15166
  },
  {
      "name": "kowloonlions",
      "id": 118768
  },
  {
      "name": "krirashikkhaprotisthanunder-14s",
      "id": 63097
  },
  {
      "name": "krirashikkhaprotisthanunder-18s",
      "id": 63211
  },
  {
      "name": "krishnanagarchallengers",
      "id": 121464
  },
  {
      "name": "kristianstadcc",
      "id": 116161
  },
  {
      "name": "krmpanthers",
      "id": 127660
  },
  {
      "name": "kscacoltsxi",
      "id": 86135
  },
  {
      "name": "ksvcricket",
      "id": 115952
  },
  {
      "name": "kualalumpur",
      "id": 128016
  },
  {
      "name": "kulikawncricketclub",
      "id": 124259
  },
  {
      "name": "kummerfeldersportverein",
      "id": 120209
  },
  {
      "name": "kurunegaladistrict",
      "id": 108068
  },
  {
      "name": "kurunegalawarriors",
      "id": 14444
  },
  {
      "name": "kurunegalayouthcricketclub",
      "id": 54756
  },
  {
      "name": "kurunegalayouthcricketclubwomen",
      "id": 27055
  },
  {
      "name": "kutchwarriors",
      "id": 113054
  },
  {
      "name": "kutchitigers",
      "id": 126038
  },
  {
      "name": "kuwait",
      "id": 26800
  },
  {
      "name": "kuwaitmavericks",
      "id": 126295
  },
  {
      "name": "kuwaitswedish",
      "id": 126333
  },
  {
      "name": "kuwaitunder-19s",
      "id": 19642
  },
  {
      "name": "kuwaitwomen",
      "id": 112334
  },
  {
      "name": "kuwaitxi",
      "id": 124868
  },
  {
      "name": "kwazulu-natal",
      "id": 12711
  },
  {
      "name": "kwazulu-natalamateurxi",
      "id": 39084
  },
  {
      "name": "kwazulu-natalinland",
      "id": 12716
  },
  {
      "name": "kwazulu-natalinlandunder-13s",
      "id": 14902
  },
  {
      "name": "kwazulu-natalinlandunder-15s",
      "id": 37891
  },
  {
      "name": "kwazulu-natalinlandunder-17s",
      "id": 15042
  },
  {
      "name": "kwazulu-natalinlandunder-19s",
      "id": 16738
  },
  {
      "name": "kwazulu-natalinlandwomen",
      "id": 15252
  },
  {
      "name": "kwazulu-natalinvitationxi",
      "id": 128074
  },
  {
      "name": "kwazulu-natalunder-13s",
      "id": 14897
  },
  {
      "name": "kwazulu-natalunder-15s",
      "id": 37878
  },
  {
      "name": "kwazulu-natalunder-17s",
      "id": 15049
  },
  {
      "name": "kwazulu-natalunder-19s",
      "id": 16739
  },
  {
      "name": "kwazulu-natalwomen",
      "id": 15247
  },
  {
      "name": "kyrgyzstan",
      "id": 120878
  },
  {
      "name": "ltoz",
      "id": 4917
  },
  {
      "name": "lagladiators",
      "id": 120504
  },
  {
      "name": "lamanga",
      "id": 114234
  },
  {
      "name": "lasoufrierehikers",
      "id": 115766
  },
  {
      "name": "laboriebayroyals",
      "id": 116009
  },
  {
      "name": "lahoreblues",
      "id": 11411
  },
  {
      "name": "lahoreeagles",
      "id": 105914
  },
  {
      "name": "lahorelions",
      "id": 17823
  },
  {
      "name": "lahoreqalandars",
      "id": 14470
  },
  {
      "name": "lahoreravi",
      "id": 33206
  },
  {
      "name": "lahoreregionblues",
      "id": 13597
  },
  {
      "name": "lahoreregionwhites",
      "id": 13635
  },
  {
      "name": "lahoreshalimar",
      "id": 33198
  },
  {
      "name": "lahorewhites",
      "id": 11414
  },
  {
      "name": "laleribulls",
      "id": 115255
  },
  {
      "name": "lalitpurfalcons",
      "id": 113784
  },
  {
      "name": "lalitpurpatriots",
      "id": 112082
  },
  {
      "name": "lancashire",
      "id": 7023
  },
  {
      "name": "lancashire2ndxi",
      "id": 18496
  },
  {
      "name": "lancashirethunder",
      "id": 104880
  },
  {
      "name": "lancashirewomen",
      "id": 19272
  },
  {
      "name": "landskrona",
      "id": 121149
  },
  {
      "name": "lankalions",
      "id": 124659
  },
  {
      "name": "lankancricketclub",
      "id": 54731
  },
  {
      "name": "laos",
      "id": 120880
  },
  {
      "name": "larkanabulls",
      "id": 24627
  },
  {
      "name": "larkanaregion",
      "id": 13589
  },
  {
      "name": "larsolirhinos",
      "id": 115283
  },
  {
      "name": "laserswomen",
      "id": 71123
  },
  {
      "name": "lathburylightning",
      "id": 127655
  },
  {
      "name": "latvia",
      "id": 120882
  },
  {
      "name": "leatherbackgiants",
      "id": 123293
  },
  {
      "name": "lebanon",
      "id": 120884
  },
  {
      "name": "leeds/bradfordmccu",
      "id": 9789
  },
  {
      "name": "leewardislands",
      "id": 11847
  },
  {
      "name": "leewardislandsunder-19s",
      "id": 19591
  },
  {
      "name": "leewardislandswomen",
      "id": 124951
  },
  {
      "name": "left-handed",
      "id": 2655
  },
  {
      "name": "legendsofrupganj",
      "id": 23708
  },
  {
      "name": "legendsxi",
      "id": 116891
  },
  {
      "name": "leicestershire",
      "id": 104947
  },
  {
      "name": "leicestershire2ndxi",
      "id": 18478
  },
  {
      "name": "leicestershirewomen",
      "id": 19240
  },
  {
      "name": "leinsterlightning",
      "id": 113541
  },
  {
      "name": "leisurezone",
      "id": 127966
  },
  {
      "name": "lemarccoberursel",
      "id": 116781
  },
  {
      "name": "leolions",
      "id": 16164
  },
  {
      "name": "lesotho",
      "id": 120886
  },
  {
      "name": "lesothowomen",
      "id": 128012
  },
  {
      "name": "lev",
      "id": 114534
  },
  {
      "name": "lexus",
      "id": 128060
  },
  {
      "name": "liberia",
      "id": 120888
  },
  {
      "name": "libralegends",
      "id": 16157
  },
  {
      "name": "libya",
      "id": 120890
  },
  {
      "name": "liechtenstein",
      "id": 120893
  },
  {
      "name": "liege",
      "id": 116420
  },
  {
      "name": "lightning",
      "id": 116536
  },
  {
      "name": "limassolgladiatorscc",
      "id": 116183
  },
  {
      "name": "limassolqalandars",
      "id": 127760
  },
  {
      "name": "limassolzalmi",
      "id": 122131
  },
  {
      "name": "limpopo",
      "id": 111578
  },
  {
      "name": "limpopounder-13s",
      "id": 14885
  },
  {
      "name": "limpopounder-15s",
      "id": 37871
  },
  {
      "name": "limpopounder-17s",
      "id": 15036
  },
  {
      "name": "limpopounder-19s",
      "id": 16721
  },
  {
      "name": "limpopowomen",
      "id": 15222
  },
  {
      "name": "lincolnshire",
      "id": 18509
  },
  {
      "name": "lincolnshirewomen",
      "id": 19249
  },
  {
      "name": "linkopingcc",
      "id": 116162
  },
  {
      "name": "lionesseswomen",
      "id": 125240
  },
  {
      "name": "lions",
      "id": 12340
  },
  {
      "name": "lions",
      "id": 126067
  },
  {
      "name": "lionscubs",
      "id": 15422
  },
  {
      "name": "lionsxi",
      "id": 116993
  },
  {
      "name": "lisboncapitals",
      "id": 125501
  },
  {
      "name": "lisbonsupergiants",
      "id": 127713
  },
  {
      "name": "lithuania",
      "id": 120895
  },
  {
      "name": "ljubljana",
      "id": 121789
  },
  {
      "name": "lleidatigers",
      "id": 126947
  },
  {
      "name": "llucricketclub",
      "id": 27148
  },
  {
      "name": "lomma",
      "id": 124505
  },
  {
      "name": "london",
      "id": 3261
  },
  {
      "name": "londonspirit(men)",
      "id": 120620
  },
  {
      "name": "londonspirit(women)",
      "id": 120637
  },
  {
      "name": "lonestarathletics",
      "id": 125224
  },
  {
      "name": "lonigo",
      "id": 118820
  },
  {
      "name": "lordfbeauclerk'sxi",
      "id": 3404
  },
  {
      "name": "lordstrathavon'sxi",
      "id": 4999
  },
  {
      "name": "losangelesknightriders",
      "id": 127846
  },
  {
      "name": "loughboroughlightning",
      "id": 104881
  },
  {
      "name": "loughboroughmccu",
      "id": 9795
  },
  {
      "name": "loughboroughmccu2ndxi",
      "id": 18435
  },
  {
      "name": "loyolacollege",
      "id": 127558
  },
  {
      "name": "luangmualcricketclub",
      "id": 124257
  },
  {
      "name": "luccacc",
      "id": 125311
  },
  {
      "name": "luccaunited",
      "id": 125395
  },
  {
      "name": "lucknowfalcons",
      "id": 128006
  },
  {
      "name": "lucknowsupergiants",
      "id": 123214
  },
  {
      "name": "lumbiniallstars",
      "id": 127229
  },
  {
      "name": "lumbiniprovince",
      "id": 118023
  },
  {
      "name": "lumbiniprovinceunder-19s",
      "id": 122454
  },
  {
      "name": "lumhshyderabad",
      "id": 30697
  },
  {
      "name": "lund",
      "id": 121151
  },
  {
      "name": "luxembourg",
      "id": 69736
  },
  {
      "name": "luxembourgwomen",
      "id": 128013
  },
  {
      "name": "lyarikings",
      "id": 126656
  },
  {
      "name": "lycakovaikings",
      "id": 89959
  },
  {
      "name": "m&msignsstrikers",
      "id": 114867
  },
  {
      "name": "m.hclub",
      "id": 126950
  },
  {
      "name": "m.psports",
      "id": 126951
  },
  {
      "name": "mabouyaconstrictior",
      "id": 116006
  },
  {
      "name": "machoscc",
      "id": 124373
  },
  {
      "name": "madagascar",
      "id": 120897
  },
  {
      "name": "madhyapradesh",
      "id": 13014
  },
  {
      "name": "madhyapradeshcricketassociationxi",
      "id": 72312
  },
  {
      "name": "madhyapradeshwomen",
      "id": 15978
  },
  {
      "name": "madrascricketclub",
      "id": 31084
  },
  {
      "name": "madrasrubberfactory",
      "id": 71772
  },
  {
      "name": "madrid",
      "id": 114235
  },
  {
      "name": "madridc.c.",
      "id": 123776
  },
  {
      "name": "madridunited",
      "id": 114237
  },
  {
      "name": "madurai",
      "id": 127405
  },
  {
      "name": "mahanamacollege",
      "id": 26264
  },
  {
      "name": "maharajaofcoochbehar",
      "id": 122343
  },
  {
      "name": "maharashtra",
      "id": 127595
  },
  {
      "name": "maharashtra",
      "id": 13012
  },
  {
      "name": "maharashtraunder-19",
      "id": 121811
  },
  {
      "name": "maharashtrawomen",
      "id": 15959
  },
  {
      "name": "maharashtraxi",
      "id": 72364
  },
  {
      "name": "maheveteransxi",
      "id": 127275
  },
  {
      "name": "mahexi",
      "id": 126722
  },
  {
      "name": "mahendranagarunited",
      "id": 112259
  },
  {
      "name": "mahiyanganayaunilions",
      "id": 116077
  },
  {
      "name": "mahmudullahxi",
      "id": 116810
  },
  {
      "name": "maidanwardakprovince",
      "id": 116452
  },
  {
      "name": "maiwanddefenders",
      "id": 124601
  },
  {
      "name": "majorassociationxi",
      "id": 105219
  },
  {
      "name": "makhayantiniinvitationxi",
      "id": 105196
  },
  {
      "name": "malacca",
      "id": 128017
  },
  {
      "name": "malagacc",
      "id": 123777
  },
  {
      "name": "malawi",
      "id": 79722
  },
  {
      "name": "malawiwomen",
      "id": 127621
  },
  {
      "name": "malaysia",
      "id": 9132
  },
  {
      "name": "malaysiaunder-19s",
      "id": 19648
  },
  {
      "name": "malaysiawomen",
      "id": 26762
  },
  {
      "name": "malaysiancrescents",
      "id": 126837
  },
  {
      "name": "malaysianhawks",
      "id": 124657
  },
  {
      "name": "malaysianstars",
      "id": 126836
  },
  {
      "name": "maldives",
      "id": 26807
  },
  {
      "name": "maldivesunder-19s",
      "id": 79658
  },
  {
      "name": "maldivesunder-25s",
      "id": 71276
  },
  {
      "name": "mali",
      "id": 120899
  },
  {
      "name": "maliyadevacollege",
      "id": 15534
  },
  {
      "name": "malmocricketclub",
      "id": 116335
  },
  {
      "name": "malmokingscricketclub",
      "id": 116269
  },
  {
      "name": "malmohus",
      "id": 116275
  },
  {
      "name": "maloqalandars",
      "id": 116752
  },
  {
      "name": "malta",
      "id": 69724
  },
  {
      "name": "maltasuperkings",
      "id": 123329
  },
  {
      "name": "maltawomen",
      "id": 125868
  },
  {
      "name": "manastigers",
      "id": 121577
  },
  {
      "name": "manbhumwarriors",
      "id": 122379
  },
  {
      "name": "manchester",
      "id": 6454
  },
  {
      "name": "manchesteroriginals(men)",
      "id": 120616
  },
  {
      "name": "manchesteroriginals(women)",
      "id": 120633
  },
  {
      "name": "mangaloredragons",
      "id": 26721
  },
  {
      "name": "manhattanyorkers",
      "id": 125416
  },
  {
      "name": "manipaltigers",
      "id": 126136
  },
  {
      "name": "manipur",
      "id": 111565
  },
  {
      "name": "manipurwomen",
      "id": 124312
  },
  {
      "name": "mannardistrict",
      "id": 108052
  },
  {
      "name": "mannar-vavuniyacombinedschools",
      "id": 15519
  },
  {
      "name": "marafiebengaltigers",
      "id": 128062
  },
  {
      "name": "marathaarabians",
      "id": 112001
  },
  {
      "name": "marchinpatriotssportsclub",
      "id": 127822
  },
  {
      "name": "mardanwarriors",
      "id": 126349
  },
  {
      "name": "marisstellacollege",
      "id": 26999
  },
  {
      "name": "markhor",
      "id": 127761
  },
  {
      "name": "married",
      "id": 4719
  },
  {
      "name": "marsacc",
      "id": 117074
  },
  {
      "name": "marshallislands",
      "id": 120901
  },
  {
      "name": "marstacc",
      "id": 116132
  },
  {
      "name": "marylebonecricketclub",
      "id": 2512
  },
  {
      "name": "marylebonecricketclubandhomerton",
      "id": 3489
  },
  {
      "name": "marylebonecricketclubfirst8with3others",
      "id": 4159
  },
  {
      "name": "marylebonecricketclubsecond10with1other",
      "id": 4160
  },
  {
      "name": "marylebonecricketclubuniversities",
      "id": 27630
  },
  {
      "name": "marylebonecricketclubwomen",
      "id": 29723
  },
  {
      "name": "marylebonecricketclubworldxi",
      "id": 90812
  },
  {
      "name": "marylebonecricketclubyoungcricketers",
      "id": 18476
  },
  {
      "name": "mashonalandeagles",
      "id": 11991
  },
  {
      "name": "masterblasters",
      "id": 120469
  },
  {
      "name": "masterscricektclub",
      "id": 127901
  },
  {
      "name": "masterscricketclub",
      "id": 121297
  },
  {
      "name": "mastersrcc",
      "id": 121287
  },
  {
      "name": "matabelelandtuskers",
      "id": 11988
  },
  {
      "name": "mataledistrict",
      "id": 108070
  },
  {
      "name": "mataleladies",
      "id": 15603
  },
  {
      "name": "mataradistrict",
      "id": 108062
  },
  {
      "name": "materdei",
      "id": 120356
  },
  {
      "name": "matrixclothingxii",
      "id": 116332
  },
  {
      "name": "mauritania",
      "id": 120903
  },
  {
      "name": "mauritius",
      "id": 120905
  },
  {
      "name": "maxclub",
      "id": 127945
  },
  {
      "name": "mayiladuthurai",
      "id": 127341
  },
  {
      "name": "mcapresidentxi",
      "id": 127839
  },
  {
      "name": "mcasecretaryxi",
      "id": 127840
  },
  {
      "name": "mcctambaram",
      "id": 127561
  },
  {
      "name": "mccarepresentativexi",
      "id": 70473
  },
  {
      "name": "mcpeagles",
      "id": 120506
  },
  {
      "name": "mecstudygroup",
      "id": 128061
  },
  {
      "name": "mecstudygroup",
      "id": 127704
  },
  {
      "name": "mecccricketclub",
      "id": 27140
  },
  {
      "name": "mecheleneagle",
      "id": 125921
  },
  {
      "name": "mecheleneaglescc",
      "id": 116422
  },
  {
      "name": "medicaluniversitysofia",
      "id": 116642
  },
  {
      "name": "medsollabs-ghicc",
      "id": 124976
  },
  {
      "name": "meerutmavericks",
      "id": 128008
  },
  {
      "name": "meghalaya",
      "id": 111567
  },
  {
      "name": "melaka",
      "id": 126178
  },
  {
      "name": "melbournecricketclub",
      "id": 31087
  },
  {
      "name": "melbournerenegades",
      "id": 14209
  },
  {
      "name": "melbournerenegadesacademy",
      "id": 127953
  },
  {
      "name": "melbournerenegadeswomen",
      "id": 15799
  },
  {
      "name": "melbournestars",
      "id": 14206
  },
  {
      "name": "melbournestarsacademy",
      "id": 127954
  },
  {
      "name": "melbournestarswomen",
      "id": 15793
  },
  {
      "name": "meninbluecc",
      "id": 116819
  },
  {
      "name": "meninbluetokyo",
      "id": 127946
  },
  {
      "name": "menloparkhighschool",
      "id": 27228
  },
  {
      "name": "merrionwomen",
      "id": 125845
  },
  {
      "name": "merryboyssportsclub",
      "id": 124636
  },
  {
      "name": "mewarmaster",
      "id": 121993
  },
  {
      "name": "mexico",
      "id": 120907
  },
  {
      "name": "mgwarriors",
      "id": 127829
  },
  {
      "name": "mgmcricketclub",
      "id": 122726
  },
  {
      "name": "micapetown",
      "id": 127097
  },
  {
      "name": "miemirates",
      "id": 127170
  },
  {
      "name": "minewyork",
      "id": 127849
  },
  {
      "name": "michigancricketstars",
      "id": 125225
  },
  {
      "name": "micoudeagles",
      "id": 119779
  },
  {
      "name": "midlevelsunitedcricketclub",
      "id": 119952
  },
  {
      "name": "midwestrhinos",
      "id": 11990
  },
  {
      "name": "mid-eastmetals",
      "id": 123838
  },
  {
      "name": "middlesex",
      "id": 7044
  },
  {
      "name": "middlesex2ndxi",
      "id": 18462
  },
  {
      "name": "middlesexandmarylebonecricketclub",
      "id": 3033
  },
  {
      "name": "middlesextitans",
      "id": 124335
  },
  {
      "name": "middlesexunitedstars",
      "id": 127891
  },
  {
      "name": "middlesexwomen",
      "id": 19246
  },
  {
      "name": "middlesexxi",
      "id": 2560
  },
  {
      "name": "midlandcounties",
      "id": 6265
  },
  {
      "name": "midnaporeheros",
      "id": 122392
  },
  {
      "name": "midwest",
      "id": 122173
  },
  {
      "name": "mightyefatepanthers",
      "id": 115771
  },
  {
      "name": "milancricketclub",
      "id": 118987
  },
  {
      "name": "milankingsgrovecricketclub",
      "id": 116920
  },
  {
      "name": "milanunited",
      "id": 118985
  },
  {
      "name": "minhajcc",
      "id": 116973
  },
  {
      "name": "ministerrajshahi",
      "id": 117032
  },
  {
      "name": "minorcounties",
      "id": 7009
  },
  {
      "name": "mirabhayanderlions",
      "id": 127669
  },
  {
      "name": "mirandadragons",
      "id": 119035
  },
  {
      "name": "mirpurroyals",
      "id": 125813
  },
  {
      "name": "misainakknights",
      "id": 15708
  },
  {
      "name": "misainakregion",
      "id": 14771
  },
  {
      "name": "mississaugapanthers",
      "id": 127913
  },
  {
      "name": "mizoram",
      "id": 111562
  },
  {
      "name": "mizoramwomen",
      "id": 118799
  },
  {
      "name": "mohammedansportingclub",
      "id": 23724
  },
  {
      "name": "mohammedansportingclubwomen",
      "id": 123121
  },
  {
      "name": "mohunbagana.c",
      "id": 117051
  },
  {
      "name": "mohunbaganacwomen",
      "id": 127070
  },
  {
      "name": "moldova",
      "id": 120909
  },
  {
      "name": "mombasarhino",
      "id": 127142
  },
  {
      "name": "monreposstars",
      "id": 116007
  },
  {
      "name": "monaco",
      "id": 120911
  },
  {
      "name": "monaragalacombined",
      "id": 15535
  },
  {
      "name": "monaragaladistrict",
      "id": 108072
  },
  {
      "name": "monaragalahornets",
      "id": 116075
  },
  {
      "name": "monctonheroes",
      "id": 116109
  },
  {
      "name": "mongolia",
      "id": 120913
  },
  {
      "name": "mongoliawomen",
      "id": 128033
  },
  {
      "name": "montcadaroyal",
      "id": 116838
  },
  {
      "name": "montenegro",
      "id": 120915
  },
  {
      "name": "montrealtigers",
      "id": 111357
  },
  {
      "name": "montserrat",
      "id": 105461
  },
  {
      "name": "moorburgertsv",
      "id": 120142
  },
  {
      "name": "moorssportsclub",
      "id": 12063
  },
  {
      "name": "moratuwasportsclub",
      "id": 105656
  },
  {
      "name": "moraviancc",
      "id": 116095
  },
  {
      "name": "morocco",
      "id": 120917
  },
  {
      "name": "morrisvilleraptors",
      "id": 125620
  },
  {
      "name": "morrisvillesamparmy",
      "id": 126863
  },
  {
      "name": "morrisvilleunity",
      "id": 127960
  },
  {
      "name": "mountmeruqueens",
      "id": 128127
  },
  {
      "name": "mountaineers",
      "id": 11987
  },
  {
      "name": "mozambique",
      "id": 66607
  },
  {
      "name": "mozambiquewomen",
      "id": 121520
  },
  {
      "name": "mpumalanga",
      "id": 111577
  },
  {
      "name": "mpumalangaunder-13s",
      "id": 14905
  },
  {
      "name": "mpumalangaunder-15s",
      "id": 37884
  },
  {
      "name": "mpumalangaunder-17s",
      "id": 15039
  },
  {
      "name": "mpumalangaunder-19s",
      "id": 16719
  },
  {
      "name": "mpumalangawomen",
      "id": 15223
  },
  {
      "name": "mrkbputrajaya",
      "id": 124723
  },
  {
      "name": "mr24/7emergencyservices",
      "id": 114866
  },
  {
      "name": "mscfrankfurt",
      "id": 116164
  },
  {
      "name": "msidawarriorscc",
      "id": 117076
  },
  {
      "name": "mtbulls",
      "id": 115773
  },
  {
      "name": "mtvstallions",
      "id": 115951
  },
  {
      "name": "mudons",
      "id": 116644
  },
  {
      "name": "muplovdiv",
      "id": 120492
  },
  {
      "name": "mutrakia",
      "id": 127815
  },
  {
      "name": "mullaitivucombinedschools",
      "id": 38192
  },
  {
      "name": "multan",
      "id": 17828
  },
  {
      "name": "multanregion",
      "id": 13643
  },
  {
      "name": "multansultans",
      "id": 108678
  },
  {
      "name": "mumbai",
      "id": 8516
  },
  {
      "name": "mumbaia",
      "id": 107614
  },
  {
      "name": "mumbaicricketassociationpresident'sxi",
      "id": 128078
  },
  {
      "name": "mumbaicricketassociationxi",
      "id": 16238
  },
  {
      "name": "mumbaiheroes",
      "id": 115479
  },
  {
      "name": "mumbaiindians",
      "id": 593
  },
  {
      "name": "mumbaiindianswomen",
      "id": 127615
  },
  {
      "name": "mumbaiunder-19",
      "id": 121745
  },
  {
      "name": "mumbaiwarriors",
      "id": 128063
  },
  {
      "name": "mumbaiwomen",
      "id": 15963
  },
  {
      "name": "munsterreds",
      "id": 113542
  },
  {
      "name": "murshidabadnabab",
      "id": 122299
  },
  {
      "name": "muthootmicrofin",
      "id": 127781
  },
  {
      "name": "muzzaffarabadtigers",
      "id": 125811
  },
  {
      "name": "myanmar",
      "id": 113293
  },
  {
      "name": "myanmarwomen",
      "id": 112337
  },
  {
      "name": "mysorewarriors",
      "id": 26725
  },
  {
      "name": "ntoz",
      "id": 2440
  },
  {
      "name": "n.s.s.a",
      "id": 123430
  },
  {
      "name": "nabajyoticlub",
      "id": 127631
  },
  {
      "name": "nackacc",
      "id": 116100
  },
  {
      "name": "nadiasuperdazzler",
      "id": 122383
  },
  {
      "name": "nadimcricketclub",
      "id": 127724
  },
  {
      "name": "nagaland",
      "id": 111561
  },
  {
      "name": "nagalandwomen",
      "id": 124315
  },
  {
      "name": "nagenahiranagas",
      "id": 68873
  },
  {
      "name": "nagerisembilan",
      "id": 128018
  },
  {
      "name": "nagpurninjas",
      "id": 127698
  },
  {
      "name": "nahargarhbulls",
      "id": 125084
  },
  {
      "name": "nainitalninjas",
      "id": 127882
  },
  {
      "name": "nainitalpantherswomen",
      "id": 128085
  },
  {
      "name": "nairobibuffaloes",
      "id": 73494
  },
  {
      "name": "nairobilions",
      "id": 125732
  },
  {
      "name": "najmulxi",
      "id": 116811
  },
  {
      "name": "nakheel",
      "id": 127711
  },
  {
      "name": "nakuruflamingo",
      "id": 125733
  },
  {
      "name": "nakuruleopards",
      "id": 127143
  },
  {
      "name": "nalandacollege",
      "id": 26259
  },
  {
      "name": "namakkal",
      "id": 127406
  },
  {
      "name": "namborclub",
      "id": 127692
  },
  {
      "name": "namibdesertlions",
      "id": 128028
  },
  {
      "name": "namibia",
      "id": 10798
  },
  {
      "name": "namibiaover-50s",
      "id": 114673
  },
  {
      "name": "namibiaunder-15s",
      "id": 37887
  },
  {
      "name": "namibiaunder-19s",
      "id": 1173
  },
  {
      "name": "namibiawomen",
      "id": 113601
  },
  {
      "name": "nammashivamogga",
      "id": 127684
  },
  {
      "name": "namobandrablasters",
      "id": 113022
  },
  {
      "name": "nangarharleopards",
      "id": 111755
  },
  {
      "name": "nangarharprovince",
      "id": 116451
  },
  {
      "name": "naparoyalkings",
      "id": 127762
  },
  {
      "name": "nationalbankofpakistan",
      "id": 8592
  },
  {
      "name": "nationalperformancesquad",
      "id": 28577
  },
  {
      "name": "nauru",
      "id": 120920
  },
  {
      "name": "nayzacc",
      "id": 115412
  },
  {
      "name": "ncminvestments",
      "id": 126307
  },
  {
      "name": "ncmsportingclub",
      "id": 127705
  },
  {
      "name": "ncupresident'sxi",
      "id": 107519
  },
  {
      "name": "negerisembilan",
      "id": 126185
  },
  {
      "name": "negombocricketclub",
      "id": 118785
  },
  {
      "name": "nellairoyalkings",
      "id": 120608
  },
  {
      "name": "nelsonmandelabaygiants",
      "id": 111910
  },
  {
      "name": "nelsonmandelabaystars",
      "id": 104942
  },
  {
      "name": "nelsonmandelametropolitanuniversity",
      "id": 27207
  },
  {
      "name": "nepal",
      "id": 10814
  },
  {
      "name": "nepaldeaf",
      "id": 127784
  },
  {
      "name": "nepalemergingteam",
      "id": 113889
  },
  {
      "name": "nepalpoliceclub",
      "id": 118021
  },
  {
      "name": "nepalunder-19s",
      "id": 1066
  },
  {
      "name": "nepalunder-25s",
      "id": 71282
  },
  {
      "name": "nepalwomen",
      "id": 26768
  },
  {
      "name": "nepalirhinos",
      "id": 120532
  },
  {
      "name": "nepalirhinosallstars",
      "id": 120495
  },
  {
      "name": "netherlands",
      "id": 1824
  },
  {
      "name": "netherlandsa",
      "id": 119868
  },
  {
      "name": "netherlandsunder-15s",
      "id": 81322
  },
  {
      "name": "netherlandsunder-19s",
      "id": 42410
  },
  {
      "name": "netherlandswomen",
      "id": 14627
  },
  {
      "name": "netherlandswomenu19",
      "id": 125690
  },
  {
      "name": "netherlandsxi",
      "id": 121557
  },
  {
      "name": "nevis",
      "id": 105485
  },
  {
      "name": "newcollege",
      "id": 127570
  },
  {
      "name": "newenglandeagles",
      "id": 127980
  },
  {
      "name": "newjerseysomersetcavaliers",
      "id": 127976
  },
  {
      "name": "newjerseystallions",
      "id": 125795
  },
  {
      "name": "newjerseytriton's",
      "id": 127961
  },
  {
      "name": "newsouthwales",
      "id": 8284
  },
  {
      "name": "newsouthwalesbreakerswomen",
      "id": 26269
  },
  {
      "name": "newsouthwalesunder-23s",
      "id": 25982
  },
  {
      "name": "newsouthwalesxi",
      "id": 107473
  },
  {
      "name": "newterritoriestigers",
      "id": 118769
  },
  {
      "name": "newwinthorpeslions",
      "id": 127367
  },
  {
      "name": "newyorkregion",
      "id": 31060
  },
  {
      "name": "newyorkstrikers",
      "id": 126862
  },
  {
      "name": "newyorkwarriors",
      "id": 127962
  },
  {
      "name": "newzealand",
      "id": 7
  },
  {
      "name": "newzealanda",
      "id": 11394
  },
  {
      "name": "newzealandboardpresident'sxi",
      "id": 107980
  },
  {
      "name": "newzealandchairman'sxi",
      "id": 107979
  },
  {
      "name": "newzealandcricketxi",
      "id": 105665
  },
  {
      "name": "newzealanddistrictassociationxi",
      "id": 128105
  },
  {
      "name": "newzealandinvitationxi",
      "id": 105218
  },
  {
      "name": "newzealandlegends",
      "id": 126042
  },
  {
      "name": "newzealandover-50s",
      "id": 114675
  },
  {
      "name": "newzealandselect",
      "id": 108550
  },
  {
      "name": "newzealandunder-19s",
      "id": 1068
  },
  {
      "name": "newzealandwomen",
      "id": 8650
  },
  {
      "name": "newzealandwomenunder-19s",
      "id": 126918
  },
  {
      "name": "newzealandxi",
      "id": 27444
  },
  {
      "name": "newzealandxiwomen",
      "id": 127037
  },
  {
      "name": "newzealand-v",
      "id": 116121
  },
  {
      "name": "newzealanders",
      "id": 105051
  },
  {
      "name": "nflfalcons",
      "id": 123104
  },
  {
      "name": "ngorongoroqueens",
      "id": 128129
  },
  {
      "name": "niagarawonders",
      "id": 116111
  },
  {
      "name": "nibmanagement",
      "id": 38280
  },
  {
      "name": "nicaragua",
      "id": 120922
  },
  {
      "name": "nickyoppenheimerxi",
      "id": 128088
  },
  {
      "name": "nicosiatigerscc",
      "id": 116187
  },
  {
      "name": "nicosiaxifighterscc",
      "id": 116485
  },
  {
      "name": "niger",
      "id": 120924
  },
  {
      "name": "nigeria",
      "id": 10533
  },
  {
      "name": "nigeriaunder-19s",
      "id": 42287
  },
  {
      "name": "nigeriawomen",
      "id": 120222
  },
  {
      "name": "nightcliffcricketclub",
      "id": 115886
  },
  {
      "name": "nileknights",
      "id": 42491
  },
  {
      "name": "nirvanas.a",
      "id": 123432
  },
  {
      "name": "nittabuwaladies",
      "id": 15610
  },
  {
      "name": "nlcbrevellers",
      "id": 113770
  },
  {
      "name": "noidasuperkings",
      "id": 128004
  },
  {
      "name": "nondescriptscricketclub",
      "id": 12057
  },
  {
      "name": "noorcmacademy",
      "id": 127661
  },
  {
      "name": "norfolk",
      "id": 7537
  },
  {
      "name": "norfolkwomen",
      "id": 19242
  },
  {
      "name": "norfolkxi",
      "id": 4062
  },
  {
      "name": "north",
      "id": 5391
  },
  {
      "name": "north(southafrica)",
      "id": 38266
  },
  {
      "name": "north24-pgschamps",
      "id": 122337
  },
  {
      "name": "northcentralprovincewomen",
      "id": 42564
  },
  {
      "name": "northeastregion",
      "id": 31059
  },
  {
      "name": "northeastzone",
      "id": 126052
  },
  {
      "name": "northeastzonewomen",
      "id": 126783
  },
  {
      "name": "northhollandhurricanes",
      "id": 19768
  },
  {
      "name": "northisland",
      "id": 14567
  },
  {
      "name": "northkantolions",
      "id": 116247
  },
  {
      "name": "northmacedonia",
      "id": 120926
  },
  {
      "name": "northmumbaipanthers",
      "id": 113025
  },
  {
      "name": "northwestdragons",
      "id": 12705
  },
  {
      "name": "northwestregion",
      "id": 31070
  },
  {
      "name": "northwestunder-13s",
      "id": 14908
  },
  {
      "name": "northwestunder-15s",
      "id": 37869
  },
  {
      "name": "northwestunder-17s",
      "id": 15031
  },
  {
      "name": "northwestunder-19s",
      "id": 16726
  },
  {
      "name": "northwestuniversity",
      "id": 27216
  },
  {
      "name": "northwestwarriors",
      "id": 127810
  },
  {
      "name": "northwestwomen",
      "id": 15235
  },
  {
      "name": "northwomen(southafrica)",
      "id": 38269
  },
  {
      "name": "northzone",
      "id": 8233
  },
  {
      "name": "northzone(bangladesh)",
      "id": 12448
  },
  {
      "name": "northzonewomen",
      "id": 126778
  },
  {
      "name": "north-eastcombinedladies",
      "id": 15611
  },
  {
      "name": "north-westwarriors",
      "id": 19955
  },
  {
      "name": "northamptonshire",
      "id": 7038
  },
  {
      "name": "northamptonshire2ndxi",
      "id": 18488
  },
  {
      "name": "northamptonshirewomen",
      "id": 19228
  },
  {
      "name": "northern(pakistan)",
      "id": 113753
  },
  {
      "name": "northern2ndxi(pakistan)",
      "id": 117160
  },
  {
      "name": "northernbravewomen",
      "id": 15338
  },
  {
      "name": "northerncape",
      "id": 12695
  },
  {
      "name": "northerncapewomen",
      "id": 15226
  },
  {
      "name": "northerndiamonds",
      "id": 116533
  },
  {
      "name": "northerndistrictsa",
      "id": 38081
  },
  {
      "name": "northerndistrictsunder-21swomen",
      "id": 38048
  },
  {
      "name": "northernknights",
      "id": 113540
  },
  {
      "name": "northernknights",
      "id": 13226
  },
  {
      "name": "northernstrikers",
      "id": 116328
  },
  {
      "name": "northernsuburbs",
      "id": 127992
  },
  {
      "name": "northernsuperchargers(men)",
      "id": 120626
  },
  {
      "name": "northernsuperchargers(women)",
      "id": 120643
  },
  {
      "name": "northernterritory",
      "id": 27442
  },
  {
      "name": "northernterritorychiefminister'sxi",
      "id": 105044
  },
  {
      "name": "northerntide",
      "id": 125169
  },
  {
      "name": "northernwarriors",
      "id": 112000
  },
  {
      "name": "northerns",
      "id": 12724
  },
  {
      "name": "northerns(zimbabwe)",
      "id": 122694
  },
  {
      "name": "northernsunder-13s",
      "id": 14888
  },
  {
      "name": "northernsunder-15s",
      "id": 37880
  },
  {
      "name": "northernsunder-17s",
      "id": 15050
  },
  {
      "name": "northernsunder-19s",
      "id": 16729
  },
  {
      "name": "northernswomen",
      "id": 15234
  },
  {
      "name": "northernswomens",
      "id": 128122
  },
  {
      "name": "northernsxi",
      "id": 27779
  },
  {
      "name": "northumberland",
      "id": 8913
  },
  {
      "name": "northumberlandwomen",
      "id": 19243
  },
  {
      "name": "norway",
      "id": 19682
  },
  {
      "name": "norwayunder-19s",
      "id": 81167
  },
  {
      "name": "norwaywomen",
      "id": 124853
  },
  {
      "name": "nottingham",
      "id": 4434
  },
  {
      "name": "nottinghamshire",
      "id": 6035
  },
  {
      "name": "nottinghamshire2ndxi",
      "id": 18437
  },
  {
      "name": "nottinghamshireandleicestershire",
      "id": 3436
  },
  {
      "name": "nottinghamshireandsussex",
      "id": 5754
  },
  {
      "name": "nottinghamshirewomen",
      "id": 19222
  },
  {
      "name": "nottinghamshirexi",
      "id": 5306
  },
  {
      "name": "nscolts",
      "id": 126813
  },
  {
      "name": "ntstrike",
      "id": 127951
  },
  {
      "name": "nugegodasportswelfareclub",
      "id": 38724
  },
  {
      "name": "nutmegwarriors",
      "id": 120152
  },
  {
      "name": "nuwaraeliyadistrict",
      "id": 108061
  },
  {
      "name": "nzcwintertrainingsquad",
      "id": 15202
  },
  {
      "name": "ocean7",
      "id": 127663
  },
  {
      "name": "odisha",
      "id": 12968
  },
  {
      "name": "odishabluewomen",
      "id": 117819
  },
  {
      "name": "odishacheetahs",
      "id": 117219
  },
  {
      "name": "odishagreen",
      "id": 118044
  },
  {
      "name": "odishajaguars",
      "id": 117221
  },
  {
      "name": "odishalions",
      "id": 117217
  },
  {
      "name": "odishapanthers",
      "id": 117224
  },
  {
      "name": "odishapinkwomen",
      "id": 117818
  },
  {
      "name": "odishapumas",
      "id": 117226
  },
  {
      "name": "odishapurple",
      "id": 118041
  },
  {
      "name": "odishared",
      "id": 118042
  },
  {
      "name": "odishatigers",
      "id": 117215
  },
  {
      "name": "odishaviolet",
      "id": 118043
  },
  {
      "name": "odishawomen",
      "id": 15975
  },
  {
      "name": "odishawomencc",
      "id": 128050
  },
  {
      "name": "odishayellow",
      "id": 118046
  },
  {
      "name": "odisha-a",
      "id": 128037
  },
  {
      "name": "odisha-b",
      "id": 128045
  },
  {
      "name": "oeiras",
      "id": 119000
  },
  {
      "name": "oeirascc",
      "id": 116756
  },
  {
      "name": "olddohssportsclub",
      "id": 23709
  },
  {
      "name": "oldetonians",
      "id": 2712
  },
  {
      "name": "oldwestminsters",
      "id": 2962
  },
  {
      "name": "oldwykehamists",
      "id": 3912
  },
  {
      "name": "oldfield",
      "id": 2906
  },
  {
      "name": "ollytappsxi",
      "id": 115855
  },
  {
      "name": "oltencc",
      "id": 115975
  },
  {
      "name": "oman",
      "id": 1546
  },
  {
      "name": "omana",
      "id": 113940
  },
  {
      "name": "omanemergingteam",
      "id": 112046
  },
  {
      "name": "omanunder-19s",
      "id": 113636
  },
  {
      "name": "omanwomen",
      "id": 114381
  },
  {
      "name": "orangedragons",
      "id": 127897
  },
  {
      "name": "orissa",
      "id": 105765
  },
  {
      "name": "orissacricketassociationxi",
      "id": 72323
  },
  {
      "name": "orlandogalaxy",
      "id": 125365
  },
  {
      "name": "osmanicc",
      "id": 128038
  },
  {
      "name": "ostendcc",
      "id": 125932
  },
  {
      "name": "ostendexiles",
      "id": 116418
  },
  {
      "name": "otagoa",
      "id": 38077
  },
  {
      "name": "otagosparks",
      "id": 15335
  },
  {
      "name": "otagounder-21swomen",
      "id": 38045
  },
  {
      "name": "otagovolts",
      "id": 13229
  },
  {
      "name": "otaniemicc",
      "id": 115898
  },
  {
      "name": "oursouqcricketclub",
      "id": 127715
  },
  {
      "name": "ovalinvincibles(men)",
      "id": 120614
  },
  {
      "name": "ovalinvincibles(women)",
      "id": 120631
  },
  {
      "name": "over38",
      "id": 3705
  },
  {
      "name": "overseascc",
      "id": 117023
  },
  {
      "name": "overseaswarriors",
      "id": 125814
  },
  {
      "name": "oxfordandcambridgeuniversities",
      "id": 5733
  },
  {
      "name": "oxfordmccu",
      "id": 9801
  },
  {
      "name": "oxforduniversity",
      "id": 4506
  },
  {
      "name": "oxforduniversitywomen",
      "id": 19939
  },
  {
      "name": "oxfordshire",
      "id": 7546
  },
  {
      "name": "oxfordshirewomen",
      "id": 19207
  },
  {
      "name": "pdeskularatnecollege",
      "id": 15542
  },
  {
      "name": "paarlboyshighschool",
      "id": 27238
  },
  {
      "name": "paarlgymnasium",
      "id": 16246
  },
  {
      "name": "paarlrocks",
      "id": 111912
  },
  {
      "name": "paarlroyals",
      "id": 127098
  },
  {
      "name": "pacers",
      "id": 127793
  },
  {
      "name": "pachaiyappascollege",
      "id": 127573
  },
  {
      "name": "pacificgroup",
      "id": 126113
  },
  {
      "name": "paddyfoleystokyo",
      "id": 126251
  },
  {
      "name": "padova",
      "id": 118817
  },
  {
      "name": "padovacc",
      "id": 125312
  },
  {
      "name": "padovacricketclub",
      "id": 116922
  },
  {
      "name": "pakeagles",
      "id": 124655
  },
  {
      "name": "pakicare",
      "id": 116974
  },
  {
      "name": "paklionsghedi",
      "id": 119033
  },
  {
      "name": "pakriders",
      "id": 127802
  },
  {
      "name": "pakunited",
      "id": 122361
  },
  {
      "name": "pakcelonacc",
      "id": 116823
  },
  {
      "name": "pakhtoonzalmi",
      "id": 127956
  },
  {
      "name": "pakhtoons",
      "id": 111998
  },
  {
      "name": "pakistan",
      "id": 13
  },
  {
      "name": "pakistana",
      "id": 127915
  },
  {
      "name": "pakistanawomen",
      "id": 120462
  },
  {
      "name": "pakistanallstarxi",
      "id": 66685
  },
  {
      "name": "pakistanassociationofhongkong",
      "id": 15171
  },
  {
      "name": "pakistancc",
      "id": 116435
  },
  {
      "name": "pakistanchiefministersxi",
      "id": 37713
  },
  {
      "name": "pakistancricketboardblues",
      "id": 66297
  },
  {
      "name": "pakistancricketboardchairman'sxi",
      "id": 37714
  },
  {
      "name": "pakistancricketboardgreens",
      "id": 66298
  },
  {
      "name": "pakistancricketboardpatron'sxi",
      "id": 105191
  },
  {
      "name": "pakistancricketboardxi",
      "id": 74992
  },
  {
      "name": "pakistancustoms",
      "id": 105242
  },
  {
      "name": "pakistaneagles",
      "id": 127694
  },
  {
      "name": "pakistanemergingteam",
      "id": 40399
  },
  {
      "name": "pakistaninternationalairlines",
      "id": 14794
  },
  {
      "name": "pakistanlegends",
      "id": 123023
  },
  {
      "name": "pakistanover-50s",
      "id": 114671
  },
  {
      "name": "pakistanshaheens",
      "id": 10046
  },
  {
      "name": "pakistantelevision",
      "id": 21324
  },
  {
      "name": "pakistanunder-19s",
      "id": 1148
  },
  {
      "name": "pakistanunder-25s",
      "id": 71296
  },
  {
      "name": "pakistanwomen",
      "id": 10259
  },
  {
      "name": "pakistanwomenemergingplayers",
      "id": 113801
  },
  {
      "name": "pakistanwomenunder-19s",
      "id": 127117
  },
  {
      "name": "pakistanxi",
      "id": 124866
  },
  {
      "name": "pakistan-v",
      "id": 115409
  },
  {
      "name": "pakistanskaforening",
      "id": 115839
  },
  {
      "name": "paktiapanthers",
      "id": 111753
  },
  {
      "name": "paktiaprovince",
      "id": 123623
  },
  {
      "name": "palau",
      "id": 120927
  },
  {
      "name": "palestine",
      "id": 120929
  },
  {
      "name": "palinksportsclubwomen",
      "id": 30623
  },
  {
      "name": "palmerstoncricketclub",
      "id": 115890
  },
  {
      "name": "pamirlegends",
      "id": 124600
  },
  {
      "name": "pamirzalmi",
      "id": 125426
  },
  {
      "name": "panadurasportsclub",
      "id": 34489
  },
  {
      "name": "panama",
      "id": 120931
  },
  {
      "name": "pandaswomen",
      "id": 127817
  },
  {
      "name": "pantherheroes",
      "id": 114913
  },
  {
      "name": "panthersdominatorskuwait",
      "id": 127599
  },
  {
      "name": "panthersxi",
      "id": 116988
  },
  {
      "name": "papuanewguinea",
      "id": 9119
  },
  {
      "name": "papuanewguineaunder-19s",
      "id": 15303
  },
  {
      "name": "papuanewguineawomen",
      "id": 14623
  },
  {
      "name": "paraguay",
      "id": 120933
  },
  {
      "name": "parakeetbuccaneers",
      "id": 127836
  },
  {
      "name": "partexsportingclub",
      "id": 23702
  },
  {
      "name": "pataudicricketclub",
      "id": 127785
  },
  {
      "name": "patnapilots",
      "id": 118645
  },
  {
      "name": "patnawarriors",
      "id": 127699
  },
  {
      "name": "patriots",
      "id": 124744
  },
  {
      "name": "patron'sxi",
      "id": 128079
  },
  {
      "name": "paviaeagles",
      "id": 125187
  },
  {
      "name": "pcamastersxi",
      "id": 41358
  },
  {
      "name": "pcapresident'sxi",
      "id": 128071
  },
  {
      "name": "pcbblasters",
      "id": 117045
  },
  {
      "name": "pcbchallengers",
      "id": 117047
  },
  {
      "name": "pcbdynamites",
      "id": 117046
  },
  {
      "name": "pcbstrikers",
      "id": 121498
  },
  {
      "name": "pcctunited",
      "id": 115489
  },
  {
      "name": "peacecricketclub",
      "id": 27141
  },
  {
      "name": "pearlgladiators",
      "id": 113965
  },
  {
      "name": "pelicans",
      "id": 127076
  },
  {
      "name": "pelicanswomen",
      "id": 127818
  },
  {
      "name": "penang",
      "id": 128019
  },
  {
      "name": "perak",
      "id": 126179
  },
  {
      "name": "perthscorchers",
      "id": 14214
  },
  {
      "name": "perthscorcherswomen",
      "id": 15802
  },
  {
      "name": "peru",
      "id": 120935
  },
  {
      "name": "peruwomen",
      "id": 127622
  },
  {
      "name": "peshawar",
      "id": 11400
  },
  {
      "name": "peshawarregion",
      "id": 13648
  },
  {
      "name": "peshawarzalmi",
      "id": 14467
  },
  {
      "name": "petersburg",
      "id": 113436
  },
  {
      "name": "petersburgsporting",
      "id": 123326
  },
  {
      "name": "petworth",
      "id": 6505
  },
  {
      "name": "phantomcc",
      "id": 127757
  },
  {
      "name": "phantomwarriors",
      "id": 115918
  },
  {
      "name": "philippines",
      "id": 112684
  },
  {
      "name": "philippineswomen",
      "id": 127764
  },
  {
      "name": "phoenixcc",
      "id": 127753
  },
  {
      "name": "phoenixcricketers",
      "id": 128064
  },
  {
      "name": "pianoro",
      "id": 118522
  },
  {
      "name": "piclibertablackhawks",
      "id": 127368
  },
  {
      "name": "pigottscrushers",
      "id": 127369
  },
  {
      "name": "pinatar",
      "id": 114233
  },
  {
      "name": "pindiboysdefenderscc",
      "id": 125816
  },
  {
      "name": "pinkpower",
      "id": 121994
  },
  {
      "name": "pinkwarriors",
      "id": 127899
  },
  {
      "name": "pintcricketclub",
      "id": 115887
  },
  {
      "name": "pioltellounited",
      "id": 118911
  },
  {
      "name": "pirates",
      "id": 123006
  },
  {
      "name": "pithoragarhchamps",
      "id": 127880
  },
  {
      "name": "players",
      "id": 3551
  },
  {
      "name": "playersofnottinghamshire",
      "id": 6136
  },
  {
      "name": "plazazone",
      "id": 127967
  },
  {
      "name": "plusinfinitytigers",
      "id": 115166
  },
  {
      "name": "plzenguardians",
      "id": 124843
  },
  {
      "name": "pokharaavengers",
      "id": 127228
  },
  {
      "name": "pokharapaltan",
      "id": 114081
  },
  {
      "name": "pokharapaltanwomen",
      "id": 113785
  },
  {
      "name": "pokhararhinos",
      "id": 112084
  },
  {
      "name": "poland",
      "id": 120937
  },
  {
      "name": "police",
      "id": 127370
  },
  {
      "name": "policesportsclub",
      "id": 72931
  },
  {
      "name": "polonnaruwacombineschools",
      "id": 27000
  },
  {
      "name": "polonnaruwadistrict",
      "id": 108067
  },
  {
      "name": "polonnaruwaladies",
      "id": 15606
  },
  {
      "name": "pondicherrynorthxi",
      "id": 126717
  },
  {
      "name": "pondicherrysouthxi",
      "id": 126721
  },
  {
      "name": "pondicherryveteranspresidentxi",
      "id": 127276
  },
  {
      "name": "pondicherryveteranssecretaryxi",
      "id": 127277
  },
  {
      "name": "pondicherrywestxi",
      "id": 126719
  },
  {
      "name": "pondicherrywomen",
      "id": 118290
  },
  {
      "name": "portqasimauthority",
      "id": 11420
  },
  {
      "name": "portowanderers",
      "id": 119030
  },
  {
      "name": "portugal",
      "id": 69725
  },
  {
      "name": "powercc",
      "id": 116034
  },
  {
      "name": "powergaints",
      "id": 114918
  },
  {
      "name": "powergladiators",
      "id": 116022
  },
  {
      "name": "powerhitter",
      "id": 116064
  },
  {
      "name": "powergenpenalsc",
      "id": 124566
  },
  {
      "name": "powerhousesharks",
      "id": 115698
  },
  {
      "name": "praguebarbarianscc",
      "id": 124845
  },
  {
      "name": "praguebarbariansvandals",
      "id": 116049
  },
  {
      "name": "praguebarbariansvisigoths",
      "id": 115926
  },
  {
      "name": "praguecc",
      "id": 124844
  },
  {
      "name": "praguecckings",
      "id": 115929
  },
  {
      "name": "pragueccknights",
      "id": 115964
  },
  {
      "name": "pragueccrooks",
      "id": 116046
  },
  {
      "name": "praguespartanscc",
      "id": 124847
  },
  {
      "name": "praguespartansmobilizers",
      "id": 116047
  },
  {
      "name": "praguespartansvanguards",
      "id": 115967
  },
  {
      "name": "praguetigerscc",
      "id": 124848
  },
  {
      "name": "prathibhacricketclub",
      "id": 121289
  },
  {
      "name": "premierleagueunder-19",
      "id": 127820
  },
  {
      "name": "presidencycollege",
      "id": 127560
  },
  {
      "name": "presidentxiveterans",
      "id": 126879
  },
  {
      "name": "president'sxi",
      "id": 127778
  },
  {
      "name": "presidentsxi",
      "id": 115857
  },
  {
      "name": "presstij",
      "id": 126815
  },
  {
      "name": "pretoriacapitals",
      "id": 127102
  },
  {
      "name": "pretoriamavericks",
      "id": 104938
  },
  {
      "name": "preysalsc",
      "id": 124567
  },
  {
      "name": "primheighttransport",
      "id": 123098
  },
  {
      "name": "primebankcricketclub",
      "id": 23714
  },
  {
      "name": "primedoleshwarsportingclub",
      "id": 23697
  },
  {
      "name": "primeminister'sxi",
      "id": 90718
  },
  {
      "name": "primesportscricketclub",
      "id": 118328
  },
  {
      "name": "princeofwalescollege",
      "id": 27006
  },
  {
      "name": "princesswomen",
      "id": 124965
  },
  {
      "name": "prisonssportsclub",
      "id": 124635
  },
  {
      "name": "profilbauvictoriaunited",
      "id": 124560
  },
  {
      "name": "prosperutseyaxi",
      "id": 38168
  },
  {
      "name": "prosports",
      "id": 127657
  },
  {
      "name": "provincenumber1",
      "id": 118018
  },
  {
      "name": "provincenumber2",
      "id": 118024
  },
  {
      "name": "provincenumber2under-19s",
      "id": 122453
  },
  {
      "name": "psm-xi",
      "id": 124905
  },
  {
      "name": "psvaachen",
      "id": 115956
  },
  {
      "name": "puducherry",
      "id": 111569
  },
  {
      "name": "puertorico",
      "id": 120939
  },
  {
      "name": "pulaupinang",
      "id": 126176
  },
  {
      "name": "punedevils",
      "id": 118048
  },
  {
      "name": "punewarriors",
      "id": 40437
  },
  {
      "name": "puneribappa",
      "id": 127851
  },
  {
      "name": "punjab",
      "id": 120436
  },
  {
      "name": "punjab",
      "id": 12965
  },
  {
      "name": "punjab(pakistan)",
      "id": 29525
  },
  {
      "name": "punjabbadshahs",
      "id": 24143
  },
  {
      "name": "punjabblue",
      "id": 120527
  },
  {
      "name": "punjabcc",
      "id": 123983
  },
  {
      "name": "punjabcollegebahawalpur",
      "id": 30693
  },
  {
      "name": "punjabcricketassociationxi",
      "id": 86123
  },
  {
      "name": "punjabkings",
      "id": 627
  },
  {
      "name": "punjablionscc",
      "id": 116181
  },
  {
      "name": "punjabpatakas",
      "id": 115480
  },
  {
      "name": "punjabrotterdam",
      "id": 124265
  },
  {
      "name": "punjabstallions",
      "id": 105862
  },
  {
      "name": "punjabunder-19",
      "id": 121740
  },
  {
      "name": "punjabuniversitylahore",
      "id": 30710
  },
  {
      "name": "punjabwarriors",
      "id": 118161
  },
  {
      "name": "punjabwomen",
      "id": 15979
  },
  {
      "name": "punjabilegends",
      "id": 112002
  },
  {
      "name": "purpleblazers",
      "id": 127898
  },
  {
      "name": "puttalamdistrict",
      "id": 108056
  },
  {
      "name": "puttlumstars",
      "id": 116019
  },
  {
      "name": "pvhurricanes",
      "id": 120470
  },
  {
      "name": "qalandars",
      "id": 113853
  },
  {
      "name": "qatar",
      "id": 112190
  },
  {
      "name": "qatarunder-19s",
      "id": 42228
  },
  {
      "name": "qatarwomen",
      "id": 122207
  },
  {
      "name": "qiecocc",
      "id": 127755
  },
  {
      "name": "qpcci",
      "id": 124564
  },
  {
      "name": "qpccii",
      "id": 124565
  },
  {
      "name": "quadsuperkings",
      "id": 127736
  },
  {
      "name": "qudraninternational",
      "id": 123105
  },
  {
      "name": "queenswomen",
      "id": 124964
  },
  {
      "name": "queensland",
      "id": 8280
  },
  {
      "name": "queenslandacademyofsport",
      "id": 27508
  },
  {
      "name": "queenslandacademyofsportinvitation",
      "id": 128100
  },
  {
      "name": "queenslandfirewomen",
      "id": 26273
  },
  {
      "name": "queenslandunder-23s",
      "id": 25967
  },
  {
      "name": "quetta",
      "id": 21331
  },
  {
      "name": "quettabears",
      "id": 105882
  },
  {
      "name": "quettagladiators",
      "id": 14465
  },
  {
      "name": "quettaregion",
      "id": 13590
  },
  {
      "name": "quivive",
      "id": 121352
  },
  {
      "name": "qurumthunders",
      "id": 122617
  },
  {
      "name": "qwikcricketclub",
      "id": 122360
  },
  {
      "name": "rleigh'sxi",
      "id": 2914
  },
  {
      "name": "rwhitehead'sxi",
      "id": 3357
  },
  {
      "name": "radialclub",
      "id": 123427
  },
  {
      "name": "ragamacricketclub",
      "id": 12064
  },
  {
      "name": "railways",
      "id": 12979
  },
  {
      "name": "railways(india)women",
      "id": 15960
  },
  {
      "name": "railwayswomen",
      "id": 122240
  },
  {
      "name": "rajasthan",
      "id": 12972
  },
  {
      "name": "rajasthanclubwomen",
      "id": 123093
  },
  {
      "name": "rajasthancricketassociationxi",
      "id": 72342
  },
  {
      "name": "rajasthanrangers",
      "id": 115481
  },
  {
      "name": "rajasthanroyals",
      "id": 629
  },
  {
      "name": "rajasthanunder-19",
      "id": 121788
  },
  {
      "name": "rajasthanwomen",
      "id": 15982
  },
  {
      "name": "rajasthanyouthcricketclub",
      "id": 118332
  },
  {
      "name": "rajbirajtheking",
      "id": 127867
  },
  {
      "name": "rajkotthunder",
      "id": 123802
  },
  {
      "name": "rajpurlion",
      "id": 115284
  },
  {
      "name": "rajputs",
      "id": 111996
  },
  {
      "name": "rajshahidivision",
      "id": 11283
  },
  {
      "name": "rajshahidivisionunder-14s",
      "id": 63077
  },
  {
      "name": "rajshahidivisionunder-18s",
      "id": 63258
  },
  {
      "name": "rajshahiroyals",
      "id": 65163
  },
  {
      "name": "rambaghwolves",
      "id": 125085
  },
  {
      "name": "ramhlunvenglaicricketclub",
      "id": 124255
  },
  {
      "name": "ranchiraiders",
      "id": 116732
  },
  {
      "name": "ranchiroseswomen",
      "id": 118150
  },
  {
      "name": "rangers",
      "id": 114437
  },
  {
      "name": "rangers",
      "id": 127794
  },
  {
      "name": "rangpurdivision",
      "id": 11291
  },
  {
      "name": "rangpurdivisionunder-14s",
      "id": 63078
  },
  {
      "name": "rangpurdivisionunder-18s",
      "id": 63230
  },
  {
      "name": "rangpurriders",
      "id": 14090
  },
  {
      "name": "ranipet",
      "id": 127397
  },
  {
      "name": "rasai",
      "id": 126677
  },
  {
      "name": "ratnagirijets",
      "id": 127855
  },
  {
      "name": "ratnapuradistrict",
      "id": 108055
  },
  {
      "name": "ravalsportingcc",
      "id": 116825
  },
  {
      "name": "rawalakothawks",
      "id": 125808
  },
  {
      "name": "rawalpindi",
      "id": 11404
  },
  {
      "name": "rawalpindiraiders",
      "id": 126352
  },
  {
      "name": "rawalpindirams",
      "id": 107007
  },
  {
      "name": "rawalpindiregion",
      "id": 13632
  },
  {
      "name": "rayalaseemakings",
      "id": 125260
  },
  {
      "name": "rayanxi",
      "id": 128065
  },
  {
      "name": "razeesyodhas",
      "id": 115787
  },
  {
      "name": "rcdresden",
      "id": 116320
  },
  {
      "name": "rcacentreofexcellence",
      "id": 106136
  },
  {
      "name": "rdusamparmy",
      "id": 120494
  },
  {
      "name": "redrangers",
      "id": 127894
  },
  {
      "name": "redlands",
      "id": 127993
  },
  {
      "name": "rehankhanevents",
      "id": 123803
  },
  {
      "name": "reivers",
      "id": 19764
  },
  {
      "name": "reliance1",
      "id": 127649
  },
  {
      "name": "renegades",
      "id": 127795
  },
  {
      "name": "renegadesk",
      "id": 128066
  },
  {
      "name": "restofindia",
      "id": 8515
  },
  {
      "name": "restofsouthafrica",
      "id": 128073
  },
  {
      "name": "restofsrilanka",
      "id": 40344
  },
  {
      "name": "restofthealphabet",
      "id": 2384
  },
  {
      "name": "restoftheworldwomen'sxi",
      "id": 29724
  },
  {
      "name": "restoftheworldxi",
      "id": 30612
  },
  {
      "name": "reykjavikvikings",
      "id": 116254
  },
  {
      "name": "rhein-ruhrsports",
      "id": 128009
  },
  {
      "name": "rhinochallengers",
      "id": 119750
  },
  {
      "name": "richelieueagles",
      "id": 125957
  },
  {
      "name": "richmondcollege",
      "id": 15541
  },
  {
      "name": "riftvalleyrhinos",
      "id": 69864
  },
  {
      "name": "rightguardscc",
      "id": 127690
  },
  {
      "name": "right-handed",
      "id": 2656
  },
  {
      "name": "ripollwarriors",
      "id": 118117
  },
  {
      "name": "risingpunesupergiant",
      "id": 10059
  },
  {
      "name": "risingsmashers",
      "id": 122362
  },
  {
      "name": "risingstars",
      "id": 126252
  },
  {
      "name": "risingstars3cricketclub",
      "id": 116052
  },
  {
      "name": "risingstarschuis",
      "id": 42494
  },
  {
      "name": "risingstarshapur",
      "id": 115208
  },
  {
      "name": "risingsunspartans",
      "id": 127371
  },
  {
      "name": "riyaancc",
      "id": 116483
  },
  {
      "name": "rizvimumbai",
      "id": 31006
  },
  {
      "name": "rnnewman'sxi",
      "id": 2913
  },
  {
      "name": "roc",
      "id": 120942
  },
  {
      "name": "rockzone",
      "id": 127968
  },
  {
      "name": "rockets",
      "id": 127796
  },
  {
      "name": "rocks",
      "id": 34388
  },
  {
      "name": "rockstars",
      "id": 26722
  },
  {
      "name": "rogers11",
      "id": 115954
  },
  {
      "name": "romacapannellecricketclub",
      "id": 116558
  },
  {
      "name": "romacricketclub",
      "id": 116550
  },
  {
      "name": "romagladiatori",
      "id": 128025
  },
  {
      "name": "romania",
      "id": 116844
  },
  {
      "name": "romaniaa",
      "id": 127983
  },
  {
      "name": "romaniawomen",
      "id": 125867
  },
  {
      "name": "romebanglacricketclub",
      "id": 116555
  },
  {
      "name": "romebanglamorningsun",
      "id": 125429
  },
  {
      "name": "romilvibgyorevents",
      "id": 124106
  },
  {
      "name": "rosezone",
      "id": 127972
  },
  {
      "name": "rossiocc",
      "id": 116748
  },
  {
      "name": "rotterdam",
      "id": 113438
  },
  {
      "name": "rotterdamrhinos",
      "id": 113407
  },
  {
      "name": "rowlincricketacademy",
      "id": 31088
  },
  {
      "name": "royalbergamo",
      "id": 125153
  },
  {
      "name": "royalbrussels",
      "id": 125933
  },
  {
      "name": "royalcclisbon",
      "id": 116754
  },
  {
      "name": "royalchallengerhapur",
      "id": 115836
  },
  {
      "name": "royalchallengersbangalore",
      "id": 646
  },
  {
      "name": "royalchallengersbangalorewomen",
      "id": 127611
  },
  {
      "name": "royalchanganassery",
      "id": 127941
  },
  {
      "name": "royalcollege",
      "id": 26261
  },
  {
      "name": "royalcricketpadova",
      "id": 118818
  },
  {
      "name": "royaleagles",
      "id": 127911
  },
  {
      "name": "royalfalcons",
      "id": 127912
  },
  {
      "name": "royalinstituteofcolombo",
      "id": 38282
  },
  {
      "name": "royalkings",
      "id": 115920
  },
  {
      "name": "royallions",
      "id": 116021
  },
  {
      "name": "royalmalaysianairforce",
      "id": 126812
  },
  {
      "name": "royalparmacricketclub",
      "id": 116919
  },
  {
      "name": "royalphantoms",
      "id": 127920
  },
  {
      "name": "royalrhinos",
      "id": 116373
  },
  {
      "name": "royalromacricketclub",
      "id": 116921
  },
  {
      "name": "royalstarclub",
      "id": 126955
  },
  {
      "name": "royalstrikerxi",
      "id": 127651
  },
  {
      "name": "royalstrikers",
      "id": 120354
  },
  {
      "name": "royaltigers",
      "id": 121997
  },
  {
      "name": "royaltigers",
      "id": 114916
  },
  {
      "name": "royaltigersbudapest",
      "id": 123167
  },
  {
      "name": "royaltigerscricketclub",
      "id": 116471
  },
  {
      "name": "royalwarriors",
      "id": 123549
  },
  {
      "name": "royals",
      "id": 124745
  },
  {
      "name": "rsgkadathanadan",
      "id": 127940
  },
  {
      "name": "rubytrichywarriors",
      "id": 12337
  },
  {
      "name": "rugbycc",
      "id": 127593
  },
  {
      "name": "ruhuna",
      "id": 63988
  },
  {
      "name": "ruhunareds",
      "id": 41135
  },
  {
      "name": "ruhunaroyals",
      "id": 68874
  },
  {
      "name": "rungetters",
      "id": 127838
  },
  {
      "name": "rupandehichallengers",
      "id": 112255
  },
  {
      "name": "rupaniriders",
      "id": 127874
  },
  {
      "name": "rupganjtigerscricketclub",
      "id": 123619
  },
  {
      "name": "rutongocc",
      "id": 115414
  },
  {
      "name": "ruwirangers",
      "id": 122619
  },
  {
      "name": "rwanda",
      "id": 79715
  },
  {
      "name": "rwandawomen",
      "id": 120220
  },
  {
      "name": "rwandawomenunder-19s",
      "id": 127118
  },
  {
      "name": "rwenzoriwarriors",
      "id": 42487
  },
  {
      "name": "s.thomas'college",
      "id": 26262
  },
  {
      "name": "s.thomas'collegebandarawela",
      "id": 27003
  },
  {
      "name": "sasportsclub",
      "id": 128124
  },
  {
      "name": "sabah",
      "id": 126181
  },
  {
      "name": "sachin'sblasters",
      "id": 15739
  },
  {
      "name": "saffronstrikers",
      "id": 120154
  },
  {
      "name": "sagicorhighperformancecentre",
      "id": 31202
  },
  {
      "name": "sagittariusstrikers",
      "id": 16161
  },
  {
      "name": "saitechnology&medicine",
      "id": 38283
  },
  {
      "name": "sainthelena",
      "id": 126872
  },
  {
      "name": "saintkittsandnevis",
      "id": 120944
  },
  {
      "name": "saintlucia",
      "id": 120945
  },
  {
      "name": "saintluciakings",
      "id": 121141
  },
  {
      "name": "saipem",
      "id": 126305
  },
  {
      "name": "saipemcalicut",
      "id": 127935
  },
  {
      "name": "salemspartans",
      "id": 120607
  },
  {
      "name": "salemspartans",
      "id": 127689
  },
  {
      "name": "salland",
      "id": 124266
  },
  {
      "name": "saltpondbreakers",
      "id": 115765
  },
  {
      "name": "saltsjobadencc",
      "id": 116106
  },
  {
      "name": "salzburgcc",
      "id": 116437
  },
  {
      "name": "samdariyafighters",
      "id": 126952
  },
  {
      "name": "sameersimbas",
      "id": 42490
  },
  {
      "name": "samoa",
      "id": 69578
  },
  {
      "name": "samoaunder-19s",
      "id": 42322
  },
  {
      "name": "samoawomen",
      "id": 127765
  },
  {
      "name": "samparmy",
      "id": 120534
  },
  {
      "name": "sandiegosurfriders",
      "id": 125282
  },
  {
      "name": "sanfranciscounicorns",
      "id": 127850
  },
  {
      "name": "sanmarino",
      "id": 120947
  },
  {
      "name": "sandgate-redcliffe",
      "id": 127987
  },
  {
      "name": "sanocc",
      "id": 127824
  },
  {
      "name": "sanpadascorpions",
      "id": 127671
  },
  {
      "name": "saotomeandprincipe",
      "id": 120949
  },
  {
      "name": "saracenssportsclub",
      "id": 12060
  },
  {
      "name": "sarawak",
      "id": 126174
  },
  {
      "name": "sarisarisunrisers",
      "id": 124773
  },
  {
      "name": "saudiarabia",
      "id": 19683
  },
  {
      "name": "saudiarabiaunder-19s",
      "id": 19650
  },
  {
      "name": "saurashtra",
      "id": 13015
  },
  {
      "name": "saurashtracricketassociationxi",
      "id": 72371
  },
  {
      "name": "saurashtraunder-19",
      "id": 126428
  },
  {
      "name": "saurashtrawomen",
      "id": 15964
  },
  {
      "name": "savannahlionscc",
      "id": 122725
  },
  {
      "name": "sbscc",
      "id": 128095
  },
  {
      "name": "sceuropacricket",
      "id": 115955
  },
  {
      "name": "scadssportsclub",
      "id": 116051
  },
  {
      "name": "scarletibisscorchers",
      "id": 123303
  },
  {
      "name": "scorcherswomen",
      "id": 116365
  },
  {
      "name": "scotland",
      "id": 9
  },
  {
      "name": "scotlanda",
      "id": 20084
  },
  {
      "name": "scotlanddevelopmentxi",
      "id": 43249
  },
  {
      "name": "scotlandunder-15s",
      "id": 81329
  },
  {
      "name": "scotlandunder-19s",
      "id": 1175
  },
  {
      "name": "scotlandwomen",
      "id": 14624
  },
  {
      "name": "scotlandwomenunder-19s",
      "id": 125691
  },
  {
      "name": "scotlandxi",
      "id": 126239
  },
  {
      "name": "seasidecc",
      "id": 116136
  },
  {
      "name": "seattleorcas",
      "id": 127847
  },
  {
      "name": "seattlethunderbolts",
      "id": 125230
  },
  {
      "name": "seazenchallengers",
      "id": 128096
  },
  {
      "name": "sebastianitescricketandathleticclub",
      "id": 105653
  },
  {
      "name": "seeduwaraddoluwacricketclub",
      "id": 106624
  },
  {
      "name": "selangor",
      "id": 126177
  },
  {
      "name": "selangorcricketassociationxi",
      "id": 126814
  },
  {
      "name": "senegal",
      "id": 120951
  },
  {
      "name": "sepahijalastarswomen",
      "id": 127259
  },
  {
      "name": "serbia",
      "id": 120400
  },
  {
      "name": "serbiawomen",
      "id": 128014
  },
  {
      "name": "serendibclub",
      "id": 127947
  },
  {
      "name": "services",
      "id": 12973
  },
  {
      "name": "settlers",
      "id": 127077
  },
  {
      "name": "sevendistricts",
      "id": 125817
  },
  {
      "name": "sevendistrictsjuniors",
      "id": 128125
  },
  {
      "name": "sevengentlemenwithfourplayers",
      "id": 4828
  },
  {
      "name": "seville",
      "id": 126191
  },
  {
      "name": "seychelles",
      "id": 66590
  },
  {
      "name": "sfipanterseuro",
      "id": 122405
  },
  {
      "name": "sgeinheithalle",
      "id": 121190
  },
  {
      "name": "sgfindorffe.v.",
      "id": 116057
  },
  {
      "name": "sghainhausen1886",
      "id": 116167
  },
  {
      "name": "sghameln",
      "id": 120144
  },
  {
      "name": "shahx1",
      "id": 127754
  },
  {
      "name": "shaheedjewelxi",
      "id": 14197
  },
  {
      "name": "shaheedmushtaquexi",
      "id": 14198
  },
  {
      "name": "shaheencricketclub",
      "id": 27144
  },
  {
      "name": "shahramdubaiknights",
      "id": 127812
  },
  {
      "name": "shakthiladies",
      "id": 15607
  },
  {
      "name": "shamastylishliving",
      "id": 123100
  },
  {
      "name": "shamshwadifighters",
      "id": 127642
  },
  {
      "name": "sharjah",
      "id": 116225
  },
  {
      "name": "sharjahcricketacademy",
      "id": 126114
  },
  {
      "name": "sharjahwarriors",
      "id": 127171
  },
  {
      "name": "sharksxi",
      "id": 116989
  },
  {
      "name": "sheensports",
      "id": 117538
  },
  {
      "name": "sheffield",
      "id": 4537
  },
  {
      "name": "sheffieldandleicester",
      "id": 4433
  },
  {
      "name": "sheikhjamaldhanmondiclub",
      "id": 23703
  },
  {
      "name": "shekhawatisoldierssikar",
      "id": 128000
  },
  {
      "name": "shekhawatisoorma",
      "id": 121989
  },
  {
      "name": "shellcricketacademyinvitationxi",
      "id": 128099
  },
  {
      "name": "shinepukurcricketclub",
      "id": 111103
  },
  {
      "name": "shivajiparklions",
      "id": 113024
  },
  {
      "name": "shivamoggalions",
      "id": 90177
  },
  {
      "name": "shropshire",
      "id": 7521
  },
  {
      "name": "shropshirewomen",
      "id": 19214
  },
  {
      "name": "sialkot",
      "id": 107730
  },
  {
      "name": "sialkotregion",
      "id": 13639
  },
  {
      "name": "sialkotstallions",
      "id": 17821
  },
  {
      "name": "siechemmaduraipanthers",
      "id": 89961
  },
  {
      "name": "sierraleone",
      "id": 66595
  },
  {
      "name": "sierraleoneunder-19s",
      "id": 42290
  },
  {
      "name": "sierraleonewomen",
      "id": 121523
  },
  {
      "name": "sigtunacc",
      "id": 115847
  },
  {
      "name": "sikif",
      "id": 127832
  },
  {
      "name": "sikkim",
      "id": 111566
  },
  {
      "name": "sikkimwomen",
      "id": 124311
  },
  {
      "name": "siliconvalleystrikers",
      "id": 127977
  },
  {
      "name": "siliconvilleystrikers",
      "id": 125242
  },
  {
      "name": "siliguribikash",
      "id": 122311
  },
  {
      "name": "silverstrikers",
      "id": 127896
  },
  {
      "name": "simbaheroes",
      "id": 119748
  },
  {
      "name": "simbakings",
      "id": 116371
  },
  {
      "name": "sind",
      "id": 106988
  },
  {
      "name": "sinddolphins",
      "id": 105864
  },
  {
      "name": "sindh",
      "id": 29522
  },
  {
      "name": "sindh2ndxi",
      "id": 117162
  },
  {
      "name": "sindhknights",
      "id": 24128
  },
  {
      "name": "sindhis",
      "id": 111995
  },
  {
      "name": "singapore",
      "id": 16199
  },
  {
      "name": "singaporecricketassociation",
      "id": 31095
  },
  {
      "name": "singaporecricketclub",
      "id": 31091
  },
  {
      "name": "singaporeunder-19s",
      "id": 113635
  },
  {
      "name": "singaporewomen",
      "id": 113608
  },
  {
      "name": "singhasportsclub",
      "id": 105654
  },
  {
      "name": "singhbhumstrickers",
      "id": 116733
  },
  {
      "name": "singhbhumstrikers",
      "id": 120652
  },
  {
      "name": "single",
      "id": 4720
  },
  {
      "name": "sinhalesesportsclub",
      "id": 12058
  },
  {
      "name": "sirhmann'sxi",
      "id": 2281
  },
  {
      "name": "siroliversplit",
      "id": 121787
  },
  {
      "name": "sirpaulgetty'sxi",
      "id": 128077
  },
  {
      "name": "sirstvincentcotton'sxi",
      "id": 5000
  },
  {
      "name": "sirtheayagaraya",
      "id": 127575
  },
  {
      "name": "sirwilliamhostevis",
      "id": 126545
  },
  {
      "name": "sixgentlemenwithfiveplayers",
      "id": 4827
  },
  {
      "name": "sixersblaster",
      "id": 114919
  },
  {
      "name": "skkrapids",
      "id": 116315
  },
  {
      "name": "skycricketclub",
      "id": 127672
  },
  {
      "name": "skyinfinity",
      "id": 115917
  },
  {
      "name": "skyways",
      "id": 118146
  },
  {
      "name": "slcblues",
      "id": 121167
  },
  {
      "name": "slcgreens",
      "id": 121166
  },
  {
      "name": "slcgreys",
      "id": 121165
  },
  {
      "name": "slcreds",
      "id": 121168
  },
  {
      "name": "sliinformationtechnology",
      "id": 38275
  },
  {
      "name": "sloggers",
      "id": 123008
  },
  {
      "name": "slovakia",
      "id": 120955
  },
  {
      "name": "slovenia",
      "id": 69637
  },
  {
      "name": "slowbowlers",
      "id": 5849
  },
  {
      "name": "slrcc",
      "id": 128067
  },
  {
      "name": "smashers",
      "id": 124746
  },
  {
      "name": "smasherscricketclub",
      "id": 115947
  },
  {
      "name": "smi",
      "id": 115960
  },
  {
      "name": "snasy",
      "id": 127800
  },
  {
      "name": "sobacricketclub",
      "id": 122365
  },
  {
      "name": "sobosupersonics",
      "id": 113023
  },
  {
      "name": "socaking",
      "id": 123301
  },
  {
      "name": "socallashings",
      "id": 125239
  },
  {
      "name": "socialcricketclub",
      "id": 127789
  },
  {
      "name": "sofiaspartans",
      "id": 127826
  },
  {
      "name": "solapurroyals",
      "id": 127856
  },
  {
      "name": "solomonisland",
      "id": 120958
  },
  {
      "name": "somalia",
      "id": 120960
  },
  {
      "name": "somerset",
      "id": 7010
  },
  {
      "name": "somerset2ndxi",
      "id": 18432
  },
  {
      "name": "somersetcavaliers",
      "id": 120529
  },
  {
      "name": "somersetwomen",
      "id": 19226
  },
  {
      "name": "sonagold&diamonds",
      "id": 126589
  },
  {
      "name": "sonaritownclub",
      "id": 123441
  },
  {
      "name": "sorathlions",
      "id": 113046
  },
  {
      "name": "sorwatheccwomen",
      "id": 127675
  },
  {
      "name": "soufrieresulphur",
      "id": 116005
  },
  {
      "name": "south",
      "id": 5390
  },
  {
      "name": "south",
      "id": 122174
  },
  {
      "name": "south(southafrica)",
      "id": 38267
  },
  {
      "name": "south24-pgstiger",
      "id": 122385
  },
  {
      "name": "southafrica",
      "id": 19
  },
  {
      "name": "southafricaa",
      "id": 17533
  },
  {
      "name": "southafricaacademy",
      "id": 79454
  },
  {
      "name": "southafricaemerging",
      "id": 19636
  },
  {
      "name": "southafricaemergingwomen",
      "id": 128102
  },
  {
      "name": "southafricalegends",
      "id": 114574
  },
  {
      "name": "southafricaover-50s",
      "id": 114663
  },
  {
      "name": "southafricaunder-17sinvitationxi",
      "id": 15417
  },
  {
      "name": "southafricaunder-19s",
      "id": 127933
  },
  {
      "name": "southafricaunder-19s",
      "id": 1012
  },
  {
      "name": "southafricawomen",
      "id": 10279
  },
  {
      "name": "southafricawomenemerging",
      "id": 43193
  },
  {
      "name": "southafricawomenunder-19s",
      "id": 125406
  },
  {
      "name": "southafricaxi",
      "id": 8530
  },
  {
      "name": "southafrica-v",
      "id": 115405
  },
  {
      "name": "southafricanairwayschallengexi",
      "id": 106141
  },
  {
      "name": "southafricanboardpresident'sxi",
      "id": 106140
  },
  {
      "name": "southafricancoltsxi",
      "id": 15407
  },
  {
      "name": "southafricancompositexi",
      "id": 37653
  },
  {
      "name": "southafricaninvitationxi",
      "id": 10731
  },
  {
      "name": "southafricanschools",
      "id": 15406
  },
  {
      "name": "southaustralia",
      "id": 8277
  },
  {
      "name": "southaustraliaunder-23s",
      "id": 25978
  },
  {
      "name": "southaustraliawomen",
      "id": 26276
  },
  {
      "name": "southbrisbane",
      "id": 127985
  },
  {
      "name": "southcastrieslions",
      "id": 116008
  },
  {
      "name": "southcoastsapphireswomen",
      "id": 124531
  },
  {
      "name": "southeastregion",
      "id": 31064
  },
  {
      "name": "southeaststars",
      "id": 116535
  },
  {
      "name": "southhollandseafarers",
      "id": 19770
  },
  {
      "name": "southisland",
      "id": 14568
  },
  {
      "name": "southkantosuperkings",
      "id": 116241
  },
  {
      "name": "southkorea",
      "id": 26804
  },
  {
      "name": "southkoreawomen",
      "id": 26765
  },
  {
      "name": "southsudan",
      "id": 120962
  },
  {
      "name": "southwestregion",
      "id": 31067
  },
  {
      "name": "southwesterndistricts",
      "id": 12712
  },
  {
      "name": "southwesterndistrictsunder-13s",
      "id": 14889
  },
  {
      "name": "southwesterndistrictsunder-15s",
      "id": 37872
  },
  {
      "name": "southwesterndistrictsunder-17s",
      "id": 15027
  },
  {
      "name": "southwesterndistrictsunder-19s",
      "id": 16724
  },
  {
      "name": "southwesterndistrictswomen",
      "id": 15241
  },
  {
      "name": "southwomen(southafrica)",
      "id": 38270
  },
  {
      "name": "southzone",
      "id": 8231
  },
  {
      "name": "southzone(bangladesh)",
      "id": 12447
  },
  {
      "name": "southzonewomen",
      "id": 126779
  },
  {
      "name": "southernbrave(men)",
      "id": 120624
  },
  {
      "name": "southernbrave(women)",
      "id": 120641
  },
  {
      "name": "southerncrusaderscc",
      "id": 117024
  },
  {
      "name": "southerndistrictscc",
      "id": 115889
  },
  {
      "name": "southernexpress",
      "id": 24483
  },
  {
      "name": "southernhitters",
      "id": 116329
  },
  {
      "name": "southernladiescricketclub",
      "id": 30616
  },
  {
      "name": "southernprovincewomen",
      "id": 42568
  },
  {
      "name": "southernpunjab",
      "id": 117165
  },
  {
      "name": "southernpunjab(pakistan)",
      "id": 113754
  },
  {
      "name": "southernpunjab2ndxi(pakistan)",
      "id": 117161
  },
  {
      "name": "southernrocks",
      "id": 123950
  },
  {
      "name": "southernstorm",
      "id": 127892
  },
  {
      "name": "southernstrom",
      "id": 125171
  },
  {
      "name": "southernvipers",
      "id": 104877
  },
  {
      "name": "southernersgold",
      "id": 114888
  },
  {
      "name": "southerns",
      "id": 122695
  },
  {
      "name": "southernswomens",
      "id": 128123
  },
  {
      "name": "spa",
      "id": 114236
  },
  {
      "name": "spain",
      "id": 69740
  },
  {
      "name": "spainunder-19s",
      "id": 81142
  },
  {
      "name": "spainwomen",
      "id": 124546
  },
  {
      "name": "spangaunitedcc",
      "id": 116103
  },
  {
      "name": "sparks",
      "id": 115329
  },
  {
      "name": "sparta1888",
      "id": 116659
  },
  {
      "name": "spartacricket1888",
      "id": 116722
  },
  {
      "name": "spartanblasters",
      "id": 115924
  },
  {
      "name": "spartanheroes",
      "id": 116017
  },
  {
      "name": "spartans",
      "id": 125985
  },
  {
      "name": "speengharregion",
      "id": 14768
  },
  {
      "name": "speenghartigers",
      "id": 15711
  },
  {
      "name": "speengharcricketclub",
      "id": 27150
  },
  {
      "name": "spiritwomen",
      "id": 124533
  },
  {
      "name": "splitindiabrodosplit",
      "id": 121786
  },
  {
      "name": "sportingalfas",
      "id": 122009
  },
  {
      "name": "springboks",
      "id": 27122
  },
  {
      "name": "sreerampursuperstars",
      "id": 127809
  },
  {
      "name": "srilanka",
      "id": 21
  },
  {
      "name": "srilankaa",
      "id": 10048
  },
  {
      "name": "srilankaaemergingplayers",
      "id": 19635
  },
  {
      "name": "srilankaawomen",
      "id": 38712
  },
  {
      "name": "srilankaairforcesportsclub",
      "id": 22196
  },
  {
      "name": "srilankaairforcesportsclubwomen",
      "id": 30622
  },
  {
      "name": "srilankaarmy",
      "id": 12049
  },
  {
      "name": "srilankaarmysportsclub",
      "id": 105841
  },
  {
      "name": "srilankaarmysportsclubwomen",
      "id": 30619
  },
  {
      "name": "srilankaboardpresident'sxi",
      "id": 90809
  },
  {
      "name": "srilankaboardxi",
      "id": 32929
  },
  {
      "name": "srilankacricketcombinedxi",
      "id": 40345
  },
  {
      "name": "srilankacricketdevelopmentxi",
      "id": 32930
  },
  {
      "name": "srilankacricketinvitationxi",
      "id": 105316
  },
  {
      "name": "srilankacricketpresident'sxi",
      "id": 104875
  },
  {
      "name": "srilankacricketpresidentsxi",
      "id": 90779
  },
  {
      "name": "srilankacricketwomen'sxi",
      "id": 38703
  },
  {
      "name": "srilankacricketxi",
      "id": 105223
  },
  {
      "name": "srilankadevelopmentemergingteam",
      "id": 107605
  },
  {
      "name": "srilankaemerging",
      "id": 40402
  },
  {
      "name": "srilankalegends",
      "id": 114573
  },
  {
      "name": "srilankanavysportsclub",
      "id": 54738
  },
  {
      "name": "srilankanavysportsclubwomen",
      "id": 30620
  },
  {
      "name": "srilankaover-50s",
      "id": 114681
  },
  {
      "name": "srilankaunder-19s",
      "id": 1121
  },
  {
      "name": "srilankaunder-23s",
      "id": 113953
  },
  {
      "name": "srilankaunder-25s",
      "id": 71284
  },
  {
      "name": "srilankawomen",
      "id": 10277
  },
  {
      "name": "srilankawomenemergingplayers",
      "id": 113800
  },
  {
      "name": "srilankawomenunder-19s",
      "id": 126839
  },
  {
      "name": "srilankanlions",
      "id": 116489
  },
  {
      "name": "srilankanxi",
      "id": 105043
  },
  {
      "name": "srilankans",
      "id": 107398
  },
  {
      "name": "srilions",
      "id": 126115
  },
  {
      "name": "sriramclub",
      "id": 126953
  },
  {
      "name": "srirkmvivekananda",
      "id": 127572
  },
  {
      "name": "sriherporur",
      "id": 127589
  },
  {
      "name": "srilanka-v",
      "id": 116123
  },
  {
      "name": "srkdieseltrading",
      "id": 127716
  },
  {
      "name": "srmistkattankulathur",
      "id": 127576
  },
  {
      "name": "ssfpanthers",
      "id": 127841
  },
  {
      "name": "ssncollege",
      "id": 127569
  },
  {
      "name": "standrew'scollege",
      "id": 27227
  },
  {
      "name": "stgallencc",
      "id": 115973
  },
  {
      "name": "stjohn'swood",
      "id": 3781
  },
  {
      "name": "stjohnscollegejaffna",
      "id": 15544
  },
  {
      "name": "stkitts",
      "id": 105465
  },
  {
      "name": "stkitts&nevisinvitationxi",
      "id": 107863
  },
  {
      "name": "stkitts&nevispatriots",
      "id": 18256
  },
  {
      "name": "stkittsandnevispatriots",
      "id": 127908
  },
  {
      "name": "stkittsinvitationalxi",
      "id": 106104
  },
  {
      "name": "stlouisamericans",
      "id": 127981
  },
  {
      "name": "stlucia",
      "id": 105454
  },
  {
      "name": "stluciawomen",
      "id": 30646
  },
  {
      "name": "stluciazouks",
      "id": 18248
  },
  {
      "name": "stmaarten",
      "id": 105451
  },
  {
      "name": "ststithianscollege",
      "id": 16254
  },
  {
      "name": "stvincentandthegrenadines",
      "id": 105469
  },
  {
      "name": "stvincentandthegrenadineswomen",
      "id": 30647
  },
  {
      "name": "st.anthony'scollege(watthala)",
      "id": 15523
  },
  {
      "name": "st.louisamericans",
      "id": 120473
  },
  {
      "name": "st.peterscollege",
      "id": 27021
  },
  {
      "name": "st.sebastianscollegekatuneriya",
      "id": 38178
  },
  {
      "name": "stackcc",
      "id": 126334
  },
  {
      "name": "stackccxi",
      "id": 127779
  },
  {
      "name": "staffordshire",
      "id": 7526
  },
  {
      "name": "staffordshirewomen",
      "id": 19225
  },
  {
      "name": "stallions",
      "id": 122706
  },
  {
      "name": "stallionssports",
      "id": 128126
  },
  {
      "name": "stanfordsuperstars",
      "id": 106024
  },
  {
      "name": "starcc",
      "id": 123047
  },
  {
      "name": "starlights",
      "id": 117143
  },
  {
      "name": "starswomen",
      "id": 127027
  },
  {
      "name": "statebankofhyderabad",
      "id": 71773
  },
  {
      "name": "statebankofmysore",
      "id": 71767
  },
  {
      "name": "statebankofpakistan",
      "id": 14795
  },
  {
      "name": "statebankofpatiala",
      "id": 71792
  },
  {
      "name": "steelpanplayers",
      "id": 123299
  },
  {
      "name": "steinhoffmaties",
      "id": 27209
  },
  {
      "name": "stellenboschmonarchs",
      "id": 104939
  },
  {
      "name": "stickywicket",
      "id": 124656
  },
  {
      "name": "stockholmcc",
      "id": 115844
  },
  {
      "name": "stockholminternationalcricketclub",
      "id": 116105
  },
  {
      "name": "stockholmmumbaiindians",
      "id": 124765
  },
  {
      "name": "stockholmsuperkings",
      "id": 116104
  },
  {
      "name": "stockholmtigers",
      "id": 116101
  },
  {
      "name": "strikerswomen",
      "id": 71119
  },
  {
      "name": "subansirichamps",
      "id": 121579
  },
  {
      "name": "subansirichampswomen",
      "id": 123283
  },
  {
      "name": "sudan",
      "id": 120965
  },
  {
      "name": "sudurpaschimprovince",
      "id": 118022
  },
  {
      "name": "suffolk",
      "id": 7530
  },
  {
      "name": "suffolkwomen",
      "id": 19203
  },
  {
      "name": "suffolkxi",
      "id": 4820
  },
  {
      "name": "suinortherngaspipelineslimited",
      "id": 11401
  },
  {
      "name": "suisoutherngascorporation",
      "id": 11412
  },
  {
      "name": "sukhnazone",
      "id": 127969
  },
  {
      "name": "summercricketclub",
      "id": 118329
  },
  {
      "name": "sunrisers",
      "id": 116534
  },
  {
      "name": "sunriserseasterncape",
      "id": 127101
  },
  {
      "name": "sunrisershyderabad",
      "id": 658
  },
  {
      "name": "sunshinecoast",
      "id": 127989
  },
  {
      "name": "super3steama",
      "id": 30511
  },
  {
      "name": "super3steamb",
      "id": 30512
  },
  {
      "name": "super3steamc",
      "id": 30514
  },
  {
      "name": "superkings",
      "id": 120360
  },
  {
      "name": "superstar",
      "id": 127747
  },
  {
      "name": "superwomen",
      "id": 127680
  },
  {
      "name": "supernovas",
      "id": 111263
  },
  {
      "name": "suriname",
      "id": 19679
  },
  {
      "name": "surrey",
      "id": 6995
  },
  {
      "name": "surrey2ndxi",
      "id": 18531
  },
  {
      "name": "surreyandkent",
      "id": 2979
  },
  {
      "name": "surreyandmarylebonecricketclub",
      "id": 3108
  },
  {
      "name": "surreyandmiddlesex",
      "id": 3240
  },
  {
      "name": "surreyandsussex",
      "id": 2945
  },
  {
      "name": "surreyjaguars",
      "id": 127914
  },
  {
      "name": "surreykings",
      "id": 124336
  },
  {
      "name": "surreyrisers",
      "id": 124338
  },
  {
      "name": "surreyroyals",
      "id": 124340
  },
  {
      "name": "surreyshines",
      "id": 116288
  },
  {
      "name": "surreystars",
      "id": 104882
  },
  {
      "name": "surreywomen",
      "id": 19199
  },
  {
      "name": "surreyxi",
      "id": 2022
  },
  {
      "name": "sussex",
      "id": 5721
  },
  {
      "name": "sussex2ndxi",
      "id": 18464
  },
  {
      "name": "sussexwomen",
      "id": 19200
  },
  {
      "name": "sussexxi",
      "id": 3799
  },
  {
      "name": "svkampongcricket",
      "id": 116726
  },
  {
      "name": "svwiesbaden1899",
      "id": 116168
  },
  {
      "name": "svanholm",
      "id": 113429
  },
  {
      "name": "swamishraddhanandcollege(india)",
      "id": 16671
  },
  {
      "name": "swantonscricketclub",
      "id": 121291
  },
  {
      "name": "swaziland",
      "id": 66602
  },
  {
      "name": "swazilandwomen",
      "id": 121522
  },
  {
      "name": "sweden",
      "id": 42840
  },
  {
      "name": "swedenwomen",
      "id": 124852
  },
  {
      "name": "swieqiunited",
      "id": 120358
  },
  {
      "name": "swiftgallopers",
      "id": 113967
  },
  {
      "name": "switzerland",
      "id": 120968
  },
  {
      "name": "sydneysixers",
      "id": 14203
  },
  {
      "name": "sydneysixerswomen",
      "id": 15797
  },
  {
      "name": "sydneythunder",
      "id": 14202
  },
  {
      "name": "sydneythunderwomen",
      "id": 15796
  },
  {
      "name": "syedaghacc",
      "id": 123801
  },
  {
      "name": "sylhetdivision",
      "id": 11294
  },
  {
      "name": "sylhetdivisonunder-14s",
      "id": 63105
  },
  {
      "name": "sylhetdivisonunder-18s",
      "id": 63218
  },
  {
      "name": "sylhetroyals",
      "id": 65155
  },
  {
      "name": "sylhetstrikers",
      "id": 107369
  },
  {
      "name": "sylhetsuperstars",
      "id": 14098
  },
  {
      "name": "syria",
      "id": 120970
  },
  {
      "name": "tmellish'sxi",
      "id": 3379
  },
  {
      "name": "twalker'sxi",
      "id": 3036
  },
  {
      "name": "t&tdefenceforcecricketteam",
      "id": 127823
  },
  {
      "name": "t&tredforce",
      "id": 123129
  },
  {
      "name": "tasmith'sxi",
      "id": 2843
  },
  {
      "name": "tafeablackbirds",
      "id": 115699
  },
  {
      "name": "taiwandaredevils",
      "id": 115485
  },
  {
      "name": "taiwandragons",
      "id": 115490
  },
  {
      "name": "tajikistan",
      "id": 120972
  },
  {
      "name": "takashingapatriotsi",
      "id": 126068
  },
  {
      "name": "takashingapatriotsii",
      "id": 126094
  },
  {
      "name": "tallinnhippos",
      "id": 116226
  },
  {
      "name": "tallinnrisingstars",
      "id": 116228
  },
  {
      "name": "tallinnstallions",
      "id": 116236
  },
  {
      "name": "tallinnunited",
      "id": 116230
  },
  {
      "name": "tallycc",
      "id": 127701
  },
  {
      "name": "tallyriders",
      "id": 127830
  },
  {
      "name": "tamcowarriors",
      "id": 122358
  },
  {
      "name": "tamilnadu",
      "id": 12988
  },
  {
      "name": "tamilnaducricketassociationxi",
      "id": 72329
  },
  {
      "name": "tamilnaduwomen",
      "id": 15971
  },
  {
      "name": "tamilunioncricketandathleticclub",
      "id": 12054
  },
  {
      "name": "tamimxi",
      "id": 116812
  },
  {
      "name": "tanzania",
      "id": 10535
  },
  {
      "name": "tanzaniaunder-19s",
      "id": 42283
  },
  {
      "name": "tanzaniawomen",
      "id": 121525
  },
  {
      "name": "tapanmemorialclub",
      "id": 117056
  },
  {
      "name": "tarik",
      "id": 123000
  },
  {
      "name": "tartuvikings",
      "id": 116234
  },
  {
      "name": "tasmania",
      "id": 8283
  },
  {
      "name": "tasmaniaunder-23s",
      "id": 25976
  },
  {
      "name": "tasmaniawomen",
      "id": 26278
  },
  {
      "name": "tatasportsclub",
      "id": 71787
  },
  {
      "name": "tba",
      "id": 127770
  },
  {
      "name": "tba",
      "id": 127775
  },
  {
      "name": "tcaindians",
      "id": 115486
  },
  {
      "name": "teamabudhabi",
      "id": 113855
  },
  {
      "name": "teamamber",
      "id": 118809
  },
  {
      "name": "teamblue",
      "id": 18869
  },
  {
      "name": "teambluewomen",
      "id": 127888
  },
  {
      "name": "teambuttler",
      "id": 117064
  },
  {
      "name": "teamcentralpublicschool",
      "id": 124616
  },
  {
      "name": "teamemerald",
      "id": 118811
  },
  {
      "name": "teamgoldsports11",
      "id": 124613
  },
  {
      "name": "teammahendraclub",
      "id": 124611
  },
  {
      "name": "teammarvellous-sojatia",
      "id": 124612
  },
  {
      "name": "teammorgan",
      "id": 117065
  },
  {
      "name": "teampacificorganic",
      "id": 124610
  },
  {
      "name": "teampearl",
      "id": 118810
  },
  {
      "name": "teamred",
      "id": 18870
  },
  {
      "name": "teamredwomen",
      "id": 127890
  },
  {
      "name": "teamruby",
      "id": 118807
  },
  {
      "name": "teamsapphire",
      "id": 118808
  },
  {
      "name": "teamtigerportugal",
      "id": 127712
  },
  {
      "name": "teamtraverse",
      "id": 124618
  },
  {
      "name": "teamtrullyindia",
      "id": 124614
  },
  {
      "name": "teamusaglobal",
      "id": 124615
  },
  {
      "name": "teamyellowwomen",
      "id": 127889
  },
  {
      "name": "tehrititans",
      "id": 127883
  },
  {
      "name": "teluguroyalscc",
      "id": 126160
  },
  {
      "name": "temborangers",
      "id": 119746
  },
  {
      "name": "tembostars",
      "id": 116375
  },
  {
      "name": "tengaparac.c",
      "id": 123562
  },
  {
      "name": "terrace",
      "id": 127970
  },
  {
      "name": "terracezone",
      "id": 127971
  },
  {
      "name": "texaschargers",
      "id": 127963
  },
  {
      "name": "texassuperkings",
      "id": 127845
  },
  {
      "name": "texasthunder",
      "id": 127878
  },
  {
      "name": "tgs",
      "id": 127706
  },
  {
      "name": "thailand",
      "id": 113291
  },
  {
      "name": "thailandawomen",
      "id": 112339
  },
  {
      "name": "thailandflash",
      "id": 114894
  },
  {
      "name": "thailandunder-19s",
      "id": 42213
  },
  {
      "name": "thailandwomen",
      "id": 14614
  },
  {
      "name": "thambapannilions",
      "id": 127814
  },
  {
      "name": "thanetigers",
      "id": 127668
  },
  {
      "name": "thcchamburg",
      "id": 120208
  },
  {
      "name": "theblacksmiths",
      "id": 124328
  },
  {
      "name": "theblaze",
      "id": 127769
  },
  {
      "name": "thebs",
      "id": 3523
  },
  {
      "name": "thechennaibraves",
      "id": 122144
  },
  {
      "name": "theexpendables",
      "id": 126678
  },
  {
      "name": "thephiladelphians",
      "id": 127974
  },
  {
      "name": "therest",
      "id": 106587
  },
  {
      "name": "thescorpionsclub",
      "id": 115948
  },
  {
      "name": "thevisionshipping",
      "id": 122728
  },
  {
      "name": "thewsandhs",
      "id": 3344
  },
  {
      "name": "theyellowcapscricketclub",
      "id": 116216
  },
  {
      "name": "theni",
      "id": 127409
  },
  {
      "name": "thikahippos",
      "id": 127144
  },
  {
      "name": "thiruvallur",
      "id": 127539
  },
  {
      "name": "thistles",
      "id": 117142
  },
  {
      "name": "thrissurstikers",
      "id": 127942
  },
  {
      "name": "thunder",
      "id": 116537
  },
  {
      "name": "thunderstormoutlanders",
      "id": 127603
  },
  {
      "name": "tigerscricketclub",
      "id": 125969
  },
  {
      "name": "tigersxi",
      "id": 116991
  },
  {
      "name": "timor-leste",
      "id": 120974
  },
  {
      "name": "tincomaleedistrict",
      "id": 108071
  },
  {
      "name": "tinsukiatownclub",
      "id": 123564
  },
  {
      "name": "tirunelveli",
      "id": 127340
  },
  {
      "name": "tirupattur",
      "id": 127337
  },
  {
      "name": "tirupur",
      "id": 127540
  },
  {
      "name": "titaborccc",
      "id": 123559
  },
  {
      "name": "titans",
      "id": 127744
  },
  {
      "name": "titans",
      "id": 12335
  },
  {
      "name": "titans",
      "id": 122713
  },
  {
      "name": "titans",
      "id": 127075
  },
  {
      "name": "titans",
      "id": 121970
  },
  {
      "name": "titans",
      "id": 115330
  },
  {
      "name": "titanscubs",
      "id": 15415
  },
  {
      "name": "titansxi",
      "id": 116890
  },
  {
      "name": "titougorgesplashers",
      "id": 124771
  },
  {
      "name": "tncapresident'sxi",
      "id": 72324
  },
  {
      "name": "togo",
      "id": 120976
  },
  {
      "name": "tokyofalcons",
      "id": 125967
  },
  {
      "name": "tokyorangerscricketclub",
      "id": 127825
  },
  {
      "name": "tokyotitans",
      "id": 125968
  },
  {
      "name": "tokyowombats",
      "id": 127948
  },
  {
      "name": "toombul",
      "id": 127986
  },
  {
      "name": "torinocc",
      "id": 125154
  },
  {
      "name": "tornadoeswomen",
      "id": 124530
  },
  {
      "name": "torontonationals",
      "id": 111354
  },
  {
      "name": "torontotigers",
      "id": 116110
  },
  {
      "name": "townclub",
      "id": 117054
  },
  {
      "name": "townclubsilchar",
      "id": 127681
  },
  {
      "name": "townclubwomen",
      "id": 123092
  },
  {
      "name": "toyotatgs",
      "id": 128068
  },
  {
      "name": "tracyvillagecc",
      "id": 115891
  },
  {
      "name": "tracyvillagecc2",
      "id": 116194
  },
  {
      "name": "trailblazers",
      "id": 111264
  },
  {
      "name": "transylvania",
      "id": 127861
  },
  {
      "name": "travancoretridents",
      "id": 127943
  },
  {
      "name": "trentrockets(men)",
      "id": 120622
  },
  {
      "name": "trentrockets(women)",
      "id": 120639
  },
  {
      "name": "trentinoaquila",
      "id": 118819
  },
  {
      "name": "tribhuwanarmyclub",
      "id": 118016
  },
  {
      "name": "tridentstallions",
      "id": 127921
  },
  {
      "name": "trinbagoknightriders",
      "id": 18250
  },
  {
      "name": "trinbagoknightriderswomen",
      "id": 125862
  },
  {
      "name": "trinco-batticombinedschools",
      "id": 15531
  },
  {
      "name": "trinidad&tobago",
      "id": 11848
  },
  {
      "name": "trinidad&tobagoa",
      "id": 128022
  },
  {
      "name": "trinidad&tobagounder-19s",
      "id": 19587
  },
  {
      "name": "trinidad&tobagowomen",
      "id": 30654
  },
  {
      "name": "trinitatroyalstars",
      "id": 118165
  },
  {
      "name": "trinitycollege",
      "id": 38184
  },
  {
      "name": "tripunithuracricketclub",
      "id": 121292
  },
  {
      "name": "tripura",
      "id": 12976
  },
  {
      "name": "tripurawomen",
      "id": 16008
  },
  {
      "name": "tripurawomen",
      "id": 126641
  },
  {
      "name": "triumphknightsmne",
      "id": 113027
  },
  {
      "name": "tshwanespartans",
      "id": 111908
  },
  {
      "name": "tsvcricketpfungstadt",
      "id": 116768
  },
  {
      "name": "tunbridgewells",
      "id": 123045
  },
  {
      "name": "tunisia",
      "id": 120978
  },
  {
      "name": "turkfchattersheimammain",
      "id": 116165
  },
  {
      "name": "turkey",
      "id": 81090
  },
  {
      "name": "turkeywomen",
      "id": 121244
  },
  {
      "name": "turkmenistan",
      "id": 120980
  },
  {
      "name": "turksandcaicosislands",
      "id": 105462
  },
  {
      "name": "tuskercc",
      "id": 127745
  },
  {
      "name": "tuskers",
      "id": 126260
  },
  {
      "name": "tuskersxi",
      "id": 116992
  },
  {
      "name": "tutipatriots",
      "id": 89956
  },
  {
      "name": "tuvalu",
      "id": 120982
  },
  {
      "name": "tv&tbvlemgo",
      "id": 125773
  },
  {
      "name": "twigamasters",
      "id": 119749
  },
  {
      "name": "twigatitans",
      "id": 116374
  },
  {
      "name": "typhoonswomen",
      "id": 116366
  },
  {
      "name": "uaechampions",
      "id": 127717
  },
  {
      "name": "uaemen1st",
      "id": 112735
  },
  {
      "name": "uaewomenu19",
      "id": 126942
  },
  {
      "name": "ucb-bcbeleven",
      "id": 36871
  },
  {
      "name": "ucchawks",
      "id": 127790
  },
  {
      "name": "udaipurlakecitywarriors",
      "id": 127999
  },
  {
      "name": "udaratarulers",
      "id": 29428
  },
  {
      "name": "udhamsinghnagartigers",
      "id": 127884
  },
  {
      "name": "ufc",
      "id": 122462
  },
  {
      "name": "uganda",
      "id": 24229
  },
  {
      "name": "ugandaunder-19s",
      "id": 15306
  },
  {
      "name": "ugandawomen",
      "id": 111322
  },
  {
      "name": "ukgharwalxi",
      "id": 115958
  },
  {
      "name": "ukrisingstarclub",
      "id": 115959
  },
  {
      "name": "ukmkpt",
      "id": 127604
  },
  {
      "name": "ukraine",
      "id": 120984
  },
  {
      "name": "ultimatelegends",
      "id": 114917
  },
  {
      "name": "umea",
      "id": 120692
  },
  {
      "name": "ummcknightriders",
      "id": 127886
  },
  {
      "name": "ummckr",
      "id": 127683
  },
  {
      "name": "under38",
      "id": 3706
  },
  {
      "name": "unefs",
      "id": 127862
  },
  {
      "name": "unicorns",
      "id": 10564
  },
  {
      "name": "unicornsa",
      "id": 41343
  },
  {
      "name": "uniquetigers",
      "id": 127877
  },
  {
      "name": "unitedarabemirates",
      "id": 15
  },
  {
      "name": "unitedarabemiratesa",
      "id": 127950
  },
  {
      "name": "unitedarabemiratesunder-19s",
      "id": 19645
  },
  {
      "name": "unitedarabemiratesunder-23s",
      "id": 112044
  },
  {
      "name": "unitedarabemiratesunder-26s",
      "id": 127931
  },
  {
      "name": "unitedarabemirateswomen",
      "id": 111324
  },
  {
      "name": "unitedarabemirateswomenunder-19s",
      "id": 127112
  },
  {
      "name": "unitedbanklimited",
      "id": 11417
  },
  {
      "name": "unitedcc",
      "id": 115927
  },
  {
      "name": "unitedccbuchrest",
      "id": 127863
  },
  {
      "name": "unitedccgirona",
      "id": 116799
  },
  {
      "name": "unitedchallengers",
      "id": 127746
  },
  {
      "name": "unitedcricketclub",
      "id": 124504
  },
  {
      "name": "unitedcricketclub",
      "id": 116712
  },
  {
      "name": "unitedcsaladbudapest",
      "id": 120426
  },
  {
      "name": "unitedforcricket",
      "id": 124653
  },
  {
      "name": "unitednorthriderswomen",
      "id": 127264
  },
  {
      "name": "unitedservicesrecreationclub",
      "id": 114796
  },
  {
      "name": "unitedsouthblasterswomen",
      "id": 127263
  },
  {
      "name": "unitedstars",
      "id": 124341
  },
  {
      "name": "unitedstatesofamerica",
      "id": 6789
  },
  {
      "name": "unitedstatesofamericaunder-19s",
      "id": 15308
  },
  {
      "name": "unitedstatesofamericawomen",
      "id": 16432
  },
  {
      "name": "unitedstatesofamericawomenunder-19s",
      "id": 125698
  },
  {
      "name": "unitedstatesvirginislands",
      "id": 105466
  },
  {
      "name": "universityofcapetown",
      "id": 27211
  },
  {
      "name": "universityofcentralpunjablahore",
      "id": 19856
  },
  {
      "name": "universityoffreestate",
      "id": 27212
  },
  {
      "name": "universityofjohannesburg",
      "id": 27214
  },
  {
      "name": "universityofkwazulu-natal",
      "id": 18865
  },
  {
      "name": "universityofliberalarts",
      "id": 31008
  },
  {
      "name": "universityofmoratuwa",
      "id": 66926
  },
  {
      "name": "universityofnewsouthwales",
      "id": 31003
  },
  {
      "name": "universityofqueensland",
      "id": 127994
  },
  {
      "name": "universityofsargodha",
      "id": 19857
  },
  {
      "name": "universityoftechnologysydney(australia)",
      "id": 16675
  },
  {
      "name": "universityofwesterncape",
      "id": 27218
  },
  {
      "name": "universitysportssouthafricaxi",
      "id": 113314
  },
  {
      "name": "upcountrycombinedschools",
      "id": 15545
  },
  {
      "name": "upwarriorz",
      "id": 127614
  },
  {
      "name": "uprisingcricketclub",
      "id": 128121
  },
  {
      "name": "uruguay",
      "id": 120986
  },
  {
      "name": "usambaraqueens",
      "id": 128128
  },
  {
      "name": "uscmagdeburg",
      "id": 121199
  },
  {
      "name": "usgchemnitz",
      "id": 116322
  },
  {
      "name": "uthurarudras",
      "id": 68886
  },
  {
      "name": "uthurayellows",
      "id": 41138
  },
  {
      "name": "uthura-neganahiracombined",
      "id": 63983
  },
  {
      "name": "utkalcricketclub",
      "id": 122396
  },
  {
      "name": "uttardinajpurkulikbird",
      "id": 122381
  },
  {
      "name": "uttarpradesh",
      "id": 12998
  },
  {
      "name": "uttarpradeshunder-19",
      "id": 121810
  },
  {
      "name": "uttarpradeshveterans",
      "id": 126885
  },
  {
      "name": "uttarpradeshwomen",
      "id": 15967
  },
  {
      "name": "uttarasportingclub",
      "id": 112556
  },
  {
      "name": "uttarakhand",
      "id": 111564
  },
  {
      "name": "uttarakhandunder-19",
      "id": 121742
  },
  {
      "name": "uttarakhandwomen",
      "id": 127605
  },
  {
      "name": "uttarandhralions",
      "id": 125259
  },
  {
      "name": "uvanext",
      "id": 64620
  },
  {
      "name": "uvaprovincecombinedschools",
      "id": 38177
  },
  {
      "name": "uwivicechancellor'scelebrityxi",
      "id": 15515
  },
  {
      "name": "uwivicechancellor'sxi",
      "id": 105017
  },
  {
      "name": "uzbekistan",
      "id": 120988
  },
  {
      "name": "veleven",
      "id": 123853
  },
  {
      "name": "valley",
      "id": 127991
  },
  {
      "name": "valleyboyz",
      "id": 125819
  },
  {
      "name": "valleyhikers",
      "id": 124772
  },
  {
      "name": "vancouverknights",
      "id": 111355
  },
  {
      "name": "vancouverstars",
      "id": 116108
  },
  {
      "name": "vancouvervibes",
      "id": 116293
  },
  {
      "name": "vantaacc",
      "id": 115861
  },
  {
      "name": "vanuatu",
      "id": 10530
  },
  {
      "name": "vanuatuunder-19s",
      "id": 42324
  },
  {
      "name": "vanuatuwomen",
      "id": 127766
  },
  {
      "name": "varmdocc",
      "id": 116133
  },
  {
      "name": "vashiwarriors",
      "id": 127665
  },
  {
      "name": "vauniyadistrict",
      "id": 108069
  },
  {
      "name": "vbkanchiveerans",
      "id": 89958
  },
  {
      "name": "vbkanchiveerans",
      "id": 127688
  },
  {
      "name": "vcablue",
      "id": 121768
  },
  {
      "name": "vcagreen",
      "id": 121756
  },
  {
      "name": "vcaorange",
      "id": 121755
  },
  {
      "name": "vcared",
      "id": 121757
  },
  {
      "name": "vcaskyblue",
      "id": 121758
  },
  {
      "name": "vcayellow",
      "id": 121767
  },
  {
      "name": "vcc",
      "id": 116661
  },
  {
      "name": "velocity",
      "id": 112841
  },
  {
      "name": "venezia",
      "id": 118816
  },
  {
      "name": "veneziacricketclub",
      "id": 116948
  },
  {
      "name": "venezuela",
      "id": 120990
  },
  {
      "name": "venivedivici",
      "id": 121353
  },
  {
      "name": "vfbfallersleben",
      "id": 116090
  },
  {
      "name": "vfbgelsenkirchen",
      "id": 119922
  },
  {
      "name": "victoria",
      "id": 8281
  },
  {
      "name": "victoriainvitational",
      "id": 128087
  },
  {
      "name": "victorialions",
      "id": 127597
  },
  {
      "name": "victoriasportingclub",
      "id": 23715
  },
  {
      "name": "victoriaunder-23s",
      "id": 25972
  },
  {
      "name": "victoriawaves",
      "id": 116291
  },
  {
      "name": "victoriawomen",
      "id": 26275
  },
  {
      "name": "vidarbha",
      "id": 12969
  },
  {
      "name": "vidarbhacricketassociationxi",
      "id": 72357
  },
  {
      "name": "vidarbhau-19",
      "id": 126542
  },
  {
      "name": "vidarbhawomen",
      "id": 15968
  },
  {
      "name": "vidarbhawomencc",
      "id": 128051
  },
  {
      "name": "viennaafghancc",
      "id": 116429
  },
  {
      "name": "viennacc",
      "id": 119312
  },
  {
      "name": "viennadanube",
      "id": 119316
  },
  {
      "name": "viennaeagles",
      "id": 127803
  },
  {
      "name": "vietnam",
      "id": 120992
  },
  {
      "name": "vieuxfortnorthraiders",
      "id": 119812
  },
  {
      "name": "vieuxfortsouthsunrisers",
      "id": 116002
  },
  {
      "name": "vinohradyblancos",
      "id": 115966
  },
  {
      "name": "vinohradycc",
      "id": 115965
  },
  {
      "name": "virginislands",
      "id": 120994
  },
  {
      "name": "virgosuperkings",
      "id": 16160
  },
  {
      "name": "vizagtitans",
      "id": 127696
  },
  {
      "name": "vizagwarriors",
      "id": 125261
  },
  {
      "name": "voorburgcricketclub",
      "id": 120229
  },
  {
      "name": "voorburgcricketclub",
      "id": 116724
  },
  {
      "name": "voyagers",
      "id": 127078
  },
  {
      "name": "vra",
      "id": 116657
  },
  {
      "name": "vracricketclub",
      "id": 119879
  },
  {
      "name": "vtacvolts",
      "id": 126657
  },
  {
      "name": "vtu-mupleven",
      "id": 120499
  },
  {
      "name": "wbarton'sxi",
      "id": 3405
  },
  {
      "name": "wturner'sxi",
      "id": 3378
  },
  {
      "name": "wward'sxi",
      "id": 3815
  },
  {
      "name": "walesminorcounties",
      "id": 18604
  },
  {
      "name": "walesover-50s",
      "id": 114665
  },
  {
      "name": "waleswomen",
      "id": 19210
  },
  {
      "name": "waratahcricketclub",
      "id": 115885
  },
  {
      "name": "warne'swarriors",
      "id": 15740
  },
  {
      "name": "warriors",
      "id": 90443
  },
  {
      "name": "warriors",
      "id": 122711
  },
  {
      "name": "warriors",
      "id": 127073
  },
  {
      "name": "warriorsblue",
      "id": 127756
  },
  {
      "name": "warriorscricketclub",
      "id": 127813
  },
  {
      "name": "warriorscubs",
      "id": 15412
  },
  {
      "name": "warriorswomen",
      "id": 124534
  },
  {
      "name": "warriorsxi",
      "id": 116893
  },
  {
      "name": "warwickshire",
      "id": 7002
  },
  {
      "name": "warwickshire2ndxi",
      "id": 18523
  },
  {
      "name": "warwickshirewomen",
      "id": 19223
  },
  {
      "name": "washingtonfreedom",
      "id": 127848
  },
  {
      "name": "watanzalmicc",
      "id": 116137
  },
  {
      "name": "waterandpowerdevelopmentauthority",
      "id": 11423
  },
  {
      "name": "waterkloofhighschool",
      "id": 26812
  },
  {
      "name": "waveriderlegends",
      "id": 116062
  },
  {
      "name": "wayamba",
      "id": 63978
  },
  {
      "name": "wayambaunited",
      "id": 68887
  },
  {
      "name": "wellawayavipers",
      "id": 116076
  },
  {
      "name": "wellingtona",
      "id": 38078
  },
  {
      "name": "wellingtonblaze",
      "id": 15337
  },
  {
      "name": "wellingtonfirebirds",
      "id": 13225
  },
  {
      "name": "wellingtonunder-21swomen",
      "id": 38051
  },
  {
      "name": "welshfire(men)",
      "id": 120628
  },
  {
      "name": "welshfire(women)",
      "id": 120645
  },
  {
      "name": "west",
      "id": 6437
  },
  {
      "name": "westguwahaticlub",
      "id": 127626
  },
  {
      "name": "westindians",
      "id": 106111
  },
  {
      "name": "westindies",
      "id": 17
  },
  {
      "name": "westindiesa",
      "id": 20737
  },
  {
      "name": "westindiesacademy",
      "id": 128131
  },
  {
      "name": "westindiesb",
      "id": 111376
  },
  {
      "name": "westindiescricketboardpresident'sxi",
      "id": 89933
  },
  {
      "name": "westindiescricketboardxi",
      "id": 128091
  },
  {
      "name": "westindiesemergingteam",
      "id": 113839
  },
  {
      "name": "westindieslegends",
      "id": 114571
  },
  {
      "name": "westindiesover-50s",
      "id": 114677
  },
  {
      "name": "westindiespresident'sxi",
      "id": 111373
  },
  {
      "name": "westindiesselectxi",
      "id": 128109
  },
  {
      "name": "westindiesunder-19s",
      "id": 1200
  },
  {
      "name": "westindieswomen",
      "id": 10272
  },
  {
      "name": "westindieswomena",
      "id": 120463
  },
  {
      "name": "westindieswomenunder-19s",
      "id": 125697
  },
  {
      "name": "westindiesxi",
      "id": 78873
  },
  {
      "name": "westindies-v",
      "id": 116122
  },
  {
      "name": "westkantohurricanes",
      "id": 116240
  },
  {
      "name": "westkent",
      "id": 2316
  },
  {
      "name": "westtripurastrikerswomen",
      "id": 127262
  },
  {
      "name": "westtripuratitanswomen",
      "id": 127260
  },
  {
      "name": "westzone",
      "id": 8234
  },
  {
      "name": "westzoneblues",
      "id": 122175
  },
  {
      "name": "westzonered",
      "id": 122254
  },
  {
      "name": "westzonewomen",
      "id": 126781
  },
  {
      "name": "westernaustralia",
      "id": 8278
  },
  {
      "name": "westernaustraliachairman'sxi",
      "id": 107764
  },
  {
      "name": "westernaustraliaunder-23s",
      "id": 25970
  },
  {
      "name": "westernaustraliawomen",
      "id": 26272
  },
  {
      "name": "westernaustraliaxi",
      "id": 27450
  },
  {
      "name": "westerndistrictscricketunion",
      "id": 19950
  },
  {
      "name": "westerneagles",
      "id": 127928
  },
  {
      "name": "westernprovince",
      "id": 12696
  },
  {
      "name": "westernprovinceunder-13s",
      "id": 14886
  },
  {
      "name": "westernprovinceunder-15s",
      "id": 37881
  },
  {
      "name": "westernprovinceunder-17s",
      "id": 15030
  },
  {
      "name": "westernprovinceunder-19s",
      "id": 16718
  },
  {
      "name": "westernprovincewomen",
      "id": 15231
  },
  {
      "name": "westernprovincewomen(srilanka)",
      "id": 42562
  },
  {
      "name": "westernstorm",
      "id": 104878
  },
  {
      "name": "westernsuburbs",
      "id": 127990
  },
  {
      "name": "westerntroopers",
      "id": 29430
  },
  {
      "name": "westernwarriors",
      "id": 116327
  },
  {
      "name": "westsidecricketclub",
      "id": 126098
  },
  {
      "name": "westvilleboyshighschool",
      "id": 26818
  },
  {
      "name": "wettingen",
      "id": 127955
  },
  {
      "name": "whitecloudsccwomen",
      "id": 127674
  },
  {
      "name": "whiteconduitclub",
      "id": 2381
  },
  {
      "name": "whiterhinos",
      "id": 115375
  },
  {
      "name": "wicbpresident'scelebrityxi",
      "id": 15514
  },
  {
      "name": "wilayahpersekutuan",
      "id": 126175
  },
  {
      "name": "wildpanthers",
      "id": 121444
  },
  {
      "name": "wiltshire",
      "id": 18611
  },
  {
      "name": "wiltshirewomen",
      "id": 19213
  },
  {
      "name": "windhoekjets",
      "id": 128029
  },
  {
      "name": "windwardislands",
      "id": 11845
  },
  {
      "name": "windwardislandsunder-19s",
      "id": 19584
  },
  {
      "name": "windwardislandswomen",
      "id": 124952
  },
  {
      "name": "windwardvolcanoes",
      "id": 127600
  },
  {
      "name": "winnersfkp",
      "id": 128069
  },
  {
      "name": "winnipeghawks",
      "id": 111358
  },
  {
      "name": "winterthurcc",
      "id": 115977
  },
  {
      "name": "wipapresident'sselect",
      "id": 106112
  },
  {
      "name": "women'scricketassociationofindiaxi",
      "id": 128106
  },
  {
      "name": "worcestershire",
      "id": 7000
  },
  {
      "name": "worcestershire2ndxi",
      "id": 18408
  },
  {
      "name": "worcestershirewomen",
      "id": 19220
  },
  {
      "name": "worldgiants",
      "id": 122752
  },
  {
      "name": "worldlegends11",
      "id": 123025
  },
  {
      "name": "world-xi",
      "id": 19986
  },
  {
      "name": "wrcapel'sxi",
      "id": 3429
  },
  {
      "name": "wynbergboys'highschool",
      "id": 26815
  },
  {
      "name": "wynnum-manly",
      "id": 127995
  },
  {
      "name": "wyvernscricketclub",
      "id": 127949
  },
  {
      "name": "xent",
      "id": 128070
  },
  {
      "name": "xistars",
      "id": 118098
  },
  {
      "name": "xtremesunrisers",
      "id": 114911
  },
  {
      "name": "yaalblazers",
      "id": 29431
  },
  {
      "name": "yanamveteransxi",
      "id": 127278
  },
  {
      "name": "yanamxi",
      "id": 126720
  },
  {
      "name": "yaqutganjchallengers",
      "id": 127640
  },
  {
      "name": "yellowchallengers",
      "id": 127893
  },
  {
      "name": "yeman",
      "id": 120996
  },
  {
      "name": "yorkshire",
      "id": 7050
  },
  {
      "name": "yorkshire2ndxi",
      "id": 18453
  },
  {
      "name": "yorkshirediamonds",
      "id": 104879
  },
  {
      "name": "yorkshirewomen",
      "id": 19237
  },
  {
      "name": "yorkshirexi",
      "id": 5124
  },
  {
      "name": "yorkshire-nottinghamshire-leicestershire",
      "id": 4654
  },
  {
      "name": "youngaustralia",
      "id": 8743
  },
  {
      "name": "yousefcricketclub",
      "id": 128041
  },
  {
      "name": "yssc",
      "id": 126296
  },
  {
      "name": "zgamesstrikers",
      "id": 126680
  },
  {
      "name": "zagrebassassins",
      "id": 126546
  },
  {
      "name": "zagrebsokol",
      "id": 121784
  },
  {
      "name": "zalawadroyals",
      "id": 113052
  },
  {
      "name": "zambia",
      "id": 66591
  },
  {
      "name": "zambiaunder-19s",
      "id": 42284
  },
  {
      "name": "zaraitaraqiatibanklimited",
      "id": 105813
  },
  {
      "name": "zarkawtcricketclub",
      "id": 127768
  },
  {
      "name": "zenithc.c",
      "id": 123428
  },
  {
      "name": "zeytinburnuzafer",
      "id": 123262
  },
  {
      "name": "zimbabwe",
      "id": 493
  },
  {
      "name": "zimbabwea",
      "id": 11981
  },
  {
      "name": "zimbabweb",
      "id": 8748
  },
  {
      "name": "zimbabwechairman'sxi",
      "id": 25960
  },
  {
      "name": "zimbabwecountrydistricts",
      "id": 128108
  },
  {
      "name": "zimbabwecricketunionpresident'sxi",
      "id": 128110
  },
  {
      "name": "zimbabwecubs",
      "id": 26543
  },
  {
      "name": "zimbabweemerging",
      "id": 121178
  },
  {
      "name": "zimbabweover-50s",
      "id": 114669
  },
  {
      "name": "zimbabwepresident'sxi",
      "id": 13737
  },
  {
      "name": "zimbabweselectxi",
      "id": 106129
  },
  {
      "name": "zimbabweunder-13s",
      "id": 14898
  },
  {
      "name": "zimbabweunder-17s",
      "id": 15043
  },
  {
      "name": "zimbabweunder-19s",
      "id": 1214
  },
  {
      "name": "zimbabwewomen",
      "id": 14619
  },
  {
      "name": "zimbabwewomenunder-19s",
      "id": 127124
  },
  {
      "name": "zimbabwexi",
      "id": 68831
  },
  {
      "name": "zinitis",
      "id": 127864
  },
  {
      "name": "zonictigers",
      "id": 125986
  },
  {
      "name": "zurichcricketscc",
      "id": 115971
  },
  {
      "name": "zurichlions",
      "id": 127958
  },
  {
      "name": "zurichnomadscc",
      "id": 115969
  }
]









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

// fetchTeamPlayersAndSave();


















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
  short_name: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  middle_name: { type: String, default: '' },
  birthdate: { type: mongoose.Schema.Types.Mixed, required: true },
  country: { type: String, required: false },
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

// fetchAndSaveAllPlayersAndStats(teamId)
































const fetchPlayers = async () => {
    let currentPage = 1;
    let allPlayers = [];
  
    const response = await axios.get(`https://rest.entitysport.com/v2/players/?per_page=80&token=${TOKEN}`);
  
    const totalPages = response.data.response.total_pages;
  
    while (currentPage <= totalPages) {
      const pageResponse = await axios.get(
        `https://rest.entitysport.com/v2/players/?per_page=80&paged=${currentPage}&token=${TOKEN}`
      );
  
      allPlayers = allPlayers.concat(pageResponse.data.response.items);
      currentPage++;
    }
  
    return allPlayers;
  };

  async function fetchAndSavePlayerStats() {
    const players = await fetchPlayers();
  
    for (const player of players) {
      console.log(`Fetching stats for player ${player.title}...`);
      const statsData = await fetchStatsForPlayer(player.pid);
  
      if (statsData) {
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
        console.log(`Stats for player ${player.title} saved.`);
      } else {
        console.log(`No stats found for player ${player.title}.`);
      }
    }
  }
  
  
  async function main() {
    try {
      console.log('Starting to fetch and save player stats...');
      await fetchAndSavePlayerStats();
      console.log('Completed fetching and saving player stats.');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
//   main();

























//fetch player for which the are player for teams

// const getAllPlayersAndTheirTeams = async () => {
//     try {
//         const teams = await TeamM.find({});
//         let playersData = [];

//         teams.forEach(team => {
//             // Iterate over each player category (e.g., t20i, test, odi)
//             Object.keys(team.players).forEach(category => {
//                 team.players[category].forEach(player => {
//                     playersData.push({
//                         playerId: player.pid, // Replace with actual field name if different
//                         playerName: player.first_name + ' ' + player.last_name,
//                         teamsPlayedFor: team.title, // Assuming the team title is the team they played for
//                         // Add other player details as needed
//                     });
//                 });
//             });
//         });

//         return playersData;
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return [];
//     }
// };

// // Example usage
// getAllPlayersAndTheirTeams().then(playersData => {
//     console.log("Players and Their Teams:", playersData);
// });
  

// Function to get all teams a player has played for
// Function to get all teams a player has played for
// const getPlayerTeams = async (playerId) => {
//     try {
//         const teams = await TeamM.find({});
//         let playerTeams = [];

//         teams.forEach(team => {
//             // Iterate over each player category (e.g., t20i, test, odi)
//             Object.keys(team.players).forEach(category => {
//                 team.players[category].forEach(player => {
//                     if (player.pid === playerId) {
//                         playerTeams.push(team.title); // Assuming team title is the name of the team
//                     }
//                 });
//             });
//         });

//         return playerTeams;
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return [];
//     }
// };

// // Example usage
// const playerId = 81; // Replace with the actual player ID (e.g., Washington Sundar's ID)
// getPlayerTeams(playerId).then(teams => {
//     console.log("Teams Played For:", teams);
// });







// const getAllTeamNamesAndWriteToCSV = async () => {
//     try {
//         const teams = await Team.find({}, { title: 1, _id: 0 });
//         const teamNames = teams.map(team => team.title);

//         // Convert array to CSV string
//         const csvString = teamNames.join('\n');

//         // Write to a CSV file
//         fs.writeFileSync('teamNames.csv', csvString);

//         console.log('Team names have been written to teamNames.csv');
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// };

// // Example usage
// getAllTeamNamesAndWriteToCSV();