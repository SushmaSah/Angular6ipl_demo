import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TmyteamService {

  constructor(private http: HttpClient) { }
  public updatedBudget: number = 10000000;
  public pid: number = 0;
  public editPlayers = [];
  public utname: string;
  public myTeam = [];
  public det;
  public dtet: any;
  public existeam;
  public existeamname = [];
  public eteamlookup = {};
  public editing: Boolean;
  public editbtn: Boolean;

  public getTeamName(){
  	this.http.get("http://localhost:8899/fetchCreatedTeams")
  	.subscribe(data =>{
  		this.det = data;
  		this.dtet = this.det.msg;
  		this.existeam = this.dtet;
  		//console.log(this.existeam);
  		for (var item, i = 0; item = this.existeam[i++];) {
          var name = item.teamName;
          if (!(name in this.eteamlookup)) {
            this.eteamlookup[name] = 1;
            this.existeamname.push(name);
          }
        }

  	})
  	return this.existeamname;
  }
  
}
