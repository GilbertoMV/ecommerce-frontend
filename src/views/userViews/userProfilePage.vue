<template>
    <div class="userProfile">
        <sidebarUser />
        <infoUser />

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import infoUser from '../../components/userComponents/infoUser.vue'
import sidebarUser from '../../components/userComponents/sidebarUser.vue';

export default {
    name: 'userProfile',
    components: {
        infoUser,
        sidebarUser
    },
    computed: {
        ...mapGetters(['username', 'paternalLastName', 'maternalLastName', 'email'])
    },
}

</script>