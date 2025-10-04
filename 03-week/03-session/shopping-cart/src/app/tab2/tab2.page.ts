import { Component } from '@angular/core';
import { CartPage } from '../pages/cart/cart.page';
import { CommonModule } from '@angular/common';
import { ProductsPage } from '../pages/products/products.page';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule,CartPage]
})
export class Tab2Page {

  constructor() {}

}
