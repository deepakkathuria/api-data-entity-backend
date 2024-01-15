const mongoose = require("mongoose");
const { Schema } = mongoose;

// // Venue Schema
// const venueSchema = new Schema({
//     venue_id: String,
//     name: String,
//     location: String,
//     country: String,
//     timezone: String
// });

// // Competition Schema
// const competitionSchema = new Schema({
//     cid: Number,
//     title: String,
//     abbr: String,
//     type: String,
//     category: String,
//     match_format: String,
//     season: String,
//     status: String,
//     datestart: Date,
//     dateend: Date,
//     country: String,
//     total_matches: Number,
//     total_rounds: Number,
//     total_teams: Number
// });

// // Pitch Schema
// const pitchSchema = new Schema({
//     pitch_condition: String,
//     batting_condition: String,
//     pace_bowling_condition: String,
//     spine_bowling_condition: String
// });

// // Toss Schema
// const tossSchema = new Schema({
//     text: String,
//     winner: Number,
//     decision: Number
// });

// // Main Match Schema
// const matchSchema = new Schema({
//     match_id: Number,
//     title: String,
//     short_title: String,
//     subtitle: String,
//     match_number: String,
//     format: Number,
//     format_str: String,
//     status: Number,
//     status_str: String,
//     status_note: String,
//     verified: Boolean,
//     pre_squad: Boolean,
//     odds_available: Boolean,
//     game_state: Number,
//     game_state_str: String,
//     competition: competitionSchema,
//     teama: teamSchema,
//     teamb: teamSchema,
//     date_start: Date,
//     date_end: Date,
//     timestamp_start: Number,
//     timestamp_end: Number,
//     date_start_ist: Date,
//     date_end_ist: Date,
//     venue: venueSchema,
//     umpires: String,
//     referee: String,
//     equation: String,
//     live: String,
//     result: String,
//     result_type: Number,
//     win_margin: String,
//     winning_team_id: Number,
//     commentary: Number,
//     wagon: Number,
//     latest_inning_number: Number,
//     presquad_time: Date,
//     verify_time: Date,
//     match_dls_affected: Boolean,
//     live_inning_number: Number,
//     pitch: pitchSchema,
//     toss: tossSchema,
//     etag: String,
//     modified: Date,
//     datetime: Date,
//     api_version: String
// });

// const livescorecard = mongoose.model('livescorecard', matchSchema);

// module.exports = liveinfo;

// ----------------------------------------------------------------PLAYER SCHEMA ------------------------------------------------

const primaryTeamSchema = new mongoose.Schema({
    tid: Number,
    name: String,
    short_name: String
  });

const playerSchema = new mongoose.Schema({
  pid: Number,
  title: String,
  short_name: String,
  first_name: String,
  last_name: String,
  middle_name: String,
  birthdate: Date,
  birthplace: String,
  country: String,
  primary_team: [primaryTeamSchema],

//   primary_team: primaryTeamSchema, // Assuming primary_team is an array of strings
  playing_role: String,
  batting_style: String,
  bowling_style: String,
  recent_match: Number,
  recent_appearance: Number,
  fantasy_player_rating: Number,
  alt_name: String,
  facebook_profile: String,
  twitter_profile: String,
  instagram_profile: String,
  debut_data: String, // Assuming debut_data is a string, change the type if needed
  thumb_url: String,
  nationality: String,
  role: String,
  role_str: String,
  // Add other fields as necessary
});

// --------------------------------------------------------------INNINGS SCHEMA-----------------------------------------------------

const batsmanSchema = new mongoose.Schema({
  name: String,
  batsman_id: String,
  batting: Boolean,
  position: String,
  role: String,
  role_str: String,
  runs: String,
  balls_faced: String,
  fours: String,
  sixes: String,
  how_out: String,
  dismissal: String,
  strike_rate: String,
  bowler_id: String,
  first_fielder_id: String,
  second_fielder_id: String,
  third_fielder_id: String,
});

const bowlerSchema = new mongoose.Schema({
  name: String,
  bowler_id: String,
  bowling: Boolean,
  position: String,
  overs: String,
  maidens: String,
  runs_conceded: String,
  wickets: String,
  noballs: String,
  wides: String,
  econ: String,
  run0: String,
  bowledcount: String,
  lbwcount: String,
});

const fielderSchema = new mongoose.Schema({
  fielder_id: String,
  fielder_name: String,
  catches: Number,
  runout_thrower: Number,
  runout_catcher: Number,
  runout_direct_hit: Number,
  stumping: Number,
  is_substitute: Boolean,
});

const reviewSchema = new mongoose.Schema({
  batting_team_total_review: String,
  batting_team_review_success: String,
  batting_team_review_failed: String,
  batting_team_review_available: String,
  bowling_team_total_review: String,
  bowling_team_review_success: String,
  bowling_team_review_failed: String,
  bowling_team_review_available: String,
});

const fowSchema = new mongoose.Schema({
  name: String,
  batsman_id: String,
  runs: String,
  balls: String,
  how_out: String,
  score_at_dismissal: Number,
  overs_at_dismissal: String,
  bowler_id: String,
  dismissal: String,
  number: Number,
});

const manOfTheSeriesSchema = new mongoose.Schema({
  pid: Number,
  name: String,
  thumb_url: String,
});

const powerplayDetailSchema = new mongoose.Schema({
  startover: String,
  endover: String,
});

const powerplaySchema = new mongoose.Schema({
  p1: powerplayDetailSchema,
  // Add additional fields if needed
});

const partnershipSchema = new mongoose.Schema({
  runs: Number,
  balls: Number,
  overs: String,
  batsmen: [batsmanSchema],
});

const extraRunsSchema = new mongoose.Schema({
  byes: Number,
  legbyes: Number,
  wides: Number,
  noballs: Number,
  penalty: String,
  total: Number,
});

const manOfTheMatchSchema = new mongoose.Schema(
  {
    pid: String,
    name: String,
    thumb_url: String,
  },
  { _id: false, strict: false }
);

const inningsSchema = new mongoose.Schema({
  iid: Number,
  number: Number,
  name: String,
  short_name: String,
  status: Number,
  issuperover: Boolean,
  result: Number,
  batting_team_id: Number,
  fielding_team_id: Number,
  scores: String,
  scores_full: String,
  batsmen: [batsmanSchema],
  bowlers: [bowlerSchema],
  fielders: [fielderSchema],
  powerplay: [powerplaySchema],
  review: reviewSchema,
  fows: [fowSchema],
  last_wicket: [fowSchema],
  extra_runs: extraRunsSchema,
  equations: {
    runs: Number,
    wickets: Number,
    overs: String,
    bowlers_used: Number,
    runrate: String,
  },
  current_partnership: {
    type: [partnershipSchema],
    default: [], // Sets the default value to an empty array
  },
  did_not_bat: [
    {
      player_id: String,
      name: String,
    },
  ],
  max_over: String,
  target: Number,
});

//   const matchSchema = new mongoose.Schema({
//     innings: [inningsSchema]
//   });

// const manOfTheMatchSchema = new mongoose.Schema({
//     pid: String,
//     name: String,
//     thumb_url: String // Optional
//   });

const tossSchema = new mongoose.Schema({
  text: String,
  winner: Number,
  decision: Number, // 1 for batting, 2 for bowling, etc.
});

const pitchSchema = new mongoose.Schema({
  pitch_condition: String,
  batting_condition: String,
  pace_bowling_condition: String,
  spin_bowling_condition: String,
});

const venueSchema = new Schema({
  venue_id: String,
  name: String,
  location: String,
  country: String,
  timezone: String,
});

// Competition Schema
const competitionSchema = new Schema({
  cid: Number,
  title: String,
  abbr: String,
  type: String,
  category: String,
  match_format: String,
  season: String,
  status: String,
  datestart: Date,
  dateend: Date,
  country: String,
  total_matches: Number,
  total_rounds: Number,
  total_teams: Number,
});

// -------------------------------TEAM --------------------------------------------------

const teamSchema = new mongoose.Schema({
  team_id: Number,
  name: String,
  short_name: String,
  logo_url: String,
  thumb_url: String,
  scores_full: String,
  scores: String,
  overs: String,
});

//   const matchDetailsSchema = new mongoose.Schema({
//     teama: teamSchema,
//     teamb: teamSchema,
//     date_start: Date,
//     date_end: Date,
//     timestamp_start: Number,
//     timestamp_end: Number,
//     date_start_ist: Date,
//     date_end_ist: Date
//   });

const weatherSchema = new mongoose.Schema({
  weather: String,
  weather_desc: String,
  temp: Number,
  humidity: Number,
  visibility: Number,
  wind_speed: Number,
  clouds: Number,
});

const cricketMatchSchema = new mongoose.Schema({
  match_id: Number,
  title: String,
  short_title: String,
  subtitle: String,
  match_number: String,
  format: Number,
  format_str: String,
  status: Number,
  status_str: String,
  status_note: String,
  verified: Boolean,
  pre_squad: Boolean,
  odds_available: Boolean,
  game_state: Number,
  game_state_str: String,
  competition: competitionSchema,
  teama: teamSchema,
  teamb: teamSchema,
  date_start: Date,
  date_end: Date,
  timestamp_start: Number,
  timestamp_end: Number,
  date_start_ist: Date,
  date_end_ist: Date,
  venue: venueSchema,
  umpires: String,
  referee: String,
  equation: String,
  live: String,
  result: String,
  result_type: Number,
  win_margin: String,
  winning_team_id: Number,
  commentary: Number,
  wagon: Number,
  latest_inning_number: Number,
  presquad_time: Date,
  verify_time: Date,
  match_dls_affected: Boolean,
  live_inning_number: String,
  weather: [weatherSchema], // Assuming weather is an array of strings
  pitch: pitchSchema,
  toss: tossSchema,
  current_over: String,
  previous_over: String,
  man_of_the_match: {
    type: manOfTheMatchSchema,
    default: null,
  },
  man_of_the_series: manOfTheSeriesSchema,
  is_followon: Number,
  team_batting_first: String,
  team_batting_second: String,
  last_five_overs: String,
  innings: [inningsSchema], // Define structure based on your innings data
  players: [playerSchema], // Define structure based on your players data
  pre_match_odds: [Object], // Define structure if needed
  day_remaining_over: String,
  match_notes: [[String]],
  // Assuming match_notes is an array of strings
  etag: String,
  modified: Date,
  datetime: Date,
  api_version: String,
});

const CricketMatchScorecard = mongoose.model(
  "CricketMatchScorecard",
  cricketMatchSchema
);

module.exports = CricketMatchScorecard;
