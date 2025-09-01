# Flujo de Trabajo de Desarrollo

Este documento describe el flujo de trabajo recomendado para contribuir al proyecto.

## Estrategia de Ramas

Usamos un flujo de trabajo basado en `Git Flow`:

- `main`: Refleja el estado de producción.
- `staging`: Entorno de pre-producción para pruebas finales.
- `develop`: Rama principal de desarrollo.
- `feature/*`: Para nuevas funcionalidades.
- `bugfix/*`: Para corregir errores.
- `hotfix/*`: Para correcciones urgentes en producción.

## Proceso

1.  **Crea una rama** desde `develop`.
2.  **Realiza tus cambios** y haz commits atómicos.
3.  **Abre un Pull Request** hacia `develop`.
4.  **Espera la revisión** y aprobación del equipo.
5.  **Haz merge** de tu rama una vez aprobada.
