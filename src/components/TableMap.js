export default class TableMap {
  constructor(tables, reservations) {
    this.tables = tables;
    this.reservations = reservations;
    this.element = document.createElement('div');
    this.element.classList.add('table-map-container');
  }

  render() {
    const reservedTableIds = new Set(this.reservations.map(res => res.tableId));

    let html = '<h2 class="category-title">Mapa de Mesas</h2>';
    html += '<div class="table-map">';

    this.tables.forEach(table => {
      const isReserved = reservedTableIds.has(table.id);
      const tableClass = isReserved ? 'table reserved' : 'table free';
      html += `
        <div class="${tableClass}" data-table-id="${table.id}">
          <div class="table-name">${table.id.replace('-', ' ')}</div>
          <div class="table-capacity">Capacidad: ${table.capacity}</div>
          <div class="table-location">${table.location}</div>
          <div class="table-status">${isReserved ? 'Reservada' : 'Libre'}</div>
        </div>
      `;
    });

    html += '</div>';
    this.element.innerHTML = html;
    return this.element;
  }
}