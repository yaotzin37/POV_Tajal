3b7f22e96e69416e8590c20ac6e5c551542ca921# POV_Tajal

Este repositorio contiene el sistema de gestión para el menú y las reservas del restaurante Tajal.

## 🚀 Empezando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos

- Node.js
- npm

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/yaotzin37/POV_Tajal.git
   ```
2. Instala las dependencias de NPM
   ```sh
   npm install
   ```
3. Crea tu archivo de entorno local
   ```sh
   cp .env.example .env
   ```
4. Edita `.env` con tus configuraciones.

## 🛠️ Uso

- Para generar el menú: `npm run menu:generate`
- Para crear un respaldo: `npm run backup:create`
- Para restaurar un respaldo: `npm run backup:restore`

## 🚢 Despliegue

El despliegue a producción y staging se gestiona automáticamente a través de GitHub Actions.

## 🤝 Contribuyendo

Por favor lee `CONTRIBUTING.md` para detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

## 📄 Licencia

Este proyecto está bajo la Licencia (Tu Licencia Aquí) - mira el archivo `LICENSE` para más detalles.
