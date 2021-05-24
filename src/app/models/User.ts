export class User {
  // TODO Encapsulate the fields and make setters and getters
  public username: string = '';
  public password: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public age: number = 0;
  public gender: string = '';
  public location: string = '';

  constructor(user?: User) {
    if (user) {
      this.username = user.username;
      this.password = user.password;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.age = user.age;
      this.gender = user.gender;
      this.location = user.location;
    }
  }
}
