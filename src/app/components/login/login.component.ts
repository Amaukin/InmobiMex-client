import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  public loginFailed: boolean;
  public user: User;
  public userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.loginFailed = false;
  }

  ngOnInit(): void {
    this.initializeFormBuilder();
  }

  /**
   * @description Checks user info and logs in
   */
  public login(): void {
    const user = this.mapUser();
    this.userService.login(user).subscribe(
      (response) => {
        console.log(response);
        this.userService.setToken(response.token);
        window.location.href = '/';
      }, (error) => {
        this.loginFailed = true;
    });
  }

  /**
   * @description Initializes form for html
   */
  private initializeFormBuilder(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  /**
   * @description Extracts values from form
   * @returns Mapped user
   */
  private mapUser(): User {
    const email = this.userForm.get('email')!.value;
    const password = this.userForm.get('password')!.value;
    const user: User = {
      email,
      password,
    }
    return user;
  }

  /**
   * @description Navigates to home page
   */
  public navigateToHome(): void {
    this.router.navigate(['']);
  }
}
