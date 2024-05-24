<template>
  <div id="app">
    <topBar />
    <bottomBar />
    <router-view />
    <footerBar />
  </div>
</template>

<script>
import topBar from "./components/mainComponents/topBar.vue"
import bottomBar from "./components/mainComponents/bottomBar.vue"
import footerBar from "./components/mainComponents/footerBar.vue"
export default {
  name: 'App',
  components: {
    topBar,
    bottomBar,
    footerBar
  }
}
</script>
