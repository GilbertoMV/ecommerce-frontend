import { fetchCategoryData } from "../../utils/apiUtils"; 

const state = {
  categories: [], // Todas las categorías traídas de la API
  filteredCategories: [], // Resultados filtrados según la búsqueda
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
    state.filteredCategories = categories; // Inicializa filteredCategories con todas las categorías
  },
  SET_FILTERED_CATEGORIES(state, filteredCategories) {
    state.filteredCategories = filteredCategories;
  },
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      const response = await fetchCategoryData(); // Obtener todas las categorías desde la API
      commit('SET_CATEGORIES', response); // Guardar en el estado
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
  allCategories: state => state.categories, // Obtener todas las categorías
  filteredCategories: state => state.filteredCategories, // Obtener categorías filtradas
};

export default {
  namespaced: true, // Para permitir usar 'categories/' como namespace
  state,
  mutations,
  actions,
  getters,
};
