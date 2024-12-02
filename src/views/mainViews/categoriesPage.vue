<template>
    <main>
        <bannerCategory :name="category.nombre" :description="category.descripcion" :url="category.url_imagen" />
        <div class="principal">
            <aside class="listFilters">
                <h2 class="filters__title">Search Filters:</h2>
                <filtersComponent />
            </aside>
            <section class="listMain">
                <h3 class="filters__title">Results:</h3>
                <listProducts />
            </section>
        </div>
    </main>
</template>

<script>
import bannerCategory from '../../components/categoriesComponents/bannerCategoryComponent.vue'
import filtersComponent from '../../components/mainComponents/filtersComponent.vue';
import listProducts from '../../components/mainComponents/productListComponent.vue';
export default {
    name: 'CategoriesPage',
    components: {
        bannerCategory,
        filtersComponent,
        listProducts
    },
    props: ['categoryId'],
    data() {
        return {
            category: []
        }
    },
    watch: {
        '$route.params.categoryId'(newVal) {
            this.fetchCategoryDetails(newVal)
        }
    },
    methods: {
        fetchCategoryDetails(id) {
            const categoriesData = JSON.parse(localStorage.getItem('categoriesData') || '[]')
            const searchId = id;
            console.log(categoriesData)
            this.category = categoriesData.data.find(category => category.id_categoria === searchId)
        }
    },
    created() {
        const id_category = Number(this.categoryId)
        this.fetchCategoryDetails(id_category)
    },
}
</script>
