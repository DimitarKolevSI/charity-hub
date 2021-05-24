import {Component, NgModule, OnInit} from '@angular/core';
import {Charity} from '../models/Charity';
import {CharityRepositoryService} from '../services/charity-repository.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRepositoryService} from '../services/user-repository.service';
import {AppRoutingModule} from '../app-routing.module';

@Component({
  selector: 'app-detail-charity-view',
  templateUrl: './detail-charity-view.component.html',
  styleUrls: ['./detail-charity-view.component.scss']
})
export class DetailCharityViewComponent implements OnInit {

  id: number;
  opened: boolean = false;
  isVolunteerModalOpen: boolean = false;
  deletion: boolean = false;
  amountToDonate: number = 0;
  currentUsername: string = '';
  currentCharity: Charity;

  constructor(private charityRepositoryService: CharityRepositoryService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              public userService: UserRepositoryService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params.id;
    this.currentUsername = this.userService.getCurrentUsername();
    this.refreshCharity();
    if (this.currentCharity === null) {
      this.router.navigate(['/error']);
    }
  }

  donation(): void {
    this.opened = false;
    if (this.amountToDonate > 0) {
      this.amountToDonate = +this.amountToDonate;
      if (this.amountToDonate + this.currentCharity.moneyDonated > this.currentCharity.moneyNeeded) {
        this.amountToDonate = this.currentCharity.moneyNeeded - this.currentCharity.moneyDonated;
      }
      this.currentCharity = this.charityRepositoryService.donate(this.amountToDonate, this.currentCharity.id);
    }
  }

  volunteer(): void {
    const currentUsername = localStorage.getItem('username');
    if (this.currentCharity.volunteersUsernames.includes(currentUsername)) {
      this.isVolunteerModalOpen = false;
      setTimeout(() => alert('You have already participated!'), 10);
    } else {
      this.charityRepositoryService.volunteer(this.currentCharity.id).subscribe(
        () => {
          this.refreshCharity();
          this.isVolunteerModalOpen = false;
        }
      );
    }
  }

  checkForLogin(window: string): void {
    if (this.userService.getCurrentUsername() === '') {
      alert('You need to login first!');
    } else {
      if (window === 'opened') {
        this.opened = true;
      } else {
        this.isVolunteerModalOpen = true;
      }
    }
  }

  refreshCharity(): void {
    this.currentCharity = this.charityRepositoryService.getCharity(this.id);
    // this.userService.getAverageDonationByUsername(this.currentUsername).subscribe((amount: number) => this.amountToDonate = amount);
  }

  delete(): void {
    this.charityRepositoryService.delete(this.currentCharity.id).subscribe(() => this.router.navigate(['/home']));
  }

  edit() {
    this.router.navigate(['/edit', this.id]);
  }
}
