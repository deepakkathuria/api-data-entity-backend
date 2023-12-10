const Competition = require('../models/competition.model'); // Ensure you import your Competition model

exports.getCompetitions = async (req, res) => {
  try {
    const { status, paged = 1, per_page } = req.query;
    const query = {};

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Pagination logic
    const skipValue = (paged - 1) * (per_page ? parseInt(per_page, 10) : 0);
    const options = {
      skip: skipValue
    };

    // Apply limit only if per_page is provided
    if (per_page) {
      options.limit = parseInt(per_page, 10);
    }

    // Fetch competitions from the database
    const competitions = await Competition.find(query, null, options);
    console.log(`Number of competitions returned: ${competitions.length}`);

    // Send competitions data in response
    res.json({ competitions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};