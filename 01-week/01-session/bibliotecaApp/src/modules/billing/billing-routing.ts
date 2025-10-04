import { RouteRecordRaw } from 'vue-router';

// Lazy loading de las páginas del módulo billing
const BillingPage = () => import('./pages/BillingPage.vue');
const CreateInvoicePage = () => import('./pages/CreateInvoicePage.vue');
const InvoiceListPage = () => import('./pages/InvoiceListPage.vue');
const ReportsPage = () => import('./pages/ReportsPage.vue');

export const billingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/billing',
    name: 'BillingMain',
    component: BillingPage,
    meta: {
      title: 'Facturación',
      description: 'Gestión de facturas y cobros',
      requiresAuth: true
    }
  },
  {
    path: '/billing/create',
    name: 'CreateInvoice',
    component: CreateInvoicePage,
    meta: {
      title: 'Nueva Factura',
      parent: 'BillingMain',
      requiresAuth: true
    }
  },
  {
    path: '/billing/list',
    name: 'InvoiceList',
    component: InvoiceListPage,
    meta: {
      title: 'Lista de Facturas',
      parent: 'BillingMain',
      requiresAuth: true
    }
  },
  {
    path: '/billing/reports',
    name: 'BillingReports',
    component: ReportsPage,
    meta: {
      title: 'Reportes de Facturación',
      parent: 'BillingMain',
      requiresAuth: true
    }
  }
];