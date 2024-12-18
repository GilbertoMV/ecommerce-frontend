<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <component :is="layout"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const adminLayout = () => import('../layouts/adminLayout.vue');
const mainLayout = () => import('../layouts/userLayout.vue');

export default {
  name: 'App',
  computed: {
    ...mapGetters('theme', ['isDarkMode']),
    ...mapGetters('fontSize', ['scale']), // Accedemos a 'scale' desde Vuex
    layout() {
      if (this.$route.path.startsWith('/admin')) {
        return adminLayout;
      }
      return mainLayout;
    }
  },
  watch: {
    scale(newFactor) { // Usamos 'scale' en lugar de 'scaleFactor'
      const root = document.documentElement;
      root.style.setProperty('--font-size-bigest', `${1.8 * newFactor}rem`);
      root.style.setProperty('--font-size-big', `${1.6 * newFactor}rem`);
      root.style.setProperty('--font-size-medium', `${1.4 * newFactor}rem`);
      root.style.setProperty('--font-size-small', `${1.2 * newFactor}rem`);
      root.style.setProperty('--font-size-smallest', `${1 * newFactor}rem`);
      localStorage.setItem('scaleFactor', newFactor); // Guardamos el factor en localStorage
    }
  },
  mounted() {
    const savedScaleFactor = localStorage.getItem('scaleFactor') || 1;
    this.$store.commit('fontSize/SET_SCALE_FACTOR', parseFloat(savedScaleFactor));
  }
}
</script>