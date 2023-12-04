const Live = require('../models/live.model');


// exports.getMatches = async (req, res) => {
//   try {
//     const { startDate, endDate, currentPage = 1, per_page } = req.query;
//     console.log(startDate, endDate, "filter");
//     const query = {};

//     // Adding date range filter if provided
//     if (startDate && endDate) {
//       query.date_start = {
//         $gte: new Date(startDate), // Assuming startDate is in YYYY-MM-DD format
//         $lte: new Date(endDate)   // Adjusting for the entire day range
//       };
//     }

//     // Calculate the skip value for pagination
//     const skipValue = (currentPage - 1) * (per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER);

//     // Pagination logic with dynamic per_page
//     const options = {
//       skip: skipValue,
//       limit: per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER
//     };

//     const matches = await Live.find(query, null, options);
//     res.json(matches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




// exports.getMatches = async (req, res) => {
//   try {
//     const { date, currentPage = 1, per_page } = req.query;
//     const query = {};
//     console.log("Received date string:", date);

//     if (date) {
//       const [startDate, endDate] = date.split('_');
//       const parsedStartDate = new Date(startDate);
//       const parsedEndDate = endDate ? new Date(`${endDate}T23:59:59.999Z`) : null;
      
//       console.log("Adjusted Start Date Object:", parsedStartDate);
//       if (parsedEndDate) console.log("Adjusted End Date Object:", parsedEndDate);
    
//       query.date_start = { $gte: parsedStartDate };
//       if (parsedEndDate) query.date_start.$lte = parsedEndDate;
//     }
//     console.log("Query object:", query);

//     // Pagination logic
//     const skipValue = (currentPage - 1) * (per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER);
//     const options = {
//       skip: skipValue,
//       limit: per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER
//     };

//     const matches = await Live.find(query, null, options);
//     console.log("Number of matches returned:", matches.length);

//     // Extract match IDs
//     const matchIds = matches.map(match => match.match_id);
//     console.log(matchIds,"matchids")

//     // Send match IDs in response
//     res.json({ matchIds });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// ---------------------------details------------------------------------------------------------------

exports.getMatches = async (req, res) => {
  try {
    const { date, currentPage = 1, per_page } = req.query;
    const query = {};

    if (date) {
      const [startDate, endDate] = date.split('_');
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = endDate ? new Date(`${endDate}T23:59:59.999Z`) : null;

      // Adjust the query to filter matches where the date range overlaps
      // with the range between date_start and date_end
      if (parsedEndDate) {
        query.$or = [
          { date_start: { $gte: parsedStartDate, $lte: parsedEndDate } },
          { date_end: { $gte: parsedStartDate, $lte: parsedEndDate } },
          { date_start: { $lte: parsedStartDate }, date_end: { $gte: parsedEndDate } }
        ];
      } else {
        query.date_start = { $gte: parsedStartDate };
      }
    }

    // Pagination logic
    const skipValue = (currentPage - 1) * (per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER);
    const options = {
      skip: skipValue,
      limit: per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER
    };

    const matches = await Live.find(query, null, options);
    console.log("Number of matches returned:", matches.length);

    // Extract match IDs
    const matchIds = matches.map(match => match.match_id);
    console.log(matchIds, "matchids");

    // Send match IDs in response
    res.json({ matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};











exports.getMatchesfilterwithstatus = async (req, res) => {
  try {
    const { date, currentPage = 1, per_page, status } = req.query;
    const query = {};

    // Date filtering
    if (date) {
      // existing date filtering logic...
    }

    // Status filtering
    if (status) {
      const statusArray = status.split(',').map(Number);
      query.status = { $in: statusArray };
    }

    // Pagination logic
    const skipValue = (currentPage - 1) * (per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER);
    const options = {
      skip: skipValue,
      limit: per_page ? parseInt(per_page) : Number.MAX_SAFE_INTEGER
    };

    const matches = await Live.find(query, null, options);
    console.log("Number of matches returned:", matches.length);

    // Extract match IDs
    const matchIds = matches.map(match => match.match_id);
    console.log(matchIds, "matchids");

    // Send match IDs in response
    res.json({ matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};