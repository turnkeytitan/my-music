import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SpotifyApiService } from '../../../services/spotify-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  constructor(private api: SpotifyApiService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  favorites() {
    this.auth.isTokenActive();
    this.api.searchItem('get', 'me/tracks', '', '', '', '', '');
  }
  account() {
    window.location.href = 'https://www.spotify.com/us/account/overview'
  }
}
