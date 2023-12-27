const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
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
    teams: [teamSchema],// Array of team IDs

    
});

const Player = mongoose.model('Player', playerSchema);


module.exports = Player;