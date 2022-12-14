import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public userForm: FormGroup;

  private isEdit: boolean;
  private userId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userId = String(this.route.snapshot.queryParams['userId']);
    this.isEdit = this.userId !== 'undefined';
  }

  ngOnInit(): void {
    this.initializeFormBuilder();
    if (this.isEdit) {
      this.getUser();
    }
  }

  /**
   * @description Saves user and navigates to detail
   */
  public addUser(): void {
    const user = this.mapUser();
    if (!this.isEdit) {
      this.userService.addUser(user).subscribe(
        (response) => {
          this.userService.setToken(response.token);
          this.navigateToHome();
      });
    } else {
      this.userService.updateUser(user, this.userId).subscribe(
        (_) => {
          this.navigateToHome();
      });
    }
  }

  /**
   * @description Initializes form for html
   */
  private initializeFormBuilder(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null),
      secondSurname: new FormControl(null),
    })
  }

  /**
   * @description Gets user information for edition
   */
  private getUser(): void {
    this.userService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
        this.patchUserForm();
    });
  }

  /**
   * @description Extracts values from form
   * @returns Mapped user
   */
  private mapUser(): User {
    const email = this.userForm.get('email')!.value;
    const name = this.userForm.get('name')!.value;
    const password = this.userForm.get('password')!.value;
    const phone = this.userForm.get('phone')!.value;
    const surname = this.userForm.get('surname')!.value;
    const secondName = this.userForm.get('secondName')!.value;
    const secondSurname = this.userForm.get('secondSurname')!.value;
    const user: User = {
      email,
      name,
      password,
      phone,
      surname,
      secondName,
      secondSurname,
    }
    return user;
  }

  /**
   * @description Navigates to home page
   */
  public navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  /**
   * @description Patches user values to user form
   */
  private patchUserForm(): void {
    this.userForm.patchValue({
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      phone: this.user.phone,
      surname: this.user.surname,
      secondName: this.user.secondName,
      secondSurname: this.user.secondSurname,
    });
  }
}
