<template>
    <div class="userProfile">
        <sidebarUser />
        <div class="loadComponent">
            <router-view />
        </div>
    </div>
</template>
<script>
import sidebarUser from '../../components/userComponents/sidebarUser.vue'
export default {
    name: 'userProfile',
    components: {
        sidebarUser
    },
}
</script>
