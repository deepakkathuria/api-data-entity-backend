const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team Schema
const teamSchema = new Schema({
    team_id: { type: Number, required: true },
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    logo_url: { type: String },
    scores_full: { type: String },
    scores: { type: String },
    overs: { type: String }
});

// Venue Schema
const venueSchema = new Schema({
    venue_id: { type: String },
    name: { type: String },
    location: { type: String },
    country: { type: String },
    timezone: { type: String }
});

// Weather Schema
const weatherSchema = new Schema({
    weather: { type: String },
    weather_desc: { type: String },
    temp: { type: Number },
    humidity: { type: Number },
    visibility: { type: Number },
    wind_speed: { type: Number },
    clouds: { type: Number }
});

// Pitch Schema
const pitchSchema = new Schema({
    pitch_condition: { type: String },
    batting_condition: { type: String },
    pace_bowling_condition: { type: String },
    spine_bowling_condition: { type: String }
});

// Competition Schema
const competitionSchema = new Schema({
    cid: { type: Number, required: true },
    title: { type: String, required: true },
    abbr: { type: String },
    type: { type: String },
    category: { type: String },
    match_format: { type: String },
    season: { type: String },
    status: { type: String },
    datestart: { type: Date },
    dateend: { type: Date },
    country: { type: String },
    total_matches: { type: Number },
    total_rounds: { type: Number },
    total_teams: { type: Number }
});

// Main Match Schema
const matchSchema = new Schema({
    match_id: { type: Number, required: true },
    title: { type: String, required: true },
    short_title: { type: String },
    subtitle: { type: String },
    match_number: { type: String },
    format: { type: Number },
    format_str: { type: String },
    status: { type: Number },
    status_str: { type: String },
    status_note: { type: String },
    verified: { type: Boolean },
    pre_squad: { type: Boolean },
    odds_available: { type: Boolean },
    game_state: { type: Number },
    game_state_str: { type: String },
    domestic: { type: Boolean },
    competition: competitionSchema,
    teama: teamSchema,
    teamb: teamSchema,
    date_start: { type: Date },
    date_end: { type: Date },
    timestamp_start: { type: Number },
    timestamp_end: { type: Number },
    date_start_ist: { type: Date },
    date_end_ist: { type: Date },
    venue: venueSchema,
    umpires: { type: String },
    referee: { type: String },
    equation: { type: String },
    live: { type: String },
    result: { type: String },
    result_type: { type: Number },
    win_margin: { type: String },
    winning_team_id: { type: Number },
    commentary: { type: Number },
    wagon: { type: Number },
    latest_inning_number: { type: Number },
    presquad_time: { type: Date },
    verify_time: { type: Date },
    match_dls_affected: { type: Boolean },
    weather: weatherSchema,
    pitch: pitchSchema,
    toss: {
        text: { type: String },
        winner: { type: Number },
        decision: { type: Number }
    }
});

const Matchtest = mongoose.model('Livetest', matchSchema);

module.exports = Matchtest;
