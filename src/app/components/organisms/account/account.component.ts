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
    this.api.offset = 0;
    this.api.searchItem('get', 'me/tracks');
  }
}
