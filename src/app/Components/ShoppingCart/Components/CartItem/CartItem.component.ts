import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../Models/Product.model';
import { ShopService } from '../../Services/Shop.service';

@Component({
  selector: 'app-CartItem',
  templateUrl: './CartItem.component.html',
  styleUrls: ['./CartItem.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() public profile: Product;

  constructor(private shopService: ShopService) { }

  ngOnInit() {

  }

  public updateQuantity(value: number) {
    if (this.profile.quantity == 1 && value == -1) {
      this.profile.updateQuantity(value);
      this.shopService.updateItem(this.profile);
    }
    else if ((this.profile.quantity + value) < 10) {
      this.profile.updateQuantity(value);
      this.shopService.updateItem(this.profile);
    }
  }
}
