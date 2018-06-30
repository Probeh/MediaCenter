import { Product } from "./Product.model";
import { Account } from "../../Account/Models/Account.model";
import { Payment } from "./Payment.model";

export class Order {
  public created:  string;
  public account:  Account;
  public payment:  Payment;
  public subtotal: number;

  constructor(public products?: Product[]) {
    this.created = new Date().toLocaleString();
    if (products) { products.forEach(element => { this.subtotal += element.total; }); }
  }
}
