<template>
    <main>
        <bannerCategory :name="categoryDetails.nombre" :description="categoryDetails.descripcion"
            :url="categoryDetails.url_imagen" />
        <div class="principal">
            <aside class="listFilters">
                <h2 class="filters__title">Search Filters:</h2>
                <filtersComponent />
            </aside>
            <section class="listMain">
                <h3 class="filters__title">Results:</h3>
                <div class="listProduct">
                    <productCard />
                    <productCard />
                    <productCard />
                    <productCard />
                    <productCard />
                    <productCard />
                    <productCard />
                    <productCard />
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import bannerCategory from '../../components/categoriesComponents/bannerCategoryComponent.vue'
import productCard from '../../components/mainComponents/productCardComponent.vue';
import filtersComponent from '../../components/mainComponents/filtersComponent.vue';
export default {
    name: 'CategoriesPage',
    components: {
        bannerCategory,
        productCard,
        filtersComponent
    },
    props: ['categoryId'],
    data() {
        return {
            categoryDetails: []
        }
    },
    watch: {
        '$route.params.categoryId'(newVal) {
            this.fetchCategoryDetails(newVal)
        }
    },
    created() {
        const id_category = Number(this.categoryId)
        this.fetchCategoryDetails(id_category)
    },
    methods: {
        fetchCategoryDetails(id) {
            const categoriesData = JSON.parse(localStorage.getItem('categoryData') || '[]')
            const searchId = id;
            this.categoryDetails = categoriesData.find(category => category.id_categoria === searchId)
        }
    }
}
</script>
