export const Formatters = {
  currency(amount) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  },

  // ... aquí se pueden añadir más funciones de formato en el futuro (fechas, etc.).
};
