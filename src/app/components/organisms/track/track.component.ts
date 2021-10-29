import { Component, OnInit } from '@angular/core';
import { TracksItem, Tracks } from '../../../interfaces/spotify.interfaces';
import { SpotifyApiService } from '../../../services/spotify-api.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  tracks!: TracksItem[];
  constructor(public api: SpotifyApiService) { 
    this.api.subject.subscribe({
      next: (t) => {this.tracks = t; console.log(t);}
    });
  }

  ngOnInit(): void {
  }

}
