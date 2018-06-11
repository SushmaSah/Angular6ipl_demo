import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  tname: string;
  tmoto: string;

  ngOnInit() {

  	this.route.params.subscribe(params=>{
  		if (params.op == "toTeamCreated") {
            this.router.navigate(['/teamcreated']);
          }else {
          	this.tname = params.op;
          	this.router.navigate(['/createpage',this.tname]);
          }
    //this.router.navigate(['/teamcreated']);
  	//this.router.navigate(['/createpage','toTeamCreated']);
  	})
  	
  }

}
