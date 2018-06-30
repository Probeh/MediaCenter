import { Component, OnInit } from '@angular/core';
import { ShopService } from './Services/Shop.service';
import { Product } from './Models/Product.model';

@Component({
  selector: 'app-ShoppingCart',
  templateUrl: './ShoppingCart.component.html',
  styleUrls: ['./ShoppingCart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shopService: ShopService) { }

  ngOnInit() {
  }

  public getItemCount() : number {
    return this.shopService.getItemCount();
  }
  public getOrderTotal() : number {
    var total: number = 0;
    if (this.shopService.getItems()) {
      this.shopService.getItems().forEach(element => {
        total += element.total;
      });
    }
    return total;
  }
}
