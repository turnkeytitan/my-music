import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const searchComponent = jasmine.createSpyObj('SearchComponent', [
    'check'
  ]);
  const authService = jasmine.createSpyObj('AuthService', [
    'isTokenActive'
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should receive keyboard event and execute the search', () => {
    const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const RND = Math.random()*ABC.length-1;
    const code = ABC.substring(RND, RND+1);
    
    const KE = new KeyboardEvent('searchBox', {
      code: code
    })
    let val = ABC.indexOf(KE.code)
    component.searchBox.nativeElement.value= 'asd';
    expect(()=>{component.check(KE)}).not.toThrow();
  });
});
