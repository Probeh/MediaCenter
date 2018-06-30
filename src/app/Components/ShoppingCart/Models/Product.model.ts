import { Movie } from './../../Movies/Models/Movie.model'

export class Product {
  public id: number;
  public added: string;
  public total: number;

  constructor(public item?: Movie, public quantity: number = 1) {
    this.added = new Date().toLocaleString();
    this.calculateTotal();
  }

  public updateQuantity(amount: number = 1) {
    this.quantity += amount;
    this.calculateTotal();
  }
  public calculateTotal() : void {
    this.total = Number((this.item.price * this.quantity).toFixed(2));
  }
}
