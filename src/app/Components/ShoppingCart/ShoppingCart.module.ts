import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './ShoppingCart.component';
import { CheckoutComponent } from './Components/Checkout/Checkout.component';
import { ConfirmationComponent } from './Components/Confirmation/Confirmation.component';
import { CartItemComponent } from './Components/CartItem/CartItem.component';
import { CartListComponent } from './Components/CartList/CartList.component';
import { InputsModule, WavesModule } from 'angular-bootstrap-md'
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../../Services/AuthGuard.service';


@NgModule({
  imports: [
    CommonModule,
    InputsModule,
    WavesModule,
    RouterModule.forRoot([
      { path: "Checkout", component: CheckoutComponent, canActivate: [AuthGuardService] },
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    CartItemComponent,
    CartListComponent,
    CheckoutComponent,
    ConfirmationComponent,
  ],
  exports: [ShoppingCartComponent, CartListComponent]
})
export class ShoppingCartModule { }
