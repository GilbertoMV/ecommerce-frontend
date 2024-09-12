<template>
    <div>
        <sidebarComponent :title="titleAdmin" :options="adminOptions" />
        <div class="loadComponent">
            <router-view />
        </div>
    </div>
</template>
<script>
const sidebarComponent = () => import('../src/components/mainComponents/sidebarComponent.vue')
export default {
    name: 'DashboardAdmin',
    components: {
        sidebarComponent,
    },
    data() {
        return {
            titleAdmin: 'Dashboard Admin',
            adminOptions: [
                { label: 'New Product', route: '/dasboard/create', icon: 'newProductIcon', menu: false },
                {
                    label: 'Products', icon: 'userIcon', menu: true, opts: [
                        { label: 'Opcion 1', route: '/use/profile' }
                    ]
                },

            ]
        }
    }
}

</script>
<style scoped></style>