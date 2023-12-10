const mongoose = require('mongoose');

const { Schema } = mongoose;




// ------------------------------------live inning schema -----------------------------------------------------------------------

// Define sub-schemas first for nested structures
const ExtraRunsSchema = new Schema({
  byes: Number,
  legbyes: Number,
  wides: Number,
  noballs: Number,
  penalty: String,
  total: Number
});

const CurrentPartnershipSchema = new Schema({
  runs: Number,
  balls: Number,
  overs: String
});

const BatsmanSchema1 = new Schema({
  name: String,
  batsman_id: String,
  runs: Number,
  balls: Number
});

const LiveInningSchema = new Schema({
  iid: String,
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
  // Include other nested schemas as needed
  extra_runs: ExtraRunsSchema,
  current_partnership: CurrentPartnershipSchema,
  batsmen: [BatsmanSchema1]
  // Continue adding other fields as per your JSON structure
});
// ------------------------------------------------------------live_inning schema -------------------------------------------------------------
const CricketMatchSchema = new Schema({
    mid: Number,
    status: Number,
    status_str: String,
    game_state: Number,
    game_state_str: String,
    status_note: String,
    day_remaining_over: String,
    team_batting: String,
    team_bowling: String,
    live_inning_number: Number,
    live_score: LiveScoreSchema,
    // Include arrays for nested lists
    batsmen: [BatsmanSchema],
    bowlers: [BowlerSchema],
    // ... other fields and nested structures
    teams: [TeamSchema],
    players: [PlayerSchema],
    live_inning: LiveInningSchema,
    etag: String,
    modified: Date,
    datetime: Date,
    api_version: String
  });
  
  
// Create the model
const CricketMatch = mongoose.model('CricketMatch', CricketMatchSchema);

module.exports = CricketMatch;