import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public imageIndex: number;
  public isActionsAccess: boolean;
  public maxImageIndex: number;
  public owner: User;
  public property: Property;
  private propertyId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private userService: UserService
  ) {
    this.imageIndex = 0;
    this.isActionsAccess = false;
    this.propertyId = String(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getProperty();
  }

  /**
   * @description Deletes property
   */
  public deleteProperty(): void {
    this.propertyService.deleteProperty(this.propertyId).subscribe(
      (_) => {
        this.router.navigate(['/'])
    }, (error) => {
        console.log(error);
        this.router.navigate(['/'])
    });
  }

  /**
   * @description Edits property
   */
  public editProperty(): void {
    const propertyId = this.propertyId;
    this.router.navigate(['/add-property'], { queryParams: { propertyId } });
  }

  /**
   * @description Sets next image on carousel
   */
  public nextImage(): void {
    if (this.imageIndex < this.maxImageIndex) {
      this.imageIndex++;
    }
  }

  /**
   * @description Sets previous image on carousel
   */
  public previousImage(): void {
    if (this.imageIndex > 0) {
      this.imageIndex--;
    }
  }

  /**
   * @description Gets current user
   */
  private getCurrentUser(): void {
    const isLoggedIn = this.userService.validateUserIsLoggedIn();
    if (isLoggedIn) {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          this.isActionsAccess = user._id === this.owner._id || user.isAdmin!;
      }, error => console.log(error));
    }
  }

  /**
   * @description Gets property data
   */
  private getProperty(): void {
    this.propertyService.getProperty(this.propertyId).subscribe(
      (property) => {
        this.maxImageIndex = property.images.length - 1;
        this.property = property;
        this.owner = this.property.owner!;
        this.owner.fullName = this.userService.getUserFullName(this.owner);
        this.getCurrentUser();
    });
  }

}
