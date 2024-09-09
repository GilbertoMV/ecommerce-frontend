<template>
    <div>
        <sidebarComponent />
    </div>
</template>

<script>
const sidebarComponent = () => import('../../components/mainComponents/sidebarComponent.vue')
export default {
    name: 'DashboardAdmin',
    components: {
        sidebarComponent
    }
}

</script>
<style scoped></style>