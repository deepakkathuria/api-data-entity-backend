const mongoose = require('mongoose');

const teamSchemaM = new mongoose.Schema({
    tid: { type: Number, required: true },
    title: { type: String, required: true },
    abbr: { type: String, required: true },
    alt_name: { type: String, required: true },
    type: { type: String, required: true },
    thumb_url: { type: String, required: true },
    logo_url: { type: String, required: true },
    country: { type: String, required: true },
    sex: { type: String, required: true },
    
    players: [{
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

    }]
  });
  
  const TeamM = mongoose.model('TeamMP3', teamSchemaM);
  
  


module.exports = TeamM;