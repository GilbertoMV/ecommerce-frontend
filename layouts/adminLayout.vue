<template>
    <div>
        <loaderComponent v-if="isLoading" />
        <router-view />
    </div>
</template>
<script>
import loaderComponent from '../src/components/mainComponents/loaderComponent.vue'
export default {
    name: 'DashboardAdmin',
    components: {
        loaderComponent
    },
    computed: {
        isLoading() {
            return this.$store.state.loading;
        },
    }
}

</script>
<style scoped></style>