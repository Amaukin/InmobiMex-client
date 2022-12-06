import { Types } from 'mongoose';

export class User {
  public _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  phone: string;
  secondName: string;
  secondSurname: string;
  surname: string;

  constructor() {
  }
}
