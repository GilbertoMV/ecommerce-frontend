<template>
    <div class="cards-container">
        <div v-for="(product, index) in swappedProducts" :key="index">
            <article class="product">
                <figure class="product__image">
                    <img :src="product.imagenes[0]" :alt="product.nombre">
                </figure>
                <div class="product__info">
                    <header>
                        <h4 class="product__title">{{ product.nombre }}</h4>
                    </header>
                    <p class="carbonFootprint">
                        <leafIcon />
                        {{ product.huella_carbono }} CO₂e
                    </p>
                    <section class="product__data">
                        <p class="product__price">${{ product.precio }}</p>
                        <p class="rewardsPoints">+{{ product.puntos_recompensa }}pts</p>
                    </section>
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import { fetchProductsByCategories } from '../../utils/apiUtils';
import leafIcon from '../icons/leafIcon.vue'
export default {
    name: 'featuresComponent',
    components: {
        leafIcon
    },
    data() {
        return {
            products: [],
        }
    },
    computed: {
        swappedProducts() {
            if (this.products.length < 3) return this.products;
            const newProducts = [...this.products];
            [newProducts[0], newProducts[1]] = [newProducts[1], newProducts[0]]; // Intercambia posiciones
            return newProducts;
        }
    },
    async created() {
        try {
            this.products = await fetchProductsByCategories(6, 3); //esto debe cambiar a un endpoint que haga el fetch de todos los productos no solo de la cat
        } catch (error) {
            console.log(error)
        }
    }
}
</script>
<style scoped>
.cards-container {
    display: flex;
    justify-content: center;
    transform: translateY(-10rem);
    gap: 3rem;
    padding: 1rem;
    max-width: 80vw;
}

.cards-container>div:nth-child(2) .product {
    min-width: 23rem;
    width: 23rem;
    max-width: 23rem;
    transform: translateY(-3rem);
    transition: transform .3s ease-in-out;
}

.product {
    display: flex;
    flex-direction: column;
    min-width: 20rem;
    width: 20rem;
    max-width: 20rem;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    cursor: pointer;
    padding: 1rem;
    transition: transform .3s ease-in-out;
}


.product:hover {
    transform: translateY(-1rem);
}

.cards-container>div:nth-child(2) .product:hover {
    transform: translateY(-5rem);
}

/* Imagen del producto */
.product__image {
    width: 100%;
    height: 20rem;
    overflow: hidden;
}

.product__image img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

/* Información del producto */
.product__info {
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: .7rem;
}

/* Título del producto */
.product__title {
    font-size: var(--font-size-big);
    margin: 0;
    text-align: center;
    color: var(--text-color-title);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
}

.product__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.carbonFootprint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    font-size: var(--font-size-medium);
    color: var(--primary-color);
    border: solid .1rem var(--primary-color);
    padding: .5rem;
    border-radius: .5rem;
    /* Color para la huella de carbono */
}

.rewardsPoints {
    font-size: var(--font-size-small);
    color: var(--help-color);
}

.product__price {
    font-size: var(--font-size-big);
    color: var(--text-color-title);
}


@media (width <=768px) {
    .cards-container {
        transform: translateY(-3rem);
        gap: 2rem;
    }

    .cards-container>div:nth-child(2) .product {
        min-width: 18rem;
        width: 18rem;
        max-width: 18rem;
    }

    .product {
        min-width: 15rem;
        width: 15rem;
        max-width: 15rem;
    }

    .product__image {
        height: 12rem;
    }

    .product__title {
        font-size: var(--font-size-medium);
    }
}

@media (width <=390px) {

    .cards-container {
        transform: translateY(-1rem);
        gap: 1rem;
        width: 95vw;
    }

    .cards-container>div:nth-child(2) .product {
        min-width: 10rem;
        width: 10rem;
        max-width: 10rem;
        transform: translateY(-2rem);
    }

    .cards-container>div:nth-child(2) .product:hover {
        transform: translateY(-3rem);

    }

    .product {
        min-width: 9rem;
        width: 9rem;
        max-width: 9rem;
        padding: 1rem;
    }

    .product__image {
        height: 9rem;
    }

    .product__title {
        font-size: var(--font-size-smallest);
    }

    .product__info {
        padding: .5rem 0rem 0rem 0rem;
    }

    .product__data {
        display: none;
    }

    .carbonFootprint {
        font-size: var(--font-size-smallest);
        padding: 0rem;
    }

    .carbonFootprint .svg {
        width: 1.5rem;
    }
}
</style>