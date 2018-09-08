import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

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

  search (){
    let url = `${this.apiRoot}search?searchKey=` + this.serial;
    this.http.get(url).subscribe(
      res => {
        //console.log(JSON.parse(res._body))
        if(res['_body']){
          //console.log(JSON.parse(JSON.parse(res['_body']).body));
          this.searchResult = JSON.parse(JSON.parse(res['_body']));
        }
      }); 
  }
}
