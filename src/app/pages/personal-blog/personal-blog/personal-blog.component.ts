import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personal-blog',
  templateUrl: './personal-blog.component.html',
  styleUrls: ['./personal-blog.component.css']
})
export class PersonalBlogComponent implements OnInit {

  posts = [];
  userID = '';

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userID = profile.user._id;
      this.authService.getUserPosts(this.userID).subscribe(post => {
        this.posts = post;  
      },
       err => {
         console.log(JSON.stringify(err));
         return false;
       });
       
    },
     err => {
       console.log(JSON.stringify(err));
       return false;
     });

     
  }

  

}
