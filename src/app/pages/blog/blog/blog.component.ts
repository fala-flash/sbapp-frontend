import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as moment from 'moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  text: string;
  authorID = '';
  authorName = '';
  authorEmail = '';
  authorTel = 0;
  
  IDPOST = ''
  posts = []
  comments: string[] = []

  constructor(private flashMessagesService: FlashMessagesService,
              private authService:AuthService) { }

  ngOnInit() {
    this.authService.getPosts().subscribe(post => {
      this.posts = post;      
      this.initComments();
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

  getPostId(POSTID: any){
    let postId: string = <unknown>POSTID.innerHTML as string;
    this.IDPOST = postId;
  }

  onCommentSubmit(i: number){

    //if a comment is null, it becomes an empty string (if not, can cause problem)
    if (this.comments[i] == null ) {
      this.comments[i] = '';
    }
    const comment = {
      text: this.comments[i].replace(/(\r\n|\n|\r)/gm, ""),
      date: moment().format('DD:MM:YYYY').toString(),
      time: moment().format('HH:mm:ss').toString(),
      author: this.authorEmail
    }

    //validate message
    if (!comment.text.replace(/\s/g, '').length ) {
      this.flashMessagesService.show('Scrivi un commento', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //post comment
    console.log(this.IDPOST);
    console.log(comment);

    this.authService.addComment(this.IDPOST, comment).subscribe(data => {
      if ((data as any).success) {
        this.flashMessagesService.show('Commento inserito', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessagesService.show('Commento non inserito', { cssClass: 'alert-danger', timeout: 3000 });
      }
    })

    
  
    
    
    
    this.ngOnInit();


    /* prima della funzione this.ngOnInit(), inviare il commento al db e creare uno spazio per i commenti
    facendo così, quando commento e invio il commento al database, il componenente verrà aggiornato
    nuovamente, caricando il commento appena inserito */
  }

  initComments(){
    for(var i = 0; i<this.posts.length; i++){
      this.comments.push("");
    }
  }


}