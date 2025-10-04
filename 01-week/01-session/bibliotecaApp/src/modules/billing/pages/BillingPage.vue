<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Facturación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Facturación</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="billing-container">
        <ion-card class="module-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="receiptOutline" color="primary"></ion-icon>
              Gestión de Facturación
            </ion-card-title>
            <ion-card-subtitle>Administra facturas y cobros</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <div class="billing-stats">
              <div class="stat-item">
                <ion-icon :icon="documentTextOutline" color="success"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.totalFacturas }}</h3>
                  <p>Facturas Generadas</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="cashOutline" color="warning"></ion-icon>
                <div class="stat-info">
                  <h3>${{ stats.totalVentas.toLocaleString() }}</h3>
                  <p>Total Ventas</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="timeOutline" color="danger"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.facturasPendientes }}</h3>
                  <p>Pendientes de Pago</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <ion-button expand="block" fill="solid" @click="crearFactura">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                Nueva Factura
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="verFacturas">
                <ion-icon :icon="listOutline" slot="start"></ion-icon>
                Ver Todas las Facturas
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="reportes">
                <ion-icon :icon="barChartOutline" slot="start"></ion-icon>
                Reportes de Facturación
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Lista de facturas recientes -->
        <ion-card class="recent-bills-card">
          <ion-card-header>
            <ion-card-title>Facturas Recientes</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <ion-list>
              <ion-item v-for="factura in facturasRecientes" :key="factura.id">
                <ion-icon :icon="receiptOutline" slot="start" :color="factura.estado === 'pagada' ? 'success' : 'warning'"></ion-icon>
                <ion-label>
                  <h3>{{ factura.numero }}</h3>
                  <p>{{ factura.cliente }} - ${{ factura.total.toLocaleString() }}</p>
                  <p>{{ factura.fecha }}</p>
                </ion-label>
                <ion-chip :color="factura.estado === 'pagada' ? 'success' : 'warning'" slot="end">
                  {{ factura.estado }}
                </ion-chip>
              </ion-item>
            </ion-list>
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
  receiptOutline,
  documentTextOutline,
  cashOutline,
  timeOutline,
  addOutline,
  listOutline,
  barChartOutline
} from 'ionicons/icons';

interface Factura {
  id: number;
  numero: string;
  cliente: string;
  total: number;
  fecha: string;
  estado: 'pagada' | 'pendiente';
}

const stats = ref({
  totalFacturas: 156,
  totalVentas: 2450000,
  facturasPendientes: 23
});

const facturasRecientes = ref<Factura[]>([
  {
    id: 1,
    numero: 'FAC-001',
    cliente: 'Universidad Nacional',
    total: 150000,
    fecha: '2025-09-25',
    estado: 'pagada'
  },
  {
    id: 2,
    numero: 'FAC-002',
    cliente: 'Colegio San José',
    total: 85000,
    fecha: '2025-09-26',
    estado: 'pendiente'
  },
  {
    id: 3,
    numero: 'FAC-003',
    cliente: 'Instituto Técnico',
    total: 200000,
    fecha: '2025-09-27',
    estado: 'pagada'
  }
]);

const crearFactura = () => {
  console.log('Crear nueva factura');
};

const verFacturas = () => {
  console.log('Ver todas las facturas');
};

const reportes = () => {
  console.log('Ver reportes de facturación');
};
</script>

<style scoped>
.billing-container {
  padding: 16px;
}

.module-card {
  margin-bottom: 16px;
}

.billing-stats {
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

.recent-bills-card {
  margin-top: 16px;
}

ion-chip {
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .billing-stats {
    grid-template-columns: 1fr;
  }
}
</style>