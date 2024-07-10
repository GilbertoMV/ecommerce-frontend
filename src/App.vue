<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <loaderComponent v-if="isLoading" /> <!--Solo si esta en estado de carga se muestra-->
    <topBar />
    <bottomBar />
    <router-view />
    <footerBar />
  </div>
</template>

<script>
import topBar from "./components/mainComponents/topBar.vue";
import bottomBar from "./components/mainComponents/bottomBar.vue";
import footerBar from "./components/mainComponents/footerBar.vue";
import loaderComponent from "./components/mainComponents/loaderComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    ...mapGetters(['isDarkMode'])
  },
  components: {
    topBar,
    bottomBar,
    footerBar,
    loaderComponent
  },
}
</script>