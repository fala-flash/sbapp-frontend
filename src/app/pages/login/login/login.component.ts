import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { ToastrService } from "ngx-toastr";


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
    private toastrService: ToastrService
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
        this.router.navigate(['/profile']);
        this.toastrService.success('Benvenuto!');
      } else {
        this.router.navigate(['/login']);
        this.toastrService.error('Utente non trovato');
      }
      
    });
    
  }

}
