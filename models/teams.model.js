const mongoose = require('mongoose');



const teamsSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  alt_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  thumb_url: {
    type: String,
    required: true,
  },
  logo_url: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  etag: {
    type: String,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  api_version: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Teamtt', teamsSchema);

module.exports = Team;
