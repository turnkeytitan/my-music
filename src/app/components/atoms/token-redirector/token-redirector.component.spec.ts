import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRedirectorComponent } from './token-redirector.component';

describe('TokenRedirectorComponent', () => {
  let component: TokenRedirectorComponent;
  let fixture: ComponentFixture<TokenRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenRedirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
