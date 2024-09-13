<template>
    <div>
        <loaderComponent v-if="isLoading" />
        <topBar />
        <bottomBar />
        <router-view />
        <footerBar />
    </div>
</template>
<script>
const topBar = () => import("../src/components/mainComponents/topBar.vue")
const bottomBar = () => import("../src/components/mainComponents/bottomBar.vue")
const footerBar = () => import("../src/components/mainComponents/footerBar.vue")
const loaderComponent = () => import("../src/components/mainComponents/loaderComponent.vue")
export default {
    name: 'mainLayout',
    computed: {
        isLoading() {
            return this.$store.state.loading;
        },
    },
    components: {
        topBar,
        bottomBar,
        footerBar,
        loaderComponent
    },
}
</script>