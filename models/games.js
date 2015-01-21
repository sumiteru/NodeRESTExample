var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
	title: {type: String, required: true},
	genre: {type: String, required: true},
	releaseDate: {type: Date, required: true},
	image: {type: String, required: false}
});

module.exports = mongoose.model("Game", gameSchema);