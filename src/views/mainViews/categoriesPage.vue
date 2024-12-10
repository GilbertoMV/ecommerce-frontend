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
                <section class="listProduct">
                    <div class="temporal" v-for="(product, index) in products" :key="index">
                        <listProducts :id="product.id_producto.toString()" :name="product.nombre"
                            :url="product.imagenes[0]" :description="product.descripcion"
                            :cf="product.huella_carbono.toString()" :rwp="product.puntos_recompensa.toString()"
                            :price="product.precio.toString()" />
                    </div>
                </section>
            </section>
        </div>
    </main>
</template>

<script>
import bannerCategory from '../../components/categoriesComponents/bannerCategoryComponent.vue'
import filtersComponent from '../../components/mainComponents/filtersComponent.vue';
import { fetchProductsByCategories } from '../../utils/apiUtils.js'
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
            category: [],
            products: [],
        }
    },
    watch: {
        '$route.params.categoryId'(newVal) {
            this.fetchCategoryDetails(newVal)
        }
    },
    methods: {
        fetchCategoryDetails(id) {
            const categoriesData = JSON.parse(localStorage.getItem('categoriesData') || '[]');
            const searchId = id;
            this.category = categoriesData.data.find(category => category.id_categoria === searchId);
        },
        async fetchProducts() {
            this.$store.dispatch('loader/setLoading', true);  // Activar loader
            const id_category = Number(this.categoryId);

            try {
                this.products = await fetchProductsByCategories(id_category, 5);
            } catch (error) {
                console.error(error);
            } finally {
                this.$store.dispatch('loader/setLoading', false);  // Desactivar loader
            }
        }
    },
    created() {
        this.fetchCategoryDetails(this.categoryId);
        this.fetchProducts(); // Cargar productos iniciales
    },
    beforeRouteUpdate(to, from, next) {
        // Recargar productos y categoría cuando la ruta cambie
        this.fetchCategoryDetails(to.params.categoryId);
        this.fetchProducts();
        next();
    }
}
</script>
