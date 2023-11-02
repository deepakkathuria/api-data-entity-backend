const Team = require('../models/teams.model'); 

exports.getTeams = async (req, res) => {
  try {
    const { type, sex } = req.query;
    const query = {};
    if (type) query.type = type;
    if (sex) query.sex = sex;

    const teams = await Team.find(query);
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTeamById = async (req, res) => {
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
};