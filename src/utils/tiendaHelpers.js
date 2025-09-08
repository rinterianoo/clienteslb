// Helper para obtener la tienda seleccionada desde localStorage
export function getTiendaSeleccionada() {
  try {
    const saved = localStorage.getItem('tiendaSeleccionada');
    if (saved) {
      const tienda = JSON.parse(saved);
      // Validar que tenga la estructura correcta
      if (!tienda.id_restaurante) {
        return null;
      }
      return tienda;
    }
    return null;
  } catch (error) {
    return null;
  }
}
