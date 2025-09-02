// Espera a que el DOM esté completamente cargado para evitar errores
document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app-root');

  // Verifica que el contenedor principal exista antes de hacer nada
  if (!appRoot) {
    console.error('Error: No se encontró el elemento raíz de la aplicación (#app-root).');
    return;
  }

  // Carga el menú usando fetch
  fetch('menu.html')
    .then(response => {
      // Si hay un error en la carga (ej. archivo no encontrado), lo reporta
      if (!response.ok) {
        throw new Error(`Error al cargar el menú: ${response.status} ${response.statusText}`);
      }
      return response.text(); // Convierte la respuesta a texto (HTML)
    })
    .then(html => {
      // Inserta el HTML del menú dentro del contenedor principal
      appRoot.innerHTML = html;
      console.log('Menú cargado exitosamente en la página principal.');
    })
    .catch(error => {
      // Si algo falla, muestra un mensaje de error en la consola y en la página
      console.error('Fallo al cargar el menú:', error);
      appRoot.innerHTML = '<p style="color: red; text-align: center;">Lo sentimos, no se pudo cargar el menú. Por favor, intente de nuevo más tarde.</p>';
    });
});