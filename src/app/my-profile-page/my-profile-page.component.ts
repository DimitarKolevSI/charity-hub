import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {Router, ActivatedRoute} from '@angular/router';
import {UserRepositoryService} from '../services/user-repository.service';
import {Charity} from '../models/Charity';
import {CharityRepositoryService} from '../services/charity-repository.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {

  public user: User = new User();
  public currentUsername: string;
  public myCharities: Charity[];
  public donatedCharities: Charity[];
  public participatedCharities: Charity[];

  constructor(private router: Router, private userService: UserRepositoryService,
              private activatedRouter: ActivatedRoute, private charityService: CharityRepositoryService) {

  }

  ngOnInit(): void {
    this.currentUsername = this.activatedRouter.snapshot.params.username;
    this.userService.getUser(this.currentUsername).subscribe(
      (data: User) => this.user = data
    );
    if (this.user === null) {
      this.router.navigate(['/error']);
    } else {
      this.charityService.getAllCharitiesCreatedByUser(this.currentUsername).subscribe(
        (data: Charity[]) => this.myCharities = data
      );
      this.charityService.getAllCharityInWhichUserHasDonated(this.currentUsername).subscribe(
        (data: Charity[]) => this.donatedCharities = data
      );
      this.charityService.getAllCharityInWhichUserHasParticipatedIn(this.currentUsername).subscribe(
        (data: Charity[]) => this.participatedCharities = data
      );
    }


  }

}
