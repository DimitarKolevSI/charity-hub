import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/User';
import {UserBuilder} from '../builders/UserBuilder';

@Injectable({
  providedIn: 'root'
})

export class UserRepositoryService {

  private users: User[] = this.init();

  constructor() {}

  getUser(username: string): Observable<User> {
    const usersByUsername: User[] = this.users.filter(user => user.username === username);
    if (usersByUsername.length > 0) {
      return of(usersByUsername[0]);
    }
    return of(null);
  }

  addUser(registered: User): Observable<User> {
    this.users.push(registered);
    return of(registered);
  }

  getCurrentUsername(): string {
    return localStorage.getItem('username');
  }

  saveUser(username: string, newUser: User): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        this.users[i] = new User(newUser);
        localStorage.setItem('username', newUser.username);
        return;
      }
    }

  }

  init(): User[] {
    return [
      new UserBuilder()
        .withUsername('dimitarkolev0911')
        .withPassword('password123')
        .withFirstName('Dimitar')
        .withLastName('Kolev')
        .withAge(21)
        .withGender('Male')
        .withEmail('dimiturrk@uni-sofia.bg').build(),
      new UserBuilder()
        .withUsername('ivana99')
        .withPassword('ivanatoneva1234')
        .withFirstName('Ivana')
        .withLastName('Toneva')
        .withAge(21)
        .withGender('Female')
        .withEmail('ibtoneva@uni-sofia.bg').build(),
      new UserBuilder()
        .withUsername('kristina')
        .withPassword('kirimovaSU')
        .withFirstName('Kristina')
        .withLastName('Kirimova')
        .withAge(21)
        .withGender('Female')
        .withEmail('kkirimova@uni-sofia.bg').build()
    ];
  }
}
