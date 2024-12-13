<template>
    <div>
        <loaderComponent v-if="loading" />
        <topBar />
        <router-view />
    </div>
</template>
<script>
import loaderComponent from '../src/components/mainComponents/loaderComponent.vue';
import topBar from '../src/components/mainComponents/topBar.vue';
import { mapState } from "vuex";
export default {
    name: 'DashboardAdmin',
    computed: {
        ...mapState('loader', ['loading'])
    },
    components: {
        loaderComponent,
        topBar
    },
}

</script>