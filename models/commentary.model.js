// Batsman Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batsmanSchema = new Schema({
    name: String,
    batsman_id: String,
    batting: Boolean,
    position: String,
    role: String,
    runs: Number,
    balls_faced: Number,
    fours: Number,
    sixes: Number,
    how_out: String,
    dismissal: String,
    strike_rate: String,
    bowler_id: String,
    first_fielder_id: String,
    second_fielder_id: String,
    third_fielder_id: String
  });
  
  // Bowler Schema
  const bowlerSchema = new Schema({
    name: String,
    bowler_id: String,
    bowling: Boolean,
    overs: Number,
    maidens: Number,
    runs_conceded: Number,
    wickets: Number,
    noballs: Number,
    wides: Number,
    econ: String
  });
  
  // Fielder Schema
  const fielderSchema = new Schema({
    fielder_id: String,
    fielder_name: String,
    catches: Number,
    runout_thrower: Number,
    runout_catcher: Number,
    runout_direct_hit: Number,
    stumping: Number,
    is_substitute: String
  });
  
  // Review Schema
  const reviewSchema = new Schema({
    batting_team_total_review: String,
    batting_team_review_success: String,
    batting_team_review_failed: String,
    batting_team_review_available: String,
    bowling_team_total_review: String,
    bowling_team_review_success: String,
    bowling_team_review_failed: String,
    bowling_team_review_available: String
  });
  
  // Did Not Bat Schema
  const didNotBatSchema = new Schema({
    player_id: String,
    name: String
  });
  
  // Inning Schema
  const inningSchema = new Schema({
    iid: Number,
    number: Number,
    name: String,
    short_name: String,
    status: Number,
    issuperover: String,
    result: Number,
    batting_team_id: Number,
    fielding_team_id: Number,
    scores: String,
    scores_full: String,
    batsmen: [batsmanSchema],
    bowlers: [bowlerSchema],
    fielder: [fielderSchema],
    powerplay: [String], // Assuming powerplay details are strings; adjust if necessary
    review: reviewSchema,
    did_not_bat: [didNotBatSchema],
    max_over: String,
    target: String
  });





  const batsmanPerformanceSchema = new Schema({
    runs: Number,
    balls_faced: Number,
    fours: Number,
    sixes: Number,
    batsman_id: String
  });
  
  // Bowler Performance Schema within Commentary
  const bowlerPerformanceSchema = new Schema({
    runs_conceded: Number,
    maidens: Number,
    wickets: Number,
    bowler_id: String,
    overs: Schema.Types.Mixed // Mixed type to accommodate something like "0.1" for partial overs
  });
  
  // Commentary Schema
  const commentarySchema = new Schema({
    event_id: String,
    event: String,
    batsman_id: String,
    bowler_id: String,
    over: Number,
    ball: Number,
    score: Number,
    commentary: String,
    noball_dismissal: Boolean,
    text: String,
    timestamp: Number,
    run: Number,
    noball_run: String,
    wide_run: String,
    bye_run: String,
    legbye_run: String,
    bat_run: String,
    noball: Boolean,
    wideball: Boolean,
    six: Boolean,
    four: Boolean,
    batsmen: [batsmanPerformanceSchema],
    bowlers: [bowlerPerformanceSchema]
  });
  
  
  const teamSchema = new Schema({
    tid: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    abbr: { type: String, required: true },
    alt_name: { type: String, required: true },
    type: { type: String, required: true },
    thumb_url: { type: String, required: true },
    logo_url: { type: String, required: true },
    country: { type: String, required: true },
    sex: { type: String, required: true }
  });
  



  const matchSchema = new Schema({
    status: { type: Number, required: true },
    game_state: { type: Number, required: true }
    // You can add more fields here as needed
  });
  



  const teamSchema1 = new mongoose.Schema({
    tid: { type: Number, required: true }, // Team ID
    alt_name: { type: String, required: true } // Alternate name of the team
});

const playerSchema = new mongoose.Schema({
    pid: { type: Number, required: true },
    title: { type: String, required: true },
    short_name: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, default: '' },
    middle_name: { type: String, default: '' },
    birthdate: { type: Date, required: true },
    birthplace: { type: String, default: '' },
    country: { type: String, required: true },
    primary_team: [{ tid: Number, name: String, short_name: String }],
    logo_url: { type: String, default: '' },
    playing_role: { type: String, default: '' },
    batting_style: { type: String, default: '' },
    bowling_style: { type: String, default: '' },
    fielding_position: { type: String, default: '' },
    recent_match: { type: Number, default: null },
    recent_appearance: { type: Date, default: null },
    fantasy_player_rating: { type: Number, default: null },
    alt_name: { type: String, default: '' },
    facebook_profile: { type: String, default: '' },
    twitter_profile: { type: String, default: '' },
    instagram_profile: { type: String, default: '' },
    debut_data: { type: String, default: '' },
    thumb_url: { type: String, default: '' },
    nationality: { type: String, default: '' },
    player_content:{ type: String,required: true},
    image_url: { type: String, default: '' }, // URL of the player's image
    teams: [teamSchema1],// Array of team IDs

    
});


  




const Team = mongoose.model('Team', teamSchema);
const Player = mongoose.model('Player', playerSchema);
const Match = mongoose.model('Match', matchSchema);
const Commentary = mongoose.model('Commentary', commentarySchema);
const Inning = mongoose.model('Inning', inningSchema);

module.exports = {
  Team,
  Player,
  Match,
  Commentary,
  Inning
};