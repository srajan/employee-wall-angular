import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    apiRoot: string = "https://d08sxmexn3.execute-api.ap-south-1.amazonaws.com/dev/employee-wall/";
    nameValue='';
    role='';
    isDisabled='';

  	constructor(private http: Http) { }

  	ngOnInit() {
  	}

  	addUser (name ,role, isDisabled){
  		console.log('name is %s',name);
      console.log('role is %s',role);
  		console.log('isDisabled is %s',isDisabled);

      let isConfirm = confirm("Do you want to add " + name + " to user list?");

      if(isConfirm){
        let addUserBody = {
          name: name,
          role: role,
          isDisabled: isDisabled
        };
        let cpHeaders = new Headers({ 'Content-type':'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        let addUserURL = `${this.apiRoot}add-user`;
        console.log(addUserURL)

        this.http.post(addUserURL, addUserBody).subscribe(
            res => {
                  console.log(res);
            },
            err => {
                  console.log('error occured while adding skill...');
                  console.log(err);
            }
          );
        this.nameValue='';
        this.role='';
        this.isDisabled='';
      } 
  	}

}
