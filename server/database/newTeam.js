var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newTeamSchema = new Schema({
    teamName: String,
    team:{
        "type": "array",
        "item": {
            "type": "object",
            "properties": {
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
                "cost": Number,
                "nid": Number
            }
        } 
    },
    remainingBudget: Number
});

module.exports = mongoose.model('newTeam', newTeamSchema);
