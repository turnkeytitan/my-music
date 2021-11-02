import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosessionComponent } from './nosession.component';

describe('NosessionComponent', () => {
  let component: NosessionComponent;
  let fixture: ComponentFixture<NosessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
