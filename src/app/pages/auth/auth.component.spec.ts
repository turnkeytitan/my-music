import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Redirect, Token } from '../../interfaces/login.interfaces';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get token when created', ()=> {
    let token: Token = {
      access_token: '',
      token_type: '',
      scope: '',
      expires_in: 0,
      refresh_token: ''
    }
    expect(()=>component.setUpToken(token)).not.toThrow();
    expect(()=>component.handleTokenErr('error')).not.toThrow();
    expect(()=>component.authenticate()).not.toThrow();
  });
});
