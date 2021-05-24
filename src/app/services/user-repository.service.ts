import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserRepositoryService {

  private users: User[] = [];

  constructor() {
    this.init();
  }

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

  getAverageDonationByUsername(username: string): Observable<number> {
    return of(0);
  }

  init(): void {
    this.users = [
      {
        username: 'dimitarkolev0911',
        password: 'password123',
        firstName: 'Dimitar',
        lastName: 'Kolev',
        age: 21,
        gender: 'Male',
        location: 'Sofia, Bulgaria'
      },
      {
        username: 'ivana99',
        password: 'ivanatoneva1234',
        firstName: 'Ivana',
        lastName: 'Toneva',
        age: 21,
        gender: 'Female',
        location: 'Sofia, Bulgaria'
      },
      {
        username: 'kristina',
        password: 'kirimovaSU',
        firstName: 'Kristina',
        lastName: 'Kirimova',
        age: 21,
        gender: 'Female',
        location: 'Sofia, Bulgaria'
      }
    ];
  }
}
