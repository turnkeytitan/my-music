import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
    const date = new Date();
    const expDate = new Date(Date.parse(localStorage.getItem('token_expiration')!));
    if (expDate < date) {
      this.auth.refreshToken();
    }
  }

}
