import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  tokenActive: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.tokenActive = true;
    }
  }


}
