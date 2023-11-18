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


exports.addOrUpdateTeamContent = async (req, res) => {
  console.log("adddddddddddddddddddddddddddddddddddddddddddddddd")
  const { id } = req.params; // or req.body, depending on how you send the ID
  const { team_content } = req.body;

  try {
    const team = await Team.findOne({ tid: id });

    if (!team) {
      return res.status(404).send('Team not found');
    }

    // If the team doesn't have any content yet, add it.
    // If it already has content, update it.
    team.team_content = team_content || team.team_content;

    await team.save(); // Save the updated team

    res.status(200).json({
      message: 'Team content added or updated successfully',
      team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
