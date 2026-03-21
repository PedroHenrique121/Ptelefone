import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:3000'
  // ⚠️ Android emulador
  // celular real: 'http://192.168.X.X:3000'
});

export default api;