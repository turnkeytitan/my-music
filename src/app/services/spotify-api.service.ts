import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SearchResponse, Tracks, TracksItem } from '../interfaces/spotify.interfaces';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  tracks?: TracksItem[];

  subject = new Subject<Array<TracksItem>>();

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
    if (method === 'get') {
      this.http.get<SearchResponse>(url, { headers }).subscribe(
        (res) => {
          this.tracks = res.tracks.items;
          this.subject.next(this.tracks)
        }
      );
    }
  }

}
