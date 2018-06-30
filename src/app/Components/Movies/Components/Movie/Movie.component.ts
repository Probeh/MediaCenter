import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../Models/Movie.model';
import { Router } from '@angular/router';
import { ShopService } from '../../../ShoppingCart/Services/Shop.service';
import { Product } from '../../../ShoppingCart/Models/Product.model';

@Component({
  selector: 'app-Movie',
  templateUrl: './Movie.component.html',
  styleUrls: ['./Movie.component.scss']
})
export class MovieComponent implements OnInit {
  // Properties
  @Input() public movie: Movie;
  @Input() public displayAs: Views = Views.Profile;
  @Output() public dispose = new EventEmitter<boolean>();

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit() { }

  public closeModal(value: boolean = true): void {
    this.dispose.emit(value);
  }
  public purchaseItem() {
    this.shopService.addItem(new Product(this.movie));
    if (this.displayAs = Views.Details) { this.closeModal(true); }
  }
}

export enum Views {
  Profile, Details
}