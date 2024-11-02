// Importa la función para obtener datos de usuarios desde la API.
import { fetchAllUsersData } from '../../utils/apiUtils';

// Estado inicial del módulo Vuex.
const state = {
    // Almacena todos los datos de los usuarios.
    usersData: [],
    // Almacena los datos de los usuarios filtrados según el término de búsqueda.
    filteredUserData: []
};

// Mutaciones del estado que permiten modificarlo de manera sincronizada.
const mutations = {
    // Establece todos los datos de los usuarios en el estado.
    SET_ALL_USER_DATA(state, usersData) {
        state.usersData = usersData; // Guarda los datos de usuarios en el estado.
        state.filteredUserData = usersData; // También establece los datos filtrados inicialmente como todos los datos.
    },
    // Establece los datos filtrados de usuarios en el estado.
    SET_FILTERED_ALL_USER_DATA(state, filteredUserData) {
        state.filteredUserData = filteredUserData; // Actualiza los datos filtrados en el estado.
    },
    // Actualiza el estado de un usuario específico.
    UPDATE_USER_STATE(state, updatedUser) {
        // Busca el índice del usuario que se desea actualizar.
        const userIndex = state.usersData.findIndex(user => user.id_usuario === updatedUser.id_usuario);
        // Si se encuentra el usuario, actualiza su estado.
        if (userIndex !== -1) {
            state.usersData[userIndex].estado_cuenta = updatedUser.estado_cuenta; // Actualiza el estado del usuario en el estado completo.
            state.filteredUserData[userIndex].estado_cuenta = updatedUser.estado_cuenta; // Actualiza el estado del usuario en los datos filtrados.
        }
    }
};

// Acciones del módulo que pueden contener lógica asíncrona y llamadas a mutaciones.
const actions = {
    // Obtiene todos los usuarios desde la API y guarda los datos en el estado.
    async fetchAllUsers({ commit }) {
        try {
            const response = await fetchAllUsersData(); // Llama a la función para obtener los datos de usuarios.
            commit('SET_ALL_USER_DATA', response); // Comitea los datos obtenidos a la mutación para establecerlos en el estado.
        } catch (error) {
            console.error('Error fetching users data: ', error); // Maneja cualquier error que ocurra durante la obtención de datos.
        }
    },
    // Filtra los datos de usuarios según el término de búsqueda.
    filterUserData({ commit, state }, searchTerm) {
        const search = searchTerm.toLowerCase(); // Convierte el término de búsqueda a minúsculas para facilitar la comparación.

        // Filtra los usuarios basándose en el nombre, apellido, correo o id.
        const filtered = state.usersData.filter(userData => 
            userData.nombre.toLowerCase().includes(search) ||
            userData.apellido_paterno.toLowerCase().includes(search) ||
            userData.apellido_materno.toLowerCase().includes(search) ||
            userData.correo.toLowerCase().includes(search) ||
            userData.id_usuario.toString().includes(search)
        );
        commit('SET_FILTERED_ALL_USER_DATA', filtered); // Comitea los usuarios filtrados a la mutación para actualizar el estado.
    }
};

// Getters para obtener datos del estado.
const getters = {
    allUsersData: state => state.usersData, // Devuelve todos los datos de usuarios.
    filteredUserData: state => state.filteredUserData // Devuelve los datos de usuarios filtrados.
};

// Exporta el módulo Vuex.
export default {
    namespaced: true, // Activa el modo namespaced para el módulo.
    state,
    mutations,
    actions,
    getters
};
