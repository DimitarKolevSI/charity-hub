import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {UserRepositoryService} from '../services/user-repository.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public isInvalid: boolean = false;
  public errorMessage: string = '';
  public input: string;
  public form: User = new User();
  public confirmPassword: string = '';
  public shouldOpenModal: boolean = false;

  constructor(private userRepositoryService: UserRepositoryService,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.form.age = +this.form.age;
    this.shouldOpenModal = this.isValid();
  }

  saveUser(): void {
    this.userRepositoryService.addUser(this.form).subscribe(() => this.router.navigate(['/login']));
  }

  isValid(): boolean {
    const lettersAndNumbersCheck = '^[0-9a-zA-Z]+$';
    const lettersCheck = '^[a-zA-Z]+$';
    const numbersCheck = '^[0-9]+$';
    this.form.age = +this.form.age;
    if (!this.form.username || !this.form.username.match(lettersAndNumbersCheck)) {
      this.errorMessage = 'Invalid username! Should contain only letters and digits!';
    } else if (this.form.username.length < 6) {
      this.errorMessage = 'Username should be at least 6 symbols long!';
    } else if (!this.form.password.match(lettersAndNumbersCheck) || this.form.password.length < 8) {
      this.errorMessage = 'Password should contain only letters and numbers and should be at least 8 symbols!';
    } else if (this.form.password !== this.confirmPassword) {
      this.errorMessage = 'The two passwords must match!';
    } else if (!this.form.firstName.match(lettersCheck) && !this.form.lastName.match(lettersCheck)) {
      this.errorMessage = 'First and last name should contain only letters!';
    } else if (!this.form.age.toString().match(numbersCheck)) {
      this.errorMessage = 'Age should be a number!';
    } else if (this.form.age < 16) {
      this.errorMessage = 'You should be at least 16 years old to register!';
    } else if (this.form.gender !== 'Male' && this.form.gender !== 'Female' && this.form.gender !== 'Undefined') {
      this.errorMessage = 'Pick a gender!';
    } else {
      return true;
    }
    this.isInvalid = true;
    return false;
  }
}
