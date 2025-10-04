<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Cadena de Suministro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Supply Chain</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="supply-chain-container">
        <ion-card class="module-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="businessOutline" color="primary"></ion-icon>
              Gestión de Cadena de Suministro
            </ion-card-title>
            <ion-card-subtitle>Administra proveedores, inventario y pedidos</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <div class="supply-stats">
              <div class="stat-item">
                <ion-icon :icon="storefrontOutline" color="success"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.proveedoresActivos }}</h3>
                  <p>Proveedores Activos</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="cubeOutline" color="warning"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.productosInventario }}</h3>
                  <p>Productos en Inventario</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="timeOutline" color="danger"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.pedidosPendientes }}</h3>
                  <p>Pedidos Pendientes</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <ion-button expand="block" fill="solid" @click="gestionarProveedores">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                Gestionar Proveedores
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="controlInventario">
                <ion-icon :icon="listOutline" slot="start"></ion-icon>
                Control de Inventario
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="nuevoPedido">
                <ion-icon :icon="cartOutline" slot="start"></ion-icon>
                Realizar Pedido
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Lista de pedidos recientes -->
        <ion-card class="recent-orders-card">
          <ion-card-header>
            <ion-card-title>Pedidos Recientes</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <ion-list>
              <ion-item v-for="pedido in pedidosRecientes" :key="pedido.id">
                <ion-icon :icon="cartOutline" slot="start" :color="getStatusColor(pedido.estado)"></ion-icon>
                <ion-label>
                  <h3>{{ pedido.numero }}</h3>
                  <p>{{ pedido.proveedor }} - ${{ pedido.total.toLocaleString() }}</p>
                  <p>{{ pedido.fechaPedido }} - Entrega: {{ pedido.fechaEntrega }}</p>
                </ion-label>
                <ion-chip :color="getStatusColor(pedido.estado)" slot="end">
                  {{ pedido.estado }}
                </ion-chip>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Inventario con stock bajo -->
        <ion-card class="low-stock-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="warningOutline" color="warning"></ion-icon>
              Productos con Stock Bajo
            </ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <ion-list>
              <ion-item v-for="producto in productosStockBajo" :key="producto.id">
                <ion-icon :icon="alertCircleOutline" slot="start" color="warning"></ion-icon>
                <ion-label>
                  <h3>{{ producto.nombre }}</h3>
                  <p>Stock actual: {{ producto.stock }} unidades</p>
                  <p>Stock mínimo: {{ producto.stockMinimo }} unidades</p>
                </ion-label>
                <ion-button fill="outline" size="small" @click="realizarPedido(producto)" slot="end">
                  Pedir
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Proveedores principales -->
        <ion-card class="main-suppliers-card">
          <ion-card-header>
            <ion-card-title>Proveedores Principales</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div class="suppliers-grid">
              <div v-for="proveedor in proveedoresPrincipales" :key="proveedor.id" class="supplier-item">
                <div class="supplier-info">
                  <h4>{{ proveedor.nombre }}</h4>
                  <p>{{ proveedor.contacto }}</p>
                  <p>{{ proveedor.categoria }}</p>
                </div>
                <div class="supplier-stats">
                  <span class="rating">⭐ {{ proveedor.rating }}/5</span>
                  <span class="orders">{{ proveedor.pedidosRealizados }} pedidos</span>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonChip
} from '@ionic/vue';
import {
  businessOutline,
  storefrontOutline,
  cubeOutline,
  timeOutline,
  addOutline,
  listOutline,
  cartOutline,
  warningOutline,
  alertCircleOutline
} from 'ionicons/icons';

interface Pedido {
  id: number;
  numero: string;
  proveedor: string;
  total: number;
  fechaPedido: string;
  fechaEntrega: string;
  estado: 'pendiente' | 'en-transito' | 'entregado' | 'cancelado';
}

interface ProductoStockBajo {
  id: number;
  nombre: string;
  stock: number;
  stockMinimo: number;
}

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  categoria: string;
  rating: number;
  pedidosRealizados: number;
}

const stats = ref({
  proveedoresActivos: 25,
  productosInventario: 1248,
  pedidosPendientes: 8
});

const pedidosRecientes = ref<Pedido[]>([
  {
    id: 1,
    numero: 'PED-001',
    proveedor: 'Editorial Planeta',
    total: 450000,
    fechaPedido: '2025-09-25',
    fechaEntrega: '2025-10-02',
    estado: 'en-transito'
  },
  {
    id: 2,
    numero: 'PED-002',
    proveedor: 'Distribuidora Norma',
    total: 320000,
    fechaPedido: '2025-09-26',
    fechaEntrega: '2025-10-05',
    estado: 'pendiente'
  },
  {
    id: 3,
    numero: 'PED-003',
    proveedor: 'Grupo Santillana',
    total: 680000,
    fechaPedido: '2025-09-20',
    fechaEntrega: '2025-09-27',
    estado: 'entregado'
  }
]);

const productosStockBajo = ref<ProductoStockBajo[]>([
  {
    id: 1,
    nombre: 'Diccionario Español-Inglés',
    stock: 3,
    stockMinimo: 10
  },
  {
    id: 2,
    nombre: 'Atlas Mundial',
    stock: 1,
    stockMinimo: 5
  },
  {
    id: 3,
    nombre: 'Enciclopedia de Ciencias',
    stock: 2,
    stockMinimo: 8
  }
]);

const proveedoresPrincipales = ref<Proveedor[]>([
  {
    id: 1,
    nombre: 'Editorial Planeta',
    contacto: 'ventas@planeta.com',
    categoria: 'Literatura',
    rating: 4.8,
    pedidosRealizados: 45
  },
  {
    id: 2,
    nombre: 'Grupo Santillana',
    contacto: 'pedidos@santillana.com',
    categoria: 'Educativo',
    rating: 4.6,
    pedidosRealizados: 38
  },
  {
    id: 3,
    nombre: 'McGraw-Hill',
    contacto: 'latam@mcgrawhill.com',
    categoria: 'Técnico',
    rating: 4.7,
    pedidosRealizados: 29
  }
]);

const getStatusColor = (estado: string): string => {
  switch (estado) {
    case 'entregado': return 'success';
    case 'en-transito': return 'warning';
    case 'pendiente': return 'primary';
    case 'cancelado': return 'danger';
    default: return 'medium';
  }
};

const gestionarProveedores = () => {
  console.log('Gestionar proveedores');
};

const controlInventario = () => {
  console.log('Control de inventario');
};

const nuevoPedido = () => {
  console.log('Realizar nuevo pedido');
};

const realizarPedido = (producto: ProductoStockBajo) => {
  console.log('Realizar pedido para:', producto.nombre);
};
</script>

<style scoped>
.supply-chain-container {
  padding: 16px;
}

.module-card {
  margin-bottom: 16px;
}

.supply-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 8px;
}

.stat-info h3 {
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
}

.stat-info p {
  margin: 4px 0 0 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-orders-card,
.low-stock-card,
.main-suppliers-card {
  margin-top: 16px;
}

.suppliers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.supplier-item {
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 8px;
  border-left: 4px solid var(--ion-color-primary);
}

.supplier-info h4 {
  margin: 0 0 8px 0;
  color: var(--ion-color-dark);
  font-weight: 600;
}

.supplier-info p {
  margin: 4px 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.supplier-stats {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
}

.rating {
  color: var(--ion-color-warning);
  font-weight: 600;
}

.orders {
  color: var(--ion-color-primary);
  font-weight: 600;
}

ion-chip {
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .supply-stats {
    grid-template-columns: 1fr;
  }
  
  .suppliers-grid {
    grid-template-columns: 1fr;
  }
}
</style>