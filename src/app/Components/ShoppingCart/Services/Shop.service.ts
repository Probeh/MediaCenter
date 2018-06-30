import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../Models/Product.model';

@Injectable()
export class ShopService {
  //Properties
  public insideCart: boolean;
  // Local Collections
  private cartItems: Product[] = new Array<Product>();
  // Global Emitters
  public cartListener = new EventEmitter<Product[]>();

  constructor() { }

  public addItem(value: Product) {
    if (this.cartItems.includes(this.cartItems.find(product => product.item.id == value.item.id))) {
      this.cartItems[this.cartItems.findIndex(product => product.item.id == value.item.id)].updateQuantity();
    }
    else {
      this.cartItems.push(value);
    }
    this.cartListener.emit(this.cartItems.slice());
  }
  public removeItem(value: Product) {
    this.cartItems.splice(value.id - 1, 1);
    this.cartListener.emit(this.cartItems.slice());
  }
  public updateItem(value: Product) {
    if (value.quantity == 0) {
      this.cartItems.splice(this.cartItems.findIndex(product => product.item.id == value.item.id), 1);
    }
    this.cartListener.emit(this.cartItems.slice());
  }
  public clearItems() {
    this.cartItems = [];
    this.cartListener.emit(this.cartItems.slice());
  }
  public getItems() : Product[] {
    return this.cartItems.slice();
  }
  public getItemCount() : number {
    var result: number = 0;
    if (this.cartItems) {
      this.cartItems.forEach(element => {
        result += element.quantity;
      });
    }
    return result;
  }
}
