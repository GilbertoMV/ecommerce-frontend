<template>
    <main>
        <bannerCategory :name="category ? category.nombre : 'Category Not Found'"
            :description="category ? category.descripcion : 'Please refresh this page or try with other category'"
            :url="category?.url_imagen" />
        <div class="principal">
            <aside class="listFilters">
                <h2 class="filters__title">Search Filters:</h2>
                <filtersComponent />
            </aside>
            <section class="listMain">
                <h3 class="filters__title">Results:</h3>
                <section class="listProduct--log" v-if="products.length === 0">
                    <alertIcon />
                    <span>Not Products Found</span>
                </section>
                <section class="listProduct" v-else>
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
import listProducts from '../../components/mainComponents/productListComponent.vue';
import { fetchProductsByCategories } from '../../utils/apiUtils.js';
import alertIcon from '../../components/icons/alertIcon.vue'

export default {
    name: 'CategoriesPage',
    components: {
        bannerCategory,
        filtersComponent,
        listProducts,
        alertIcon
    },
    props: ['categoryId'],
    data() {
        return {
            category: null,
            products: [],
        };
    },
    watch: {
        //escucha cambios en la ruta
        '$route.params.categoryId': async function (newVal) {
            //si existe un cambio valido
            if (newVal) {
                //primero obtiene los detalles de la categoria
                await this.fetchCategoryDetails(newVal);
                //despues con esos datos hace el fetch de los productos
                await this.fetchProducts();
            }
        },
    },
    created() {
        if (this.categoryId) {
            this.fetchCategoryDetails(this.categoryId);
        } else {
            console.error('No category ID found');
        }
    },
    //evita que el componente se destruya, solo actualiza los datos con los nuevos parametros
    beforeRouteUpdate(to, from, next) {
        this.fetchCategoryDetails(to.params.categoryId);
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
                    await this.fetchProducts();
                } else {
                    console.error('Category not found')
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