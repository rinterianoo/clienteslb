// Helper para obtener la tienda seleccionada desde localStorage
export function getTiendaSeleccionada() {
  try {
    const saved = localStorage.getItem('tiendaSeleccionada');
    console.log('🔧 tiendaHelpers - Valor en localStorage:', saved);
    
    if (saved) {
      const tienda = JSON.parse(saved);
      console.log('🔧 tiendaHelpers - Tienda parseada:', tienda);
      console.log('🔧 tiendaHelpers - restaurant_id encontrado:', tienda.id_restaurante);
      
      // Validar que tenga la estructura correcta
      if (!tienda.id_restaurante) {
        console.error('🔧 tiendaHelpers - ADVERTENCIA: Tienda sin restaurant_id válido');
        return null;
      }
      
      return tienda;
    }
    
    console.log('🔧 tiendaHelpers - No hay tienda en localStorage, devolviendo null');
    return null;
  } catch (error) {
    console.error('🔧 tiendaHelpers - Error al obtener tienda del localStorage:', error);
    return null;
  }
}
