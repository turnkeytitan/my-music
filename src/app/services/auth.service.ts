import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Redirect, RefreshToken, Token } from '../interfaces/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenState: boolean = false;
  constructor(private http: HttpClient) { }

  login() {

    let url = `${environment.accUrl}`;
    url += `client_id=${environment.clientId}`;
    url += `&response_type=${environment.response_type}`;
    url += `&redirect_uri=${environment.redirect_uri}`;
    url += `&state:${environment.state}`;
    url += `&scope=${environment.scope}`;
    url += `&show_dialog=true`;

    return url;
  }
  getToken(codex: Redirect) {
    const url = `${environment.tokenUrl}`;
    let body= `grant_type=${environment.grant_type[0]}`;
    body+= `&code=${codex.code}`;
    body+= `&redirect_uri=${environment.redirect_uri}`;
    const headers = {
        'Authorization':  'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<Token>(url,body,{headers});
  }

  refreshToken(){
    const url = `${environment.tokenUrl}`;
    let body= `grant_type=${environment.grant_type[1]}`;
    body+= `&refresh_token=${localStorage.getItem('refresh_token')}`;
    const headers = {
        'Authorization':  'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    this.http.post<RefreshToken>(url,body,{headers}).subscribe((a)=>{
      this.tokenState = true;
      localStorage.setItem('token',a.access_token);
      let date = new Date();
      date.setSeconds(a.expires_in);
      localStorage.setItem('token_expiration',date.toString());
    });
  }
  isTokenActive(){
    const date = new Date();
    const expDate = new Date(Date.parse(localStorage.getItem('token_expiration')!));
    if (expDate < date) {
      this.refreshToken();
    }else {
      this.tokenState = true;
    }
  }

}
