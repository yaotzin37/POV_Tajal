import TableMap from './components/TableMap.js';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app-root');

  if (!appRoot) {
    console.error('Error: No se encontró el elemento raíz de la aplicación (#app-root).');
    return;
  }

  Promise.all([
    fetch('menu.html').then(res => res.ok ? res.text() : Promise.reject(`Error ${res.status}`)),
    fetch('data/tables/tables.json').then(res => res.ok ? res.json() : Promise.reject(`Error ${res.status}`)),
    fetch('data/tables/reservations.json').then(res => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
  ])
  .then(([menuHtml, tables, reservations]) => {
    const parser = new DOMParser();
    const menuDoc = parser.parseFromString(menuHtml, 'text/html');
    const menuContent = menuDoc.body.innerHTML;

    appRoot.innerHTML = menuContent;

    const tableMap = new TableMap(tables, reservations);
    const tableMapElement = tableMap.render();
    appRoot.appendChild(tableMapElement);
  })
  .catch(error => {
    console.error('Fallo al cargar los datos de la aplicación:', error);
    appRoot.innerHTML = '<p style="color: red; text-align: center;">Lo sentimos, no se pudo cargar la aplicación. Por favor, intente de nuevo más tarde.</p>';
  });
});
