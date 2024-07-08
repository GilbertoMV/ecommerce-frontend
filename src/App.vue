<template>
  <div id="app">
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
import loaderComponent from "./components/loaderComponent.vue";

export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.loading;
    }
  },
  components: {
    topBar,
    bottomBar,
    footerBar,
    loaderComponent
  }
}
</script>