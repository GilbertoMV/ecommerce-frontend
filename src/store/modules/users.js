import apiClient from "../auth-vuex";
const state = {
    usersData: [],
    filteredUserData: [],
    totalUsers: 0,
    currentPage: 1,
    totalPages: 0
};

const mutations = {
    SET_ALL_USER_DATA(state, {usersData, totalUsers, currentPage, totalPages}) {
        state.usersData = usersData; 
        state.filteredUserData = usersData; 
        state.totalUsers = totalUsers;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
    },
    SET_FILTERED_ALL_USER_DATA(state, filteredUserData) {
        state.filteredUserData = filteredUserData;
    },
    UPDATE_USER_STATE(state, updatedUser) {
        const userIndex = state.usersData.findIndex(user => user.id_usuario === updatedUser.id_usuario);
        if (userIndex !== -1) {
            state.usersData[userIndex].estado_cuenta = updatedUser.estado_cuenta;
            state.filteredUserData[userIndex].estado_cuenta = updatedUser.estado_cuenta;
        }
    }
};

const actions = {
    async fetchAllUsers({ commit }, { page = 1, limit = 7}) {
        try {
            const response = await apiClient.get(`/users?page=${page}&limit${limit}`);
            commit('SET_ALL_USER_DATA', {
                usersData: response.data.users,
                totalUsers: response.data.totalUsers,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
            });
        } catch (error) {
            console.error('Error fetching users data: ', error); 
        }
    },
    filterUserData({ commit, state }, searchTerm) {
        const search = searchTerm.toLowerCase();

        const filtered = state.usersData.filter(userData => 
            userData.nombre.toLowerCase().includes(search) ||
            userData.apellido_paterno.toLowerCase().includes(search) ||
            userData.apellido_materno.toLowerCase().includes(search) ||
            userData.correo.toLowerCase().includes(search) ||
            userData.id_usuario.toString().includes(search)
        );
        commit('SET_FILTERED_ALL_USER_DATA', filtered); 
    }
};

const getters = {
    allUsersData: state => state.usersData,
    filteredUserData: state => state.filteredUserData,
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    totalUsers: state => state.totalUsers
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
