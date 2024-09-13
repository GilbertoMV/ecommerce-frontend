<template>
    <div>
        <loaderComponent v-if="isLoading" />
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'DashboardAdmin',
    computed: {
        isLoading() {
            return this.$store.state.loading;
        },
    }
}

</script>
<style scoped></style>