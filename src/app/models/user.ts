import { Types } from 'mongoose';

export class User {
  public _id?: Types.ObjectId;
  public email: string;
  public name: string;
  public password: string;
  public phone: string;
  public secondName: string;
  public secondSurname: string;
  public surname: string;

  // Virtual properties
  public fullName?: string;

  constructor() {
  }
}
