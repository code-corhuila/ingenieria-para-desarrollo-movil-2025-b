<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Ventas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Ventas</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="sell-container">
        <ion-card class="module-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="basketOutline" color="primary"></ion-icon>
              Gestión de Ventas
            </ion-card-title>
            <ion-card-subtitle>Administra ventas, clientes y estadísticas</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <div class="sell-stats">
              <div class="stat-item">
                <ion-icon :icon="trendingUpOutline" color="success"></ion-icon>
                <div class="stat-info">
                  <h3>${{ stats.ventasHoy.toLocaleString() }}</h3>
                  <p>Ventas de Hoy</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="peopleOutline" color="warning"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.clientesActivos }}</h3>
                  <p>Clientes Activos</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="receiptOutline" color="primary"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.ventasMes }}</h3>
                  <p>Ventas este Mes</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <ion-button expand="block" fill="solid" @click="nuevaVenta">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                Nueva Venta
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="gestionarClientes">
                <ion-icon :icon="personAddOutline" slot="start"></ion-icon>
                Gestionar Clientes
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="reportesVentas">
                <ion-icon :icon="barChartOutline" slot="start"></ion-icon>
                Reportes de Ventas
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Gráfico de ventas mensual -->
        <ion-card class="sales-chart-card">
          <ion-card-header>
            <ion-card-title>Ventas del Mes</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div class="chart-container">
              <div class="chart-bars">
                <div v-for="(venta, index) in ventasPorSemana" :key="index" class="chart-bar">
                  <div class="bar" :style="{ height: `${(venta.monto / 500000) * 100}%` }"></div>
                  <span class="bar-label">S{{ index + 1 }}</span>
                  <span class="bar-value">${{ venta.monto.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Lista de ventas recientes -->
        <ion-card class="recent-sales-card">
          <ion-card-header>
            <ion-card-title>Ventas Recientes</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <ion-list>
              <ion-item v-for="venta in ventasRecientes" :key="venta.id">
                <ion-icon :icon="basketOutline" slot="start" color="success"></ion-icon>
                <ion-label>
                  <h3>Venta #{{ venta.numero }}</h3>
                  <p>{{ venta.cliente }} - {{ venta.productos }} productos</p>
                  <p>{{ venta.fecha }} - {{ venta.hora }}</p>
                </ion-label>
                <div slot="end" class="sale-amount">
                  <strong>${{ venta.total.toLocaleString() }}</strong>
                  <ion-chip color="success" size="small">{{ venta.metodo }}</ion-chip>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Top productos vendidos -->
        <ion-card class="top-products-card">
          <ion-card-header>
            <ion-card-title>Productos Más Vendidos</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div class="top-products-list">
              <div v-for="(producto, index) in topProductos" :key="producto.id" class="product-ranking">
                <div class="ranking-number">{{ index + 1 }}</div>
                <div class="product-info">
                  <h4>{{ producto.nombre }}</h4>
                  <p>{{ producto.categoria }}</p>
                  <p class="sales-count">{{ producto.vendidos }} unidades vendidas</p>
                </div>
                <div class="product-revenue">
                  <span class="revenue">${{ producto.ingresos.toLocaleString() }}</span>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: `${(producto.vendidos / 50) * 100}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Métodos de pago */
        <ion-card class="payment-methods-card">
          <ion-card-header>
            <ion-card-title>Métodos de Pago Utilizados</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div class="payment-stats">
              <div v-for="metodo in metodosPago" :key="metodo.tipo" class="payment-item">
                <ion-icon :icon="metodo.icono" :color="metodo.color"></ion-icon>
                <div class="payment-info">
                  <h4>{{ metodo.tipo }}</h4>
                  <p>{{ metodo.porcentaje }}% de las ventas</p>
                  <p>${{ metodo.monto.toLocaleString() }}</p>
                </div>
                <div class="payment-circle" :style="{ background: `conic-gradient(var(--ion-color-${metodo.color}) ${metodo.porcentaje * 3.6}deg, var(--ion-color-light) 0deg)` }">
                  <span>{{ metodo.porcentaje }}%</span>
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
  basketOutline,
  trendingUpOutline,
  peopleOutline,
  receiptOutline,
  addOutline,
  personAddOutline,
  barChartOutline,
  cardOutline,
  cashOutline,
  phonePortraitOutline
} from 'ionicons/icons';

interface Venta {
  id: number;
  numero: string;
  cliente: string;
  productos: number;
  total: number;
  fecha: string;
  hora: string;
  metodo: string;
}

interface ProductoTop {
  id: number;
  nombre: string;
  categoria: string;
  vendidos: number;
  ingresos: number;
}

interface MetodoPago {
  tipo: string;
  porcentaje: number;
  monto: number;
  icono: string;
  color: string;
}

const stats = ref({
  ventasHoy: 245000,
  clientesActivos: 156,
  ventasMes: 89
});

const ventasPorSemana = ref([
  { semana: 1, monto: 320000 },
  { semana: 2, monto: 450000 },
  { semana: 3, monto: 380000 },
  { semana: 4, monto: 420000 }
]);

const ventasRecientes = ref<Venta[]>([
  {
    id: 1,
    numero: '001',
    cliente: 'María González',
    productos: 3,
    total: 85000,
    fecha: '2025-09-27',
    hora: '14:30',
    metodo: 'Tarjeta'
  },
  {
    id: 2,
    numero: '002',
    cliente: 'Carlos Rodríguez',
    productos: 2,
    total: 125000,
    fecha: '2025-09-27',
    hora: '13:15',
    metodo: 'Efectivo'
  },
  {
    id: 3,
    numero: '003',
    cliente: 'Ana Martínez',
    productos: 1,
    total: 35000,
    fecha: '2025-09-27',
    hora: '11:45',
    metodo: 'Transferencia'
  }
]);

const topProductos = ref<ProductoTop[]>([
  {
    id: 1,
    nombre: 'Cien Años de Soledad',
    categoria: 'Literatura',
    vendidos: 45,
    ingresos: 675000
  },
  {
    id: 2,
    nombre: 'Diccionario RAE',
    categoria: 'Referencia',
    vendidos: 38,
    ingresos: 456000
  },
  {
    id: 3,
    nombre: 'Atlas Mundial',
    categoria: 'Geografía',
    vendidos: 32,
    ingresos: 384000
  },
  {
    id: 4,
    nombre: 'Manual de JavaScript',
    categoria: 'Tecnología',
    vendidos: 28,
    ingresos: 420000
  }
]);

const metodosPago = ref<MetodoPago[]>([
  {
    tipo: 'Tarjeta de Crédito',
    porcentaje: 45,
    monto: 1125000,
    icono: cardOutline,
    color: 'primary'
  },
  {
    tipo: 'Efectivo',
    porcentaje: 35,
    monto: 875000,
    icono: cashOutline,
    color: 'success'
  },
  {
    tipo: 'Transferencia',
    porcentaje: 20,
    monto: 500000,
    icono: phonePortraitOutline,
    color: 'warning'
  }
]);

const nuevaVenta = () => {
  console.log('Nueva venta');
};

const gestionarClientes = () => {
  console.log('Gestionar clientes');
};

const reportesVentas = () => {
  console.log('Reportes de ventas');
};
</script>

<style scoped>
.sell-container {
  padding: 16px;
}

.module-card {
  margin-bottom: 16px;
}

.sell-stats {
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

.sales-chart-card,
.recent-sales-card,
.top-products-card,
.payment-methods-card {
  margin-top: 16px;
}

.chart-container {
  height: 200px;
  display: flex;
  align-items: end;
  padding: 20px 0;
}

.chart-bars {
  display: flex;
  width: 100%;
  align-items: end;
  gap: 20px;
  height: 150px;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bar {
  width: 100%;
  background: linear-gradient(to top, var(--ion-color-primary), var(--ion-color-primary-tint));
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  transition: all 0.3s ease;
}

.bar-label {
  font-weight: 600;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.bar-value {
  font-size: 0.8em;
  color: var(--ion-color-dark);
  font-weight: 500;
}

.sale-amount {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.top-products-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-ranking {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: var(--ion-color-light);
  border-radius: 8px;
}

.ranking-number {
  width: 30px;
  height: 30px;
  background: var(--ion-color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1em;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0 0 4px 0;
  font-weight: 600;
}

.product-info p {
  margin: 2px 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.sales-count {
  color: var(--ion-color-primary) !important;
  font-weight: 500 !important;
}

.product-revenue {
  text-align: right;
  min-width: 120px;
}

.revenue {
  font-weight: bold;
  color: var(--ion-color-success);
  font-size: 1.1em;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--ion-color-light-shade);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--ion-color-success);
  transition: width 0.3s ease;
}

.payment-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 8px;
}

.payment-info {
  flex: 1;
}

.payment-info h4 {
  margin: 0 0 4px 0;
  font-weight: 600;
}

.payment-info p {
  margin: 2px 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.payment-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--ion-color-dark);
  position: relative;
}

.payment-circle::before {
  content: '';
  position: absolute;
  inset: 4px;
  background: white;
  border-radius: 50%;
  z-index: -1;
}

ion-chip {
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .sell-stats {
    grid-template-columns: 1fr;
  }
  
  .chart-bars {
    gap: 10px;
  }
  
  .product-ranking {
    flex-direction: column;
    text-align: center;
  }
  
  .payment-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>