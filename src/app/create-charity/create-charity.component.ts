import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Charity} from '../models/Charity';
import {UserRepositoryService} from '../services/user-repository.service';
import {CharityRepositoryService} from '../services/charity-repository.service';
import {Router} from '@angular/router';
import {CharityBuilder} from '../builders/CharityBuilder';

@Component({
  selector: 'app-create-charity',
  templateUrl: './create-charity.component.html',
  styleUrls: ['./create-charity.component.scss']
})
export class CreateCharityComponent implements OnInit {

  isInvalid: boolean = false;
  errorMessage: string;


  public form: Charity = new CharityBuilder().withCreatorsUsername(localStorage.getItem('username')).build();

  constructor(public userService: UserRepositoryService,
              public charityService: CharityRepositoryService,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  onClick() {
    event.preventDefault();
    if (this.checkIfValid()) {
      this.charityService.createCharity(this.form).subscribe(
        () => this.router.navigate(['/home'])
      );
    }

  }

  checkIfValid(): boolean {
    const floatNumberCheck = '^[0-9]+\.[0-9]+$';
    const numberCheck = '^[0-9]+$';
    const lettersAndSymbols = '^[0-9a-zA-Z.,-:()\//\n/ ]+$';
    if (this.form.volunteersNeeded === undefined || !this.form.volunteersNeeded.toString().match(numberCheck)) {
      this.form.volunteersNeeded = 0;
    }
    if (this.form.moneyNeeded === undefined || !this.form.moneyNeeded.toString().match(floatNumberCheck)) {
      this.form.moneyNeeded = 0;
    }
    if (!this.form.title.match(lettersAndSymbols)) {
      this.errorMessage = 'Title has some forbidden characters!';
    } else if (!this.form.description.match(lettersAndSymbols)) {
      this.errorMessage = 'Description has some forbidden characters!';
    } else if (this.form.description.length > 300) {
      this.errorMessage = 'Description must be less than 300 characters!';
    } else if (this.form.volunteersNeeded < 0) {
      this.errorMessage = 'The needed volunteers can\'t be negative number!';
    } else if (this.form.moneyNeeded < 0) {
      this.errorMessage = 'The needed money can\'t be negative number!';
    } else if (this.form.volunteersNeeded == 0 && this.form.moneyNeeded == 0 ||
      (this.form.volunteersNeeded === undefined && this.form.moneyNeeded === undefined)) {
      this.errorMessage = 'You have to choose if you need volunteers or money for the charity!';
    } else {
      return true;
    }
    this.isInvalid = true;
    return false;
  }

  isFloat(n: any) {
    n = parseFloat(n);
    if (isNaN(n)) {
      return false;
    }
    return true;
  }

}
