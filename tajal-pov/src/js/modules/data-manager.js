class DataManager {
  constructor() {
    this.state = {
        tables: [],
        orders: [],
        products: [],
        categories: [],
        sales: []
    };
    this.subscribers = [];
    console.log("DataManager class instantiated");
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    // Devolver una función para desuscribirse
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    console.log("Notificando a los suscriptores", this.subscribers.length);
    this.subscribers.forEach(callback => callback(this.state));
  }

  // El método init de antes puede ser parte de la lógica de inicialización de la app
  async init() {
    console.log("DataManager inicializado (simulación de carga de datos).");
    // Aquí se podría cargar el estado inicial desde localStorage o una API
    this.setState({ ...this.state }); // Notificar el estado inicial
  }
}

const instance = new DataManager();
export default instance;
