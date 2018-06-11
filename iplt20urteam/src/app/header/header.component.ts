import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmyteamService } from '../tmyteam.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private myteam: TmyteamService, private formBuilder: FormBuilder, private http:HttpClient) { }

  //tname = this.myteam.utname;

  tmoto;
  form: FormGroup;
  tname;
  det;
  dtet: any;
  existeam;
  existeamname = [];
  eteamlookup = {};
  temp: Boolean = false;
  tt;
  list: any;
  private Players =this.myteam.editPlayers;
  teamlookup = {};
  teamfinal = [];
  private url: string = "http://localhost:8899/fetchCreatedTeams";
  selectedValueTeam = "Select Team";

  ngOnInit() {
    
    
    this.form = this.formBuilder.group({
      txtname: new FormControl('', [
        //this.validUsername,
        Validators.required,
        Validators.maxLength(15)
        //Validators.pattern('[a-zA-Z]+')
      ])
    })
    this.getTeamName();
    
  }


  getTeamName(){
    this.http.get(this.url)
      .subscribe(data =>{




        this.tt = data;
        //console.log(this.tt.msg);
        this.list = this.tt.msg;
        this.Players = this.list;
        //this.myteam.editPlayers = this.Players;
        for (var item, i = 0; item = this.Players[i++];) {
          var name = item.teamName;
          if (!(name in this.teamlookup)) {
            this.teamlookup[name] = 1;
            this.teamfinal.push(name);
          }
        }
        
        
      })
  }

  checkname(fcname){
    if (this.teamfinal.length == 1) {
      console.log(this.teamfinal.length);
      return false;
    }else{
      for(let t of this.teamfinal){
        if (fcname == t.toLowerCase()){
          return true;
        }
      }
      return false;
    }
    
  };

  onChangeTeam(event){
    this.getTeamName();
    for(let t of this.Players){
      if (t.teamName.toLowerCase() == event.toLowerCase()) {
        this.myteam.myTeam = t.team;
        this.myteam.updatedBudget = t.remainingBudget;
        
      }
    }
    this.myteam.utname = event;
    this.myteam.editing = true;
    this.myteam.editbtn = true;
    
    //this.router.navigate(['/teamcreated']);
    //this.router.navigate(['/createpage','toTeamCreated']);
    this.router.navigate(['/createform','toTeamCreated']);
  };
  
  validUsername(fc: FormControl){
    //this.temp = false;
    //this.temp = this.checkname(fc.value.toLowerCase());
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }

  CreateTeam(form){
    this.tname = form.value.txtname;
    //console.log(this.tname);
    this.temp = this.checkname(this.tname);
    if(this.temp){
      alert('Sorry '+this.tname +' is already exist.')
    }else{
      let formdata = new FormData();
      formdata.append('TeamName', this.tname);
      formdata.append('TeamMoto', this.tmoto);
      this.myteam.editing = false;
      this.myteam.updatedBudget = 10000000;
      this.router.navigate(['/createform',this.tname]);
      //this.router.navigate(['/createpage',this.tname]);
    }
  	
  }

}
