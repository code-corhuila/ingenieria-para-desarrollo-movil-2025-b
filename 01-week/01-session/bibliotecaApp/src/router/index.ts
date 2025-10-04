import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

// Lazy loading de los módulos
const BillingPage = () => import('../modules/billing/pages/BillingPage.vue');
const SecurityPage = () => import('../modules/security/pages/SecurityPage.vue');
const SupplyChainPage = () => import('../modules/supply-chain/pages/SupplyChainPage.vue');
const SellPage = () => import('../modules/sell/pages/SellPage.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/billing',
    name: 'Billing',
    component: BillingPage,
    meta: {
      title: 'Facturación',
      description: 'Gestión de facturas y cobros'
    }
  },
  {
    path: '/security',
    name: 'Security',
    component: SecurityPage,
    meta: {
      title: 'Seguridad',
      description: 'Control de acceso y seguridad del sistema'
    }
  },
  {
    path: '/supply-chain',
    name: 'SupplyChain',
    component: SupplyChainPage,
    meta: {
      title: 'Cadena de Suministro',
      description: 'Gestión de proveedores e inventario'
    }
  },
  {
    path: '/sell',
    name: 'Sell',
    component: SellPage,
    meta: {
      title: 'Ventas',
      description: 'Gestión de ventas y clientes'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
