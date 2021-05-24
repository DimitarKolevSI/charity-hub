import {Charity} from '../models/Charity';
import {Donation} from '../models/Donation';

export class CharityBuilder {
  private charity: Charity = new Charity();

  constructor() {
  }

  withTitle(title: string): CharityBuilder {
    this.charity.title = title;
    return this;
  }

  withDescription(description: string): CharityBuilder {
    this.charity.description = description;
    return this;
  }

  withVolunteersNeeded(volunteersNeeded: number): CharityBuilder {
    this.charity.volunteersNeeded = volunteersNeeded;
    return this;
  }

  withVolunteers(volunteers: number): CharityBuilder {
    this.charity.volunteers = volunteers;
    return this;
  }

  withMoneyNeeded(moneyNeeded: number): CharityBuilder {
    this.charity.moneyNeeded = moneyNeeded;
    return this;
  }

  withMoneyDonated(moneyDonated: number): CharityBuilder {
    this.charity.moneyDonated = moneyDonated;
    return this;
  }

  withCreatorsUsername(creatorsUsername: string): CharityBuilder {
    this.charity.creatorsUsername = creatorsUsername;
    return this;
  }

  withId(id: number): CharityBuilder {
    this.charity.id = id;
    return this;
  }

  withImageUrl(imageUrl: string): CharityBuilder {
    this.charity.imageUrl = imageUrl;
    return this;
  }

  withDonations(donations: Donation[]): CharityBuilder {
    this.charity.donations = donations;
    return this;
  }

  withVolunteersUsernames(volunteersUsernames: string[]): CharityBuilder {
    this.charity.volunteersUsernames = volunteersUsernames;
    return this;
  }

  build(): Charity {
    return this.charity;
  }
}
