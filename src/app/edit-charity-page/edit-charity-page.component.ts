import {Component, OnInit} from '@angular/core';
import {Charity} from '../models/Charity';
import {CharityRepositoryService} from '../services/charity-repository.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-charity-page',
  templateUrl: './edit-charity-page.component.html',
  styleUrls: ['./edit-charity-page.component.scss']
})
export class EditCharityPageComponent implements OnInit {

  isInvalid: boolean = false;
  errorMessage: string;
  id: number;
  currentCharity: Charity;

  public form: Charity = new Charity();

  constructor(private charityService: CharityRepositoryService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params.charityId;
    const data: Charity = this.charityService.getCharity(this.id);
    if (data === null) {
      this.router.navigate(['/error']);
    }
    this.currentCharity = data;
    this.form = this.currentCharity;
  }

  onClick() {
    event.preventDefault();
    if (this.checkIfValid()) {
      this.currentCharity.title = this.form.title;
      this.currentCharity.description = this.form.description;
      this.currentCharity.moneyNeeded = this.form.moneyNeeded;
      this.currentCharity.volunteersNeeded = this.form.volunteersNeeded;
      this.charityService.editCharity(this.id, this.currentCharity).subscribe(
        () => this.router.navigate(['/home'])
      );
    }

  }

  checkIfValid(): boolean {
    const floatNumberCheck = '^[0-9]+\.[0-9]+$';
    const numberCheck = '^[0-9]+$';
    const lettersAndSymbols = '^[0-9a-zA-Z.,-:()\//\n/ ]+$';
    if (!this.form.volunteersNeeded || !this.form.volunteersNeeded.toString().match(numberCheck)) {
      this.errorMessage = 'The volunteers should a whole number!';
      this.isInvalid = true;
      return false;
    }
    if (this.form.moneyNeeded === undefined || (!this.form.moneyNeeded.toString().match(floatNumberCheck) &&
      !this.form.moneyNeeded.toString().match(numberCheck))) {
      this.errorMessage = 'The money should be a real number!';
      this.isInvalid = true;
      return false;
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
    } else if (!this.form.volunteersNeeded && !this.form.moneyNeeded || (!this.form.volunteersNeeded && !this.form.moneyNeeded)) {
      this.errorMessage = 'You have to choose if you need volunteers or money for the charity!';
    } else {
      return true;
    }
    this.isInvalid = true;
    return false;
  }
}
