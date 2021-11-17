import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchResponse, TracksItem, MeTracks, Playlists, Featured, Albums } from '../interfaces/spotify.interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  tracks?: TracksItem[];
  offset = 0;
  offsetOn = false
  subject = new Subject<Array<TracksItem>>();
  likesSubject = new Subject<Array<boolean>>();

  constructor(private http: HttpClient) { }

  searchItem(method: string,
    endpoint: String,
    data: string = '',
    q: string = '',
    type: string = '',
    limit: number = 0,
    offset: number = 0) {

    let url = `${environment.apiUrl}`;
    url += `${endpoint}`;
    url += `${data !== '' ? data : ''}`;
    if (q !== '' || type !== '' || limit !== 0 || offset !== 0) {
      url += '?';
    }
    if (endpoint === 'search') {
      url += `q=${q !== '' ? q : ''}`;
      url += '&type=album,artist,playlist,track';
    }

    if (url.charAt(url.length - 1) === '?') {
      if(limit !== 0 )url += 'limit=';
      url += `${limit !== 0 ? limit : ''}`;
    } else {
      url += `${limit !== 0 ? '&limit=' : ''}`;
      url += `${limit !== 0 ? limit : ''}`;
    }
    if (url.charAt(url.length - 1) === '?') {
      url += `offset=${offset !== 0 ? offset : ''}`;
    } else {
      url += `${offset !== 0 ? '&offset=' : ''}`;
      url += `${offset !== 0 ? offset : ''}`;
    }
    const headers = {
      'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = {
      'ids': [data.substring(1)]
    };
    if (endpoint === 'search') {
      this.http.get<SearchResponse>(url, { headers }).subscribe(
        (res) => {
          this.offset = 0;
          this.offsetOn = false;
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
    } else if (endpoint === 'me/tracks') {
      if (method === 'get') {
        this.http.get<MeTracks>(url, { headers }).subscribe(
          (res) => {
            this.tracks = res.items.map((a) => a.track);
            this.subject.next(this.tracks);
            this.offsetOn = true;
          }
        );
      } else if (method === 'put') {
        this.http.put(url, body, { headers }).subscribe(
          (res) => { }
        );
      } else if (method === 'delete') {
        this.http.delete<MeTracks>(url, { headers }).subscribe(
          (res) => { }
        );
      }
    } else if (endpoint === 'browse/featured-playlists') {
      this.http.get<Featured>(url, { headers }).subscribe(
        res => this.searchItem('get',`playlists/${res.playlists.items[0].id}/tracks`)
      );
      
    } else if (endpoint.match('playlists')){
      this.http.get<MeTracks>(url, { headers }).subscribe(
        res => {
          this.tracks = res.items.map((a) => a.track);
          this.subject.next(this.tracks);
          this.offsetOn = false;
        }
      );
    }

  }

}
