import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Redirect, Token } from '../../interfaces/login.interfaces';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private redirect!: Redirect;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authenticate();
  }
  authenticate() {
    this.route.queryParams.subscribe((res: Redirect) => {
      this.redirect = res;
    });

    this.authService.getToken(this.redirect).subscribe(
      this.setUpToken.bind(this),
      this.handleTokenErr.bind(this)
    );
  }
  setUpToken(res: Token) {
    this.authService.tokenState = true;
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
    localStorage.setItem('token_type', res.token_type);
    let date = new Date();
    date.setSeconds(res.expires_in);
    localStorage.setItem('token_expiration', date.toString());
    this.router.navigateByUrl('home');
  }
  handleTokenErr(err: any) {
    console.error(err);
  }
}
