## Stripe (solo FE con redirección)

Para un flujo simple sin integrar SDKs complejos, puedes configurar un Payment Link de Stripe y redirigir al usuario desde el botón "Proceder al pago" en el carrito.

1. Crea un Payment Link en tu dashboard de Stripe.
2. En `FE/.env` agrega:

```
VITE_STRIPE_PAYMENT_LINK_URL=https://buy.stripe.com/test_XXXXXXXX
```

3. El carrito (`pages/CartDetail.jsx`) intentará redirigir a ese URL. Si no está definido, cae al modal de pago interno.

Nota: Para una integración más avanzada (Payment Element/PaymentIntents), se requiere usar Stripe.js y/o un backend. Este repo ya incluye una base de backend para PaymentIntents, pero aquí se mantiene FE-only según la solicitud.

# The Revenge - E-Commerce Frontend

## 📋 Descripción

**The Revenge** es una aplicación de comercio electrónico moderna y responsiva desarrollada con React y Vite. Este proyecto frontend proporciona una experiencia de usuario fluida para navegar productos, gestionar carritos de compra, realizar pedidos y administrar perfiles de usuario.

La aplicación cuenta con características como:
- 🛍️ Catálogo de productos con búsqueda y filtrado
- 🛒 Carrito de compras interactivo
- 💳 Sistema de checkout y pagos
- 👤 Gestión de perfiles de usuario
- 🔐 Autenticación y recuperación de contraseña
- 📦 Seguimiento de pedidos
- ⚙️ Configuración personalizable

---

## 🚀 Tecnologías Utilizadas

### Core
- **React** 19.1.1 - Biblioteca principal para la interfaz de usuario
- **React Router DOM** 7.9.1 - Navegación y enrutamiento
- **Vite** 7.1.2 - Herramienta de construcción y desarrollo

### Librerías y Dependencias
- **Axios** 1.12.2 - Cliente HTTP para peticiones API
- **Lucide React** 0.544.0 - Iconos modernos
- **SweetAlert2** 11.24.1 - Alertas y modales elegantes
- **React Number Format** 5.4.4 - Formateo de números y monedas
- **Validator** 13.15.15 - Validación de datos
- **html2canvas** 1.4.1 - Captura de pantalla
- **jsPDF** 3.0.3 - Generación de PDFs
- **jsPDF AutoTable** 5.0.2 - Tablas en PDFs

### Herramientas de Desarrollo
- **ESLint** 9.33.0 - Linter de código
- **Vite Plugin React** 5.0.0 - Plugin de React para Vite

---

## 📁 Estructura del Proyecto

```
ago-oct-pf-ecommerce-frontend-dev/
├── .github/              # Configuración de GitHub Actions y workflows
├── public/               # Archivos estáticos públicos
│   └── Icono-the-Revenge-V2.ico
├── src/
│   ├── api/             # Configuración de APIs y endpoints
│   ├── assets/          # Recursos estáticos (imágenes, iconos)
│   ├── components/      # Componentes reutilizables de React
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ShoppingCart.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── PaymentModal.jsx
│   │   └── ...
│   ├── context/         # Context API para gestión de estado global
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── OrdersContext.jsx
│   │   └── SettingContext.jsx
│   ├── lib/             # Utilidades y funciones auxiliares
│   ├── mocks/           # Datos de prueba y mocks
│   ├── pages/           # Páginas principales de la aplicación
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   ├── CartDetail.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── UserProfile.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── VerifyCode.jsx
│   │   └── NewPassword.jsx
│   ├── services/        # Servicios para comunicación con APIs
│   ├── styles/          # Archivos de estilos CSS
│   ├── App.jsx          # Componente principal de la aplicación
│   ├── App.css          # Estilos del componente App
│   ├── main.jsx         # Punto de entrada de la aplicación
│   └── index.css        # Estilos globales
├── .gitignore           # Archivos ignorados por Git
├── eslint.config.js     # Configuración de ESLint
├── index.html           # HTML principal
├── LICENSE              # Licencia Apache 2.0
├── package.json         # Dependencias y scripts del proyecto
├── package-lock.json    # Versiones exactas de dependencias
├── sonar-project.properties  # Configuración de SonarQube
├── vite.config.js       # Configuración de Vite
└── README.md            # Este archivo
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 (recomendado: versión LTS más reciente)
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** para clonar el repositorio

Para verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd ago-oct-pf-ecommerce-frontend-dev
```

### 2. Instalar Dependencias

```bash
npm install
```

O si prefieres usar yarn:

```bash
yarn install
```

### 3. Configurar Variables de Entorno (Opcional)

Si el proyecto requiere variables de entorno, crea un archivo `.env` en la raíz del proyecto:

```bash
# Ejemplo de variables de entorno
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=The Revenge
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 🎯 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Compila la aplicación para producción en la carpeta `dist/` |
| `npm run preview` | Previsualiza la build de producción localmente |
| `npm run lint` | Ejecuta ESLint para verificar la calidad del código |

---

## 💻 Ejemplo de Uso

### Desarrollo Local

1. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Abrir en el navegador:**
   Navega a `http://localhost:5173`

3. **Explorar funcionalidades:**
   - Navega por el catálogo de productos
   - Añade productos al carrito
   - Completa el proceso de checkout
   - Crea una cuenta o inicia sesión
   - Gestiona tu perfil y pedidos

### Build para Producción

1. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

2. **Previsualizar la build:**
   ```bash
   npm run preview
   ```

3. **Desplegar:**
   Los archivos compilados estarán en la carpeta `dist/` listos para ser desplegados en cualquier servidor web o plataforma de hosting (Vercel, Netlify, AWS S3, etc.)

---

## 🏗️ Arquitectura y Patrones

### Context API
El proyecto utiliza React Context API para la gestión de estado global:
- **AuthContext**: Gestión de autenticación y sesiones
- **CartContext**: Estado del carrito de compras
- **OrdersContext**: Gestión de pedidos
- **SettingsContext**: Configuración de la aplicación

### Estructura de Componentes
- **Componentes de Presentación**: Componentes puros que reciben props y renderizan UI
- **Componentes Contenedores**: Componentes que gestionan lógica y estado
- **Páginas**: Componentes de nivel superior que representan rutas

### Enrutamiento
Se utiliza React Router DOM v7 para la navegación:
- Rutas públicas: Landing, Login, Productos
- Rutas protegidas: Perfil, Pedidos, Configuración
- Rutas de recuperación: ForgotPassword, VerifyCode, NewPassword

---

## 🤝 Guía para Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Fork del Proyecto

Haz un fork del repositorio desde GitHub.

### 2. Crear una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

Convenciones de nombres de ramas:
- `feature/` - Para nuevas funcionalidades
- `bugfix/` - Para corrección de errores
- `hotfix/` - Para correcciones urgentes
- `refactor/` - Para refactorización de código

### 3. Realizar Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de estilo del proyecto
- Asegúrate de que el linter no reporte errores: `npm run lint`

### 4. Commit de Cambios

```bash
git add .
git commit -m "feat: descripción clara de los cambios"
```

Convenciones de commits (Conventional Commits):
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de error
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan el código)
- `refactor:` - Refactorización de código
- `test:` - Añadir o modificar tests
- `chore:` - Tareas de mantenimiento

### 5. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Abre un Pull Request en GitHub con:
- Título descriptivo
- Descripción detallada de los cambios
- Referencias a issues relacionados (si aplica)
- Screenshots (si hay cambios visuales)

### Código de Conducta

- Sé respetuoso con otros contribuidores
- Proporciona feedback constructivo
- Reporta bugs de manera clara y detallada
- Documenta tus cambios adecuadamente

---

## 👥 Autores y Equipo de Desarrollo

**Equipo de Desarrollo - The Revenge**

Proyecto desarrollado como parte del programa de formación en desarrollo full-stack.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**.

Ver el archivo [LICENSE](LICENSE) para más detalles.

```
Copyright 2025 The Revenge Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 📞 Soporte y Contacto

Si tienes preguntas, sugerencias o encuentras algún problema:

- 🐛 **Reportar bugs**: Abre un issue en GitHub
- 💡 **Sugerencias**: Abre un issue con la etiqueta "enhancement"
- 📧 **Contacto**: [Información de contacto del equipo]

---

## 🔄 Estado del Proyecto

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-Apache%202.0-orange)

**Versión actual**: 0.0.0  
**Estado**: En desarrollo activo 🚧

---

## 🙏 Agradecimientos

Gracias a todos los que han contribuido a este proyecto y a las tecnologías open source que lo hacen posible.

---

**¡Feliz coding! 🚀**