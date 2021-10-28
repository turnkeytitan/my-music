import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
    if (window.location.href.indexOf('auth') === (-1)) {
      if (localStorage.getItem('token')) {
        const date = new Date();
        const expDate = new Date(Date.parse(localStorage.getItem('token_expiration')!));
        if (expDate < date) {
          this.auth.refreshToken();
        }
        this.router.navigateByUrl('home');
      }else {
        this.router.navigateByUrl('login');
      }
    }
  }

}
