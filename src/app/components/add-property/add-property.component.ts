import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  public property: Property;
  public propertyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeFormBuilder();
  }

  public images(): FormArray {
    return this.propertyForm.get('images') as FormArray;
  }

  public addImage(): void {
    this.images().push(this.newImage());
  }

  public addProperty(): void {
    const property = this.mapearProperty();
    this.propertyService.addProperty(property).subscribe(
      (property) => {
        const propertyId = property._id!.toString();
        this.redirigirInfo(propertyId);
      }
    );
  }

  public removeImage(indice: number): void {
    this.images().removeAt(indice);
  }

  private initializeFormBuilder(): void {
    this.propertyForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      bathroomQuantity: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      garageQuantity: new FormControl(null, [Validators.required]),
      images: this.formBuilder.array([this.newImage()]),
      isFurnished: new FormControl(null, [Validators.required]),
      leaseType: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      roomQuantity: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      surface: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
    })
  }

  private mapearProperty(): Property {
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
    return property;
  }

  private redirigirInfo(propertyId: string): void {
    this.router.navigate(['http://localhost:4200/property-detail/' + propertyId]);
  }

  private newImage(): FormGroup {
    return new FormGroup({
      image: new FormControl(null, [Validators.required])
    });
  }

}
