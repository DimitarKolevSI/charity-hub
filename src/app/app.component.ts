import {Component, OnInit} from '@angular/core';
import {CharityRepositoryService} from './services/charity-repository.service';
import {UserRepositoryService} from './services/user-repository.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FinalTaskFrontEnd';
  key: string = '';
  public currentUsername: string;
  public opened: boolean = false;

  constructor(public charityRepositoryService: CharityRepositoryService,
              public userService: UserRepositoryService,
              private router: Router) {
    if (localStorage.getItem('username') === null) {
      localStorage.setItem('username', '');
    }
    this.currentUsername = localStorage.getItem('username');
  }


  ngOnInit() {
  }

  logOut(): void {
    localStorage.setItem('username', '');
    this.opened = false;
    this.router.navigate(['/home']);
  }

  onLogOut(): void {
    event.preventDefault();
    this.opened = true;
  }

}
