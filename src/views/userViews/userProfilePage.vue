<template>
    <div class="userProfile">
        <sidebarUser @change-component="setActiveComponent" />
        <div class="loadComponent">
            <accesibilityConfig v-if="activeComponent === 'accesibilityComponent'" />
            <infoUser v-if="activeComponent === 'infoUser'"></infoUser>
        </div>
    </div>
</template>
<script>
import infoUser from '../../components/userComponents/infoUser.vue'
import sidebarUser from '../../components/userComponents/sidebarUser.vue';
import accesibilityConfig from '../../components/userComponents/accesibilityComponent.vue'

export default {
    name: 'userProfile',
    components: {
        infoUser,
        sidebarUser,
        accesibilityConfig
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
