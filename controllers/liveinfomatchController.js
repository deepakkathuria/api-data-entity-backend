const Liveinfo = require('../models/liveinfo.model');


exports.getMatchById = async (req, res) => {
    try {
        const { matchId } = req.params; // Assuming match ID is passed as a URL parameter

        // Fetch the match data from the database
        const match = await Liveinfo.findOne({ match_id: matchId });

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        // Send the match data in response
        res.json({ match });
    } catch (error) {
        console.error('Error fetching match data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};