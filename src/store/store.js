import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';  // Asegúrate de importar axios si lo estás usando
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,  // Estado de autenticación del usuario, inicialmente no autenticado.
    user: null               // Datos del usuario, inicialmente no hay usuario autenticado.
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;  // Cambia el estado de autenticación basado en el parámetro 'status'.
    },
    setUser(state, user) {
      state.user = user;  // Guarda los datos del usuario en el estado.
    }
  },
  actions: {
    updateAuthenticationStatus({ commit }, status) {
      commit('setAuthentication', status);
    },
    fetchAndSetUserData({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('https://back-end-production-c8eb.up.railway.app/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            commit('setUser', response.data);  // Guarda los datos del usuario obtenidos
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
      }
    },
    initializeStore({ commit }) {
      let token = localStorage.getItem('token');
      if (token) {
        commit('setAuthentication', true);
        this.dispatch('fetchAndSetUserData');  // Fetch user data on initialization
      } else {
        commit('setAuthentication', false);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');  // Elimina el token de localStorage.
      commit('setAuthentication', false);  // Actualiza el estado de autenticación a false.
      router.push('/sign-in');  // Redirige al usuario a la página de inicio de sesión.
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    username(state) {
      return state.user ? state.user.nombre : '';  
    },
    paternalLastName(state) {
      return state.user ? state.user.apellido_paterno : ''
    },
    maternalLastName(state) {
      return state.user ? state.user.apellido_materno : ''
    },
    email(state) {
      return state.user ? state.user.correo : ''
    }
    
  }
});
