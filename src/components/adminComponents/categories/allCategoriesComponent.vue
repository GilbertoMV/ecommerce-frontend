<template>
    <crudComponent :title="title" :route="route" :data="categoriesList" :columns="columnsTable" />
</template>
<script>
import crudComponent from '../CRUDcomponent.vue';
export default {
    name: 'allCategoriesComponent',
    components: {
        crudComponent
    },
    data() {
        return {
            title: 'All Categories',
            route: '/admin/add-category',
            columnsTable: [
                { label: 'ID', field: 'id' },
                { label: 'Image', field: 'image' },
                { label: 'Name', field: 'name' },
                { label: 'Actions', field: 'actions' }
            ],
            categoriesList: [
                { id: 1, image: '#', name: 'Categoria 1', actions: 'c r u d' },
                { id: 2, image: '#', name: 'Categoria 2', actions: 'c r u d' },
                { id: 3, image: '#', name: 'Categoria 3', actions: 'c r u d' },
                { id: 4, image: '#', name: 'Categoria 4', actions: 'c r u d' },
                { id: 5, image: '#', name: 'Categoria 5', actions: 'c r u d' },
                { id: 6, image: '#', name: 'Categoria 6', actions: 'c r u d' },
                { id: 7, image: '#', name: 'Categoria 7', actions: 'c r u d' },
                { id: 8, image: '#', name: 'Categoria 8', actions: 'c r u d' },
            ]
        }
    }
}
</script>