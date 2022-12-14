import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentUser: User;
  public isLoggedIn: boolean;
  public isAdmin: boolean;
  public title = 'InmobiMex-client';

  constructor (
    private router: Router,
    private userService: UserService
  ) {
    this.validateUserIsLoggedIn();
    this.getCurrentUser();
  }

  public closeSession(): void {
    this.userService.closeSession();
    window.location.reload();
  }

  public navigateToUserAdministration(): void {
    this.router.navigate(['/user-administration']);
  }

  private getCurrentUser(): void {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          this.currentUser = user;
          this.currentUser.fullName = this.userService.getUserFullName(this.currentUser);
          this.isAdmin = this.currentUser.isAdmin!;
        }
      )
    }
  }

  /**
   * @description Validates if user is logged in
   */
  private validateUserIsLoggedIn(): void {
    this.isLoggedIn = this.userService.validateUserIsLoggedIn();
  }
}
