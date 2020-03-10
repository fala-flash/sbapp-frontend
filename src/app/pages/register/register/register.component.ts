import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  tel: number;
  email: string;
  password: string;
  role: string;


  constructor(
    private validateService: ValidateService, 
    private flashMessagesService: FlashMessagesService, 
    private authService: AuthService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      tel: this.tel,
      password: this.password,
      role: this.role

    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // validate phone
    if(!this.validateService.validatePhone(user.tel)){
      this.flashMessagesService.show('Please use a valid phone', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // register user
    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  }

  

}
