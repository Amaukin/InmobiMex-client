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
}
