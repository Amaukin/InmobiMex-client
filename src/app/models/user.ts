import { Types } from 'mongoose';

export class User {
  public _id?: Types.ObjectId;
  public email: string;
  public isAdmin?: boolean;
  public name?: string;
  public password: string;
  public phone?: string;
  public surname?: string;
  public secondName?: string;
  public secondSurname?: string;

  // Virtual properties
  public fullName?: string;

  constructor() {
  }
}
