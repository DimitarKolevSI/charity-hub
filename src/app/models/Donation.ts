export class Donation {

  public amount: number = 0;
  public username: string = '';

  constructor(donation?: Donation) {
    if (donation) {
      this.amount = donation.amount;
      this.username = donation.username;
    }
  }

}
