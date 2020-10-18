const mongoose = require("mongoose");


const SaveGame = mongoose.model(
  'saveGame',
  new mongoose.Schema({
    name: String,
    rows: Array,
    columns: Array,
    nextPlayer: String,
    winner: String,
    banner: String,
    loadScreen: Boolean,
    saveScreen: Boolean,
    loads: Array,
    warning: Boolean,
  }, {timestamps: {}})
);

module.exports = SaveGame;