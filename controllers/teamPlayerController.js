const TeamM = require('../models/teamPlayer.model'); // Update with the correct path

exports.getAllTeams = async (req, res) => {
  try {
    const matches = await TeamM.find({}).exec();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTeamPlayers = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await TeamM.findOne({ tid: teamId });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json({ players: team.players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
