import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { APP_DEFAULTS } from '../shared/default.catalog';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Adds a new property
   * @param property Property to add
   * @returns Created property
   */
  public addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(APP_DEFAULTS.API_URL + APP_DEFAULTS.PROPERTY_PATH, property)
  }

  /**
   * @description Deletes property
   * @param propertyId Property identifier
   * @returns Void
   */
  public deleteProperty(propertyId: string): Observable<void> {
    return this.http.delete<void>(APP_DEFAULTS.API_URL + APP_DEFAULTS.PROPERTY_PATH + '/' + propertyId);
  }

  /**
   * @description Gets property list
   * @returns Property array list
   */
  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(APP_DEFAULTS.API_URL + APP_DEFAULTS.PROPERTY_PATH);
  }

  /**
   * @description Gets specific property
   * @returns Specific property
   */
  public getProperty(propertyId: string): Observable<Property> {
    return this.http.get<Property>(APP_DEFAULTS.API_URL + APP_DEFAULTS.PROPERTY_PATH + '/' + propertyId);
  }

  /**
   * @description Updates existing property
   * @param property Property with new data
   * @param propertyId Property identifierd
   * @returns Updated property
   */
  public updateProperty(property: Property, propertyId: string): Observable<Property> {
    return this.http.patch<Property>(APP_DEFAULTS.API_URL + APP_DEFAULTS.PROPERTY_PATH + '/' + propertyId, property);
  }
}
