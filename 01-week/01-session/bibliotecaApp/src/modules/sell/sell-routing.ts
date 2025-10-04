import { RouteRecordRaw } from 'vue-router';

// Lazy loading de las páginas del módulo sell
const SellPage = () => import('./pages/SellPage.vue');
const NewSalePage = () => import('./pages/NewSalePage.vue');
const CustomersPage = () => import('./pages/CustomersPage.vue');
const SalesReportsPage = () => import('./pages/SalesReportsPage.vue');

export const sellRoutes: Array<RouteRecordRaw> = [
  {
    path: '/sell',
    name: 'SellMain',
    component: SellPage,
    meta: {
      title: 'Ventas',
      description: 'Gestión de ventas y clientes',
      requiresAuth: true
    }
  },
  {
    path: '/sell/new',
    name: 'NewSale',
    component: NewSalePage,
    meta: {
      title: 'Nueva Venta',
      parent: 'SellMain',
      requiresAuth: true
    }
  },
  {
    path: '/sell/customers',
    name: 'CustomersManagement',
    component: CustomersPage,
    meta: {
      title: 'Gestión de Clientes',
      parent: 'SellMain',
      requiresAuth: true
    }
  },
  {
    path: '/sell/reports',
    name: 'SalesReports',
    component: SalesReportsPage,
    meta: {
      title: 'Reportes de Ventas',
      parent: 'SellMain',
      requiresAuth: true
    }
  }
];