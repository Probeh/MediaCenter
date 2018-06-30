import { Account } from "./Account.model";

export class User extends Account {
  constructor(
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string, 
    public image: string[], 
    public phone: { area: string, number: string },
    public gender: string,
    public address: { country: string, city: string, street: string, number: number }) { super(email, password);
  }
}