const fs = require('fs');
const path = require('path');
const { sendAlertToManager } = require('./system-alerts.js');

// --- Placeholder Functions ---
// TODO: Implement these functions with real data from the corresponding modules.

/**
 * Fetches daily sales data. This is a placeholder.
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @returns {object} Mock sales data.
 */
const getDailySales = (date) => {
  console.log(`Fetching sales for ${date}...`);
  // In a real implementation, this would read from data/finance/transactions.json
  return {
    total: 15750.50,
    count: 85,
    cashPercentage: 0.6,
    cardPercentage: 0.4,
    topDishes: [
      { name: "Tacos al Pastor", count: 45 },
      { name: "Guacamole", count: 30 },
      { name: "Margarita", count: 50 },
    ],
  };
};

/**
 * Saves the daily report to a file. This is a placeholder.
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @param {string} reportContent - The content of the report.
 */
const saveDailyReport = (date, reportContent) => {
  const reportDir = path.join(__dirname, '..', 'data', 'finance');
  // Ensure the directory exists
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  const reportPath = path.join(reportDir, `report-${date}.txt`);
  console.log(`Saving daily report to ${reportPath}...`);
  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log('Report saved successfully.');
};

/**
 * Sends the daily report to the manager.
 * @param {string} reportContent - The content of the report.
 */
const sendDailyReportToManager = (reportContent) => {
  sendAlertToManager(
    "Reporte Diario de Operaciones",
    reportContent,
    "low"
  );
};

/**
 * Schedules a task to run daily at a specific time. This is a placeholder.
 * @param {function} task - The function to execute.
 * @param {string} time - The time in 'HH:MM' format.
 */
const scheduleDailyTask = (task, time) => {
  console.log(`Task scheduled daily at ${time}. (This is a simulation)`);
  // In a real implementation, this would use a library like node-cron.
};


// --- Main Report Generation ---

/**
 * Generates and processes the daily operations report.
 */
const generateDailyReport = () => {
  const today = new Date().toISOString().split('T')[0];
  const sales = getDailySales(today);

  // Avoid division by zero if there are no sales
  const averageTicket = sales.count > 0 ? (sales.total / sales.count).toFixed(2) : '0.00';

  const report = `
==============================
REPORTE DIARIO - TAJAL
Fecha: ${today}
==============================

📊 Resumen de Ventas
------------------------------
Ventas Totales: $${sales.total.toFixed(2)}
Número de Transacciones: ${sales.count}
Ticket Promedio: $${averageTicket}

💳 Método de Pago
------------------------------
Efectivo: ${(sales.cashPercentage * 100).toFixed(1)}%
Tarjeta:  ${(sales.cardPercentage * 100).toFixed(1)}%

🌮 Platos Más Vendidos
------------------------------
${sales.topDishes.map((dish, i) =>
  `${i + 1}. ${dish.name}: ${dish.count} unidades`).join('\n')}
==============================
  `;

  console.log(report);

  // Guardar reporte
  saveDailyReport(today, report);

  // Enviar al gerente
  sendDailyReportToManager(report);

  return report;
};

// --- Execution ---

// This part would be handled by a scheduler in production.
// For demonstration, we can call it directly when the script is run.
if (require.main === module) {
  console.log("Generando reporte diario como una ejecución única...");
  generateDailyReport();
}

// Set up the daily schedule for a real environment.
scheduleDailyTask(generateDailyReport, "22:00");

module.exports = {
  generateDailyReport,
  getDailySales,
  saveDailyReport,
};
