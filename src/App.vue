<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <component :is="layout"></component>
  </div>
</template>

<script>
import adminLayout from '../layouts/adminLayout.vue';
import mainLayout from '../layouts/mainLayout.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isDarkMode']),
    layout() {
      if (this.$route.path.startsWith('/admin')) {
        return adminLayout;
      }
      return mainLayout;
    }
  }

}
</script>