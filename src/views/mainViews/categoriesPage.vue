<template>
    <main>
        <h1>{{ categoryDetails.nombre }}</h1>
    </main>
</template>

<script>
import apiClient from '../../store/auth-vuex';
export default {
    name: 'CategoriesPage',
    props: ['categoryId'],
    data() {
        return {
            categoryDetails: [],
        }
    },
    watch: {
        '$route.params.categoryId'(newVal) {
            this.fetchCategoryDetails(newVal)
        }
    },
    created() {
        this.fetchCategoryDetails(this.categoryId)
    },
    methods: {
        async fetchCategoryDetails(id) {
            try {
                const response = await apiClient.get(`/categories/${id}`);
                this.categoryDetails = response.data;
            } catch (err) {
                console.error('Failed to fetch category details', err);
            }
        }
    }
}
</script>
