# 🚀 Guía de Deployment - La Berraquera

## 📋 Configuración de Entornos

### 🔧 Desarrollo (Actual)
- URL: `http://localhost/Pronto-delivery/api`
- Entorno: `development`

### 🌐 Producción
- URL: `https://prontodelivery.lat/midelivery/api`
- Entorno: `production`

---

## ⚠️ PASOS CRÍTICOS ANTES DE SUBIR A PRODUCCIÓN

### 1. Cambiar Configuración de API

Ir al archivo: `src/config/api.js`

**Buscar esta línea:**
```javascript
const CURRENT_CONFIG = DEVELOPMENT_CONFIG;
```

**Cambiar por:**
```javascript
const CURRENT_CONFIG = PRODUCTION_CONFIG;
```

**O comentar la línea de desarrollo y descomentar la de producción:**
```javascript
// const CURRENT_CONFIG = DEVELOPMENT_CONFIG; // ← Comentar para producción
const CURRENT_CONFIG = PRODUCTION_CONFIG; // ← Descomentar para producción
```

### 2. Verificar URLs

Después del cambio, las URLs deberían ser:
- **GET productos**: `https://prontodelivery.lat/midelivery/api/get_productos.php?restaurant_id=X`
- **POST pedidos**: `https://prontodelivery.lat/midelivery/api/registrar_pedido.php`

### 3. Verificar Logs

En la consola del navegador deberías ver:
```
🌐 API Config - Entorno: production
🌐 API Config - Base URL: https://prontodelivery.lat/midelivery/api
```

---

## 🏪 Configuración de Restaurantes

### Mapeo Actual:
- **La Berraquera CAES**: `restaurant_id = 1`
- **La Berraquera Cayalá**: `restaurant_id = 3`

### Para cambiar IDs de restaurantes:
Editar en `src/context/TiendaContext.jsx` en el array `TIENDAS`:

```javascript
export const TIENDAS = [
  {
    id_restaurante: 1, // ← Cambiar aquí para CAES
    nombre: 'La Berraquera CAES',
    // ...
  },
  {
    id_restaurante: 3, // ← Cambiar aquí para Cayalá
    nombre: 'La Berraquera Cayalá',
    // ...
  },
];
```

---

## 🔍 Verificación Post-Deployment

### 1. Verificar Modal
- ✅ Modal aparece al cargar la página
- ✅ Se puede seleccionar tienda
- ✅ Botón de cambio de tienda funciona

### 2. Verificar Productos
- ✅ CAES carga productos del restaurant_id correcto
- ✅ Cayalá carga productos diferentes
- ✅ Logs muestran `[production]` en consola

### 3. Verificar Pedidos
- ✅ Los pedidos se envían con el `restaurant_id` correcto
- ✅ URL de pedidos apunta a producción

---

## 🚨 Lista de Verificación Pre-Deployment

- [ ] Cambiar `CURRENT_CONFIG` a `PRODUCTION_CONFIG`
- [ ] Verificar que logs muestran `[production]`
- [ ] Testear modal de selección de tienda
- [ ] Testear carga de productos por tienda
- [ ] Testear envío de pedidos
- [ ] Verificar URLs en Network tab del navegador

---

## 📞 URLs de Testing en Producción

**GET Productos CAES:**
```
https://prontodelivery.lat/midelivery/api/get_productos.php?restaurant_id=1
```

**GET Productos Cayalá:**
```
https://prontodelivery.lat/midelivery/api/get_productos.php?restaurant_id=3
```

**POST Pedidos:**
```
https://prontodelivery.lat/midelivery/api/registrar_pedido.php
```

---

## 🔄 Para volver a Desarrollo

Cambiar de vuelta a:
```javascript
const CURRENT_CONFIG = DEVELOPMENT_CONFIG;
```

Y verificar que los logs muestren `[development]`.
