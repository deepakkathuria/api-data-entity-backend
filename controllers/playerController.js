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


exports.getPlayer = async (req, res) => {
  try {
    const players = await Player.find();
    console.log(players, "players");
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





exports.addOrUpdatePlayerContent = async (req, res) => {
  const { id } = req.params; // or req.body, depending on how you send the ID
  const { team_content } = req.body;
  console.log(req.body,"requestbody")

  try {
    const player = await Player.findOne({ pid: id });

    if (!player) {
      return res.status(404).send('Team not found');
    }

    // If the team doesn't have any content yet, add it.
    // If it already has content, update it.
    player.player_content = team_content || player.player_content;

    await player.save(); // Save the updated team

    res.status(200).json({
      message: 'Team content added or updated successfully',
      player,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
