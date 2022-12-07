import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserFullName(user: User): string {
    let fullName = '';
    fullName += user.name;
    if (user.secondName) {
      fullName += ' ' + user.secondName;
    }
    fullName += ' ' + user.surname;
    if (user.secondSurname) {
      fullName += ' ' + user.secondSurname;
    }

    return fullName;
  }
}
