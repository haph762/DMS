import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user: any
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // let userString = localStorage.getItem('user_info') ?? '';
    // this.user = JSON.parse(userString);
  }

}
