<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Seguridad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Seguridad</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="security-container">
        <ion-card class="module-card">
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="shieldCheckmarkOutline" color="primary"></ion-icon>
              Control de Acceso y Seguridad
            </ion-card-title>
            <ion-card-subtitle>Gestiona usuarios y permisos del sistema</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <div class="security-stats">
              <div class="stat-item">
                <ion-icon :icon="peopleOutline" color="success"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.usuariosActivos }}</h3>
                  <p>Usuarios Activos</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="keyOutline" color="warning"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.rolesCreados }}</h3>
                  <p>Roles del Sistema</p>
                </div>
              </div>
              
              <div class="stat-item">
                <ion-icon :icon="alertCircleOutline" color="danger"></ion-icon>
                <div class="stat-info">
                  <h3>{{ stats.intentosFallidos }}</h3>
                  <p>Intentos Fallidos Hoy</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <ion-button expand="block" fill="solid" @click="gestionarUsuarios">
                <ion-icon :icon="personAddOutline" slot="start"></ion-icon>
                Gestionar Usuarios
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="configurarRoles">
                <ion-icon :icon="settingsOutline" slot="start"></ion-icon>
                Configurar Roles y Permisos
              </ion-button>
              
              <ion-button expand="block" fill="outline" @click="auditoriaSistema">
                <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
                Auditoría del Sistema
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Lista de usuarios recientes -->
        <ion-card class="recent-users-card">
          <ion-card-header>
            <ion-card-title>Actividad Reciente</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <ion-list>
              <ion-item v-for="actividad in actividadReciente" :key="actividad.id">
                <ion-icon :icon="actividad.icono" slot="start" :color="actividad.tipo === 'login' ? 'success' : actividad.tipo === 'logout' ? 'warning' : 'danger'"></ion-icon>
                <ion-label>
                  <h3>{{ actividad.usuario }}</h3>
                  <p>{{ actividad.accion }}</p>
                  <p>{{ actividad.fecha }} - {{ actividad.hora }}</p>
                </ion-label>
                <ion-chip :color="actividad.tipo === 'login' ? 'success' : actividad.tipo === 'logout' ? 'warning' : 'danger'" slot="end">
                  {{ actividad.tipo }}
                </ion-chip>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Panel de configuración de seguridad -->
        <ion-card class="security-config-card">
          <ion-card-header>
            <ion-card-title>Configuración de Seguridad</ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div class="config-options">
              <div class="config-item">
                <ion-label>
                  <h3>Autenticación de dos factores</h3>
                  <p>Habilita 2FA para mayor seguridad</p>
                </ion-label>
                <ion-toggle :checked="configuracion.twoFactorAuth" @ionChange="toggleTwoFactor"></ion-toggle>
              </div>
              
              <div class="config-item">
                <ion-label>
                  <h3>Bloqueo por intentos fallidos</h3>
                  <p>Bloquear cuenta después de 3 intentos</p>
                </ion-label>
                <ion-toggle :checked="configuracion.autoBlock" @ionChange="toggleAutoBlock"></ion-toggle>
              </div>
              
              <div class="config-item">
                <ion-label>
                  <h3>Sesión segura</h3>
                  <p>Cerrar sesión automáticamente por inactividad</p>
                </ion-label>
                <ion-toggle :checked="configuracion.secureSession" @ionChange="toggleSecureSession"></ion-toggle>
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
  IonChip,
  IonToggle
} from '@ionic/vue';
import {
  shieldCheckmarkOutline,
  peopleOutline,
  keyOutline,
  alertCircleOutline,
  personAddOutline,
  settingsOutline,
  documentTextOutline,
  logInOutline,
  logOutOutline,
  warningOutline
} from 'ionicons/icons';

interface ActividadUsuario {
  id: number;
  usuario: string;
  accion: string;
  fecha: string;
  hora: string;
  tipo: 'login' | 'logout' | 'error';
  icono: string;
}

const stats = ref({
  usuariosActivos: 45,
  rolesCreados: 8,
  intentosFallidos: 12
});

const configuracion = ref({
  twoFactorAuth: true,
  autoBlock: true,
  secureSession: false
});

const actividadReciente = ref<ActividadUsuario[]>([
  {
    id: 1,
    usuario: 'admin@biblioteca.com',
    accion: 'Inicio de sesión exitoso',
    fecha: '2025-09-27',
    hora: '09:30',
    tipo: 'login',
    icono: logInOutline
  },
  {
    id: 2,
    usuario: 'usuario@biblioteca.com',
    accion: 'Intento de acceso fallido',
    fecha: '2025-09-27',
    hora: '08:45',
    tipo: 'error',
    icono: warningOutline
  },
  {
    id: 3,
    usuario: 'bibliotecario@biblioteca.com',
    accion: 'Cierre de sesión',
    fecha: '2025-09-26',
    hora: '18:00',
    tipo: 'logout',
    icono: logOutOutline
  }
]);

const gestionarUsuarios = () => {
  console.log('Gestionar usuarios');
};

const configurarRoles = () => {
  console.log('Configurar roles y permisos');
};

const auditoriaSistema = () => {
  console.log('Ver auditoría del sistema');
};

const toggleTwoFactor = (event: any) => {
  configuracion.value.twoFactorAuth = event.detail.checked;
  console.log('2FA:', event.detail.checked);
};

const toggleAutoBlock = (event: any) => {
  configuracion.value.autoBlock = event.detail.checked;
  console.log('Auto Block:', event.detail.checked);
};

const toggleSecureSession = (event: any) => {
  configuracion.value.secureSession = event.detail.checked;
  console.log('Secure Session:', event.detail.checked);
};
</script>

<style scoped>
.security-container {
  padding: 16px;
}

.module-card {
  margin-bottom: 16px;
}

.security-stats {
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

.recent-users-card,
.security-config-card {
  margin-top: 16px;
}

.config-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--ion-color-light);
}

.config-item:last-child {
  border-bottom: none;
}

.config-item ion-label h3 {
  margin: 0 0 4px 0;
  font-size: 1em;
  font-weight: 600;
}

.config-item ion-label p {
  margin: 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

ion-chip {
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .security-stats {
    grid-template-columns: 1fr;
  }
}
</style>