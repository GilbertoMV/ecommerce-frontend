<template>
    <crudComponent :title="title" :route="route" :data="attributesList" :columns="columnsTable" />
</template>
<script>
import crudComponent from '../CRUDcomponent.vue';
export default {
    name: 'allAttributesComponent',
    data() {
        return {
            title: 'All Attributes',
            route: '/admin/add-attribute',
            columnsTable: [],
            attributesList: []
        }
    },
    components: {
        crudComponent
    }

}
</script>
<style scoped></style>