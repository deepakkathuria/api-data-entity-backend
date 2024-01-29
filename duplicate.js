const axios = require("axios");
const { Parser } = require("json2csv");
const fs = require("fs");


// const playerIds= [115]
let allPlayerIds = [];


const apiToken = "73d62591af4b3ccb51986ff5f8af5676";
const baseUrl = "https://rest.entitysport.com/v2/players/";

async function getPlayerStats(playerId) {
  try {
    const response = await axios.get(
      `${baseUrl}${playerId}/stats?token=${apiToken}`
    );
    return response.data.response;
  } catch (error) {
    console.error("Error fetching data for player ID:", playerId, error);
    return null;
  }
}

function transformData(playerData,teamSex) {


  console.log(playerData,"playerkadatadonthavesex")
  
  // Transform the data into the desired CSV format here
  // This is an example, adjust the fields according to your needs
  
  return {
    "Sex": teamSex,

    "Player Id":playerData?.player?.pid,
    "Full Name": playerData?.player?.first_name,
    "Batting_Test_match":playerData?.batting?.test?.matches,
    "Batting_Test_INNS":playerData?.batting?.test?.innings,
    "Batting_Test_NO":playerData?.batting?.test?.notout,
    "Batting_Test_RUNS":playerData?.batting?.test?.runs,
    "Batting_Test_HS":playerData?.batting?.test?.highest,
    "Batting_Test_AVG":playerData?.batting?.test?.average,
    "Batting_Test_BF":playerData?.batting?.test?.balls,
    "Batting_Test_SR":playerData?.batting?.test?.strike,
    "Batting_Test_100s":playerData?.batting?.test?.run100,
    "Batting_Test_50s":playerData?.batting?.test?.run50,
    "Batting_ODI_match":playerData?.batting?.odi?.matches,
    "Batting_ODI_INNS":playerData?.batting?.odi?.innings,
    "Batting_ODI_NO":playerData?.batting?.odi?.notout,
    "Batting_ODI_RUNS":playerData?.batting?.odi?.runs,
    "Batting_ODI_HS":playerData?.batting?.odi?.highest,
    "Batting_ODI_AVG":playerData?.batting?.odi?.average,
    "Batting_ODI_BF":playerData?.batting?.odi?.balls,
    "Batting_ODI_SR":playerData?.batting?.odi?.strike,
    "Batting_ODI_100s":playerData?.batting?.odi?.run100,
    "Batting_ODI_50s":playerData?.batting?.odi?.run50,
    "Batting_T20I_match":playerData?.batting?.t20i?.matches,
    "Batting_T20I_INNS":playerData?.batting?.t20i?.innings,
    "Batting_T20I_NO":playerData?.batting?.t20i?.notout,
    "Batting_T20I_RUNS":playerData?.batting?.t20i?.runs,
    "Batting_T20I_HS":playerData?.batting?.t20i?.highest,
    "Batting_T20I_AVG":playerData?.batting?.t20i?.average,
    "Batting_T20I_BF":playerData?.batting?.t20i?.balls,
    "Batting_T20I_SR":playerData?.batting?.t20i?.strike,
    "Batting_T20I_100s":playerData?.batting?.t20i?.run100,
    "Batting_T20I_50s":playerData?.batting?.t20i?.run50,
    "Batting_T20_match":playerData?.batting?.t20?.matches,
    "Batting_T20_INNS":playerData?.batting?.t20?.innings,
    "Batting_T20_NO":playerData?.batting?.t20?.notout,
    "Batting_T20_RUNS":playerData?.batting?.t20?.runs,
    "Batting_T20_HS":playerData?.batting?.t20?.highest,
    "Batting_T20_AVG":playerData?.batting?.t20?.average,
    "Batting_T20_BF":playerData?.batting?.t20?.balls,
    "Batting_T20_SR":playerData?.batting?.t20?.strike,
    "Batting_T20_100s":playerData?.batting?.t20?.run100,
    "Batting_T20_50s":playerData?.batting?.t20?.run50,

    "Batting_LIST_A_match":playerData?.batting?.lista?.matches,
    "Batting_LIST_A_INNS":playerData?.batting?.lista?.innings,
    "Batting_LIST_A_NO":playerData?.batting?.lista?.notout,
    "Batting_LIST_A_RUNS":playerData?.batting?.lista?.runs,
    "Batting_LIST_A_HS":playerData?.batting?.lista?.highest,
    "Batting_LIST_A_AVG":playerData?.batting?.lista?.average,
    "Batting_LIST_A_BF":playerData?.batting?.list?.balls,
    "Batting_LIST_A_SR":playerData?.batting?.lista?.strike,
    "Batting_LIST_A_100s":playerData?.batting?.lista?.run100,
    "Batting_LIST_A_50s":playerData?.batting?.lista?.run50,











    "Batting_1st Class_match":playerData?.batting?.firstclass?.matches,
    "Batting_1st Class_INNS":playerData?.batting?.firstclass?.innings,
    "Batting_1st Class_NO":playerData?.batting?.firstclass?.notout,
    "Batting_1st Class_RUNS":playerData?.batting?.firstclass?.runs,
    "Batting_1st Class_HS":	playerData?.batting?.firstclass?.highest,
    "Batting_1st Class_AVG":playerData?.batting?.firstclass?.average,	
    "Batting_1st Class_BF":	playerData?.batting?.firstclass?.balls,
    "Batting_1st Class_SR":playerData?.batting?.firstclass?.strike,
    "Batting_1st Class_100s":playerData?.batting?.firstclass?.run100,
    "Batting_1st Class_50s":playerData?.batting?.firstclass?.run50,
    "Batting_t10_match":playerData?.batting?.t10?.matches,
    "Batting_t10_INNS":playerData?.batting?.t10?.innings,
    "Batting_t10_NO":playerData?.batting?.t10?.notout,
    "Batting_t10_RUNS":playerData?.batting?.t10?.runs,
    "Batting_t10_HS":playerData?.batting?.t10?.highest,
    "Batting_t10_AVG":playerData?.batting?.t10?.average,
    "Batting_t10_BF":playerData?.batting?.t10?.balls,
    "Batting_t10_SR":playerData?.batting?.t10?.strike,
    "Batting_t10_100s":playerData?.batting?.t10?.run100,
    "Batting_t10_50s":playerData?.batting?.t10?.run50,


    // -----------------------------bowling---------------------------------------

    "Bowling_Test_MA": 	playerData?.bowling?.test?.matches,
    "Bowling_Test_INS":	playerData?.bowling?.test?.innings,
    "Bowling_Test_OV":	playerData?.bowling?.test?.overs,
    "Bowling_Test_RUS":	playerData?.bowling?.test?.runs,
    "Bowling_Test_WK":	playerData?.bowling?.test?.wickets,
    "Bowling_Test_BBI":	playerData?.bowling?.test?.bestinning,
    "Bowling_Test_AVG":	playerData?.bowling?.test?.average,
    "Bowling_Test_ECN":	playerData?.bowling?.test?.econ,
    "Bowling_Test_SR":	playerData?.bowling?.test?.strike,
    "Bowling_Test_4W":	playerData?.bowling?.test?.wicket4i,
    "Bowling_Test_5W":	playerData?.bowling?.test?.wicket5i,
    "Bowling_ODI_MAT":	playerData?.bowling?.odi?.matches,
    "Bowling_ODI_INNS": playerData?.bowling?.odi?.innings,
    "Bowling_ODI_OVR":	playerData?.bowling?.odi?.overs,
    "Bowling_ODI_RUNS":	playerData?.bowling?.odi?.runs,
    "Bowling_ODI_WK	":  playerData?.bowling?.odi?.wickets,
    "Bowling_ODI_BBI":	playerData?.bowling?.odi?.bestinning,
    "Bowling_ODI_AVG":	playerData?.bowling?.odi?.average,
    "Bowling_ODI_ECN":	playerData?.bowling?.odi?.econ,
    "Bowling_ODI_SR":   playerData?.bowling?.odi?.strike,
    "Bowling_ODI_4W":   playerData?.bowling?.odi?.wicket4i,
    "Bowling_ODI_5W":   playerData?.bowling?.odi?.wicket5i,
    "Bowling_T20I_MAT":	playerData?.bowling?.t20i?.matches,
    "Bowling_T20I_INNS":playerData?.bowling?.t20i?.innings,
    "Bowling_T20I_OVR":	playerData?.bowling?.t20i?.overs,
    "Bowling_T20I_RUNS":playerData?.bowling?.t20i?.runs,
    "Bowling_T20I_WK":	playerData?.bowling?.t20i?.wickets,
    "Bowling_T20I_BBI":	playerData?.bowling?.t20i?.bestinning,
    "Bowling_T20I_AVG":	playerData?.bowling?.t20i?.average,
    "Bowling_T20I_ECN":	playerData?.bowling?.t20i?.econ,
    "Bowling_T20I_SR":	playerData?.bowling?.t20i?.strike,
    "Bowling_T20I_4W":	playerData?.bowling?.t20i?.wicket4i,
    "Bowling_T20I_5W":	playerData?.bowling?.t20i?.wicket4i,
    "Bowling_T20_MAT":	playerData?.bowling?.t20?.matches,
    "Bowling_T20_INNS":	playerData?.bowling?.t20?.innings,
    "Bowling_T20_OVR":	playerData?.bowling?.t20?.overs,
    "Bowling_T20_RUNS":	playerData?.bowling?.t20?.runs,
    "Bowling_T20_WK":   playerData?.bowling?.t20?.wickets,
    "Bowling_T20I_BBI": playerData?.bowling?.t20?.bestinning,
    "Bowling_T20_AVG":  playerData?.bowling?.t20?.average,
    "Bowling_T20_ECN":	playerData?.bowling?.t20?.econ,
    "Bowling_T20_SR":   playerData?.bowling?.t20?.strike,
    "Bowling_T20_4W":   playerData?.bowling?.t20?.wicket4i,
    "Bowling_T20_5W":   playerData?.bowling?.t20?.wicket5i,
    "Bowling_List A_MAT":	playerData?.bowling?.lista?.matches,
    "Bowling_List A_INNS":	playerData?.bowling?.lista?.innings,
    "Bowling_List A_OVR":   playerData?.bowling?.lista?.overs,
    "Bowling_List A_RUNS":	playerData?.bowling?.lista?.runs,
    "Bowling_List A_WK":    playerData?.bowling?.lista?.wickets,
    "Bowling_List A_BBI":   playerData?.bowling?.lista?.bestinning,
    "Bowling_List A_AVG":   playerData?.bowling?.lista?.average,
    "Bowling_List A_ECN":   playerData?.bowling?.lista?.econ,
    "Bowling_List A_SR":    playerData?.bowling?.lista?.strike,
    "Bowling_List A_4W":    playerData?.bowling?.lista?.wicket4i,
    "Bowling_List A_5W":    playerData?.bowling?.lista?.wicket5i,
    "Bowling_1st Class_MAT":	playerData?.bowling?.firstclass?.matches,
    "Bowling_1st Class_INNS":   playerData?.bowling?.firstclass?.innings,
    "Bowling_1st Class_OVR":    playerData?.bowling?.firstclass?.overs,
    "Bowling_1st Class_RUNS":   playerData?.bowling?.firstclass?.runs,
    "Bowling_1st Class_WK":     playerData?.bowling?.firstclass?.wickets,
    "Bowling_1st Class_BBI":    playerData?.bowling?.firstclass?.bestinning,
    "Bowling_1st Class_AVG":    playerData?.bowling?.firstclass?.average,
    "Bowling_1st Class_ECN":    playerData?.bowling?.firstclass?.econ,
    "Bowling_1st Class_SR":     playerData?.bowling?.firstclass?.strike,
    "Bowling_1st Class_4W":     playerData?.bowling?.firstclass?.wicket4i,
    "Bowling_1st Class_5W":     playerData?.bowling?.firstclass?.wicket5i,
    "Bowling_t10_MAT":    playerData?.bowling?.t10?.matches,
    "Bowling_t10_INNS":   playerData?.bowling?.t10?.innings,
    "Bowling_t10_OVR":    playerData?.bowling?.t10?.overs,
    "Bowling_t10_RUNS":   playerData?.bowling?.t10?.runs,
    "Bowling_t10_WK":     playerData?.bowling?.t10?.wickets,
    "Bowling_t10_BBI":    playerData?.bowling?.t10?.bestinning,
    "Bowling_t10_AVG":    playerData?.bowling?.t10?.average,
    "Bowling_t10_ECN":    playerData?.bowling?.t10?.econ,
    "Bowling_t10_SR":     playerData?.bowling?.t10?.strike,
    "Bowling_t10_4W":     playerData?.bowling?.t10?.wicket4i,
    "Bowling_t10_5W":     playerData?.bowling?.t10?.wicket5i,
  };
}



// async function main() {
//   const allPlayerData = [];

//   for (const playerId of playerIds) {
//     const data = await getPlayerStats(playerId);
//     if (data) {
//       allPlayerData.push(transformData(data));
//     }
//   }

//   const json2csvParser = new Parser();
//   const csv = json2csvParser.parse(allPlayerData);

//   fs.writeFileSync("playerStatsindiarohit.csv", csv);
//   console.log("CSV file created successfully.");
// }

// main();


// const fetchPlayerIds = async (page = 1, totalPages = Infinity) => {
//     if (page > totalPages) return;


//     try {
//         console.log(`Fetching player IDs for page ${page}/${totalPages}...`);
//         // const response = await axios.get(`${baseUrl}?country=sct&token=${apiToken}&paged=${page}`);
//         const response =await axios.get('https://rest.entitysport.com/v2/teams/123214/player?token=73d62591af4b3ccb51986ff5f8af5676')
//         const data = response.data;
//         console.log(data,"dadddddddddddddddddddddddddd")

//         if (data && data.response && data.response.items) {
//             allPlayerIds.push(...data.response.items.map(item => item.pid));
//             console.log(`Page ${page} fetched successfully. Total player IDs fetched: ${allPlayerIds.length}`);

//             totalPages = data.response.total_pages || totalPages;
//             if (page < totalPages) {
//                 await fetchPlayerIds(page + 1, totalPages);
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching player IDs:', error);
//     }
// };


// const fetchPlayerIds = async (page = 1, totalPages = Infinity) => {
//   if (page > totalPages) return;

//   try {
//       console.log(`Fetching player IDs for page ${page}/${totalPages}...`);
//       const response = await axios.get('https://rest.entitysport.com/v2/teams/629/player?token=73d62591af4b3ccb51986ff5f8af5676')
//       const data = response.data;
//       console.log(data.response.items,"dataconsolehasteamsex")
    

//       if (data && data.response && data.response.items && data.response.items.players) {
//           const players = data.response.items.players.t20;
//           const playerIds = Object.keys(players).map(key => players[key].pid);
//           allPlayerIds.push(...playerIds);

//           console.log(`Page ${page} fetched successfully. Total player IDs fetched: ${allPlayerIds.length}`);

//           totalPages = data.response.total_pages || totalPages;
//           if (page < totalPages) {
//               await fetchPlayerIds(page + 1, totalPages);
//           }
//       }
//   } catch (error) {
//       console.error('Error fetching player IDs:', error);
//   }
// };

const fetchPlayerIds = async (page = 1, totalPages = Infinity) => {
  let teamSex = '';
  if (page > totalPages) return teamSex;

  try {
    // const response = await axios.get('https://rest.entitysport.com/v2/teams/629/player?token=73d62591af4b3ccb51986ff5f8af5676');
    const response = axios.get(`https://rest.entitysport.com/v2/players?country=in&token=73d62591af4b3ccb51986ff5f8af5676`)
    const data = response.data;

    // console.log(data,"playerkadat")

    if (data && data.response && data.response.items && data.response.items.players) {
      const players = data.response.items.players.t20;
      const playerIds = Object.keys(players).map(key => players[key].pid);
      allPlayerIds.push(...playerIds);

      // Store the team's sex
      teamSex = data.response.items.team.sex
      console.log(teamSex,"teamsexconsolegettingdata")

      totalPages = data.response.total_pages || totalPages;
      if (page < totalPages) {
        await fetchPlayerIds(page + 1, totalPages);
      }
    }
  } catch (error) {
    console.error('Error fetching player IDs:', error);
  }
  return teamSex;
};


async function main() {
  const teamSex = await fetchPlayerIds(); // Fetch all player IDs first and get team sex
  // console.log(teamSex,"teamkasex")

  const allPlayerData = [];
  for (const playerId of allPlayerIds) {
      const data = await getPlayerStats(playerId);
      if (data) {
          allPlayerData.push(transformData(data, teamSex));
      }
  }

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(allPlayerData);
  fs.writeFileSync("playerStatsRR.csv", csv);
  console.log("CSV file created successfully.");
}

main();
