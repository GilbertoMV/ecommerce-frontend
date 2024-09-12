<template>
    <div class="userProfile">
        <sidebarComponent :title="title" :options="userOptions" />
        <div class="loadComponent">
            <router-view />
        </div>
    </div>
</template>
<script>
const sidebarComponent = () => import('../../components/mainComponents/sidebarComponent.vue');
export default {
    name: 'userProfile',
    components: {
        sidebarComponent
    },
    data() {
        return {
            title: 'My Account',
            userOptions: [
                { label: "Profile", route: '/user/profile', icon: 'userIcon', menu: false },
                { label: 'My Orders', route: '/user/my-orders', icon: 'ordersIcon', menu: false },
                { label: 'Rewards', route: '/user/rewards', icon: 'rewardsIcon', menu: false },
                { label: 'Address', route: '/user/address', icon: 'addressIcon', menu: false },
                { label: 'Security', route: '/user/security', icon: 'securityIcon', menu: false },
                { label: 'Accessibility', route: '/user/accessibility', icon: 'accessibilityIcon', menu: false },
                { label: 'Privacy', route: '/user/privacy', icon: 'privacyIcon', menu: false },
                { label: 'Support', route: '/user/support', icon: 'supportIcon', menu: false }
            ]
        }
    }
}
</script>
