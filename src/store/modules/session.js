import router from '../../router';
import { fetchUserData } from '../../utils/apiUtils';
import { jwtDecode } from 'jwt-decode';

const state = {
  isAuthenticated: false,
  user: null,
  accountType: null,
};

const mutations = {
  SET_AUTHENTICATION(state, status) {
    state.isAuthenticated = status;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ACCOUNT_TYPE(state, value) {
    state.accountType = value;
  },
};

const actions = {
  updateAuthenticationStatus({ commit }, status) {
    commit('SET_AUTHENTICATION', status);
  },
  async fetchAndSetUserData({ commit }) {
    try {
      const userData = await fetchUserData();
      commit('SET_USER', userData);
      commit('SET_AUTHENTICATION', true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 401) {
        this.dispatch('session/logout'); // Usa el espacio de nombres del módulo
      }
    }
  },
  initializeStore({ commit, dispatch }) {
    const token = sessionStorage.getItem('token');
    if (token) {
      commit('SET_AUTHENTICATION', true);
      const decodedToken = jwtDecode(token);
      const accountType = decodedToken.cuenta;
      commit('SET_ACCOUNT_TYPE', accountType);
      dispatch('fetchAndSetUserData');
    } else {
      commit('SET_AUTHENTICATION', false);
      commit('SET_ACCOUNT_TYPE', null);
    }
  },
  logout({ commit }) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('categoryData');
    commit('SET_USER', null);
    commit('SET_AUTHENTICATION', false);
    router.push('/sign-in');
  },
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    accountType: state => state.accountType,
    username: state => (state.user ? state.user.nombre : ''),
    idUser: state => (state.user ? state.user.id_usuario : ''),
    paternalLastName: state => (state.user ? state.user.apellido_paterno : ''),
    maternalLastName: state => (state.user ? state.user.apellido_materno : ''),
    email: state => (state.user ? state.user.correo : ''),    
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
