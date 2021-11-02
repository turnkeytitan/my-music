import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
    if (window.location.href.indexOf('auth') === (-1)) {
      if (localStorage.getItem('token')) {
        this.auth.isTokenActive();
        this.router.navigateByUrl('home');
      }
    }
  }

}
