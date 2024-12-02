let timer = null;

const state = {
    loading: false
}

const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

const actions = {
    setLoading({commit}, status) {
        clearTimeout(timer);
        timer = setTimeout(() => {
           commit('SET_LOADING', status) 
        }, 500);
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}