# E-commerce Frontend

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg)](https://vitejs.dev/)

> A modern, responsive e-commerce frontend application built with React, Vite, and modern web technologies.

## 🚀 Overview

This is a modern e-commerce frontend application designed for the Construction Software course (IDS326). The application provides a clean, responsive user interface for online shopping with features like product browsing, shopping cart functionality, user authentication, and order management.

### ✨ Features

- **Modern Tech Stack**: Built with React 19, Vite, and ES6+
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Fast Development**: Hot Module Replacement (HMR) for instant updates
- **Code Quality**: ESLint configuration with React-specific rules
- **HTTP Client**: Axios for API communication
- **Modular Architecture**: Organized component and service structure

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **HTTP Client**: Axios 1.11.0
- **Code Quality**: ESLint with React plugins
- **Package Manager**: npm

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)

## ⚡ Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IDS326-Construccion-de-Software/ago-oct-pf-ecommerce-frontend.git
   cd ago-oct-pf-ecommerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (if needed)
   ```bash
   # Copy and modify environment variables
   cp .env.example .env.local
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
ago-oct-pf-ecommerce-frontend/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── api/               # API configuration and services
│   │   └── axiosConfig.js # Axios configuration
│   ├── assets/            # Application assets
│   │   └── react.svg      # React logo
│   ├── components/        # Reusable components (to be added)
│   ├── pages/             # Page components (to be added)
│   ├── hooks/             # Custom React hooks (to be added)
│   ├── utils/             # Utility functions (to be added)
│   ├── App.jsx            # Main App component
│   ├── App.css            # App styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── LICENSE                # Apache 2.0 License
└── README.md              # Project documentation
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts development server with HMR |
| `npm run build` | Creates optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 API Configuration

The application uses Axios for HTTP requests. Configuration is located in `src/api/axiosConfig.js`.

```javascript
// Example API usage
import api from './api/axiosConfig';

const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
```

## 🎨 Development Guidelines

### Code Style

This project uses ESLint for code quality and consistency:

- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write meaningful commit messages

### Component Structure

```jsx
// Example component structure
import { useState, useEffect } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

## 🚀 Deployment

### Build Optimization

The application is optimized for production with:

- Code splitting and lazy loading
- Asset optimization and compression
- Tree shaking for smaller bundle sizes
- Modern browser targeting

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Docker**: Containerize with nginx for production serving

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Workflow

1. Check the [Issues](https://github.com/IDS326-Construccion-de-Software/ago-oct-pf-ecommerce-frontend/issues) for tasks
2. Create a branch for your feature/bugfix
3. Follow the code style guidelines
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Team

This project is developed as part of the Construction Software course (IDS326).

## 🐛 Bug Reports & Feature Requests

If you encounter any issues or have feature suggestions, please create an issue in the [GitHub repository](https://github.com/IDS326-Construccion-de-Software/ago-oct-pf-ecommerce-frontend/issues).

## 📞 Support

For questions and support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the Construction Software course (IDS326)**
