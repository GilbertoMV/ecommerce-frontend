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
        '$route.params.categoryId': async function (newVal) {
            if (newVal) {
                await this.fetchCategoryDetails(newVal);  // Esperamos que la categoría se cargue
                await this.fetchProducts();  // Llamamos a los productos después de cargar la categoría
            }
        },
    },
    created() {
        if (this.categoryId) {
            this.fetchCategoryDetails(this.categoryId); // Usamos categoryId para buscar la categoría al crear el componente
        } else {
            console.error('No category ID found');
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchCategoryDetails(to.params.categoryId); // Recargamos la categoría cuando la ruta cambia
        next();
    },
    methods: {
        async fetchCategoryDetails(id) {
            try {
                this.$store.dispatch('loader/setLoading', true);
                const categoriesData = JSON.parse(localStorage.getItem('categoriesData') || '[]');
                const category = categoriesData.data.find(category => category.id_categoria.toString() === id.toString());
                if (category) {
                    this.category = category;
                    // Una vez cargada la categoría, llamamos a fetchProducts
                    await this.fetchProducts();
                } else {
                    throw new Error('Categoría no encontrada');
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.$store.dispatch('loader/setLoading', false);
            }
        },
        async fetchProducts() {
            if (!this.category) {
                console.error("Category not found when fetching products");
                return;
            }
            try {
                const id_category = Number(this.category.id_categoria);
                this.products = await fetchProductsByCategories(id_category, 5);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>