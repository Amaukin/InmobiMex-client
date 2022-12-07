import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/models/property';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public imageIndex: number;
  public maxImageIndex: number;
  public owner: User;
  public property: Property;
  private propertyId: string;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService
  ) {
    this.imageIndex = 0;
    this.propertyId = String(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getProperty();
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
   * @description Gets property data
   */
  private getProperty(): void {
    this.propertyService.getProperty(this.propertyId).subscribe(
      (property) => {
        this.maxImageIndex = property.images.length - 1;
        this.property = property;
        this.owner = this.property.owner!;
        this.owner.fullName = this.userService.getUserFullName(this.owner);
    });
  }

}
