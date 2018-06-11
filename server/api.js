var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/promeanipl');
var teamModel =  require('./database/team');
var newTeamModel = require('./database/newTeam');

var app = express();
app.use(cors());
app.use(bodyParser.json());
var productSchema = new Schema({
	"item" : String, "qty" : Number, "type" : String
});
var productsModel = mongoose.model('products',productSchema);
//var teamModel = mongoose.model('players',teamSchema);

app.get('/fetchTeam',function(req, res){
	console.log("okay");
	teamModel.find({},function(err, data){
		if (err) {}
			else if (data.length == 0) {
				res.json({err:1,msg:'No data found'})
			}else{
				res.json({err:0,msg:data})
			}
	})
});

app.get('/fetchCreatedTeams',function(req, res){
	console.log("okay");
	newTeamModel.find({},function(err, data){
		if (err) {}
			else if (data.length == 0) {
				res.json({err:1,msg:'No data found'})
			}else{
				res.json({err:0,msg:data})
			}
	})
});

/*app.post('/saveNewTeam/:tn', function(req,res){
	console.log(req.params.tn);
	console.log(req.body);
	res.json({err:0,msg:'Data saved'})
})*/

/*app.post('/saveNewTeam/:tn', function(req, res){
	
		let tname = req.params.tn;
		newTeamModel.insert({teamName: tname, team: req.body},function(err){
			if (err) {}
				else{
					res.json({err:0,msg:'Data saved'})
				}
		});
		
	
})*/

app.post('/saveNewTeam/:tn/:bdgt', function(req, res){
		let tname = req.params.tn;
		let budget = req.params.bdgt;
		let ntins = new newTeamModel({teamName: tname, team: req.body, remainingBudget: budget});
		ntins.save(function(err)
		{
			if (err) {}
				else{
					res.json({err:0,msg:'Data saved'})
				}
		})
})

app.post('/updateNewTeam/:tn/:bdgt', function(req, res){
		let tname = req.params.tn;
		let budget = req.params.bdgt;
		console.log(req.body);
		console.log(tname);
		//let ntins = new newTeamModel({teamName: tname, team: req.body});
		newTeamModel.update({teamName: tname},{$set:{team: req.body, remainingBudget: budget}},function(err){
			if (err) {}
				else{
					res.json({err:0,msg: 'Updated'});
				}
		})
})

app.listen(8899, function(){
	console.log("Work on 8899")
})
