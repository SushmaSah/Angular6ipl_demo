var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teamSchema = new Schema({
	"id": Number,
    "name": String,
    "role": String,
    "Nationality": String,
    "IsUncapped": Boolean,
    "Matches": Number,
    "Runs": Number,
    "Wickets": Number,
    "dob": String,
    "team": String,
    "cost": Number
});

module.exports = mongoose.model('players', teamSchema);