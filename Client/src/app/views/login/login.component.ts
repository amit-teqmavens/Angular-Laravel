import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	

	private email: string = '';
  	private password: string = '';
  	private warningMessage: string;
 	constructor(private authService: AuthenticationService, private router: Router) { 
  	}

 	ngOnInit() {
  	}

	onLogIn() {
    this.authService.login(this.email, this.password)
    .subscribe(res => {
      //check for errors
      console.log(res);
      this.warningMessage = '';
      if(Array.isArray(res.email)) {
        this.warningMessage += res.email[0];
      } 
      if(Array.isArray(res.name)) {
        this.warningMessage += res.name[0];
      }  
      // if not errors - navigate to home
      if(!this.warningMessage)
        this.router.navigate(['dashboard']);
    }, error => {
      this.warningMessage = "Invalid Credentials!";
    } );
  }



 }
