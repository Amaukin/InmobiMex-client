import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { APP_DEFAULTS } from '../shared/default.catalog';
import { UserLoginResponseInterface } from '../shared/userLoginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookies: CookieService,
    private http: HttpClient
  ) { }

  /**
   * @description Adds a new user
   * @param user User to add
   * @returns Created user
   */
  public addUser(user: User): Observable<UserLoginResponseInterface> {
    return this.http.post<UserLoginResponseInterface>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH, user)
  }

  /**
   * @description Terminates user session
   */
  public closeSession(): void {
    console.log('cerrar sesion');
    this.cookies.delete('token');
  }

  /**
   * @description Deletes user
   * @param userId User identifier
   * @returns Void
   */
  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH + '/' + userId);
  }

  /**
   * @description Logs user in
   * @param user user to validate
   * @returns Response including user data and token
   */
  public login(user: User): Observable<UserLoginResponseInterface> {
    return this.http.post<UserLoginResponseInterface>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH + APP_DEFAULTS.LOGIN, user);
  }

  /**
   * @description Gets current user
   * @returns Current user
   */
  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH + APP_DEFAULTS.TOKEN_PATH + '/' + this.getToken())
  }

  /**
   * @description Gets session token
   * @returns Session token
   */
  public getToken() {
    return this.cookies.get('token');
  }

  /**
   * @description Builds user full name
   * @param user User to get name from
   * @returns User full name
   */
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

  /**
   * @description Gets user list
   * @returns User array list
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH);
  }

  /**
   * @description Gets specific user
   * @returns Specific user
   */
  public getUser(userId: string): Observable<User> {
    return this.http.get<User>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH + '/' + userId);
  }

  /**
   * @description Sets session token
   * @param token User session token
   */
  public setToken(token: string) {
    this.cookies.set('token', token);
  }

  /**
   * @description Updates existing user
   * @param user User with new data
   * @param userId User identifierd
   * @returns Updated user
   */
  public updateUser(user: User, userId: string): Observable<User> {
    return this.http.patch<User>(APP_DEFAULTS.API_URL + APP_DEFAULTS.USER_PATH + '/' + userId, user);
  }

  /**
   * @description Validates if user is logged in
   */
  public validateUserIsLoggedIn(): boolean {
    const isLoggedIn = this.getToken().length > 0 ? true : false;

    return isLoggedIn;
  }
}
