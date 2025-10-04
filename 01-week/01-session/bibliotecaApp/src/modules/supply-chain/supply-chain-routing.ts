import { RouteRecordRaw } from 'vue-router';

// Lazy loading de las páginas del módulo supply-chain
const SupplyChainPage = () => import('./pages/SupplyChainPage.vue');
const SuppliersPage = () => import('./pages/SuppliersPage.vue');
const InventoryPage = () => import('./pages/InventoryPage.vue');
const OrdersPage = () => import('./pages/OrdersPage.vue');

export const supplyChainRoutes: Array<RouteRecordRaw> = [
  {
    path: '/supply-chain',
    name: 'SupplyChainMain',
    component: SupplyChainPage,
    meta: {
      title: 'Cadena de Suministro',
      description: 'Gestión de proveedores e inventario',
      requiresAuth: true
    }
  },
  {
    path: '/supply-chain/suppliers',
    name: 'SuppliersManagement',
    component: SuppliersPage,
    meta: {
      title: 'Gestión de Proveedores',
      parent: 'SupplyChainMain',
      requiresAuth: true
    }
  },
  {
    path: '/supply-chain/inventory',
    name: 'InventoryControl',
    component: InventoryPage,
    meta: {
      title: 'Control de Inventario',
      parent: 'SupplyChainMain',
      requiresAuth: true
    }
  },
  {
    path: '/supply-chain/orders',
    name: 'OrdersManagement',
    component: OrdersPage,
    meta: {
      title: 'Gestión de Pedidos',
      parent: 'SupplyChainMain',
      requiresAuth: true
    }
  }
];