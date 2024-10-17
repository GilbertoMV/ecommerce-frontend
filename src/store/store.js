import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import categories from './modules/categories';
import attributes from './modules/attributes';
import {fetchUserData} from '../utils/apiUtils';
import { jwtDecode } from 'jwt-decode';

Vue.use(Vuex);
let loadingTimer = null;
export default new Vuex.Store({
  modules: {
    categories,
    attributes
  },
  state: {
    isAuthenticated: false, //autentication
    user: null, //user
    loading: false, //loader
    darkMode: localStorage.getItem('darkmode') === 'true', //dark mode
    accountType: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    }, //autentication
    setUser(state, user) {
      state.user = user;
    }, //user
    SET_LOADING(state, payload) {
      state.loading = payload;
    }, //loader
    setDarkMode(state, value) {
      state.darkMode = value;
      localStorage.setItem('darkmode', value);
    },//dark mode
    setAccountType(state, value) {
      state.accountType = value;
    }
  },
  actions: {
    setLoading({commit}, status) {
      //se establece un retardo de 5 milisegundos para evitar el parpadeo del loader en tareas muy rapidas
      clearTimeout(loadingTimer);
      loadingTimer = setTimeout(() => {
        commit('SET_LOADING', status)
      }, 500)
    },
    updateAuthenticationStatus({ commit }, status) {
      commit('setAuthentication', status);
    },
    async fetchAndSetUserData({ commit }) {
      try {
        const userData = await fetchUserData();
          commit('setUser', userData);
          commit('setAuthentication', true);
      } catch(error) {
          console.error('Error fetching user data:', error);
          if (error.response && error.response.status === 401) {
            this.dispatch('logout');
          }
      } 
    },
    initializeStore({ commit }) {
      let token = localStorage.getItem('token');
      if (token) {
        commit('setAuthentication', true);
        //decodificar el toker para obtener el tipo de cuenta
        const decodedToken = jwtDecode(token);
        const accountType = decodedToken.cuenta;
        // Almacenar el tipo de cuenta en el estado de Vuex
        commit('setAccountType', accountType);
        this.dispatch('fetchAndSetUserData');
      } else {
        commit('setAuthentication', false);
        commit('setAccountType', false);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token'); 
      sessionStorage.removeItem('userData');
      localStorage.removeItem('categoryData');
      commit('setUser', null);
      commit('setAuthentication', false);
      router.push('/sign-in');
    },
    toggleDarkMode({ commit, state }) {
      commit('setDarkMode', !state.darkMode);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    user(state) {
      return state.user;
    },
    username(state) {
      return state.user ? state.user.nombre: '';
    },
    idUser(state) {
      return state.user ? state.user.id_usuario: ''
    },
    paternalLastName(state) {
      return state.user ? state.user.apellido_paterno : '';
    },
    maternalLastName(state) {
      return state.user ? state.user.apellido_materno : '';
    },
    email(state) {
      return state.user ? state.user.correo : '';
    },
    isDarkMode(state) {
      return state.darkMode;
    },
    accountType(state) {
      return state.accountType;
    },
  }
});
