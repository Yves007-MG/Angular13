import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authStatus: boolean | undefined ;

  constructor(private  authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(){
    this.authService.signIn().then(
      ()=>{
        this.router.navigate(['appareils']);
        this.authStatus = this.authService.isAuth;
      }
    );

  }

  onSignOut() {

    this.authService.signOut();
    console.log("déconnexion réussie !" +this.authStatus);
    this.authStatus = this.authService.isAuth;
  }
}
