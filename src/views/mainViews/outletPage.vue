<template>
    <main>
        <h1>Outlet</h1>
    </main>
</template>
<script>
export default {
    name: 'outletPage',
    created() {
        this.$store.dispatch('loader/setLoading', true);
    }
}
</script>