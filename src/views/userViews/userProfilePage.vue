<template>
    <div class="userProfile">
        <sidebarUser />
        <infoUser />
    </div>
</template>
<script>
import infoUser from '../../components/userComponents/infoUser.vue'
import sidebarUser from '../../components/userComponents/sidebarUser.vue';

export default {
    name: 'userProfile',
    components: {
        infoUser,
        sidebarUser
    }
}

</script>