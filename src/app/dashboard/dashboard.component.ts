import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  serial = '';
  searchResult = '';
  apiRoot: string = "https://d08sxmexn3.execute-api.ap-south-1.amazonaws.com/dev/employee-wall/";

  constructor(private http: Http) { }

  ngOnInit() {  }

  search (query){

    this.serial = query;
    let url = `${this.apiRoot}search?searchKey=` + query;
    this.http.get(url).subscribe(
      res => {
        //console.log(JSON.parse(res._body))
        if(res['_body']){
          //console.log(JSON.parse(JSON.parse(res['_body']).body));
          this.searchResult = JSON.parse(JSON.parse(res['_body']));
        }
      },
      err => {
        console.log("/search failed!");
      }
      ); 
  }
}

$('#skillAnchor').click(function(e){
    e.preventDefault()
})