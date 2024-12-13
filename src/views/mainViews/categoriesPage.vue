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
                    <div class="temporal" v-for="product in products" :key="product.id_producto">
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
import Swal from 'sweetalert2';

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
            category: null,
            products: [],
        };
    },
    watch: {
        '$route.params.categoryId'(newVal) {
            this.fetchCategoryDetails(newVal);
        }
    },
    methods: {
        async fetchCategoryDetails(id) {
            try {
                this.$store.dispatch('loader/setLoading', true);
                const categoriesData = JSON.parse(localStorage.getItem('categoriesData') || '[]');
                const category = categoriesData.data.find(category => category.id_categoria === id);
                if (category) {
                    this.category = category;
                } else {
                    throw new Error('Categoría no encontrada');
                }
            } catch (error) {
                Swal("Error", "Hubo un problema al cargar los detalles de la categoría", "error");
                console.error(error);
            } finally {
                this.$store.dispatch('loader/setLoading', false);
            }
        },
        async fetchProducts() {
            if (!this.category) {
                return;
            }

            try {
                this.$store.dispatch('loader/setLoading', true);
                const id_category = Number(this.categoryId);
                this.products = await fetchProductsByCategories(id_category, 5);
            } catch (error) {
                Swal("Error", "Hubo un problema al cargar los productos", "error");
                console.error(error);
            } finally {
                this.$store.dispatch('loader/setLoading', false);
            }
        }
    },
    async created() {
        await this.fetchCategoryDetails(this.categoryId);
        await this.fetchProducts();
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchCategoryDetails(to.params.categoryId);
        this.fetchProducts();
        next();
    }
}
</script>