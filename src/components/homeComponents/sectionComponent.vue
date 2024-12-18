<template>
    <section class="productSection">
        <header class="productSection__header">
            <h3 class="productSection__title"> {{ title }}</h3>
            <router-link :to="{ name: 'categoryPage', params: { categoryId: categoryId } }">Ver todo</router-link>
        </header>
        <div class="productSection__slider">
            <div class="products">
                <div v-for="product in productsCategory" :key="product.id_producto">
                    <productCardComponent :id="product.id_producto.toString()" :name="product.nombre"
                        :url="product.imagenes[0]" :description="product.descripcion"
                        :cf="product.huella_carbono.toString()" :rwp="product.puntos_recompensa.toString()"
                        :price="product.precio" />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import productCardComponent from '../mainComponents/productCardComponent.vue';
import { fetchProductsByCategories } from '../../utils/apiUtils';

export default {
    name: "productSection",
    components: {
        productCardComponent
    },
    props: {
        title: {
            type: String,
            required: true
        },
        categoryId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            productsCategory: []
        }
    },
    async created() {
        try {
            const idCategory = this.categoryId;
            this.productsCategory = await fetchProductsByCategories(idCategory, 6);
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<style scooped>
.productSection {
    display: flex;
    flex-direction: column;
    width: 65vw;
    max-width: 150rem;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    margin: 2rem 1rem;
}

.productSection__title {
    text-align: left;
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
}

.products {
    display: flex;
    justify-content: space-between;
    width: calc(65vw - 4rem);
    max-width: calc(150rem - 4rem);
    gap: 1rem;
    padding: 0rem 2rem 0rem;
    height: 31rem;
    min-height: 31rem;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.productSection__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem;
    margin-bottom: .5rem;
}

.productSection__header a {
    color: var(--primary-color);
    font-size: var(--font-size-small);
}

@media (width < 1800px) {
    .productSection {
        width: 80vw;
    }

    .products {

        width: calc(80vw - 4rem);
    }
}

@media (width <=768px) {
    .productSection {
        width: 90vw;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .productSection__slider {
        padding: 0rem 1.5rem 0rem 1.5rem;
        width: calc(90vw - 3rem);
        overflow-x: hidden;
    }

    .productSection__title {
        font-size: var(--font-size-small);
    }

    .productSection__header {
        margin: 1rem;
    }

    .products {
        width: 100%;
        padding: 1rem 0rem;
        min-height: 21rem;
        height: 21rem;
        max-height: 21rem;
    }

    .products::-webkit-scrollbar {
        display: none;
    }
}

@media (width <=390px) {

    .productSection__header a,
    .productSection__title {
        font-size: var(--font-size-smallest);
    }

    .productSection__slider {
        padding: 0rem 1rem 0rem 1rem;
        width: calc(90vw - 2rem);
        overflow-x: hidden;
    }

    .products {
        padding: 0rem;
        min-height: 20rem;
        height: 20rem;
        max-height: 20rem;
    }
}
</style>