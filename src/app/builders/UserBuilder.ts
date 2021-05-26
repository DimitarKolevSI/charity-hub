import {User} from '../models/User';

export class UserBuilder {
  private user: User = new User();

  constructor() {

  }

  public withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }

  public withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  public withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  public withAge(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }

  public withGender(gender: string): UserBuilder {
    this.user.gender = gender;
    return this;
  }

  public withEmail(location: string): UserBuilder {
    this.user.email = location;
    return this;
  }

  public build(): User {
    return this.user;
  }

}
