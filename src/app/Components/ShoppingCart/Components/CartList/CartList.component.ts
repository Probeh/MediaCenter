import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from '../../Services/Shop.service';
import { Product } from '../../Models/Product.model';

@Component({
  selector: 'app-CartList',
  templateUrl: './CartList.component.html',
  styleUrls: ['./CartList.component.scss']
})
export class CartListComponent implements OnInit {
  // Properties
  @Input() display: Options = Options.Short;
  public itemList: Product[] = new Array<Product>();

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    // Initializing Data
    this.itemList = this.shopService.getItems();
    // Subscribing To Service Emitters
    this.shopService.cartListener.subscribe(
      (value: Product[]) => this.itemList = value);
  }

  public updateQuantity(product: Product, value: string) {
    product.quantity = Number(value);
    product.calculateTotal();
    this.shopService.updateItem(product);
  }
  public removeItem(product: Product) {
    this.shopService.removeItem(product);
  }

  public setPosition(value: boolean) {
    this.shopService.insideCart = value;
  }
}

export enum Options {
  Short, Full
}