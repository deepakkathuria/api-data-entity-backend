const mongoose = require('mongoose');



const statsSchema = {
  match_id: Number,
  inning_id: Number,
  matches: Number,
  innings: Number,
  notout: Number,
  runs: Number,
  balls: Number,
  highest: Number,
  run100: Number,
  run50: Number,
  run4: Number,
  run6: Number,
  average: String,
  strike: String,
  catches: Number,
  stumpings: Number,
  fastest50balls: Number,
  fastest100balls: Number,
  overs: String,
  econ: String,
  wickets: Number,
  bestinning: String,
  bestmatch: String,
  wicket4i: Number,
  wicket5i: Number,
  wicket10m: Number,
  hattrick: Number
};

const playerStatsSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  title: { type: String, required: true },
  short_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  middle_name: { type: String, default: '' },
  birthdate: { type: mongoose.Schema.Types.Mixed, required: true },
  country: { type: String, required: false },
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
  batting: {
    test: statsSchema,
    odi: statsSchema,
    t20i: statsSchema,
    t20: statsSchema,
    lista: statsSchema,
    firstclass: statsSchema,
    t10: statsSchema
  },
  bowling: {
    test: statsSchema,
    odi: statsSchema,
    t20i: statsSchema,
    t20: statsSchema,
    lista: statsSchema,
    firstclass: statsSchema,
    t10: statsSchema
  },
  // etag: { type: String, default: '' },
  // modified: { type: Date, default: null },
  // datetime: { type: Date, default: null },
  // api_version: { type: String, default: '' }
});



const Playerstats = mongoose.model('PlayerStats', playerStatsSchema);

module.exports = Playerstats;
