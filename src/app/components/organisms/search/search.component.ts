import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotifyApiService } from '../../../services/spotify-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;
  constructor(private search: SpotifyApiService) { }

  ngOnInit(): void {
  }

  check(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.search.searchItem('get', 'search',
        '', this.searchBox.nativeElement.value, '', '', '');

    }
  }

}
