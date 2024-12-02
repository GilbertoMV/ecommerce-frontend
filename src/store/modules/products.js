import apiClient from "../auth-vuex";

const state = {
    products: [],
    filteredProducts: [],
    totalProducts: 0,
    currentPage: 1,
    totalPages: 0,
}

const mutations = {
    SET_PRODUCTS(state, {products, totalProducts, totalPages, currentPage}) {
        state.products = products;
        state.filteredProducts = products;
        state.totalProducts = totalProducts;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
        state.filteredProducts = filteredProducts    
    }
}

const actions = {
    async fetchProducts({ commit } , { page = 1, limit = 7}) {
        try{
            const response = await apiClient.get(`/products?page=${page}&limit=${limit}`)
            commit('SET_PRODUCTS', {
                products: response.data.products,
                totalProducts: response.data.totalProducts,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            });
        } catch(error) {
            console.error('Error fetching products: ', error )
        }
    },
    filterProducts({ commit, state}, searchTerm) {
        const search = searchTerm.toLowerCase();

        const filtered = state.products.filter( product =>
            product.nombre.toLowerCase().includes(search) || //busqueda por nombre
            product.id_producto.toString().includes(search) || //busqueda por id producto
            product.id_categoria.toString().includes(search) //busqueda por categoria
        );

        commit('SET_FILTERED_PRODUCTS', filtered);
    }
}

const getters = {
    allProducts: state => state.products,
    filteredProducts: state => state.filteredProducts,
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    totalProducts: state => state.totalProducts
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}