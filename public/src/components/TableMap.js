export default class TableMap {
  constructor(tables, reservations) {
    this.tables = tables;
    this.reservations = reservations;
    this.element = document.createElement('div');
    this.element.classList.add('table-map-container');
    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener('click', (event) => {
      const tableElement = event.target.closest('.table');
      if (!tableElement) return;

      const tableId = tableElement.dataset.tableId;
      const reservation = this.reservations.find(res => res.tableId === tableId);

      if (reservation) {
        this.showReservationDetails(reservation);
      } else {
        this.showReservationForm(tableId);
      }
    });
  }

  showReservationDetails(reservation) {
    const reservationTime = new Date(reservation.reservationTime);
    const formattedTime = reservationTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    alert(
      `Mesa Reservada\n` +
      `Cliente: ${reservation.customerName}\n` +
      `Hora: ${formattedTime}\n` +
      `Personas: ${reservation.partySize}`
    );
  }

  showReservationForm(tableId) {
    // Remove existing modal if any
    const existingModal = this.element.querySelector('.modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHtml = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h3>Reservar Mesa ${tableId.replace('-', ' ')}</h3>
          <form id="reservation-form">
            <div class="form-group">
              <label for="customerName">Nombre del Cliente:</label>
              <input type="text" id="customerName" name="customerName" required>
            </div>
            <div class="form-group">
              <label for="partySize">Número de Personas:</label>
              <input type="number" id="partySize" name="partySize" min="1" required>
            </div>
            <div class="form-group">
              <label for="reservationTime">Hora de la Reserva:</label>
              <input type="datetime-local" id="reservationTime" name="reservationTime" required>
            </div>
            <div class="form-actions">
              <button type="submit">Confirmar Reserva</button>
              <button type="button" class="cancel-btn">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHtml;
    modalElement.classList.add('modal');
    this.element.appendChild(modalElement);

    const form = modalElement.querySelector('#reservation-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const reservationData = Object.fromEntries(formData.entries());
      reservationData.tableId = tableId;
      
      console.log('Nueva Reserva (sin guardar):', reservationData);
      alert('Reserva creada (ver consola para detalles). En una aplicación real, esto se guardaría en el servidor.');
      
      modalElement.remove();
    });

    const cancelBtn = modalElement.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
      modalElement.remove();
    });
  }

  render() {
    const reservedTableIds = new Set(this.reservations.map(res => res.tableId));

    let html = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          width: 90%;
          max-width: 500px;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .form-actions {
          margin-top: 1.5rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }
      </style>
      <h2 class="category-title">Mapa de Mesas</h2>
      <div class="table-map">
    `;

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