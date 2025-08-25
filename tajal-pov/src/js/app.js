import DataManager from './modules/data-manager.js';
import EventBus from './modules/event-bus.js';
import AuthModule from './modules/auth.js';

class TajalPOV {
    constructor() {
        this.init();
    }

    async init() {
        console.log("Iniciando Tajal POV...");
        // Inicializar módulos core
        // await DataManager.init(); // Lo comento hasta que la lógica esté implementada
        // EventBus.init();
        // AuthModule.init();

        // Cargar módulos de UI
        this.loadUIModules();

        // Configurar event listeners
        this.setupEventListeners();

        // Mostrar vista inicial
        this.showView('dashboard');
        console.log("Tajal POV iniciado.");
    }

    loadUIModules() {
        console.log("Cargando módulos de UI...");
        // Lógica para cargar componentes de UI en el futuro
    }

    setupEventListeners() {
        console.log("Configurando event listeners...");
        // Lógica para configurar listeners globales
    }

    showView(viewName) {
        console.log(`Mostrando vista: ${viewName}`);
        // Lógica para renderizar vistas
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.tajalApp = new TajalPOV();
});
