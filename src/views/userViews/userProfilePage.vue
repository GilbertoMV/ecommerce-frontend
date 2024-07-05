<template>
    <div class="userProfile">
        <sidebarUser @change-component="setActiveComponent" />
        <div class="loadComponent">
            <accesibilityConfig v-if="activeComponent === 'accesibilityComponent'" />
            <infoUser v-if="activeComponent === 'infoUser'"></infoUser>
            <addressComponent v-if="activeComponent === 'addressComponent'" />
        </div>
    </div>
</template>
<script>
import infoUser from '../../components/userComponents/infoUser.vue'
import sidebarUser from '../../components/userComponents/sidebarUser.vue';
import accesibilityConfig from '../../components/userComponents/accesibilityComponent.vue'
import addressComponent from '../../components/userComponents/addressComponent.vue'
export default {
    name: 'userProfile',
    components: {
        infoUser,
        sidebarUser,
        accesibilityConfig,
        addressComponent
    },
    data() {
        return {
            activeComponent: 'infoUser'
        }
    },
    methods: {
        setActiveComponent(component) {
            this.activeComponent = component
        }
    }
}
</script>
