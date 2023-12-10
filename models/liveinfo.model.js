const mongoose = require('mongoose');
const { Schema } = mongoose;

// Team Schema
const teamSchema = new Schema({
    team_id: Number,
    name: String,
    short_name: String,
    logo_url: String,
    thumb_url: String,
    scores_full: String,
    scores: String,
    overs: String
});

// Venue Schema
const venueSchema = new Schema({
    venue_id: String,
    name: String,
    location: String,
    country: String,
    timezone: String
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
    total_teams: Number
});

// Pitch Schema
const pitchSchema = new Schema({
    pitch_condition: String,
    batting_condition: String,
    pace_bowling_condition: String,
    spine_bowling_condition: String
});

// Toss Schema
const tossSchema = new Schema({
    text: String,
    winner: Number,
    decision: Number
});

// Main Match Schema
const matchSchema = new Schema({
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
    live_inning_number: Number,
    pitch: pitchSchema,
    toss: tossSchema,
    etag: String,
    modified: Date,
    datetime: Date,
    api_version: String
});

const liveinfo = mongoose.model('liveinfo', matchSchema);

module.exports = liveinfo;
