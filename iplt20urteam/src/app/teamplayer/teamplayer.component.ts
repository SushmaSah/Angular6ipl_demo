import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teamplayer',
  templateUrl: './teamplayer.component.html',
  styleUrls: ['./teamplayer.component.css']
})
export class TeamplayerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  teamName;
  list:any ;
  private Players = [];
  private teamPlayers = [];
  //private url: string = "./assets/t20team.json";
  private url: string = "http://localhost:8899/fetchTeam";

  ngOnInit() {
  	this.route.params.subscribe(param =>{
      this.teamPlayers = [];
  	  this.teamName = param.tm;
      this.http.get(this.url)
      .subscribe(data =>{
        this.list = data;
        this.Players = this.list.msg;
        if (this.teamName == "Players") {
          this.teamPlayers = this.Players;
        }else {
          this.teamPlayers= this.Players.filter(item =>{
        
          if (item.team == this.teamName)
              return true;
        });
        }
        
      })
  	})
  }

}
