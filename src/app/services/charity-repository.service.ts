import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Charity} from '../models/Charity';
import {Donation} from '../models/Donation';

@Injectable({
  providedIn: 'root'
})
export class CharityRepositoryService {

  private static idCounter: number = 0;
  private static charities: Charity[] = [
    {
      id: CharityRepositoryService.idCounter++,
      title: 'Test charity 1',
      description: 'This is test data',
      volunteersNeeded: 0,
      volunteers: 0,
      moneyNeeded: 1000,
      moneyDonated: 0,
      creatorsUsername: 'dimitarkolev0911',
      imageUrl: 'https://th.bing.com/th/id/OIP.maFQtN1HV5qTR5CEG3Rb6AHaE8?w=268&h=180&c=7&o=5&dpr=2&pid=1.7',
      donations: [],
      volunteersUsernames: []
    },
    {
      id: CharityRepositoryService.idCounter++,
      title: 'Test charity 2',
      description: 'This is also test data',
      volunteers: 0,
      volunteersNeeded: 20,
      moneyNeeded: 0,
      moneyDonated: 0,
      creatorsUsername: 'ivana99',
      imageUrl: 'https://th.bing.com/th/id/R17444093a813b069e51bd40aa975030f?rik=BfG%2fZ%2bl7yyVYkw&pid=ImgRaw',
      donations: [],
      volunteersUsernames: []
    }
  ];

  constructor() {
  }

  getAll(): Observable<Charity[]> {
    return of(CharityRepositoryService.charities);
  }

  getCharity(id: number): Charity {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < CharityRepositoryService.charities.length; index++) {
      // tslint:disable-next-line:triple-equals
      if (CharityRepositoryService.charities[index].id == id) {
        return CharityRepositoryService.charities[index];
      }
    }
    return null;
  }

  createCharity(charity: Charity): Observable<Charity> {
    charity.id = CharityRepositoryService.idCounter++;
    charity.donations = [];
    charity.volunteersUsernames = [];
    CharityRepositoryService.charities.push(charity);
    return of(charity);
  }

  searchCharity(key: string): Observable<Charity[]> {
    return of(CharityRepositoryService.charities.filter(charity => charity.title.includes(key)));
  }

  donate(amount: number, id: number): Charity {
    const donation: Donation = new Donation();
    for (const charity of CharityRepositoryService.charities) {
      if (charity.id === id) {
        donation.username = localStorage.getItem('username');
        donation.amount = amount;
        charity.moneyDonated += amount;
        charity.donations.push(donation);
        return charity;
      }
    }
    return null;
  }

  volunteer(id: number): Observable<Charity> {
    const charitiesById: Charity[] = CharityRepositoryService.charities.filter(charity => charity.id === id);
    charitiesById[0].volunteers++;
    charitiesById[0].volunteersUsernames.push(localStorage.getItem('username'));
    return of(charitiesById[0]);
  }

  delete(id: number): Observable<Charity> {
    const charitiesById: Charity[] = CharityRepositoryService.charities.filter(charity => charity.id === id);
    const index: number = CharityRepositoryService.charities.indexOf(charitiesById[0], 0);
    let charities: Charity[] = [];
    for (let i = 0; i < CharityRepositoryService.charities.length; i++) {
      if (index === i) {
        continue;
      }
      charities = charities.concat([CharityRepositoryService.charities[i]]);
    }
    CharityRepositoryService.charities = charities;
    return of(charitiesById[0]);
  }

  editCharity(id: number, charity: Charity): Observable<Charity> {
    let index = -1;
    for (let i = 0; i < CharityRepositoryService.charities.length; i++) {
      if (CharityRepositoryService.charities[i].id == id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      if (!(+charity.volunteersNeeded)) {
        charity.volunteers = 0;
        charity.volunteersUsernames = [];
      }
      if (!(+charity.moneyNeeded)) {
        charity.moneyDonated = 0;
        charity.donations = [];
      }
      CharityRepositoryService.charities[index] = charity;
    }
    return of(charity);
  }

  getAllCharitiesCreatedByUser(username: string): Observable<Charity[]> {
    return of(CharityRepositoryService.charities.filter(charity => charity.creatorsUsername === username));
  }

  getAllCharityInWhichUserHasDonated(username: string): Observable<Charity[]> {
    return of(CharityRepositoryService.charities.filter(charity => this.hasDonationByUser(charity, username)));
  }

  hasDonationByUser(charity: Charity, username: string): boolean {
    return charity.donations.filter(donation => donation.username === username).length > 0;
  }

  getAllCharityInWhichUserHasParticipatedIn(username: string): Observable<Charity[]> {
    return of(CharityRepositoryService.charities.filter(charity => this.hasVolunteerByUsername(charity, username)));
  }

  hasVolunteerByUsername(charity: Charity, username: string): boolean {
    return charity.volunteersUsernames.filter(user => user === username).length > 0;
  }

}
