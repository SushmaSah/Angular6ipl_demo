import { Component, OnInit } from '@angular/core';
import { TmyteamService } from '../tmyteam.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-team-created',
  templateUrl: './team-created.component.html',
  styleUrls: ['./team-created.component.css']
})
export class TeamCreatedComponent implements OnInit {

  constructor(private myteam: TmyteamService, private router: Router, private http:HttpClient) { }

  selectedTeamName: string = this.myteam.utname;
  selectedTeam = this.myteam.myTeam;
  editbtn = this.myteam.editbtn;


  ngOnInit() {
   
  }

  edit(){
    this.myteam.editing = true;
  	this.router.navigate(['/createpage',this.selectedTeamName]);
  }

  Delete(){
    
  }

}
