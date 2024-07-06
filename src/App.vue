<template>
  <div id="app">
    <topBar />
    <bottomBar />
    <loaderComponent />
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
  components: {
    topBar,
    bottomBar,
    footerBar,
    loaderComponent
  }
}
</script>