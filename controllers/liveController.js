const Live = require('../models/live.model');



exports.getMatches = async (req, res) => {
    try {
      const { startDate, endDate, currentPage = 1, per_page = 80 } = req.query;
      const query = {};
  
      // Adding date range filter if provided
      if (startDate && endDate) {
        query.date_start = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  
      // Pagination logic
      const options = {
        skip: (currentPage - 1) * per_page,
        limit: parseInt(per_page)
      };
  
      const matches = await Live.find(query, null, options);
      res.json(matches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  