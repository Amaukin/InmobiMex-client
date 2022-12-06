import { Types } from 'mongoose';
import { User } from './user';

export class Property {
  public _id?: Types.ObjectId;
  public address: string;
  public bathroomQuantity: number;
  public description: string;
  public garageQuantity: number;
  public images: string[];
  public isFurnished: boolean;
  public leaseType: string;
  public price: string;
  public roomQuantity: number;
  public services:  string;
  public surface: string;
  public title: string;
  public owner: User;

  constructor() {
  }
}
