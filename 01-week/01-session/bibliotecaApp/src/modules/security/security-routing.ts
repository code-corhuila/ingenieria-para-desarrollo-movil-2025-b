import { RouteRecordRaw } from 'vue-router';

// Lazy loading de las páginas del módulo security
const SecurityPage = () => import('./pages/SecurityPage.vue');
const UserManagementPage = () => import('./pages/UserManagementPage.vue');
const RolesPage = () => import('./pages/RolesPage.vue');
const AuditPage = () => import('./pages/AuditPage.vue');

export const securityRoutes: Array<RouteRecordRaw> = [
  {
    path: '/security',
    name: 'SecurityMain',
    component: SecurityPage,
    meta: {
      title: 'Seguridad',
      description: 'Control de acceso y seguridad del sistema',
      requiresAuth: true,
      requiresRole: ['admin', 'security_manager']
    }
  },
  {
    path: '/security/users',
    name: 'UserManagement',
    component: UserManagementPage,
    meta: {
      title: 'Gestión de Usuarios',
      parent: 'SecurityMain',
      requiresAuth: true,
      requiresRole: ['admin']
    }
  },
  {
    path: '/security/roles',
    name: 'RolesManagement',
    component: RolesPage,
    meta: {
      title: 'Roles y Permisos',
      parent: 'SecurityMain',
      requiresAuth: true,
      requiresRole: ['admin']
    }
  },
  {
    path: '/security/audit',
    name: 'SystemAudit',
    component: AuditPage,
    meta: {
      title: 'Auditoría del Sistema',
      parent: 'SecurityMain',
      requiresAuth: true,
      requiresRole: ['admin', 'security_manager']
    }
  }
];