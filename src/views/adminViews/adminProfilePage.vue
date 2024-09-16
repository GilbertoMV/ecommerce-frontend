<template>
    <div class="dashboard">
        <sidebarComponent :title="titleAdmin" :options="adminOptions" />
        <div class="loadComponent">
            <headerDasboard />
            <router-view />
        </div>
    </div>
</template>

<script>
const sidebarComponent = () => import('../../components/mainComponents/sidebarComponent.vue');
const headerDasboard = () => import('../../components/adminComponents/headerComponent.vue');
export default {
    name: 'dashboardAdmin',
    components: {
        sidebarComponent, headerDasboard
    },
    data() {
        return {
            titleAdmin: 'Dashboard Admin',
            adminOptions: [
                { label: 'Home', route: '/admin/dashboard', icon: 'homeIcon', menu: false },
                { label: 'Users', route: '/admin/users', icon: 'userIcon', menu: false },
                {
                    label: 'Products', icon: 'productIcon', menu: true,
                    opts: [
                        { label: 'Add Product', route: '/admin/add-product' },
                        { label: 'Product Catalog', route: '/admin/product-catalog' },
                        { label: 'Product Details', route: '/admin/product-details' },
                    ]
                },
                {
                    label: 'Categories', icon: 'categoryIcon', menu: true,
                    opts: [
                        { label: 'Add Category', route: '/admin/add-category' },
                        { label: 'All Categories', route: '/admin/all-categories' },
                    ]
                },
                {
                    label: 'Attributes', icon: 'attributeIcon', menu: true,
                    opts: [
                        { label: 'Add Attributes', route: '/admin/add-attribute' },
                        { label: 'All Attributes', route: '/admin/all-attributes' },
                    ]
                }, {
                    label: 'Orders', icon: 'ordersIcon', menu: true,
                    opts: [
                        { label: 'All Orders', route: '/admin/all-orders' },
                        { label: 'Orders Detail', route: '/admin/order-details' },
                    ]
                }, {
                    label: 'Rewards', icon: 'rewardsIcon', menu: true,
                    opts: [
                        { label: 'Add Reward', route: '/admin/all-orders' },
                        { label: 'All Rewards', route: '/admin/order-details' },
                    ]
                }
            ]
        };
    }
};
</script>
<style scoped></style>