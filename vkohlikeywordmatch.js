const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

// Configuration for your database
const dbConfig = {
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_wordpress_database_name'
};

// Set up the Express server
const app = express();
const port = 3000; // You can choose any port

// Body parser to parse JSON bodies
app.use(bodyParser.json());

// Function to update the post content with a hyperlink for the given word
async function updatePostContent(word, url) {
  // Establish connection to the database
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Use `connection.escape()` to prevent SQL injection
    const escapedWord = connection.escape(`%${word}%`);
    // Fetch posts that contain the word
    const [posts] = await connection.execute(`SELECT ID, post_content FROM wp_posts WHERE post_content LIKE ${escapedWord}`);

    for (let post of posts) {
      // Replace the first occurrence of the word with an <a> tag with href
      // We use a regex with word boundaries to match the exact word
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(post.post_content)) {
        const updatedContent = post.post_content.replace(regex, `<a href="${url}">${word}</a>`);

        // Update the post content in the database
        await connection.execute('UPDATE wp_posts SET post_content = ? WHERE ID = ?', [updatedContent, post.ID]);
      }
    }

    console.log(`${posts.length} posts were checked and the relevant ones were updated.`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    // Always close the database connection when done
    await connection.end();
  }
}

// Route to trigger the update process
app.post('/update-content', async (req, res) => {
  const { word, url } = req.body;

  if (!word || !url) {
    return res.status(400).send({ message: 'Please provide both a word and a URL to update.' });
  }

  await updatePostContent(word, url);

  res.send({ message: 'Update process completed.' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



















//------------------------------------------------competitionSchema---------------------------------------------------------

// const competitionS = new mongoose.Schema({
//   cid: {
//     type: Number,
//     allowNull: false,
//   },
//   title: {
//     type: String,
//     allowNull: false,
//   },
//   abbr: {
//     type: String,
//   },
//   type: {
//     type:String,
//   },
//   category: {
//     type: String,
//   },
//   game_format: {
//     type: String,
//   },
//   status: {
//     type: String,
//   },
//   season: {
//     type: String,
//   },
//   datestart: {
//     type: Date,
//   },
//   dateend: {
//     type: Date,
//   },
//   country: {
//     type: String,
//   },
//   total_matches: {
//     type: Number,
//   },
//   total_rounds: {
//     type: Number,
//   },
//   total_teams: {
//     type: Number,
//   },
//   table: {
//     type: Number,
//   },
//   man_of_the_series: {
//     type: Object,
//   },
//   rounds: {
//     type: Object, // Assuming 'rounds' is an array of objects containing round information
//   },
//   venue_list: {
//     type: Object, // Assuming 'venue_list' is an array of objects containing venue information
//   },
// });

// const Competition = mongoose.model('Competitiont', competitionS);



// app.get('/competition',async(req,res)=>{
//   try{
//       const matches = await Competition.find({}).exec()
//       res.json(matches)
//   }catch(err){
//       console.error(err)
//   }
// })



















// ------------------------match list api -------------------------------



// // Define the Mongoose schemas for nested objects
// const venueSchema = new mongoose.Schema({
//   venue_id: String,
//   name: String,
//   location: String,
//   country: String,
//   timezone: String,
// });

// const competitionSchema = new mongoose.Schema({
//   cid: Number,
//   title: String,
//   abbr: String,
//   type: String,
//   category: String,
//   match_format: String,
//   season: String,
//   status: String,
//   datestart: String,
//   dateend: String,
//   country: String,
//   total_matches: String,
//   total_rounds: String,
//   total_teams: String,
// });

// const teamSchema = new mongoose.Schema({
//   team_id: Number,
//   name: String,
//   short_name: String,
//   logo_url: String,
//   scores_full: String,
//   scores: String,
//   overs: String,
// });

// const matchSchema = new mongoose.Schema({
//   match_id: Number,
//   title: String,
//   short_title: String,
//   subtitle: String,
//   match_number: String,
//   format: Number,
//   format_str: String,
//   status: Number,
//   status_str: String,
//   status_note: String,
//   verified: String,
//   pre_squad: String,
//   odds_available: String,
//   game_state: Number,
//   game_state_str: String,
//   domestic: String,
//   competition: competitionSchema,
//   teama: teamSchema,
//   teamb: teamSchema,
//   date_start: String,
//   date_end: String,
//   timestamp_start: Number,
//   timestamp_end: Number,
//   date_start_ist: String,
//   date_end_ist: String,
//   venue: venueSchema,
//   umpires: String,
//   referee: String,
//   equation: String,
//   live: String,
//   result: String,
//   result_type: Number,
//   win_margin: String,
//   winning_team_id: Number,
//   commentary: Number,
//   wagon: Number,
//   latest_inning_number: Number,
//   presquad_time: String,
//   verify_time: String,
//   match_dls_affected: String,
//   weather: [],
//   pitch: {
//     pitch_condition: String,
//     batting_condition: String,
//     pace_bowling_condition: String,
//     spine_bowling_condition: String,
//   },
//   toss: {
//     text: String,
//     winner: Number,
//     decision: Number,
//   },
// });


// const Todo = mongoose.model("livescoredk", matchSchema);



// ------------------------------------MATCH LIST API---------------------------------------------
// app.get('/list', async (req, res) => {
//   try {
//     const matches = await Todo.find({}).exec()
//     res.json(matches)
//   } catch (err) {
//     console.error(err)
//   }
// })
// -------------------------------------------MATCH LIST API ---------------------------------------

