import { User } from '../models/user';

export class UserLoginResponseInterface {
  public token: string;
  public user: User;
}
