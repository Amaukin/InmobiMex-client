import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  public property: Property;
  public propertyForm: FormGroup;
  public isLoggedIn: boolean;

  private currentUser: User;
  private isEdit: boolean;
  private propertyId: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.propertyId = String(this.route.snapshot.queryParams['propertyId']);
    this.isEdit = this.propertyId !== 'undefined';
  }

  ngOnInit(): void {
    this.initializeFormBuilder();
    if (this.isEdit) {
      this.getProperty();
    }
    this.validateUserIsLoggedIn();
    this.getCurrentUser();
  }

  public images(): FormArray {
    return this.propertyForm.get('images') as FormArray;
  }

  /**
   * @description Adds new image to images array
   */
  public addImage(): void {
    this.images().push(this.newImage());
  }

  /**
   * @description Saves property and navigates to detail
   */
  public addProperty(): void {
    const property = this.mapProperty();
    if (!this.isEdit) {
      this.propertyService.addProperty(property).subscribe(
        (property) => {
          const propertyId = property._id!.toString();
          this.navigateToDetail(propertyId);
      });
    } else {
      this.propertyService.updateProperty(property, this.propertyId).subscribe(
        (_) => {
          this.navigateToDetail(this.propertyId);
      });
    }
  }

  /**
   * @description Removes image item from array
   * @param index Image array index
   */
  public removeImage(index: number): void {
    this.images().removeAt(index);
  }

  /**
   * @description Initializes form for html
   */
  private initializeFormBuilder(): void {
    this.propertyForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      bathroomQuantity: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      garageQuantity: new FormControl(null, [Validators.required]),
      images: this.formBuilder.array([this.newImage()]),
      isFurnished: new FormControl(false, [Validators.required]),
      leaseType: new FormControl('Renta', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      roomQuantity: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      surface: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
    })
  }

  /**
   * @description Gets current user
   */
  private getCurrentUser(): void {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          this.currentUser = user;
      });
    }
  }

  /**
   * @description Gets property information for edition
   */
  private getProperty(): void {
    this.propertyService.getProperty(this.propertyId).subscribe(
      (property) => {
        this.property = property;
        this.patchPropertyForm();
    });
  }

  /**
   * @description Extracts values from form
   * @returns Mapped property
   */
  private mapProperty(): Property {
    const address = this.propertyForm.get('address')!.value;
    const bathroomQuantity = this.propertyForm.get('bathroomQuantity')!.value;
    const description = this.propertyForm.get('description')!.value;
    const garageQuantity = this.propertyForm.get('garageQuantity')!.value;
    const images: string[] = [];
    const isFurnished = this.propertyForm.get('isFurnished')!.value;
    const leaseType = this.propertyForm.get('leaseType')!.value;
    const price = this.propertyForm.get('price')!.value;
    const roomQuantity = this.propertyForm.get('roomQuantity')!.value;
    const services = this.propertyForm.get('services')!.value;
    const surface = this.propertyForm.get('surface')!.value;
    const title = this.propertyForm.get('title')!.value;
    for (const image of this.images().value) {
      images.push(image.image);
    }
    const property: Property = {
      address,
      bathroomQuantity,
      description,
      garageQuantity,
      images,
      isFurnished,
      leaseType,
      price,
      roomQuantity,
      services,
      surface,
      title
    }
    if (this.isLoggedIn) {
      property.owner = this.currentUser;
    }

    return property;
  }

  /**
   * @description Navigates to property detail
   * @param propertyId Property identifier
   */
  private navigateToDetail(propertyId: string): void {
    this.router.navigate(['/property-detail/' + propertyId]);
  }

  /**
   * @description Navigates to home page
   */
  public navigateToHome(): void {
    this.router.navigate(['']);
  }

  /**
   * @description Creates a new image form control
   * @param image Image url
   * @returns New image form control
   */
  private newImage(image?: string): FormGroup {
    return new FormGroup({
      image: new FormControl(image ? image : null, [Validators.required])
    });
  }

  /**
   * @description Patches property values to property form
   */
  private patchPropertyForm(): void {
    this.propertyForm.patchValue({
      address: this.property.address,
      bathroomQuantity: this.property.bathroomQuantity,
      description: this.property.description,
      garageQuantity: this.property.garageQuantity,
      isFurnished: this.property.isFurnished,
      leaseType: this.property.leaseType,
      price: this.property.price,
      roomQuantity: this.property.roomQuantity,
      services: this.property.services,
      surface: this.property.surface,
      title : this.property.title
    });
    this.removeImage(0);
    for (const image of this.property.images) {
      this.images().push(this.newImage(image));
    }
  }

  /**
   * @description Validates if user is logged in
   */
  private validateUserIsLoggedIn(): void {
    this.isLoggedIn = this.userService.validateUserIsLoggedIn();
  }
}
