import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-redirector',
  template: '',
  styleUrls: ['./token-redirector.component.sass']
})
export class TokenRedirectorComponent {

  constructor(private router: Router) { }

  ngAfterViewChecked() {
    if (!localStorage.getItem('token')) {
      if (!(this.router.url === '/login')) {
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 0);
      }
    }

  }
}
