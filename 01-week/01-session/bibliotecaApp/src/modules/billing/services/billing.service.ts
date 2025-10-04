import { ref, computed } from 'vue';

// Interfaces para el módulo de facturación
export interface Factura {
  id: number;
  numero: string;
  cliente: string;
  fechaCreacion: string;
  fechaVencimiento: string;
  total: number;
  estado: 'borrador' | 'enviada' | 'pagada' | 'vencida' | 'cancelada';
  items: FacturaItem[];
}

export interface FacturaItem {
  id: number;
  producto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

// Composable para la gestión de facturación
export function useBillingService() {
  // Estado reactivo
  const facturas = ref<Factura[]>([]);
  const clientes = ref<Cliente[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Estadísticas computadas
  const estadisticas = computed(() => ({
    totalFacturas: facturas.value.length,
    facturasPagadas: facturas.value.filter(f => f.estado === 'pagada').length,
    facturasPendientes: facturas.value.filter(f => f.estado === 'enviada').length,
    facturasVencidas: facturas.value.filter(f => f.estado === 'vencida').length,
    totalVentas: facturas.value
      .filter(f => f.estado === 'pagada')
      .reduce((total, factura) => total + factura.total, 0)
  }));

  // Funciones del servicio
  const crearFactura = async (facturaData: Partial<Factura>): Promise<Factura> => {
    loading.value = true;
    error.value = null;
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevaFactura: Factura = {
        id: Date.now(),
        numero: `FAC-${String(facturas.value.length + 1).padStart(3, '0')}`,
        cliente: facturaData.cliente || '',
        fechaCreacion: new Date().toISOString().split('T')[0],
        fechaVencimiento: facturaData.fechaVencimiento || '',
        total: facturaData.total || 0,
        estado: 'borrador',
        items: facturaData.items || []
      };
      
      facturas.value.push(nuevaFactura);
      return nuevaFactura;
    } catch (err) {
      error.value = 'Error al crear la factura';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const obtenerFacturas = async (): Promise<Factura[]> => {
    loading.value = true;
    error.value = null;
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Datos de ejemplo
      if (facturas.value.length === 0) {
        facturas.value = [
          {
            id: 1,
            numero: 'FAC-001',
            cliente: 'Universidad Nacional',
            fechaCreacion: '2025-09-25',
            fechaVencimiento: '2025-10-25',
            total: 150000,
            estado: 'pagada',
            items: []
          },
          {
            id: 2,
            numero: 'FAC-002',
            cliente: 'Colegio San José',
            fechaCreacion: '2025-09-26',
            fechaVencimiento: '2025-10-26',
            total: 85000,
            estado: 'enviada',
            items: []
          }
        ];
      }
      
      return facturas.value;
    } catch (err) {
      error.value = 'Error al obtener las facturas';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const actualizarEstadoFactura = async (id: number, nuevoEstado: Factura['estado']): Promise<void> => {
    loading.value = true;
    error.value = null;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = facturas.value.findIndex(f => f.id === id);
      if (index !== -1) {
        facturas.value[index].estado = nuevoEstado;
      }
    } catch (err) {
      error.value = 'Error al actualizar el estado de la factura';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const obtenerClientes = async (): Promise<Cliente[]> => {
    loading.value = true;
    error.value = null;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (clientes.value.length === 0) {
        clientes.value = [
          {
            id: 1,
            nombre: 'Universidad Nacional',
            email: 'compras@unal.edu.co',
            telefono: '3001234567',
            direccion: 'Carrera 30 # 45-03',
            tipoDocumento: 'NIT',
            numeroDocumento: '899999063-1'
          },
          {
            id: 2,
            nombre: 'Colegio San José',
            email: 'admin@sanjose.edu.co',
            telefono: '3009876543',
            direccion: 'Calle 50 # 20-15',
            tipoDocumento: 'NIT',
            numeroDocumento: '800123456-7'
          }
        ];
      }
      
      return clientes.value;
    } catch (err) {
      error.value = 'Error al obtener los clientes';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // Estado
    facturas,
    clientes,
    loading,
    error,
    
    // Computed
    estadisticas,
    
    // Métodos
    crearFactura,
    obtenerFacturas,
    actualizarEstadoFactura,
    obtenerClientes
  };
}