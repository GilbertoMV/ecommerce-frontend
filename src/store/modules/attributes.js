import { fetchSizes, fetchColors } from '../../utils/apiUtils'; 
import apiClient from '../auth-vuex';

const state = {
    attributes: [], // Almacenará todos los atributos (tallas y colores)
    filteredAttributes: [], // Estado de la carga: 'loading', 'success', 'error'
};

const mutations = {
    SET_ATTRIBUTES(state, attributes) {
        state.attributes = attributes; // Establece los atributos en el estado
        state.filteredAttributes = attributes;
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
    async fetchAttributes({ commit }) {
        try {
            const sizes = await fetchSizes();
            const colors = await fetchColors();

            const attributes = [
                ...colors.map(color => ({
                    id_color: color.id_color || null, // Asegúrate de que siempre haya un valor
                    nombre: color.nombre,
                    type: 'color'
                })),
                ...sizes.map(size => ({
                    id_talla: size.id_talla || null, // Asegúrate de que siempre haya un valor
                    nombre: size.nombre,
                    type: 'size'
                }))
            ];

            commit('SET_ATTRIBUTES', attributes);
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
    filteredAttributes: state => state.filteredAttributes // Devuelve el estado de carga
};

export default {
  namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
