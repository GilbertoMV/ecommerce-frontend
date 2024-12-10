<template>
    <div class="cards-container">
        <div v-for="(product, index) in products" :key="index">
            <article class="product">
                <figure class="product__image">
                    <img :src="product.imagenes[0]" :alt="product.nombre">
                </figure>
                <div class="product__info">
                    <header>
                        <h4 class="product__title">{{ product.nombre }}</h4>
                    </header>
                    <section class="product__data">
                        <p class="carbonFootprint">{{ product.huella_carbono }} CO₂e</p>
                        <p class="rewardsPoints">{{ product.puntos_recompensa }}pts</p>
                    </section>
                    <!-- <footer class="product__actions">
                        <p class="product__price">${{ price }}</p>
                        <button class="product__button" @click="handleAddToCart">
                            <shoppingcarIcon /> Add to cart
                        </button>
                    </footer> -->
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import { fetchProductsByCategories } from '../../utils/apiUtils';
export default {
    name: 'featuresComponent',
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

.product {
    display: flex;
    flex-direction: column;
    min-width: 22rem;
    width: 22rem;
    max-width: 24rem;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    cursor: pointer;

}

/* Imagen del producto */
.product__image {
    width: 100%;
    height: 20rem;
    overflow: hidden;
    padding-top: 1.5rem;
}

.product__image img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

/* Información del producto */
.product__info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: .7rem;
}

/* Título del producto */
.product__title {
    font-size: var(--font-size-medium);
    margin: 0;
    text-align: center;
    color: var(--text-color-title);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.product__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carbonFootprint {
    font-size: var(--font-size-small);
    color: var(--primary-color);
    border: solid .1rem var(--primary-color);
    padding: .7rem 1rem;
    border-radius: .5rem;
    /* Color para la huella de carbono */
}

.rewardsPoints {
    font-size: var(--font-size-smallest);
    color: red;
    /* Color para los puntos */
}

@media (width <=768px) {

    .cards-container {
        transform: translateY(-7rem);
        gap: 1rem;
        width: 90vw;
    }

    .product {
        min-width: 18rem;
        width: 18rem;
        max-width: 18rem;
    }

    .product__image {
        height: 15rem;

    }
}

@media (width <=390px) {

    .cards-container {
        transform: translateY(-4rem);
        gap: 1rem;
        width: 95vw;
    }

    .product {
        min-width: 11rem;
        width: 11rem;
        max-width: 11rem;
    }

    .product__image {
        height: 8rem;

    }

    .product__title {
        font-size: var(--font-size-smallest);
    }

    .product__info {
        padding: .5rem
    }

    .product__data {
        flex-direction: column;
        gap: .5rem;
    }

    .carbonFootprint {
        font-size: var(--font-size-smallest);
        padding: .5rem;
    }
}
</style>