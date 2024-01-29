const Livescorecard = require('../models/livescorecard.model');
const moment = require('moment-timezone');


exports.getMatchScoreId = async (req, res) => {
    try {
        const { matchId } = req.params; // Assuming match ID is passed as a URL parameter

        // Fetch the match data from the database
        const match = await Livescorecard.findOne({ match_id: matchId });

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        // Convert the Mongoose document to a plain JavaScript object
        const matchData = match.toObject();

        // Convert date_start_ist to local time zone and format
        if (matchData.date_start_ist) {
            matchData.date_start_ist = moment(matchData.date_start_ist)
                .tz('Asia/Kolkata')
                .format('YYYY-MM-DD HH:mm:ss');
        }

        console.log(matchData.date_start_ist, "Converted Local Time");

        // Send the modified match data in response
        res.json({ match: matchData });
    } catch (error) {
        console.error('Error fetching match data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};