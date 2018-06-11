import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { IPlayer } from '../player';
import { TmyteamService } from '../tmyteam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.css']
})
export class CreatepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private myteam: TmyteamService, private router:Router) {  }

  TeamName;
  NewTeam = this.myteam.myTeam;
  private Players =this.myteam.editPlayers;
  rPlayers;
  list: any;
  team = ['Mumbai Indians', 'Chennai Super Kings','Delhi Daredevils'];
  teamfinal = [];
  teamlookup = {};
  temp;
  newpid: number = this.myteam.pid;
  budget = this.myteam.updatedBudget;
  svbtn: boolean = false;
  upbtn: boolean = false;
  SBPlayers: number;
  SBBatsmen: number = 0;
  SBKeepers: number = 0;
  SBAllRounders: number = 0;
  SBBowlers: number = 0;
  OSNationality: number = 0;
  UQPlayer: number = 0;
  selectedValueR: string = "All Roles";
  selectedValueT: string = "All Types";
  selectedValueTeam: string = "All Team";
  tempR;
  tempPlyr;
  tempPlyr2;
  tt;
    
  private url: string = "http://localhost:8899/fetchTeam";

  ngOnInit() {
    this.squadCheck();
  	
    
      this.http.get(this.url)
      .subscribe(data =>{
        
        this.tt = data;
        this.list = this.tt.msg;
        this.Players = this.list;
        var temp = Object.assign([], this.Players);
        this.myteam.editPlayers = this.Players;
        for (var item, i = 0; item = this.Players[i++];) {
          var name = item.team;
          if (!(name in this.teamlookup)) {
            this.teamlookup[name] = 1;
            this.teamfinal.push(name);
          }
        }
        this.route.params.subscribe(params =>{
          
            this.TeamName = params.tn;
            this.myteam.utname = this.TeamName;
            
            if (this.myteam.editing == true) {
              this.NewTeam = this.myteam.myTeam;
              this.upbtn = true;
              this.svbtn = false;
              console.log(temp);
              this.playersOnEditing(temp);
            }else{ 
              this.NewTeam = [];
              this.upbtn = false;
              this.svbtn = false;
            };
          
          
          
        })
      }) 
  }

  playersOnEditing(pl){
    this.myteam.editPlayers = Object.assign([],pl);
    for(let n of this.NewTeam){
      let index = this.myteam.editPlayers.findIndex(player => player.id === n.id);
      this.myteam.editPlayers.splice(index, 1);
    }
    this.Players = this.myteam.editPlayers;
  }

  update(){
    const url = "http://localhost:8899/updateNewTeam/"+this.TeamName+"/"+this.budget;
    this.http.post(url,this.myteam.myTeam)
    .subscribe(res=>{
      let data = res;
      console.log(data);
    });
    this.myteam.editbtn = false;
    this.router.navigate(['/teamcreated']);
  };

  addPlayer(plyr){
  	if(this.NewTeam.length < 11){
  		if ((this.budget-plyr.cost) >= 0){
  			this.temp= this.NewTeam.filter(item =>{
				if (item.team == plyr.team)
  			      return true;
  			});
        //console.log(this.temp);
		  	if (this.temp.length < 6) {
		  			this.NewTeam.push({"id": plyr.id, "name": plyr.name, "role": plyr.role, "Nationality": plyr.Nationality, "IsUncapped": plyr.IsUncapped, "Matches": plyr.Matches, "Runs": plyr.Runs, "Wickets": plyr.Wickets, "dob": plyr.dob, "team": plyr.team, "cost": plyr.cost, "nid": this.newpid++});
            let index = this.myteam.editPlayers.findIndex(player => player.id === plyr.id);
				  	this.myteam.editPlayers.splice(index, 1);
            this.playersOnCat(this.selectedValueR, this.selectedValueTeam);
            this.myteam.myTeam = this.NewTeam;
            console.log(this.myteam.myTeam);
            console.log(this.NewTeam);
            this.budget = this.budget - plyr.cost;
            this.myteam.updatedBudget = this.budget;
            this.myteam.pid = this.newpid;
            this.squadCheck();
		  	}else{
		  			alert("More than 6 players are not allowed from one team..")
		  		}
		  }else{
		  	alert("Budget exceeded..")
  		  }
  	}else{
  		alert("Limit exceeded! You can only select 11 players")
  	  }
  }

  removePlayer(tm){
    this.Players = this.myteam.editPlayers;
  	this.Players.push(tm);
    this.Players = this.Players.sort(function(a,b){
      return a.id - b.id;
    })
    this.myteam.editPlayers = this.Players;
  	this.budget += tm.cost;
    let index = this.NewTeam.findIndex(player => player.id === tm.id)
  	this.NewTeam.splice(index,1);
  	this.myteam.myTeam = this.NewTeam;
    this.myteam.updatedBudget = this.budget
    document.getElementById("svdmsg").innerText = "";
    this.squadCheck();
  }

  onChange(value){
    console.log(value);
    if (value == "") {
      this.Players = this.myteam.editPlayers;
    }else {
      var temp = this.myteam.editPlayers;
      this.Players = [];
      for (let p of temp) {
        var res = p.name.toLowerCase();
        var n = res.indexOf(value);
        if (n >= 0) {
          this.Players.push(p); 
        }
      }
    }    
  }
  
  squadCheck(){
    this.SBPlayers = this.NewTeam.length;
    this.SBBatsmen = 0;
    this.SBAllRounders = 0;
    this.SBKeepers = 0;
    this.SBBowlers = 0;
    this.OSNationality = 0;
    this.UQPlayer = 0;
    document.getElementById("SB").style.backgroundColor = "red";
    
    //checks Batsmen
      for (let n of this.NewTeam) {
        if (n.role == "Batsman") {this.SBBatsmen += 1;};
        if (n.role == "Wicket-keeper") {this.SBKeepers += 1;};
        if (n.role == "All-rounder") {this.SBAllRounders += 1;};
        if (n.role == "Bowler") {this.SBBowlers += 1;};
        if (n.Nationality != "Indian") {this.OSNationality += 1};
        if (n.IsUncapped) {this.UQPlayer +=1}
      }
    if (this.UQPlayer >= 1) {
          
          document.getElementById("UQ").style.backgroundColor = "#1c9016";
          
        }else{
          
          document.getElementById("UQ").style.backgroundColor = "red";
        }
    if (this.NewTeam.length == 11) {
      if (this.SBBatsmen == 4 || this.SBBatsmen == 5) {
        if (this.SBKeepers == 1) {
          if (this.SBAllRounders >= 1 && this.SBAllRounders <= 4) {
            if (this.SBBowlers >= 2 && this.SBBowlers <= 4) {
              document.getElementById("SB").style.backgroundColor = "green";

              if (this.OSNationality <= 4) {
                if (this.UQPlayer >= 1) {
                  this.svbtn = true;
                }
              }
            }else {
              document.getElementById("SB").style.backgroundColor = "red";
            }
          }
        }
      }
    }else {
      
      this.svbtn = false;
      console.log(this.svbtn);
    }
    //Check Overseas Limit
    if (this.OSNationality <= 4) {
      document.getElementById("OL").style.backgroundColor = "green";
      
    }else{
      document.getElementById("OL").style.backgroundColor = "red";
      
    }
  }

  save(){
    //document.getElementById("svdmsg").innerText = "Team saved successfully..!!";
    //document.getElementById("SB").style.backgroundColor = "red";
    //document.getElementById("SB").style.visibility = "hidden";
    const url = "http://localhost:8899/saveNewTeam/"+this.TeamName+"/"+this.budget;
    this.http.post(url,this.myteam.myTeam)
    .subscribe(res=>{console.log(res)});
    this.myteam.editbtn = false;
    this.router.navigate(['/teamcreated']);
  }

  onChangeRole(val: any){

    this.selectedValueR = val;
    this.playersOnCat(val, this.selectedValueTeam);
    
  }
  onChangeType(val: any, IsAllType?: boolean){
    if (IsAllType) {
      this.Players = this.myteam.editPlayers;
    }else{
      this.playersOnCat(this.selectedValueR, this.selectedValueTeam);
    }
    
    var tempN;
    if (val != "All Types") {
        if (val == "Indian") {
        tempN= this.Players.filter(item =>{
        
          if (item.Nationality == "Indian")
                return true;
          });
        this.Players = tempN;
      }else if (val == "Overseas") {
        tempN= this.Players.filter(item =>{
        
          if (item.Nationality != "Indian")
                return true;
          });
        this.Players = tempN;
      }else if (val == "Uncapped") {
        tempN= this.Players.filter(item =>{
        
          if (item.IsUncapped)
                return true;
          });
        this.Players = tempN;
      }
    }
    
  }
  onChangeTeam(val: any){

    this.selectedValueTeam = val;
    this.playersOnCat(this.selectedValueR, val);
  }

  playersOnCat(role: string, team: string){

    this.onChangeType(this.selectedValueT, true);
    var temp1 = this.Players;
    var tempP;
    if (role == "All Roles") {
      if (team == "All Team") {
        this.Players = temp1;
      }else {
        tempP = this.Players.filter(item =>{
          if (item.team == team) {
            return true;
          }
        })
        this.Players = tempP;
      }
    }else if (team == "All Team") {
      tempP = this.Players.filter(item =>{
          if (item.role == role) {
            return true;
          }
        })
        this.Players = tempP;
      }else {
        tempP = this.Players.filter(item =>{
            if ( item.team == team && item.role == role) {
              return true;
            }
          })
          this.Players = tempP;
        } 
    this.tempPlyr = this.Players;
  }
}