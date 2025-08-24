# Plantilla de Política de Privacidad para Aplicaciones de Facebook

Esta plantilla te permite crear fácilmente una página de política de privacidad para tus aplicaciones de Facebook usando GitHub Pages.

## Personalización Requerida

Antes de usar esta plantilla, debes personalizar los siguientes elementos en el archivo `index.html`:

### 1. **Nombre de la aplicación**
```html
Busca y reemplaza: [Nombre de tu App]
```
Ejemplo:
```html
<title>Política de Privacidad - Mi App Facebook</title>
...
<p>El presente Política de Privacidad establece los términos en que Mi App Facebook usa...</p>
```

### 2. **Email de contacto**
```html
Busca y reemplaza: [tu-email@dominio.com]
```
Ejemplo:
```html
<p>Para eliminar completamente sus datos de nuestros sistemas, contacte a soporte@miapp.com.</p>
```

### 3. **Fecha de última actualización**
```html
Busca y reemplaza: [Fecha]
```
Ejemplo:
```html
<p><em>Última actualización: 28 de junio de 2023</em></p>
```

### 4. **Logo de la aplicación (opcional)**
```html
Añade esto después de la etiqueta <body>:
```
```html
<header>
  <img src="ruta/a/tu/logo.png" alt="Logo de [Nombre de tu App]" width="150">
  <h1>Política de Privacidad</h1>
</header>
```

## Pasos de Implementación

1. **Personaliza la plantilla**:
   - Edita `index.html` con tu editor de código
   - Reemplaza todos los placeholders con tu información

2. **Crea un repositorio en GitHub**:
   ```bash
   git init
   git add index.html
   git commit -m "Política de privacidad inicial"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git push -u origin main
   ```

3. **Habilita GitHub Pages**:
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "main" branch y "/ (root)" folder
   - Guarda los cambios

4. **Configura en Facebook Developer Dashboard**:
   - Ve a tu aplicación en [developers.facebook.com](https://developers.facebook.com/)
   - En "Configuración > Básico" añade tu URL de GitHub Pages
   - En "Privacidad" ingresa la misma URL

## Estructura del Archivo

El archivo `index.html` contiene:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Metadatos y título -->
</head>
<body>
    <!-- Contenido de la política de privacidad -->
    <h1>POLÍTICA DE PRIVACIDAD</h1>
    <!-- ... resto del contenido ... -->
</body>
</html>
```

## Personalización Avanzada

Puedes modificar estos aspectos si lo deseas:

1. **Diseño**:
   - Edita el CSS dentro de la etiqueta `<style>`
   - Cambia colores, fuentes o márgenes

2. **Contenido adicional**:
   - Añade secciones específicas para tu aplicación
   - Incluye detalles sobre datos únicos que recolectas

3. **Multidioma**:
   - Crea versiones en otros idiomas
   - Añade selector de idioma si es necesario

## Verificación Final

Antes de publicar, asegúrate de:

1. Revisar que todos los placeholders han sido reemplazados
2. Probar el enlace de GitHub Pages
3. Verificar que cumple con las [Políticas para Desarrolladores de Facebook](https://developers.facebook.com/policy/)

**URL de ejemplo:**  
`https://tu-usuario.github.io/tu-repositorio/`

¡Tu política de privacidad está lista para usar con tus aplicaciones de Facebook!# POV_Tajal
