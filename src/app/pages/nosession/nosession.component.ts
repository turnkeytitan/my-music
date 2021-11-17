import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nosession',
  templateUrl: './nosession.component.html',
  styleUrls: ['./nosession.component.scss']
})
export class NosessionComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('home');
    }
  }

}
