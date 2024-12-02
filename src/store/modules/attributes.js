import apiClient from '../auth-vuex';

const state = {
    attributes: [], // Almacenará todos los atributos (tallas y colores)
    filteredAttributes: [], // Estado de la carga: 'loading', 'success', 'error'
    totalAttributes: 0,
    currentPage: 1,
    totalPages: 0
};

const mutations = {
    SET_ATTRIBUTES(state, {attributes, totalAttributes, currentPage, totalPages}) {
        state.attributes = attributes;
        state.filteredAttributes = attributes;
        state.totalAttributes = totalAttributes;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
    },
    SET_FILTERED_ATTRIBUTES(state, filteredAttributes) {
        state.filteredAttributes = filteredAttributes; 
    },
    REMOVE_ATTRIBUTE(state, attributeId) {
        // Filtra el atributo eliminado por su id y su tipo
        state.attributes = state.attributes.filter(attribute => 
            attribute.id_color !== attributeId && 
            attribute.id_talla !== attributeId
        );
        // También actualiza los atributos filtrados
        state.filteredAttributes = state.filteredAttributes.filter(attribute => 
            attribute.id_color !== attributeId && 
            attribute.id_talla !== attributeId
        );
    }
};

const actions = {
    async fetchAttributes({ commit }, { page = 1, limit = 7}) {
        try {
            const sizes = await apiClient.get(`/sizes?page=${page}&limit=${limit}`);
            const colors = await apiClient.get(`/colors?page=${page}&limit=${limit}`);

            const attributes = [
                ...colors.data.colors.map(color => ({
                    id_color: color.id_color || null, // Asegúrate de que siempre haya un valor
                    nombre: color.nombre,
                    type: 'color'
                })),
                ...sizes.data.sizes.map(size => ({
                    id_talla: size.id_talla || null, // Asegúrate de que siempre haya un valor
                    nombre: size.nombre,
                    type: 'size'
                }))
            ];
            const totalAttributes = sizes.data.totalSizes + colors.data.totalColors 
            commit('SET_ATTRIBUTES', {
                attributes: attributes,
                totalAttributes: totalAttributes,
                totalPages: sizes.data.totalPages,
                currentPage: sizes.data.currentPage
            });
        } catch (error) {
            console.error(error);
        }
    },
    filterAttributes({ commit, state }, searchTerm) {
        const search = searchTerm.toLowerCase();

        const filtered = state.attributes.filter(attribute =>
            attribute.nombre.toLowerCase().includes(search) ||
            attribute.id_color?.toString().includes(search) ||
            attribute.id_talla?.toString().includes(search)
        );
        commit('SET_FILTERED_ATTRIBUTES', filtered)

    },
    async deleteAttribute({ commit }, { attributeId, type }) {
        try {
            // Eliminar en el servidor
            const endpoint = type === 'color' ? `colors/${attributeId}` : `sizes/${attributeId}`;
            await apiClient.delete(endpoint);

            // Actualizar el estado local
            commit('REMOVE_ATTRIBUTE', attributeId);
        } catch (error) {
            console.error('Error deleting the attribute:', error);
        }
    }
};

const getters = {
    allAttributes: state => state.attributes, // Devuelve todos los atributos
    filteredAttributes: state => state.filteredAttributes, // Devuelve el estado de carga
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    totalAttributes: state => state.totalAttributes
};

export default {
  namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
