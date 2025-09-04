
# 🍽️ La Berraquera - Sistema de Pedidos de Restaurante

Una aplicación web moderna para realizar pedidos en línea del restaurante La Berraquera, especializado en comida tradicional colombiana.

## 🚀 Características

### 🏠 **Página Principal**
- **Hero Section** con animaciones sutiles de partículas flotantes
- **Productos Destacados** con los primeros 4 platos del menú
- **Sección de Ubicaciones** con mapas de Google integrados
- **Sección de Eventos** para catering con enlace directo a WhatsApp
- **Productos Congelados** con acceso rápido al menú

### 🛒 **Sistema de Pedidos**
- **Menú Completo** con todos los productos de la API
- **Búsqueda** por nombre o descripción de platos
- **Filtros por categoría** de comida
- **Carrito de Compras** con persistencia en localStorage
- **Gestión de Cantidades** directamente desde el carrito
- **Cálculo Automático** de subtotales y total

### 🎨 **Diseño y UX**
- **Responsive Design** que funciona en móviles, tablets y desktop
- **Animaciones Suaves** con scroll-triggered effects
- **Tema Consistente** con colores naranjas corporativos
- **Navegación Flotante** moderna y minimalista
- **Efectos Hover** en botones y tarjetas

## 🛠️ Tecnologías Utilizadas

### **Frontend Framework**
- **React 19.1.0** - Biblioteca principal de JavaScript
- **Vite 7.0.4** - Build tool y servidor de desarrollo
- **React Router DOM 7.8.1** - Navegación entre páginas

### **Estilos y UI**
- **Tailwind CSS 3.4.17** - Framework de CSS utilitario
- **Heroicons React** - Iconografía moderna
- **Animaciones CSS personalizadas** - Efectos visuales

### **Estado y Datos**
- **Context API** - Gestión de estado global (Menu, Cart, Pedidos)
- **Axios 1.11.0** - Cliente HTTP para API calls
- **localStorage** - Persistencia del carrito

### **Desarrollo y Calidad**
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Git** - Control de versiones

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   └── images/           # Imágenes y logos
├── components/
│   ├── public/          # Componentes públicos
│   │   ├── Cart.jsx
│   │   ├── EventsSection.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── LocationsSection.jsx
│   │   ├── MenuProductCard.jsx
│   │   └── ProductCard.jsx
│   └── shared/          # Componentes compartidos
│       └── Navbar.jsx
├── context/             # Context providers
│   ├── CartContext.jsx
│   ├── MenuContext.jsx
│   └── PedidoContext.jsx
├── hooks/              # Custom hooks
│   └── useIntersectionObserver.js
├── pages/              # Páginas principales
│   └── public/
│       ├── HomePage.jsx
│       └── PedidosPage.jsx
├── services/           # Servicios de API
│   ├── menuService.js
│   └── pedidosService.js
└── routes/             # Configuración de rutas
    └── index.jsx
```

## 🔧 Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 16 o superior)
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/rinterianoo/clienteslb.git

# Navegar al directorio
cd clienteslb

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Scripts Disponibles**
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa del build
npm run lint     # Linting con ESLint
```

## 🌐 API Integration

La aplicación se conecta a la API de prontodelivery.lat para:
- **Obtener productos** del menú del restaurante
- **Gestionar pedidos** de los clientes
- **Cargar imágenes** de los productos

### **Endpoints Principales**
- `GET /api/productos/restaurante/1` - Lista de productos
- `POST /api/pedidos` - Crear nuevo pedido

## 📱 Funcionalidades Principales

### **🏪 Gestión de Menú**
- Carga dinámica de productos desde API
- Filtrado por categorías
- Búsqueda en tiempo real
- Imágenes optimizadas con fallbacks

### **🛒 Carrito de Compras**
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia entre sesiones
- Sidebar deslizante

### **📍 Ubicaciones**
- Mapas de Google embebidos
- Enlaces directos a Google Maps
- Información de contacto
- Botones de llamada directa

### **🎉 Eventos y Catering**
- Información de servicios
- Enlace directo a WhatsApp
- Formulario de cotización

## 🎨 Tema Visual

### **Paleta de Colores**
- **Primario:** Naranja (#F97316 - orange-500)
- **Secundario:** Naranja oscuro (#EA580C - orange-600)
- **Acentos:** Amarillo (#EAB308 - yellow-500)
- **Textos:** Grises (#374151, #6B7280, #9CA3AF)

### **Tipografía**
- **Font Family:** Inter, system fonts
- **Weights:** Normal (400), Bold (700), Black (900)
- **Hierarchy:** Títulos grandes, subtítulos, texto de cuerpo

## 🚀 Deployment

### **Build para Producción**
```bash
npm run build
```

### **Platforms Recomendadas**
- **Vercel** - Deployment automático desde GitHub
- **Netlify** - CI/CD integrado
- **GitHub Pages** - Hosting gratuito

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**rinterianoo** - [GitHub](https://github.com/rinterianoo)

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐
