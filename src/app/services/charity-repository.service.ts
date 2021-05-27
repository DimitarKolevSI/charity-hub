import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Charity} from '../models/Charity';
import {Donation} from '../models/Donation';

@Injectable({
  providedIn: 'root'
})
export class CharityRepositoryService {

  private static idCounter: number = 0;
  private static charities: Charity[] = CharityRepositoryService.init();

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

  private static init(): Charity[] {
    return [
      {
        id: CharityRepositoryService.idCounter++,
        title: 'Save the Oceans',
        description: 'The ocean is a planetary superpower. Home to spectacular ecosystems and treasured wildlife, the ocean covers 71% of our Earth’s surface and sustains the lives of billions of people. It regulates our climate, produces half the oxygen we breathe, and fuels the water cycle that produces rain and freshwater.' +
          'Studies show that when ocean ecosystems are resilient, people nearby are more resilient too. A group of researchers looked at more than 100 studies to better understand the connection between marine protection and human health, and found that a majority of people realize the social, health, economic, governance, and ecological benefits from a healthy ocean. But those benefits are not guaranteed.' +
          'After decades of overuse and pollution, these services are being interrupted.' +
          'One out of three fish stocks is overfished. Hundreds of thousands of marine mammals, seabirds, and sea turtles are captured each year, along with tens of millions of sharks. Half of all coral reefs and mangroves are gone.' +
          'We still have time to give the ocean the room it needs to be resilient in the face of growing threats. But we have to work together. WWF is prioritizing two pathways to build a more resilient ocean—We’re finding the solutions to fix broken global systems that lead to declines in nature while protecting those places that wildlife and people can’t live without.',
        volunteersNeeded: 0,
        volunteers: 0,
        moneyNeeded: 10_000_000,
        moneyDonated: 0,
        creatorsUsername: 'dimitarkolev0911',
        imageUrl: 'https://c402277.ssl.cf1.rackcdn.com/photos/10521/images/portrait_overview/MID_104447.jpg?1449605159',
        donations: [],
        volunteersUsernames: []
      },
      {
        id: CharityRepositoryService.idCounter++,
        title: 'Waterkeeper Alliance',
        description: 'Waterkeeper Alliance fights for all people in every community to have clean water for drinking, swimming, and fishing safely.' +
          'The alliance is 100% focused on clean water and works through enabling and connecting grassroots organizations and affiliates in this cause. In this mission, they also seek to stop water polluters, such as coal companies and hog farms, from fouling the water.' +
          'The concept of Waterkeepers started its work with the Hudson River in New York in 1966. Fishermen banded together to stop industrial pollution from destroying their livelihoods. The movement resulted in the Hudson recovering, and the success inspired more waterkeepers around the country and the world.' +
          'Now, Waterkeeper Alliance bands over 300 organizations striving to protect over 2.5 million square miles of waterways, including rivers, lakes, and coastlines. Efforts stretch from Alaska to Australia.',
        volunteers: 0,
        volunteersNeeded: 1_000,
        moneyNeeded: 1_000_000,
        moneyDonated: 0,
        creatorsUsername: 'ivana99',
        imageUrl: 'https://greenglobaltravel.com/wp-content/uploads/2016/11/Waterkeeper-Alliance.jpg',
        donations: [],
        volunteersUsernames: []
      }
    ];
  }

}
