import { Component, OnInit } from '@angular/core';
import { TracksItem } from '../../../interfaces/spotify.interfaces';
import { SpotifyApiService } from '../../../services/spotify-api.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class TrackComponent implements OnInit {

  tracks: TracksItem[] | undefined;
  constructor(private api: SpotifyApiService) {
    this.tracks = api.allResponse?.tracks.items;
  }

  ngOnInit(): void {
  }

}
