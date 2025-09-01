/**
 * Envía una alerta al gerente.
 * En el futuro, esto se integrará con un servicio de notificaciones real.
 *
 * @param {string} title El título de la alerta.
 * @param {string} message El mensaje de la alerta.
 * @param {string} [priority="medium"] La prioridad de la alerta ('low', 'medium', 'high').
 */
const sendAlertToManager = (title, message, priority = "medium") => {
  console.log(`[${priority.toUpperCase()}] ${title}: ${message}`);

  // TODO: Implementar la integración con un servicio de notificaciones real (ej. WhatsApp, Email).
  // En producción, se enviaría una notificación real.
  if (process.env.NODE_ENV === "production") {
    // const { sendWhatsAppAlert } = require('./notification-service'); // Ejemplo
    // const MANAGER_PHONE = process.env.MANAGER_PHONE; // Ejemplo
    // sendWhatsAppAlert(MANAGER_PHONE, `🔔 ${title}\n\n${message}`);
    console.log("En modo producción, se enviaría una alerta real.");
  }
};

module.exports = {
  sendAlertToManager,
};
