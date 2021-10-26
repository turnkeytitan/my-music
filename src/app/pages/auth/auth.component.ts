import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Redirect, Token } from '../../interfaces/login.interfaces';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  private redirect!: Redirect;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.redirect = res;
    });
    
    this.authService.getToken(this.redirect).subscribe( (res: Token) =>{
      localStorage.setItem('token',res.access_token);
      localStorage.setItem('refresh_token',res.refresh_token);
      localStorage.setItem('token_type',res.token_type);
      let date = new Date();
      date.setSeconds(res.expires_in);
      localStorage.setItem('token_expiration',date.toString());
      this.router.navigateByUrl('home');
    });
  }

}
