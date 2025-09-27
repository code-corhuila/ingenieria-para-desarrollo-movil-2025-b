import { Component } from '@angular/core';
import { ProductsPage } from '../pages/products/products.page'; // Importamos el componente reutilizable
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  // Declaramos los módulos y el componente que vamos a usar en este Tab
  imports: [IonicModule, ProductsPage, CommonModule, FormsModule],
  standalone: true, // Angular 15+: componente independiente
})
export class Tab1Page {
  constructor() {}
}
