import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { Router } from "@angular/router";

declare const gapi: any;

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
	toggle = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

	public auth2: any;
	public googleInit() {
		gapi.load('auth2', () => {
		  this.auth2 = gapi.auth2.init({
		    client_id: '1067194349027-3kcs6jv374ue87e5un06gmhs4ch0fre8.apps.googleusercontent.com',
		    cookiepolicy: 'single_host_origin',
		    scope: 'profile email'
		  });
		  this.attachSignin(document.getElementById('googleBtn'));
		});
	}

  	public attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
		  (googleUser) => {

		    let profile = googleUser.getBasicProfile();
		    console.log('Token || ' + googleUser.getAuthResponse().id_token);
		    console.log('ID: ' + profile.getId());
		    console.log('Name: ' + profile.getName());
		    console.log('Image URL: ' + profile.getImageUrl());
		    console.log('Email: ' + profile.getEmail());
		    
		    //Very hacky. Need to find a better way to do it.
		    var emailDomain = profile.getEmail().split("@")[1];
		    console.log(emailDomain);
		    console.log(typeof(emailDomain));
		    if(emailDomain.includes("kickdrumtech.com") || emailDomain.includes("kickdrum.com")){
		 	   	console.log("Valid Kickdrum User.");
	 	   		this.router.navigate(['/dashboard']);
		    }else{
		    	console.log("Invalid User...");
		    }


		  }, (error) => {
		    console.log(JSON.stringify(error, undefined, 2));
		  });
		}

	ngAfterViewInit(){
      this.googleInit();
	}
}
