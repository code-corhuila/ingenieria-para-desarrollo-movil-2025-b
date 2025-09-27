import { Component } from '@angular/core';
import { CheckoutPage } from '../pages/checkout/checkout.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule, CommonModule, CheckoutPage ],
})
export class Tab3Page {
  constructor() {}
}
