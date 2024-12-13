<template>
    <div>
        <loaderComponent v-if="loading" />
        <topBar />
        <bottomBar />
        <router-view />
        <footerBar />
    </div>
</template>
<script>
import { mapState } from "vuex";
import topBar from "../src/components/mainComponents/topBar.vue";
import bottomBar from "../src/components/mainComponents/bottomBar.vue";
import footerBar from "../src/components/mainComponents/footerBar.vue";
import loaderComponent from "../src/components/mainComponents/loaderComponent.vue";
export default {
    name: 'mainLayout',
    computed: {
        ...mapState('loader', ['loading'])
    },
    components: {
        topBar,
        bottomBar,
        footerBar,
        loaderComponent
    },
}
</script>