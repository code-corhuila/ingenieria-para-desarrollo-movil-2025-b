import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
/**
 * Definición de las rutas principales de la app.
 * Tenemos un contenedor "tabs" con 3 rutas hijas:
 * - tab1 → Página de Productos
 * - tab2 → Página de Carrito
 * - tab3 → Página de Checkout
 */
export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', // Productos
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2', // Carrito
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3', // Checkout
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1', // Redirección por defecto a Productos
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
