import { Component, OnInit, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { ShopService } from '../ShoppingCart/Services/Shop.service';
import { BsDropdownDirective } from 'angular-bootstrap-md';
import { Product } from '../ShoppingCart/Models/Product.model';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Properties
  @ViewChild('shopDropdown') public shopMenu: BsDropdownDirective;
  constructor(private shopService: ShopService) { }

  ngOnInit() { 
    this.shopMenu.autoClose = true;
    this.shopService.cartListener.subscribe(
    () => { if (!this.shopMenu.isOpen) {
      if (!this.shopService.insideCart) {
        setTimeout(() => this.shopMenu.show(), 150);
      }
     }
    });
    document.addEventListener('click', () => {
      if (!this.shopService.insideCart) { 
        this.shopMenu.hide();
      }
    });
  }

  public cartItems() : number {
    return this.shopService.getItemCount();
  }
  public clearCart() {
    this.shopService.clearItems();
  }
  public setPosition(value: boolean) {
    this.shopService.insideCart = value;
  }

}
