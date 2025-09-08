import { calcularRecargoEnvio } from '../services/pedidosService';
// Hook para calcular información de envío
export function useShippingCalculation(subtotal) {
  const recargo = calcularRecargoEnvio(subtotal);
  const esEnvioGratis = subtotal > 125.00;
  const total = subtotal + recargo;
  // Calcular cuánto falta para envío gratis
  const faltaParaEnvioGratis = esEnvioGratis ? 0 : Math.max(0, 125.01 - subtotal);
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    recargo: parseFloat(recargo.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    esEnvioGratis,
    faltaParaEnvioGratis: parseFloat(faltaParaEnvioGratis.toFixed(2)),
    // Mensaje descriptivo del recargo
    mensajeRecargo: recargo === 0 
      ? "¡Envío gratis!" 
      : `Recargo por envío: Q${recargo.toFixed(2)}`
  };
}
// Función para obtener el mensaje promocional de envío
export function getMensajePromoEnvio(subtotal) {
  const { esEnvioGratis, faltaParaEnvioGratis } = useShippingCalculation(subtotal);
  if (esEnvioGratis) {
    return {
      tipo: 'success',
      mensaje: '🎉 ¡Tienes envío gratis!',
      icono: '✅'
    };
  } else if (faltaParaEnvioGratis <= 25) {
    return {
      tipo: 'warning',
      mensaje: `¡Solo te faltan Q${faltaParaEnvioGratis.toFixed(2)} para envío gratis!`,
      icono: '🚚'
    };
  } else {
    return {
      tipo: 'info',
      mensaje: `Envío gratis en compras mayores a Q125`,
      icono: 'ℹ️'
    };
  }
}
