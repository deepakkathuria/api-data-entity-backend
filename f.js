const express = require('express');
const axios = require('axios');
const app = express();
const port = 3005;

app.get('/fetch-teams', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4003/teams');

    const teams = response.data;
    const formattedTeams = teams.map(team => ({
      name: team.title ? team.title.toLowerCase().replace(/\s/g, '') : 'unknown',
      id: team.tid
    }));

    res.json(formattedTeams);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching teams');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
