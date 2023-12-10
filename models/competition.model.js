const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a single competition
const competitionSchema = new Schema({
    cid: { type: Number, required: true },
    title: { type: String, required: true },
    abbr: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    game_format: { type: String, required: true },
    season: { type: String, required: true },
    datestart: { type: Date, required: true },
    dateend: { type: Date, required: true },
    country: { type: String, required: true },
    total_matches: { type: Number, required: true },
    total_rounds: { type: Number, required: true },
    total_teams: { type: Number, required: true }
});

// Create a model from the schema
const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
