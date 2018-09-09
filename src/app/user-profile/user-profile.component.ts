import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	searchResult = '';
	apiRoot: string = "https://d08sxmexn3.execute-api.ap-south-1.amazonaws.com/dev/employee-wall/";
	user = '';
	skillToBeAdded = '';
	userId = '';//TODO: need an api to get userId for given user

	constructor(private activatedRoute: ActivatedRoute, private http: Http) {
		this.activatedRoute.queryParams.subscribe(params => {
		    this.user = (typeof params['user']) !== "undefined" ? params['user'] : 'farhat';
		    console.log(this.user); // Print the parameter to the console. 

	    	this.search(this.user);
		});
	}

  ngOnInit() { }

  search (userName){
    let url = `${this.apiRoot}search?searchKey=` + userName;
    this.http.get(url).subscribe(
      res => {
        //console.log(JSON.parse(res._body))
        if(res['_body']){
          //console.log(JSON.parse(JSON.parse(res['_body']).body));
          this.searchResult = JSON.parse(JSON.parse(res['_body']));
          console.log(this.searchResult);
        }
      }); 
  }

  addSkill() {
  	console.log('addskill() was called');
  	console.log('skill to be added : %s',this.skillToBeAdded);
  	let addSkillBody = {
  		name: this.user,
  		userId: this.userId,
  		skill: this.skillToBeAdded
  	};
  	let cpHeaders = new Headers({'Content-type':'application/json'});
	let options = new RequestOptions({ headers: cpHeaders });
	let addSkillURL = `${this.apiRoot}add-skill`;

	//refresh the list of skills
  	this.http.post(addSkillURL, addSkillBody).subscribe(
  			res => {
  						console.log(res);
  						this.search(this.user);
  			},
  			err => {
  						console.log('error occured while adding skill...');
  						console.log(err);
  						this.search(this.user);
  			}
  		);
  	this.skillToBeAdded = ''; 
  }

  deleteSkill(delSkill){
  	let isConfirm = confirm("Do you want to remove " + delSkill + " from skill list?");

  	if(isConfirm){
  		//api call to delete delSkill
  		//and refresh skill list
  	}
  }
}
