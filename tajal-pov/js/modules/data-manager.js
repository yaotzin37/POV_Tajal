const DataManager = {
  state: {
    tables: [],
    orders: [],
    products: [],
    categories: [],
    sales: []
  },

  init() {
    // this.loadFromStorage();
    // this.setupAutoSave();
    console.log("DataManager initialized");
  },

  // ... El resto de la implementación de los métodos (loadFromStorage, saveToStorage, subscribe, notify, etc.) irá aquí.
};

export default DataManager;
