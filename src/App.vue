<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <component :is="layout"></component>
  </div>
</template>

<script>
const adminLayout = () => import('../layouts/adminLayout.vue');
const mainLayout = () => import('../layouts/mainLayout.vue');
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