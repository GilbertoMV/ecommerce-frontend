const state = {
    scale : 1 //escala inicial
}
const mutations = {
    SET_SCALE_FACTOR(state, factor) {
        state.scale = factor;
    }
}
const actions = {
    setFontSize({ commit }, size) {
        let scale;
        if (size === 'small') {
          scale = 0.8; // Small es 0.2rem menor que medium
        } else if (size === 'large') {
          scale = 1.2; // Large es 0.2rem mayor que medium
        } else {
          scale = 1; // Medium es el valor por defecto
        }
        commit('SET_SCALE_FACTOR', scale);
      }
}
const getters = {
    scale: state => state.scale
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}