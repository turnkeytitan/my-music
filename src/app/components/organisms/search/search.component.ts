import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SpotifyApiService } from '../../../services/spotify-api.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;

  constructor(private api: SpotifyApiService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  check(e: KeyboardEvent) {
    const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (ABC.indexOf(e.code) && !(this.searchBox.nativeElement.value === '')) {
      this.auth.isTokenActive();
      this.api.searchItem('get', 'search', '', this.searchBox.nativeElement.value);
    }

  }

}
