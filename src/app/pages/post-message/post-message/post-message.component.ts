import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';

import * as moment from 'moment';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

import { ToastrService } from "ngx-toastr";




@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css']
})
export class PostMessageComponent implements OnInit {

  text: string;
  authorID = '';
  authorName = '';
  authorEmail = '';
  authorTel = 0;




  constructor(
              private validateService: ValidateService,
              private router: Router,
              private authService:AuthService,
              private toastrService: ToastrService
              ){}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.authorID = profile.user._id;
      this.authorName = profile.user.name;
      this.authorEmail = profile.user.email;
      this.authorTel = profile.user.tel;
    },
     err => {
       console.log(JSON.stringify(err));
       return false;
     });
  }



  onSendSubmit(){
    const message = {
      text: this.text,
      date: moment().format('DD/MM/YYYY').toString(),
      time: moment().format('HH:mm:ss').toString(),
      authorID: this.authorID,
      authorName: this.authorName,
      authorEmail: this.authorEmail,
      authorTel: this.authorTel
    }

    //validate message
    if (!this.validateService.validateMessage(message)) {
      this.toastrService.warning('Non puoi inviare una segnalazione vuota');
      return false;
    }
    
    //post message
    this.authService.addPost(message).subscribe(data => {
      if ((data as any).success) {
        this.toastrService.success((data as any).msg);
        this.router.navigate(['/blog']);
      } else {
        this.toastrService.error((data as any).msg);
        this.router.navigate(['/blog']);
      }
    });

  }

}


