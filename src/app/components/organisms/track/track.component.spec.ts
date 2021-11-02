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
});
