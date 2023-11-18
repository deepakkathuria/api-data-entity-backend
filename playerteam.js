// const axios = require('axios');

// const TOKEN = '73d62591af4b3ccb51986ff5f8af5676';
// const teamId = 7047;
// const apiUrl = `https://rest.entitysport.com/v2/teams/${teamId}/player?token=${TOKEN}`;

// console.log('Making API request to:', apiUrl);

// axios.get(apiUrl)
//     .then(response => {
//         console.log('Received API response:', response.data);

//         // Check if the response is successful
//         if (response.status === 200 && response.data.status === 'ok') {
//             const players = response.data.response.items.players.firstclass;

//             // Print the results
//             players.forEach(player => {
//                 const playerName = `${player.first_name} ${player.last_name}`.trim();
//                 console.log(`Player: ${playerName}, Team: ${response.data.response.items.team.title}`);
//             });
//         } else {
//             console.log('Error in API request. Status:', response.status);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error.message || 'An unexpected error occurred');
//     });



const axios = require('axios');

const TOKEN = '73d62591af4b3ccb51986ff5f8af5676';
const teamId = 7047;
const apiUrl = `https://rest.entitysport.com/v2/teams/${teamId}/player?token=${TOKEN}`;

console.log('Making API request to:', apiUrl);

axios.get(apiUrl)
    .then(response => {
        console.log('Received API response:', response.data);

        // Check if the response is successful
        if (response.status === 200 && response.data.status === 'ok') {
            const players = response.data.response.items.players.firstclass;

            // Create a dictionary to store player information
            const playersInfo = {};

            // Iterate through the players and store their information
            players.forEach(player => {
                const playerName = `${player.first_name} ${player.last_name}`.trim();
                const playerTeams = playersInfo[playerName] || [];
                playerTeams.push(response.data.response.items.team.title);
                playersInfo[playerName] = playerTeams;
            });

            // Print the results
            for (const [player, teams] of Object.entries(playersInfo)) {
                console.log(`Player: ${player}, Teams: ${teams.join(', ')}`);
            }
        } else {
            console.log('Error in API request. Status:', response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error.message || 'An unexpected error occurred');
    });
