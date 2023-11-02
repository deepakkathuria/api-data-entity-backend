// playerStatsController.js
const Playerstats = require('../models/playerStats.model'); // Update the path according to your project structure

exports.getPlayerStatsById = async (req, res) => {
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
};

