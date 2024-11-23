import { fetchAllProductsData } from "../../utils/apiUtils";

const state = {
    products: [],
    filteredProducts: []
}

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
        state.filteredProducts = products;
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
        state.filteredProducts = filteredProducts    
    }
}

const actions = {
    async fetchProducts({ commit }) {
        try{
            const response = await fetchAllProductsData();
            commit('SET_PRODUCTS',response);
        }catch(error) {
            console.error('Error fetching product: ', error )
        }
    },
    filterProducts({ commit, state}, searchTerm) {
        const search = searchTerm.toLowerCase();

        const filtered = state.products.filter( product =>
            product.nombre.toLowerCase().includes(search) || //busqueda por nombre
            product.id_producto.toString().includes(search) || //busqueda por id producto
            product.id_categoria.toLowerCase().includes(search) //busqueda por categoria
        );

        commit('SET_FILTERED_PRODUCTS', filtered);
    }
}

const getters = {
    allProducts: state => state.products,
    filteredProducts: state => state.filteredProducts
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}