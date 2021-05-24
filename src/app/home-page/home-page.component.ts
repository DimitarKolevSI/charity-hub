import {Component, OnInit} from '@angular/core';
import {Charity} from '../models/Charity';
import {CharityRepositoryService} from '../services/charity-repository.service';
import {UrlSegment} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public url: string = 'https://static.vecteezy.com/system/resources/previews/000/411/613/original/vector-people-volunteering-and-donating-money-and-items-to-a-charitable-cause.jpg';

  constructor(private service: CharityRepositoryService) {
  }

  charities: Charity[] = [];
  key: string = '';


  ngOnInit(): void {
    // this.charities = this.service.getAll();
    this.service.getAll().subscribe(
      (data: Charity[]) => this.charities = data
    );
  }
}
