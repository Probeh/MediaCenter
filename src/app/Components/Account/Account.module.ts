import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './Account.component';
import { ProfileComponent } from './Components/Profile/Profile.component';
import { RegisterComponent } from './Components/Register/Register.component';
import { DashboardComponent } from './Components/Dashboard/Dashboard.component';
import { CommentComponent } from './Components/Comment/Comment.component';
import { PurchasesComponent } from './Components/Purchases/Purchases.component';
import { WishListComponent } from './Components/WishList/WishList.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    CommentComponent,
    PurchasesComponent,
    WishListComponent,
    ProfileComponent,
    RegisterComponent
  ]
})
export class AccountModule { }
