import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as moment from 'moment';
/* import { Router } from "@angular/router"; */

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  text: string;
  date = moment().format('DD/MM/YYYY').toString();
  time = moment().format('HH:mm:ss').toString();
  authorID = '';
  authorName = '';
  authorEmail = '';
  authorTel = 0;
  

  posts = []

  constructor(private flashMessagesService: FlashMessagesService,
              private validateService: ValidateService,
              /* private router: Router, */
              private authService:AuthService) { }

  ngOnInit() {
    this.authService.getPosts().subscribe(post => {
      this.posts = post;  
    },
     err => {
       console.log(JSON.stringify(err));
       return false;
     });

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

  onCommentSubmit(){
    const comment = {
      text: this.text,
      date: this.date,
      time: this.time,
      authorID: this.authorID,
      authorName: this.authorName,
      authorEmail: this.authorEmail,
      authorTel: this.authorTel
    }

    //validate message
    if (!this.validateService.validateMessage(comment)) {
      this.flashMessagesService.show('Scrivi un commento', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //post comment
    this.flashMessagesService.show('Commento inserito', { cssClass: 'alert-success', timeout: 3000 });
    console.log(comment);  
  }

}
