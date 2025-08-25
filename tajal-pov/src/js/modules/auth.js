const AuthModule = {
  currentUser: null,

  init() {
    this.currentUser = this.getCurrentUser();
    console.log("AuthModule inicializado. Usuario actual:", this.currentUser);
  },

  // Simulación de login con una API backend
  login: async (credentials) => {
    console.log("Simulando login con:", credentials);
    // En una aplicación real, aquí se haría una llamada a la API
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // });
    // const { token, user } = await response.json();

    // Simulación de un token JWT
    const fakeUser = { id: 1, name: 'Mesero de Prueba', role: 'mesero' };
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(fakeUser));
    const signature = 'fake-signature';
    const token = `${header}.${payload}.${signature}`;

    localStorage.setItem('authToken', token);
    this.currentUser = fakeUser;
    return fakeUser;
  },

  logout() {
    localStorage.removeItem('authToken');
    this.currentUser = null;
  },

  getCurrentUser: () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;
      // Decodificar el payload del token falso
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Error al decodificar el token:", e);
      return null;
    }
  },

  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  }
};

export default AuthModule;
