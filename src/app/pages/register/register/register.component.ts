import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';

import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

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
    
    private authService: AuthService, 
    private router: Router,
    private toastrService: ToastrService
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
      this.toastrService.warning('Compila tutti i campi');
      return false;
    }

    // validate email
    if(!this.validateService.validateEmail(user.email)){
      this.toastrService.warning("Il formato dell'email non è valido");
      return false;
    }

    // validate phone
    if(!this.validateService.validatePhone(user.tel)){
      this.toastrService.warning("Formato telefonico non valido");
      return false;
    }

    // register user
    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        this.toastrService.success('Registrazione avvenuta con successo.\nEffettua il login!');
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error("Errore durante la fase di registrazione.\nProva un'altra email");
        this.router.navigate(['/register']);
      }
    });

  }

  

}
