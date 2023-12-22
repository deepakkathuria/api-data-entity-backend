const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Player Schema
const playerSchema = new Schema({
    pid: Number,
    title: String,
    short_name: String,
    first_name: String,
    last_name: String,
    middle_name: String,
    birthdate: Date,
    birthplace: String,
    country: String,
    primary_team: Array,
    logo_url: String,
    playing_role: String,
    batting_style: String,
    bowling_style: String,
    fielding_position: String,
    recent_match: Number,
    recent_appearance: Number,
    fantasy_player_rating: Number,
    alt_name: String,
    facebook_profile: String,
    twitter_profile: String,
    instagram_profile: String,
    debut_data: String,
    thumb_url: String,
    nationality: String
});

// Team Schema
const teamSchema = new Schema({
    tid: Number,
    title: String,
    abbr: String,
    alt_name: String,
    type: String,
    thumb_url: String,
    logo_url: String,
    country: String,
    sex: String
});

// Stat Types Schema
const statTypesSchema = new Schema({
    group_title: String,
    types: {
        batting_most_runs: String,
        batting_most_runs_innings: String,
        batting_highest_strikerate: String,
        batting_highest_strikerate_innings: String,
        batting_highest_average: String,
        batting_most_run100: String,
        batting_most_run50: String,
        batting_most_run6: String,
        batting_most_run6_innings: String,
        batting_most_run4: String,
        batting_most_run4_innings: String,
        // Add additional stat types here as needed
    }
});

// Stats Schema
const statsSchema = new Schema({
    matches: Number,
    runs: Number,
    notout: Number,
    highest: Number,
    run100: Number,
    run50: Number,
    run4: Number,
    run6: Number,
    catches: Number,
    stumpings: Number,
    fastest50balls: Number,
    fastest100balls: Number,
    average: String,
    strike: String,
    innings: Number,
    balls: Number,
    team: teamSchema,
    player: playerSchema
});

// Main Competition Stats Schema
const competitionStatsSchema = new Schema({
    cid: Number, // assuming you're storing competition ID

    stats: [statsSchema],
    total_items: Number,
    total_pages: Number,
    formats: [String],
    stat_types: [statTypesSchema],
    teams: [teamSchema],
    etag: String,
    modified: Date,
    datetime: Date,
    api_version: String
});

const CompetitionStats = mongoose.model('CompetitionStats', competitionStatsSchema);

module.exports = CompetitionStats;
