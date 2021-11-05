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

  tracks: TracksItem[] = [];
  likedTracks: boolean[] = [];

  constructor(public api: SpotifyApiService, private auth: AuthService) {
    this.listen();
    window.onscroll = this.loadMoreFavs.bind(this);
  }

  ngOnInit(): void {
  }
  changeLike(e: any) {
    if (e.target.classList.contains('liked')) {
      this.auth.isTokenActive();
      this.api.searchItem('delete', 'me/tracks', `?ids=${e.target.id}`);
      e.target.classList.remove('liked');
      e.target.classList.add('unliked');
    } else {
      this.auth.isTokenActive();
      this.api.searchItem('put', 'me/tracks', `?ids=${e.target.id}`);
      e.target.classList.remove('unliked');
      e.target.classList.add('liked');
    }
  }
  listen() {
    this.api.subject.subscribe({ next: this.handleTracks.bind(this) });
    this.api.likesSubject.subscribe({ next: this.handleLikes.bind(this) });
  }
  handleTracks(tracks: TracksItem[]) {
    if (this.api.offsetOn) {
      this.tracks.push(...tracks);
      let ids = tracks.map((a) => a.id);
      this.auth.isTokenActive();
      this.api.searchItem('get', 'me/tracks/contains', `?ids=${ids.join()}`);
    } else {
      this.tracks = tracks;
      let ids = tracks.map((a) => a.id);
      this.auth.isTokenActive();
      this.api.searchItem('get', 'me/tracks/contains', `?ids=${ids.join()}`);
    }
  }
  handleLikes(tracks: boolean[]) {
    if (this.api.offsetOn && this.api.offset !== 0) {
      this.likedTracks.push(...tracks);
    } else {
      this.likedTracks = tracks;
    }
  }
  loadMoreFavs() {
    if (this.api.offsetOn && ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight)) {
      this.auth.isTokenActive();
      this.api.offset += 20;
      this.api.searchItem('get', 'me/tracks', '', '', '', 0, this.api.offset);
    }
  }

}