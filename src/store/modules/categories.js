import apiClient from "../auth-vuex";

const state = {
  categories: [],
  filteredCategories: [],
  totalCategories: 0,
  currentPage: 1,
  totalPages: 0,
};
const mutations = {
  SET_CATEGORIES(state, { categories, totalCategories, totalPages, currentPage }) {
    state.categories = categories;
    state.filteredCategories = categories;  // Inicializa filteredCategories con todas las categorías
    state.totalCategories = totalCategories;
    state.totalPages = totalPages;
    state.currentPage = currentPage;
  },
  SET_FILTERED_CATEGORIES(state, filteredCategories) {
    state.filteredCategories = filteredCategories;
  },
};

const actions = {
  async fetchCategories({ commit }, { page = 1, limit = 7 }) {
    try {
      const response = await apiClient.get(`/categories?page=${page}&limit=${limit}`);
      commit('SET_CATEGORIES', {
        categories: response.data.categories,
        totalCategories: response.data.totalCategories,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  filterCategories({ commit, state }, searchTerm) {
    const search = searchTerm.toLowerCase();
    
    // Filtrar categorías por nombre o id_categoria
    const filtered = state.categories.filter(category =>
      category.nombre.toLowerCase().includes(search) || 
      category.id_categoria.toString().includes(search)
    );

    commit('SET_FILTERED_CATEGORIES', filtered); // Guardar categorías filtradas
  },
};

const getters = {
  filteredCategories: state => state.filteredCategories,
  categories: (state) => state.categories,
  currentPage: (state) => state.currentPage,
  totalPages: (state) => state.totalPages,
  totalCategories: (state) => state.totalCategories
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
