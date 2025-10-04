<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Biblioteca - Productos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Productos</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Sección de Módulos Principales -->
      <div class="modules-container">
        <h2 class="section-title">Módulos del Sistema</h2>
        
        <div class="modules-grid">
          <ion-card v-for="modulo in modulos" :key="modulo.id" class="module-card" button @click="navegarModulo(modulo.ruta)">
            <ion-card-header>
              <div class="module-header">
                <ion-icon :icon="modulo.icono" :color="modulo.color" size="large"></ion-icon>
                <ion-card-title>{{ modulo.nombre }}</ion-card-title>
              </div>
              <ion-card-subtitle>{{ modulo.descripcion }}</ion-card-subtitle>
            </ion-card-header>
            
            <ion-card-content>
              <div class="module-stats">
                <div class="stat-item" v-for="stat in modulo.estadisticas" :key="stat.label">
                  <span class="stat-value">{{ stat.valor }}</span>
                  <span class="stat-label">{{ stat.label }}</span>
                </div>
              </div>
              
              <div class="module-actions">
                <ion-button fill="clear" size="small">
                  <ion-icon :icon="arrowForward" slot="end"></ion-icon>
                  Acceder
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <!-- Sección de Productos -->
      <div class="products-section">
        <h2 class="section-title">Productos Destacados</h2>
        
        <div class="products-container">
          <ion-card v-for="producto in productos" :key="producto.id" class="product-card">
            <ion-card-header>
              <ion-card-title>{{ producto.nombre }}</ion-card-title>
            </ion-card-header>
            
            <ion-card-content>
              <div class="product-info">
                <div class="price-section">
                  <ion-icon :icon="pricetag" color="primary"></ion-icon>
                  <span class="price-label">Precio Unitario:</span>
                  <span class="price-value">${{ producto.precioUnitario.toLocaleString() }}</span>
                </div>
                
                <div class="stock-section">
                  <ion-icon :icon="cube" color="secondary"></ion-icon>
                  <span class="stock-label">Stock:</span>
                  <span class="stock-value" :class="getStockClass(producto.stock)">
                    {{ producto.stock }} unidades
                  </span>
                </div>
              </div>
              
              <div class="card-actions">
                <ion-button fill="outline" size="small" @click="verDetalle(producto)">
                  <ion-icon :icon="eye" slot="start"></ion-icon>
                  Ver Detalle
                </ion-button>
                <ion-button fill="solid" size="small" @click="agregarCarrito(producto)" :disabled="producto.stock === 0">
                  <ion-icon :icon="cart" slot="start"></ion-icon>
                  {{ producto.stock === 0 ? 'Sin Stock' : 'Agregar' }}
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { pricetag, cube, eye, cart, arrowForward, receiptOutline, shieldCheckmarkOutline, businessOutline, basketOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

// Interface para el tipo de producto
interface Producto {
  id: number;
  nombre: string;
  precioUnitario: number;
  stock: number;
}

// Interface para los módulos del sistema
interface Modulo {
  id: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  icono: string;
  color: string;
  estadisticas: {
    label: string;
    valor: string | number;
  }[];
}

// Composable del router
const router = useRouter();

// Datos reactivos de productos
const productos = ref<Producto[]>([
  {
    id: 1,
    nombre: 'Libro de JavaScript',
    precioUnitario: 45000,
    stock: 15
  },
  {
    id: 2,
    nombre: 'Manual de Vue.js',
    precioUnitario: 38000,
    stock: 8
  },
  {
    id: 3,
    nombre: 'Guía de Ionic',
    precioUnitario: 42000,
    stock: 0
  },
  {
    id: 4,
    nombre: 'TypeScript Avanzado',
    precioUnitario: 55000,
    stock: 3
  },
  {
    id: 5,
    nombre: 'Desarrollo Mobile',
    precioUnitario: 60000,
    stock: 12
  }
]);

// Datos reactivos de módulos del sistema
const modulos = ref<Modulo[]>([
  {
    id: 1,
    nombre: 'Facturación',
    descripcion: 'Gestión de facturas y cobros',
    ruta: '/billing',
    icono: receiptOutline,
    color: 'primary',
    estadisticas: [
      { label: 'Facturas Hoy', valor: 12 },
      { label: 'Total Mes', valor: '$2.4M' }
    ]
  },
  {
    id: 2,
    nombre: 'Seguridad',
    descripcion: 'Control de acceso y usuarios',
    ruta: '/security',
    icono: shieldCheckmarkOutline,
    color: 'success',
    estadisticas: [
      { label: 'Usuarios Activos', valor: 45 },
      { label: 'Sesiones', valor: 23 }
    ]
  },
  {
    id: 3,
    nombre: 'Supply Chain',
    descripcion: 'Cadena de suministro',
    ruta: '/supply-chain',
    icono: businessOutline,
    color: 'warning',
    estadisticas: [
      { label: 'Proveedores', valor: 25 },
      { label: 'Pedidos', valor: 8 }
    ]
  },
  {
    id: 4,
    nombre: 'Ventas',
    descripcion: 'Gestión de ventas y clientes',
    ruta: '/sell',
    icono: basketOutline,
    color: 'tertiary',
    estadisticas: [
      { label: 'Ventas Hoy', valor: '$245K' },
      { label: 'Clientes', valor: 156 }
    ]
  }
]);

// Función para navegar a un módulo
const navegarModulo = (ruta: string): void => {
  router.push(ruta);
};

// Función para determinar la clase CSS según el stock
const getStockClass = (stock: number): string => {
  if (stock === 0) return 'no-stock';
  if (stock <= 5) return 'low-stock';
  return 'normal-stock';
};

// Función para ver detalle del producto
const verDetalle = (producto: Producto): void => {
  console.log('Ver detalle de:', producto.nombre);
  // Aquí puedes implementar la navegación a una página de detalle
};

// Función para agregar al carrito
const agregarCarrito = (producto: Producto): void => {
  if (producto.stock > 0) {
    console.log('Agregando al carrito:', producto.nombre);
    // Aquí puedes implementar la lógica para agregar al carrito
    // Por ejemplo, disminuir el stock o enviar a un store
  }
};
</script>

<style scoped>
/* Sección de título */
.section-title {
  color: var(--ion-color-dark);
  font-size: 1.5em;
  font-weight: 600;
  margin: 20px 16px 16px 16px;
  border-bottom: 2px solid var(--ion-color-primary);
  padding-bottom: 8px;
}

/* Contenedor de módulos */
.modules-container {
  margin-bottom: 32px;
}

.modules-grid {
  padding: 0 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.module-card {
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: linear-gradient(135deg, var(--ion-color-light) 0%, white 100%);
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.module-header ion-icon {
  background: var(--ion-color-light);
  padding: 12px;
  border-radius: 12px;
}

.module-stats {
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
  padding: 16px 0;
  background: var(--ion-color-light);
  border-radius: 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.4em;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.stat-label {
  display: block;
  font-size: 0.85em;
  color: var(--ion-color-medium);
  margin-top: 4px;
}

.module-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

/* Sección de productos */
.products-section {
  background: var(--ion-color-light);
  padding: 16px 0;
  margin-top: 16px;
}

.products-container {
  padding: 0 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.product-card {
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.product-info {
  margin-bottom: 16px;
}

.price-section,
.stock-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.price-label,
.stock-label {
  font-weight: 500;
  color: var(--ion-color-medium);
}

.price-value {
  font-weight: bold;
  font-size: 1.1em;
  color: var(--ion-color-primary);
}

.stock-value {
  font-weight: 600;
}

.normal-stock {
  color: var(--ion-color-success);
}

.low-stock {
  color: var(--ion-color-warning);
}

.no-stock {
  color: var(--ion-color-danger);
}

.card-actions {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-top: 16px;
}

.card-actions ion-button {
  flex: 1;
}

ion-card-title {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--ion-color-dark);
}

ion-icon {
  margin-right: 4px;
}

/* Responsive design para móviles */
@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
    padding: 0 8px;
  }
  
  .products-container {
    grid-template-columns: 1fr;
    padding: 0 8px;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .card-actions ion-button {
    width: 100%;
  }
  
  .module-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .section-title {
    margin: 16px 8px 12px 8px;
    font-size: 1.3em;
  }
}
</style>
