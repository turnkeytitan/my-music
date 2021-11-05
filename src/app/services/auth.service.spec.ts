import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should construct the refresh token url', () => {
    expect(()=>service.refreshToken()).not.toThrow();
  });
  it('should validate expired token', () => {
    localStorage.setItem('token_expiration',(new Date()).toString());
    expect(()=>service.isTokenActive()).not.toThrow();
  })
  it('should refresh token', ()=>{
    service.refreshToken()
  });
});
