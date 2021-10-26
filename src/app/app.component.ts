import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private router: Router) { }


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('home');
    }
  }

}
