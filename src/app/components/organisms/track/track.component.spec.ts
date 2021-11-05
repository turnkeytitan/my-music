import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackComponent } from './track.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the song from favorites', () => {
    let event = {
      target: document.createElement('div'),
      id: '1'
    }
    event.target.classList.add('liked');
    expect(()=>component.changeLike(event)).not.toThrow();
  });
  it('should set listeners to change the songs', () => {
    expect(()=>component.listen()).not.toThrow();
  });
  it('should assign the new set of songs', () => {
    expect(()=>component.handleTracks([])).not.toThrow();
  });
  it('should handle the likes of each song', () => {
    expect(()=>component.handleLikes([true, false])).not.toThrow();
  });
  it('should assign the new set of songs', () => {
    expect(()=>component.loadMoreFavs()).not.toThrow();
  });
});

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the song from favorites', () => {
    let event = {
      target: document.createElement('div'),
      id: '1'
    }
    event.target.classList.add('unliked');
    expect(()=>component.changeLike(event)).not.toThrow();
  });
  it('should push more tracks in favorites', () => {
    component.api.offsetOn = true;
    expect(()=>component.handleTracks([])).not.toThrow();
  });
});