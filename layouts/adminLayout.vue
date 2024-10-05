<template>
    <div>
        <topBar />
        <loaderComponent v-if="isLoading" />
        <router-view />
    </div>
</template>
<script>
import loaderComponent from '../src/components/mainComponents/loaderComponent.vue';
import topBar from '../src/components/mainComponents/topBar.vue'
export default {
    name: 'DashboardAdmin',
    components: {
        loaderComponent,
        topBar
    },
    computed: {
        isLoading() {
            return this.$store.state.loading;
        },
    }
}

</script>
<style scoped></style>