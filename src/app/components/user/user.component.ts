import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * @description Deletes user from database
   * @param user User to delete
   */
  public deleteUser(user: User): void {
    const userId = user._id!.toString()
    this.userService.deleteUser(userId).subscribe(
      (_) => {
        this.getUsers();
    });
  }

  /**
   * @description Gets user list
   */
  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        for (const user of users) {
          user.fullName = this.userService.getUserFullName(user);
        }
        this.users = users;
    });
  }

}
