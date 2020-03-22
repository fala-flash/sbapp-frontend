import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  
  user = {
    name: '',
    email: '',
    tel: 0,
    role: '',
    _id: ''
  }

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      
    },
     err => {
       console.log(JSON.stringify(err));
       return false;
     });
  }


  deleteProfile(){
    console.log('Questa funzione cancellerà il profilo!');
    
  }

}