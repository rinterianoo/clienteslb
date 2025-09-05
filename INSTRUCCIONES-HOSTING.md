# 🚀 Instrucciones para subir "La Berraquera" a Bana Hosting

## 📁 Archivos a subir
Todos los archivos están en la carpeta `dist/`:
- `index.html` (archivo principal)
- `vite.svg` (ícono)
- `.htaccess` (configuración del servidor)
- Carpeta `assets/` (contiene CSS, JS e imágenes optimizadas)

## 🌐 Pasos para subir a Bana Hosting

### 1. Acceder al cPanel
- Ve a tu panel de control de Bana Hosting
- Busca "Administrador de archivos" o "File Manager"

### 2. Navegar a la carpeta web
- Ve a la carpeta `public_html` (es donde van los archivos web)
- Si tienes un subdominio, ve a la carpeta correspondiente

### 3. Subir archivos
- **OPCIÓN A - Arrastar y soltar:**
  - Selecciona TODOS los archivos de la carpeta `dist/`
  - Arrástralos al File Manager de cPanel
  
- **OPCIÓN B - Comprimir y subir:**
  - Crea un ZIP con todo el contenido de `dist/`
  - Súbelo a cPanel
  - Extrae el ZIP en `public_html`

### 4. Verificar estructura
Tu `public_html` debe quedar así:
```
public_html/
├── index.html
├── vite.svg
├── .htaccess
└── assets/
    ├── fondo-DVNNLZcZ.jpg
    ├── index-CxZ66iZV.css
    ├── index-hO8mvLeP.js
    └── logolb-DfHIwM5k.jpg
```

## ⚙️ Configuración adicional

### Si tu dominio es diferente al de desarrollo:
1. No necesitas cambiar nada en el código
2. La aplicación funciona con rutas relativas

### Para subdominios:
Si quieres usar un subdominio como `laberraquera.tudominio.com`:
1. Crea el subdominio en cPanel
2. Sube los archivos a la carpeta del subdominio

## 🧪 Verificar funcionamiento

1. **Página principal:** `https://tudominio.com`
2. **Página de pedidos:** `https://tudominio.com/pedidos`
3. **Funcionalidad del carrito**
4. **Modal de checkout**

## 🔧 Características optimizadas

✅ **Compresión GZIP** habilitada para carga rápida
✅ **Cache de archivos estáticos** configurado
✅ **Headers de seguridad** implementados
✅ **Rutas de React Router** funcionando correctamente
✅ **Imágenes optimizadas** (44KB logo, 7.6MB fondo comprimido)
✅ **CSS/JS minificado** para mejor rendimiento

## 📊 Tamaños de archivos optimizados:
- **HTML:** 0.46 KB (comprimido: 0.29 KB)
- **CSS:** 47.06 KB (comprimido: 7.77 KB)
- **JavaScript:** 385.92 KB (comprimido: 120.11 KB)
- **Total aproximado:** ~8.1 MB

## 🆘 Solución de problemas

**Si las rutas no funcionan:**
- Verifica que el archivo `.htaccess` esté en `public_html`
- Contacta soporte de Bana para habilitar mod_rewrite

**Si las imágenes no cargan:**
- Verifica que la carpeta `assets` se subió completamente
- Revisa permisos (644 para archivos, 755 para carpetas)

## 🎉 ¡Tu restaurante "La Berraquera" estará online!

Con el plan Corporate Deluxe SSD Ultra tienes:
- ✅ Ancho de banda suficiente
- ✅ SSD para carga ultrarrápida
- ✅ Soporte para aplicaciones React
- ✅ SSL automático disponible
