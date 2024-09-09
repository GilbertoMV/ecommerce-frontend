<template>
    <div>
        <sidebarComponent :options="adminOptions" />
    </div>
</template>
<script>
const sidebarComponent = () => import('../src/components/mainComponents/sidebarComponent.vue')
export default {
    name: 'DashboardAdmin',
    components: {
        sidebarComponent
    },
    data() {
        return {
            adminOptions: [
                { name: 'create', label: 'Create', route: '/user/profile', icon: 'userIcon' }
            ]
        }
    }
}

</script>
<style scoped></style>