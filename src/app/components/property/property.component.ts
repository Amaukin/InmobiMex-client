import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';

import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  public properties: Property[];

  constructor(
    private propertyService: PropertyService,
  ) { }

  ngOnInit(): void {
    this.getProperties();
  }

  /**
   * @description Gets property list
   */
  private getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (properties) => {
        this.properties = properties;
        console.log('this', this.properties);
    });
  }

}
