import { TestBed } from '@angular/core/testing';

import { SpotifyApiService } from './spotify-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SpotifyApiService', () => {
  let service: SpotifyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SpotifyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
