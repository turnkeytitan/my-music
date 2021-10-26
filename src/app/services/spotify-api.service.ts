import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  searchItem(method: string,
    endpoint: String,
    data: string = '',
    q: string = '',
    type: string = '',
    limit: string = '',
    offset: string = '') {

    let url = `${environment.apiUrl}`;
    url += `${endpoint}`;
    url += `${data !== '' ? data : ''}`;
    if (q !== '' || type !== '' || limit !== '' || offset !== '') {
      url += '?';
    }
    url += `q=${q !== '' ? q : ''}`;
    url += '&type=album,artist,playlist,track';
    if (url.charAt(url.length - 1) === '?') {
      url += `limit=${limit !== '' ? limit : ''}`;
    } else {
      url += `${limit !== '' ? '&limit=' : ''}`;
      url += `${limit !== '' ? limit : ''}`;
    }
    if (url.charAt(url.length - 1) === '?') {
      url += `offset=${offset !== '' ? offset : ''}`;
    } else {
      url += `${offset !== '' ? '&offset=' : ''}`;
      url += `${offset !== '' ? offset : ''}`;
    }
    const headers = {
      'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    console.log(url);
    const date = new Date();
    const expDate = new Date(Date.parse(localStorage.getItem('token_expiration')!));
    if (expDate > date) {
      this.auth.refreshToken();
    }
    if (method === 'get') {
      this.http.get(url, { headers }).subscribe(
        res => console.log(res),
        err => {console.error(err);this.auth.refreshToken();}
      )
    }
  }

}
