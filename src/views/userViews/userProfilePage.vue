<template>
    <div class="userProfile">
        <sidebarComponent :options="userOptions" />
        <div class="loadComponent">
            <router-view />
        </div>
    </div>
</template>
<script>
import sidebarComponent from '../../components/mainComponents/sidebarComponent.vue'

export default {
    name: 'userProfile',
    components: {
        sidebarComponent
    },
    data() {
        return {
            userOptions: [
                { name: 'profile', label: "Profile", route: '/user/profile', icon: 'userIcon' },
                { name: 'orders', label: 'My Orders', route: '/user/my-orders', icon: 'ordersIcon' },
                { name: 'rewards', label: 'Rewards', route: '/user/rewards', icon: 'rewardsIcon' },
                { name: 'address', label: 'Address', route: '/user/address', icon: 'addressIcon' },
                { name: 'security', label: 'Security', route: '/user/security', icon: 'securityIcon' },
                { name: 'accessibily', label: 'Accessibility', route: '/user/accessibility', icon: 'accessibilityIcon' },
                { name: 'privacy', label: 'Privacy', route: '/user/privacy', icon: 'privacyIcon' },
                { name: 'support', label: 'Support', route: '/user/support', icon: 'supportIcon' },

            ]
        }
    }
}
</script>
