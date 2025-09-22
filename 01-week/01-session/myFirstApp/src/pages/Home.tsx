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
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonChip,
  IonLabel,
  IonText,
  IonAvatar,
  IonItem,
  IonList,
  IonBadge
} from '@ionic/react';
import { 
  pawOutline, 
  medkitOutline, 
  cartOutline, 
  heartOutline,
  callOutline,
  locationOutline,
  timeOutline,
  starOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>VetShop - Productos Veterinarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">VetShop</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* Hero Section */}
        <IonCard color="light">
          <IonCardHeader className="ion-text-center">
            <IonIcon icon={pawOutline} size="large" color="primary"></IonIcon>
            <IonCardTitle color="primary">
              <h1>VetShop Pro</h1>
            </IonCardTitle>
            <IonText color="medium">
              <p>Software integral para la venta de productos veterinarios</p>
            </IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p className="ion-text-center">
                Gestiona tu veterinaria de manera eficiente con nuestro sistema especializado 
                en productos para el cuidado animal. Desde medicamentos hasta accesorios.
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* Features Grid */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonItem>
                  <IonIcon icon={medkitOutline} slot="start" color="success"></IonIcon>
                  <IonLabel>
                    <h2>Medicamentos</h2>
                    <p>Control de inventario especializado</p>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  Gestión completa de medicamentos veterinarios con control de fechas 
                  de vencimiento, dosificaciones y prescripciones.
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonItem>
                  <IonIcon icon={cartOutline} slot="start" color="warning"></IonIcon>
                  <IonLabel>
                    <h2>Ventas</h2>
                    <p>Sistema de facturación integrado</p>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  Procesa ventas rápidamente con códigos de barras, descuentos 
                  especiales y diferentes métodos de pago.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonItem>
                  <IonIcon icon={heartOutline} slot="start" color="danger"></IonIcon>
                  <IonLabel>
                    <h2>Cuidado Animal</h2>
                    <p>Productos especializados</p>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  Amplio catálogo de productos para el cuidado, alimentación 
                  y bienestar de mascotas de todas las especies.
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonItem>
                  <IonIcon icon={shieldCheckmarkOutline} slot="start" color="tertiary"></IonIcon>
                  <IonLabel>
                    <h2>Seguridad</h2>
                    <p>Datos protegidos</p>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  Sistema seguro con respaldos automáticos y cumplimiento 
                  de normativas veterinarias colombianas.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Statistics */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Estadísticas del Sistema</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonChip color="primary">
                    <IonLabel>+500 Productos</IonLabel>
                  </IonChip>
                </IonCol>
                <IonCol>
                  <IonChip color="success">
                    <IonLabel>24/7 Soporte</IonLabel>
                  </IonChip>
                </IonCol>
                <IonCol>
                  <IonChip color="warning">
                    <IonLabel>99% Uptime</IonLabel>
                  </IonChip>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Contact Information */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Información de Contacto</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonIcon icon={callOutline} slot="start" color="primary"></IonIcon>
              <IonLabel>
                <h3>Teléfono</h3>
                <p>+57 318 123 4567</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={locationOutline} slot="start" color="primary"></IonIcon>
              <IonLabel>
                <h3>Ubicación</h3>
                <p>Neiva, Huila - Colombia</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={timeOutline} slot="start" color="primary"></IonIcon>
              <IonLabel>
                <h3>Horario</h3>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              </IonLabel>
              <IonBadge slot="end" color="success">Abierto</IonBadge>
            </IonItem>
          </IonList>
        </IonCard>

        {/* Action Buttons */}
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonButton expand="block" fill="solid" color="primary">
                <IonIcon icon={cartOutline} slot="start"></IonIcon>
                Ver Catálogo
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonButton expand="block" fill="outline" color="secondary">
                <IonIcon icon={callOutline} slot="start"></IonIcon>
                Contactar Soporte
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
