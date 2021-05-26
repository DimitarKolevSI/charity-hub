import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRepositoryService} from '../services/user-repository.service';
import {User} from '../models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public username: string = '';
  public user: User;
  public isError: boolean = false;
  public errorMessage: string = '';
  public usernameForm: string = '';
  public oldPassword: string = '';
  public newPassword: string = '';
  public confirmNewPassword: string = '';
  public email: string = '';
  public shouldOpenModal: boolean = false;

  constructor(private router: Router,
              private activatedRouter: ActivatedRoute,
              private userRepositoryService: UserRepositoryService) {
  }

  ngOnInit(): void {
    this.username = this.activatedRouter.snapshot.params.username;
    this.userRepositoryService.getUser(this.username).subscribe((u: User) => {
      if (localStorage.getItem('username') !== this.username || u === null) {
        this.router.navigate(['/home']);
      } else {
        this.user = new User(u);
        this.usernameForm = this.user.username;
        this.email = this.user.email;
      }
    });

  }

  onSaveChanges(): void {
    if (this.isValid()) {
      this.user.username = this.usernameForm;
      this.user.email = this.email;
      if (!!this.newPassword) {
        this.user.password = this.newPassword;
      }
      this.userRepositoryService.saveUser(this.username, this.user);
      this.shouldOpenModal = true;
    }
  }

  isValid(): boolean {
    const lettersAndNumbersCheck: string = '^[0-9a-zA-Z]+$';
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+$/;
    if (this.usernameForm !== this.user.username) {
      if (!this.usernameForm || !this.usernameForm.match(lettersAndNumbersCheck)) {
        this.errorMessage = 'Invalid username! Should contain only letters and digits!';
      } else if (this.oldPassword !== this.user.password) {
        this.errorMessage = 'You need to verify the change with your password!';
      } else {
        return true;
      }
    } else if (!!this.newPassword) {
      if (!this.newPassword.match(lettersAndNumbersCheck) || this.newPassword.length < 8) {
        this.errorMessage = 'Password should contain only letters and numbers and should be at least 8 symbols!';
      } else if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = 'The two passwords must match!';
      } else if (this.oldPassword !== this.user.password) {
        this.errorMessage = 'You need to verify the change with your password!';
      } else {
        return true;
      }
    } else if (this.email !== this.user.email) {
      if (!this.email || !this.email.match(emailRegex)) {
        this.errorMessage = 'Invalid email!';
      } else if (this.oldPassword !== this.user.password) {
        this.errorMessage = 'You need to verify the change with your password!';
      } else {
        return true;
      }
    } else {
      return !(this.usernameForm === this.username && !this.newPassword && this.user.email === this.email);
    }
    this.isError = true;
    return false;
  }

  goToHomepage(): void {
    this.router.navigate(['/home']);
  }
}
