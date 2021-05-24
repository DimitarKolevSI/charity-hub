import {Donation} from './Donation';

export class Charity {

  public title: string = '';
  public description: string = '';
  public volunteersNeeded: number = 0;
  public volunteers: number = 0;
  public moneyNeeded: number = 0;
  public moneyDonated: number = 0;
  public creatorsUsername: string = '';
  public id: number = 0;
  public imageUrl: string = '';
  public donations: Donation[];
  public volunteersUsernames: string[];

  constructor(charity?: Charity) {
    if (charity) {
      this.title = charity.title;
      this.description = charity.description;
      this.volunteersNeeded = charity.volunteersNeeded;
      this.volunteers = charity.volunteers;
      this.moneyDonated = charity.moneyDonated;
      this.moneyNeeded = charity.moneyNeeded;
      this.creatorsUsername = charity.creatorsUsername;
      this.id = charity.id;
      this.imageUrl = charity.imageUrl;
      charity.donations.forEach(donation => this.donations.push(new Donation(donation)));
      charity.volunteersUsernames.forEach(u => this.volunteersUsernames.push(u));
    }
  }
}
