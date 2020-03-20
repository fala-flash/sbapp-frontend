import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) {  }


  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
    .pipe(map(res => res));
  }


  addPost(message){
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/posts/addpost', message, {headers: headers})
    .pipe(map(res => res));
  }


  removePost(postid){
    this.loadToken();
    let postID = postid;
    let url = `http://localhost:8080/posts/delete/post/${postID}`;
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.delete(url, {headers: headers})
  }


  addComment(postId, comment){
    this.loadToken();
    let postid = postId;
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:8080/posts/blog/comment/${postid}`, comment, {headers: headers})
    .pipe(map(res => res));
  }


  removeComment(postid, commentid){
    this.loadToken();
    let postID = postid;
    let commentID = commentid;
    let url = `http://localhost:8080/posts/delete/comment/${postID}/${commentID}`;
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.delete(url, {headers: headers})  
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
    .pipe(map(res => res));
    
  }



  getProfile(): any{
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
  }

  getPosts(): any{
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/posts/blog', {headers: headers})
  }


  getUserPosts(id): any{
    this.loadToken();
    let userID = id;
    let url = `http://localhost:8080/posts/personal-blog/${userID}`;
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers})
  }




  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    /* localStorage.setItem('user', (JSON.stringify(user))); */
    this.authToken = token;
    this.user = user;
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;   
  }

  loggedIn(){
    const token = localStorage.getItem('id_token');
    const jwtHelper: JwtHelperService = new JwtHelperService();
    return jwtHelper.isTokenExpired(token);
  }

  


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}