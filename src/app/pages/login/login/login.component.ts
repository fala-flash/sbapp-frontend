import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if ((data as any).success) {
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.flashMessagesService.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessagesService.show((data as any).msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      }
      
    });
    
  }

}
