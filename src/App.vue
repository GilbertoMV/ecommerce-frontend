<template>
  <div id="app">
    <topBar />
    <bottomBar />
    <router-view />
  </div>
</template>

<script>
import topBar from "./components/topBar.vue"
import bottomBar from "./components/bottomBar.vue"
export default {
  name: 'App',
  components: {
    topBar,
    bottomBar
  }
}
</script>
