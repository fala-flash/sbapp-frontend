import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/notFound/not-found/not-found.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';

import { ValidateService } from './services/validate.service'
import { AuthService } from './services/auth.service'
import { AuthGuard } from './guards/auth.guard';

import { PostMessageComponent } from "./pages/post-message/post-message/post-message.component";
import { BlogComponent } from './pages/blog/blog/blog.component';
import { PersonalBlogComponent } from './pages/personal-blog/personal-blog/personal-blog.component';



const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'post-message', component: PostMessageComponent, canActivate:[AuthGuard]},
  { path: 'personal-blog', component: PersonalBlogComponent, canActivate:[AuthGuard]},
  { path: 'blog', component: BlogComponent, canActivate:[AuthGuard]},
  { path: 'login',component: LoginComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: '', redirectTo: '/profile', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
