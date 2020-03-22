import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    //per fare in modo che il menu si chiuda quando clicco all'esterno
    //ho installato anche @types/jquery
    //ho aggiunto "jquery" nei types di tsconfig.app.json
    
    $(document).ready(function () {
      $(document).click(
          function (event) {
              var target = $(event.target);
              var _mobileMenuOpen = $(".navbar-collapse").hasClass("show");
              if (_mobileMenuOpen === true && !target.hasClass("navbar-toggler")) {
                  $("button.navbar-toggler").click();
              }
          }
      );
  });

    
  }

  getIsLoggedIn() {
    return this.authService.loggedIn();
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastrService.info('A presto!');
    return false;
  }

}
