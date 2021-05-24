import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {UserRepositoryService} from '../services/user-repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model = new User();

  @ViewChild('login') d1: ElementRef;
  @ViewChild('username') d2: ElementRef;

  @Input()
  public test: string;
  public username: string;
  public password: string;
  isError: boolean = false;
  errorMessage: string;
  private user: User = null;

  constructor(private router: Router,
              private userService: UserRepositoryService) {
  }

  ngOnInit(): void {

  }

  onLogin(): void {
    event.preventDefault();
    this.username = this.model.username;
    this.password = this.model.password;
    this.userService.getUser(this.username).subscribe(
      (data: User) => {
        this.user = data;
        setTimeout(() => this.checkForValidation(), 10);
      }
    );
  }

  checkForValidation(): void {
    if (this.user === null) {
      this.isError = true;
      this.errorMessage = 'Wrong username!';
    } else {
      if (this.user.password === this.password) {
        localStorage.setItem('username', this.username);
        this.isError = false;
        this.router.navigate(['/home']);
      } else {
        this.isError = true;
        this.errorMessage = 'Wrong password!';
      }
    }
  }
}
