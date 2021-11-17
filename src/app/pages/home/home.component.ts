import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpotifyApiService } from '../../services/spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private api: SpotifyApiService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }else {
      this.auth.isTokenActive();
      this.api.searchItem('get','browse/featured-playlists');
    }
    
  }

}
