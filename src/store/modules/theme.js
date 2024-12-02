const state = {
    darkMode: localStorage.getItem('darkmode') === 'true'
}

const mutations = {
    SET_DARKMODE(state, value) {
        state.darkMode = value;
        localStorage.setItem('darkmode', value);
    }
}

const actions = {
    toggleDarkMode({ commit, state }) {
        commit('SET_DARKMODE', !state.darkMode);
    }
}

const getters = {
    isDarkMode: state => state.darkMode
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}