import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../_services/register.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  
  
  
  private email: string = '';
  private name: string = '';
  private password: string = '';
  private warningMessage: string;

  constructor(private registerService: RegisterService, private router: Router) { }
  ngOnInit() {  
  }

   onRegister() {
    this.registerService.Register(this.name, this.email, this.password)
    .subscribe(res => {
      //check for errors
      this.warningMessage = '';
      if(Array.isArray(res.email)) {
        this.warningMessage += res.email[0];
      } 
      if(Array.isArray(res.name)) {
        this.warningMessage += res.name[0];
      } 
      if(Array.isArray(res.password)) {
        this.warningMessage += res.password[0];
      } 
      // if not errors - navigate to Login
      if(!this.warningMessage)
        this.router.navigate(['login']);
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    } );
  }

}

