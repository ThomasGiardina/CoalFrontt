# 🎮 Coal - E-commerce de Videojuegos

<div align="center">

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

*Una plataforma moderna de compra y venta de videojuegos inspirada en Steam*

</div>

---

## 📖 Descripción del Proyecto

**Coal** es una aplicación web fullstack de e-commerce especializada en la venta de videojuegos digitales. El proyecto nació como un trabajo universitario y fue completamente mejorado y rediseñado para ofrecer una experiencia de usuario premium, moderna y totalmente responsiva.

La plataforma permite a los usuarios explorar un catálogo de videojuegos, agregarlos al carrito, gestionar favoritos, realizar compras, y mucho más. También cuenta con un panel de administración completo para la gestión de productos, estadísticas y órdenes.

---

## 👨‍💻 Desarrolladores

| Desarrollador | Rol |
|---------------|-----|
| **Thomas Agustín Giardina** | Fullstack Developer |
| **Juan Ignacio Domínguez** | Fullstack Developer |

> 🎓 Este proyecto comenzó como un trabajo práctico en la facultad y fue posteriormente mejorado por completo, implementando buenas prácticas, patrones de diseño modernos y una arquitectura escalable.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos repositorios:

| Repositorio | Descripción | Puerto |
|-------------|-------------|--------|
| **CoalFrontt** (este repo) | Frontend - React + Vite | `localhost:5173` |
| **[coalback](https://github.com/ThomasGiardina/coalback)** | Backend - Spring Boot | `localhost:4002` |

### Conexión con el Backend

El frontend se comunica con el backend a través de **Axios** mediante peticiones HTTP REST al puerto `localhost:4002`. El backend está conectado a una base de datos **MySQL** que almacena toda la información de usuarios, productos, órdenes y estadísticas.

---

## 🚀 Tecnologías Utilizadas

### Frontend (Este Repositorio)

| Tecnología | Uso |
|------------|-----|
| **Vite** | Build tool y servidor de desarrollo |
| **React 18** | Librería de UI |
| **Redux Toolkit** | Gestión de estado global |
| **React Router DOM** | Navegación y routing |
| **TailwindCSS** | Framework de estilos |
| **DaisyUI** | Componentes UI para Tailwind |
| **Axios** | Cliente HTTP para API calls |
| **Framer Motion** | Animaciones fluidas |
| **Formik + Yup** | Manejo y validación de formularios |
| **Chart.js** | Gráficos y estadísticas |
| **SweetAlert2** | Alertas interactivas |
| **JWT Decode** | Manejo de tokens de autenticación |
| **Cloudinary** | Gestión de imágenes en la nube |
| **jsPDF + html2canvas** | Generación de facturas PDF |

---

## � Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, iconos)
├── components/       # Componentes reutilizables
│   ├── About/        # Sección "Acerca de"
│   ├── AppManagement/# Rutas protegidas, redirects
│   ├── Carrito/      # Componentes del carrito
│   ├── Details/      # Detalle de videojuegos
│   ├── Favorites/    # Lista de favoritos
│   ├── Footer/       # Pie de página
│   ├── Gamecard/     # Tarjetas de juegos
│   ├── GamesAdmin/   # CRUD de juegos (admin)
│   ├── GiftCards/    # Tarjetas de regalo
│   ├── GiftCardsAdmin/ # Gestión de gift cards (admin)
│   ├── HomePage/     # Componentes del home
│   ├── Login/        # Autenticación
│   ├── Navbar/       # Barra de navegación
│   ├── OrderHistory/ # Historial de órdenes
│   ├── Pagination/   # Paginación
│   ├── Register/     # Registro de usuarios
│   ├── Searchbar/    # Barra de búsqueda
│   ├── Settings/     # Configuración de usuario
│   ├── Statistics/   # Panel de estadísticas
│   ├── Store/        # Tienda principal
│   └── Support/      # Soporte al cliente
├── redux/            # Estado global
│   ├── slices/       # Redux slices
│   └── store.js      # Configuración del store
├── utils/            # Funciones utilitarias
└── views/            # Vistas/páginas principales
```

---

## 🔄 Redux - Gestión de Estado Global

El proyecto utiliza **Redux Toolkit** para manejar el estado global de la aplicación de manera eficiente y predecible.

### Slices Implementados

| Slice | Descripción |
|-------|-------------|
| `authSlice` | Manejo de autenticación, tokens JWT, información del usuario y roles |
| `cartSlice` | Gestión del carrito de compras, agregar/eliminar productos, cálculo de totales |
| `favoritesSlice` | Lista de juegos favoritos del usuario |
| `gamesSlice` | Catálogo de videojuegos, filtros y búsqueda |
| `statisticsSlice` | Datos estadísticos para el panel de administración |

### Configuración del Store

```javascript
const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authReducer,
        cart: cartReducer,
        games: gamesReducer,
        statistics: statisticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    getToken: () => store.getState().auth.token,
                },
            },
            serializableCheck: false,
        }),
});
```

---

## ✨ Funcionalidades Principales

### Para Usuarios

- 🛒 **Carrito de Compras**: Agregar, eliminar y modificar cantidades de productos
- ❤️ **Lista de Favoritos**: Guardar juegos para comprar después
- 🔍 **Búsqueda y Filtros**: Filtrar por categoría, plataforma y precio
- 📱 **Diseño Responsivo**: Experiencia optimizada en móviles y escritorio
- 🧾 **Historial de Compras**: Ver órdenes anteriores y generar facturas PDF
- 🎁 **Gift Cards**: Compra y canje de tarjetas de regalo
- ⚙️ **Configuración de Perfil**: Editar información personal

### Para Administradores

- 📊 **Dashboard de Estadísticas**: Visualización de ventas y métricas
- 🎮 **Gestión de Videojuegos**: CRUD completo de productos
- 🎁 **Gestión de Gift Cards**: Crear y administrar tarjetas de regalo
- 📋 **Historial de Órdenes**: Ver y gestionar todas las órdenes

---

## 🛡️ Buenas Prácticas Implementadas

### Arquitectura y Código

- ✅ **Componentización**: Componentes pequeños, reutilizables y con responsabilidad única
- ✅ **Separación de Concerns**: Lógica de negocio separada de la UI
- ✅ **Custom Hooks**: Abstracción de lógica reutilizable
- ✅ **Rutas Protegidas**: `AdminRoute` y `UserRoute` para control de acceso

### Estado y Datos

- ✅ **Redux Toolkit**: Estado global predecible y fácil de debuggear
- ✅ **Thunks Asíncronos**: Manejo de peticiones al backend con estados de carga
- ✅ **Normalización de Datos**: Estructura consistente en el store

### UI/UX

- ✅ **Diseño Mobile-First**: Responsivo desde dispositivos móviles
- ✅ **Feedback Visual**: Loaders, toasts y alertas informativas
- ✅ **Animaciones Fluidas**: Transiciones con Framer Motion
- ✅ **Accesibilidad**: Navegación por teclado y lectores de pantalla

### Seguridad

- ✅ **Autenticación JWT**: Tokens seguros para sesiones
- ✅ **Rutas Protegidas**: Validación de roles en frontend
- ✅ **Validación de Formularios**: Con Formik y Yup

---

## 📦 Instalación y Ejecución

### Requisitos Previos

- Node.js v20.18.0 o superior
- npm o yarn
- Backend [coalback](https://github.com/ThomasGiardina/coalback) corriendo en `localhost:4002`
- MySQL configurado y ejecutándose

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/ThomasGiardina/CoalFrontt.git

# 2. Entrar al directorio
cd CoalFrontt

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:5173` |
| `npm run build` | Genera los archivos para producción |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

---

## � Backend - Coal Backend

El backend del proyecto se encuentra en un repositorio separado:

📦 **Repositorio:** [Coal Backend](https://github.com/ThomasGiardina/Coal)

### Características del Backend

- **Framework:** Spring Boot
- **Puerto:** `localhost:4002`
- **Base de Datos:** MySQL
- **Autenticación:** JWT
- **API RESTful:** Endpoints para todas las operaciones CRUD

### Conexión

El frontend se conecta al backend mediante la URL base:
```
http://localhost:4002
```

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de un trabajo universitario.

---

<div align="center">

**Hecho con ❤️ por Thomas Giardina & Juan Ignacio Domínguez**

*Proyecto universitario mejorado y llevado a producción*

</div>
