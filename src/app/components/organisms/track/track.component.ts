import { Component, OnInit, ViewChild } from '@angular/core';
import { TracksItem } from '../../../interfaces/spotify.interfaces';
import { SpotifyApiService } from '../../../services/spotify-api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  tracks!: TracksItem[];
  likedTracks!: boolean[];

  constructor(public api: SpotifyApiService, private auth: AuthService) {
    this.api.subject.subscribe({
      next: (t) => {
        this.tracks = t;
        let ids = this.tracks.map((a) => a.id);
        this.auth.isTokenActive();
        this.api.searchItem('get', 'me/tracks/contains', `?ids=${ids.join()}`, '', '', '', '');
      }
    });
    this.api.likesSubject.subscribe({
      next: (t) => {
        this.likedTracks = t;
      }
    });
  }

  ngOnInit(): void {
  }
  changeLike(e: any) {
    if (e.target.classList.contains('liked')) {
      this.auth.isTokenActive();
      this.api.searchItem('delete', 'me/tracks', `?ids=${e.target.id}`, '', '', '', '');
      e.target.classList.remove('liked');
      e.target.classList.add('unliked');
    }else {
      this.auth.isTokenActive();
      this.api.searchItem('put', 'me/tracks', `?ids=${e.target.id}`, '', '', '', '');
      e.target.classList.remove('unliked');
      e.target.classList.add('liked');
    }
  }
}
