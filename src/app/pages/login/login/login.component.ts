import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
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
    private validateService: ValidateService,
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

    // Required Fields
    if(!this.validateService.validateLogin(user)){
      this.toastrService.warning('Compila tutti i campi');
      return false;
    }

    // validate email
    if(!this.validateService.validateEmail(user.email)){
      this.toastrService.warning("Il formato dell'email non è valido");
      return false;
    }


    // validate password
    if(!this.validateService.validatePassword(user.password)){
      this.toastrService.warning("La password deve contenere almeno 8 caratteri");
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if ((data as any).success) {
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.router.navigate(['/profile']);
        this.toastrService.success((data as any).msg);
      } else {
        this.router.navigate(['/login']);
        this.toastrService.error((data as any).msg);
      }
      
    });
    
  }

}
