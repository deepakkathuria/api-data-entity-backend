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
    const { searchText } = req.query;
    console.log(searchText,"serachtext")
    const query = {};

    // Add search functionality
    if (searchText) {
      // Assuming you want to search in a field like 'name'
      // This will allow a case-insensitive partial match
      query.title = { $regex: searchText, $options: 'i' };
    }

    const players = await Player.find(query);
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getallPlayer = async (req, res) => {
  try {
    const { searchText, page = 1, limit = 100 } = req.query; // Default values for page and limit
    console.log(searchText, "searchText");
    let query = {};

    // Add search functionality
    if (searchText) {
      query.name = { $regex: searchText, $options: 'i' };
    }

    // Calculate the pagination
    const skip = (page - 1) * limit; // Number of documents to skip

    const players = await Player.find(query).skip(skip).limit(limit);
    const total = await Player.countDocuments(query); // Get total count of documents

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      data: players
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// exports.addOrUpdatePlayerContent = async (req, res) => {
//   const { id } = req.params; // or req.body, depending on how you send the ID
//   const { team_content,teams } = req.body;
//   console.log(req.body,"requestbody")

//   try {
//     const player = await Player.findOne({ pid: id });

//     if (!player) {
//       return res.status(404).send('Team not found');
//     }

//     // If the team doesn't have any content yet, add it.
//     // If it already has content, update it.
//     player.player_content = team_content || player.player_content;
//     player.teams = teams || player.teams;


//     await player.save(); // Save the updated team

//     res.status(200).json({
//       message: 'Team content added or updated successfully',
//       player,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




exports.addOrUpdatePlayerContent = async (req, res) => {
  const { id } = req.params; // or req.body, depending on how you send the ID
  const { team_content, teams } = req.body;

  try {
    const player = await Player.findOne({ pid: id });

    if (!player) {
      return res.status(404).send('Player not found');
    }

    // Update player content
    player.player_content = team_content || player.player_content;

    // Update teams
    // Assuming you want to replace the entire teams array
    player.teams = teams.map(team => ({
      tid: team.tid,
      alt_name: team.alt_name
    })) || player.teams;

    await player.save(); // Save the updated player

    res.status(200).json({
      message: 'Player content added or updated successfully',
      player,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.addOrUpdatePlayerImage = async (req, res) => {
  const { playerId } = req.params; // Extracting playerId from URL parameter

  try {
      const player = await Player.findOne({ pid: playerId });

      if (!player) {
          return res.status(404).send('Player not found');
      }

      // Update image URL if a new image is uploaded
      if (req.file) {
          player.image_url = req.file.path; // Assuming file storage path as image URL
      } else {
          return res.status(400).send('No image file provided');
      }

      await player.save(); // Save the updated player document

      res.status(200).json({
          message: 'Player image updated successfully',
          player,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
