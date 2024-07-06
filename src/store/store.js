import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import apiClient from './auth-vuex.js';  // Asegúrate de que la ruta sea correcta

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null,
    loading: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, user) {
      state.user = user;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    updateAuthenticationStatus({ commit }, status) {
      commit('setAuthentication', status);
    },
    fetchAndSetUserData({ commit }) {
      apiClient.get('/users/me')
        .then(response => {
          commit('setUser', response.data);
          commit('setAuthentication', true);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          if (error.response && error.response.status === 401) {
            this.dispatch('logout');
          }
        });
    },
    initializeStore({ commit }) {
      let token = localStorage.getItem('token');
      if (token) {
        commit('setAuthentication', true);
        this.dispatch('fetchAndSetUserData');
      } else {
        commit('setAuthentication', false);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setUser', null);
      commit('setAuthentication', false);
      router.push('/sign-in');
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
    paternalLastName(state) {
      return state.user ? state.user.apellido_paterno : '';
    },
    maternalLastName(state) {
      return state.user ? state.user.apellido_materno : '';
    },
    email(state) {
      return state.user ? state.user.correo : '';
    }
  }
});
