import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchResponse, TracksItem, MeTracks } from '../interfaces/spotify.interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  tracks?: TracksItem[];

  subject = new Subject<Array<TracksItem>>();
  likesSubject = new Subject<Array<boolean>>();

  constructor(private http: HttpClient) { }

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
    if (endpoint === 'search') {
      url += `q=${q !== '' ? q : ''}`;
      url += '&type=album,artist,playlist,track';
    }

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
    if (endpoint === 'search') {
      this.http.get<SearchResponse>(url, { headers }).subscribe(
        (res) => {
          this.tracks = res.tracks.items;
          this.subject.next(this.tracks);
        }
      );
    } else if (endpoint === 'me/tracks/contains') {
      this.http.get<boolean[]>(url, { headers }).subscribe(
        (res) => {
          this.likesSubject.next(res);
        }
      );
    }

    if (endpoint === 'me/tracks') {
      const body = {
        'ids': [data]
      };
      if (method === 'get') {
        this.http.get<MeTracks>(url, { headers }).subscribe(
          (res) => {
            this.tracks = res.items.map((a) => a.track);
            this.subject.next(this.tracks);
          }
        );
      } else if (method === 'put') {
        this.http.put(url, body, { headers }).subscribe(
          (res) => {
            console.log(res,'p');
          }
        );
      } else if (method === 'delete') {
        this.http.delete<MeTracks>(url, { headers }).subscribe(
          (res) => {
            console.log(res,'d');
          }
        );
      }
    }

  }

}
