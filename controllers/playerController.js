const Player = require('../models/player.model'); 

exports.getPlayerById = async (req, res) => {
    try {
      const { pid } = req.params;
      const player = await Player.findOne({ pid }).exec();
  
      if (player) {
        res.json(player);
      } else {
        res.status(404).json({ message: 'Player not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };