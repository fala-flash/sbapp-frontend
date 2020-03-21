import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-personal-blog',
  templateUrl: './personal-blog.component.html',
  styleUrls: ['./personal-blog.component.css']
})
export class PersonalBlogComponent implements OnInit {



  // dati profilo utente loggato, e che quindi può commentare
  text: string;
  authorID = '';
  authorName = '';
  authorEmail = '';
  authorTel = 0;
  authorRole: string;

  /* authorRole: ''; */

  /* psicologo = 'psicologo'; //cafonata allucinante per vedere il ruolo -> DEVE ESSERE CAMBIATA */

  // dati relativi ai post
  IDPOST = ''  //id del post su cui clicco commenta e cancella
  IDCOMMENT = '' //ID del commento su cui clicco cancella
  posts = []   // array contenente tutti i post
  comments: string[] = []  //array che serve per gestire la textarea

  

  constructor(private toastrService: ToastrService, private authService:AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.authorID = profile.user._id;
      this.authorName = profile.user.name;
      this.authorEmail = profile.user.email;
      this.authorTel = profile.user.tel;
      this.authorRole = profile.user.role;
      this.authService.getUserPosts(this.authorID).subscribe(post => {
        this.posts = post;
        this.posts.reverse(); //così in cima c'è sempre l'ultimo inserito
        this.initComments();
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


  getPostId(POSTID: any){
    let postId: string = <unknown>POSTID.innerHTML as string;
    this.IDPOST = postId;
  }

  getCommentId(COMMENTID: any){
    let commentId: string = <unknown>COMMENTID.innerHTML as string;
    this.IDCOMMENT = commentId;
  }

  onCommentSubmit(i: number){
    

    //if a comment is null, it becomes an empty string (if not, can cause problem)
    if (this.comments[i] == null ) {
      this.comments[i] = '';
    }
    const comment = {
      postId: this.IDPOST,
      text: this.comments[i].replace(/(\r\n|\n|\r)/gm, ""),
      date: moment().format('DD/MM/YYYY').toString(),
      time: moment().format('HH:mm:ss').toString(),
      author: this.authorEmail,
      authorid: this.authorID,
      role: this.authorRole
    }

    //validate message
    if (!comment.text.replace(/\s/g, '').length ) {
      this.toastrService.warning('Non puoi inserire un commento vuoto');
      return false;
    }

    //post comment
    this.authService.addComment(this.IDPOST, comment).subscribe(data => {
      this.ngOnInit();  //così vedo il commento appena inserito!
      if ((data as any).success) {
        this.toastrService.success((data as any).msg);
      } else {
        this.toastrService.error((data as any).msg);
      }
    })
  }


  onDeletePost(){
    this.authService.removePost(this.IDPOST).subscribe(data => {
      this.ngOnInit(); //così il post scompare subito
      if ((data as any).success) {
        this.toastrService.success((data as any).msg);
      } else {
        this.toastrService.error((data as any).msg);
      }
    })
  }

  onDeleteComment(){
    /* this.ngOnInit(); */  //così vedo il commento appena rimosso
    this.authService.removeComment(this.IDPOST, this.IDCOMMENT).subscribe(data => {
      this.ngOnInit(); //così il commento scompare subito
      if ((data as any).success) {
        this.toastrService.success((data as any).msg);
      } else {
        this.toastrService.error((data as any).msg);
      }
    })
  }


  initComments(){
    for(var i = 0; i<this.posts.length; i++){
      this.comments.push("");
    }
  }

  

}
