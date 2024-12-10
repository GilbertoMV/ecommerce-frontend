<template>
    <div class="cards-container">
        <div v-for="(product, index) in products" :key="index">
            <productCardComponent :id="product.id_producto.toString()" :name="product.nombre" :url="product.imagenes[0]"
                :description="product.descripcion" :cf="product.huella_carbono.toString()"
                :rwp="product.puntos_recompensa.toString()" :price="product.precio.toString()" />
        </div>
    </div>
</template>
<script>
import { fetchProductsByCategories } from '../../utils/apiUtils';
import productCardComponent from '../mainComponents/productCardComponent.vue';
export default {
    name: 'featuresComponent',
    components: {
        productCardComponent
    },
    data() {
        return {
            products: [],
        }
    },
    async created() {
        this.$store.dispatch('loader/setLoading', true)
        try {
            this.products = await fetchProductsByCategories(6, 3);
        } catch (error) {
            console.log(error)
        } finally {
            this.$store.dispatch('loader/setLoading', false)
        }
    }
}
</script>
<style scoped>
.cards-container {
    display: flex;
    justify-content: center;
    transform: translateY(-10rem);
    gap: 1.5rem;
    padding: 1rem;
    width: 80vw;
    height: auto;
}

.card {
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    width: 25rem;
    height: 25rem;
    max-height: 25rem;
}

@media (width <=768px) {
    .card {
        width: 15rem;
        height: 15rem;
    }

    .cards-container {
        transform: translateY(-7rem);
        gap: 1rem;
        width: 90vw;
        height: 15rem;
    }
}

@media (width <=390px) {
    .card {
        width: 10rem;
        height: 10rem;
    }

    .cards-container {
        transform: translateY(-4rem);
        gap: 1rem;
        width: 95vw;
        height: 8rem;
    }
}
</style>