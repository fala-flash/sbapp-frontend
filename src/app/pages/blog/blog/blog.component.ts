import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts = []
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getPosts().subscribe(post => {
      this.posts = post;  
    },
     err => {
       console.log(JSON.stringify(err));
       return false;
     });
  }

}
