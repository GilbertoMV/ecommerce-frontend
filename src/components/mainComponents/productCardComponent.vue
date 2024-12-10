<template>
    <article class="product">
        <figure class="product__image">
            <img :src="url" :alt="name">
        </figure>
        <div class="product__info">
            <header>
                <h4 class="product__title">{{ name }}</h4>
            </header>
            <section class="product__description"> {{ description }} </section>
            <section class="product__data">
                <p class="carbonFootprint">{{ cf }} CO₂e</p>
                <p class="rewardsPoints">{{ rwp }}pts</p>
            </section>
            <footer class="product__actions">
                <p class="product__price">${{ price }}</p>
                <button class="product__button" @click="handleAddToCart">
                    <shoppingCarIcon /> Add to cart
                </button>
            </footer>
        </div>
    </article>

</template>
<script>
import shoppingCarIcon from '../icons/shoppingcarIcon.vue'
import { addToCart } from '../../utils/apiUtils.js'
import { mapGetters } from 'vuex';

export default {
    name: 'productCardComponent',
    components: {
        shoppingCarIcon
    },
    props: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cf: {
            type: String,
            required: true
        },
        rwp: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
    },
    computed: {
        ...mapGetters('session', ['idUser'])
    },
    methods: {
        handleAddToCart() {
            addToCart(this.id, this.idUser, this.price);
        }
    }
}
</script>

<style scoped>
/* Contenedor principal de la tarjeta */
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
    color: var(--text-color-title);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.product__description {
    font-size: var(--font-size-small);
    color: var(--text-color-body);
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Datos del producto (huella de carbono y puntos) */
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

/* Acciones del producto (precio y botón) */
.product__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
}

.product__price {
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
}

.product__button {
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: .7rem;
    padding: .7rem;
    cursor: pointer;
    font-size: var(--font-size-small);
    display: flex;
    align-items: center;
    transition: .3s all ease-in-out;
}

.product__button:hover {
    background-color: var(--text-color-hover-buttons);
}

@media (width <=768px) {
    .product {
        min-width: 21rem;
        width: 21rem;
        max-width: 18rem;
    }

    .product__image {
        height: 18rem;
    }

    .product__info {
        gap: .5rem;
    }

    .product__title {
        font-size: var(--font-size-small);
        overflow: hidden;
    }

    .product__actions {
        flex-direction: column;
        justify-content: center;
        gap: .5rem;
    }

    .product__button {
        font-size: var(--font-size-smallest);
        padding: .3rem;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .carbonFootprint {
        font-size: var(--font-size-small);
    }
}

@media (width <=485px) {
    .product {
        width: 16rem;
        max-width: 16rem;
        min-width: 16rem;
    }

    .product__image {
        height: 16rem;
    }

    .product__description {
        font-size: var(--font-size-smallest);
    }

    .product__info {
        padding: .5rem 1rem;
    }

    .product__title {
        font-size: var(--font-size-small);
    }

    .carbonFootprint {
        font-size: var(--font-size-smallest);
        padding: .5rem .7rem;
    }

    .product__price {
        font-size: var(--font-size-medium)
    }
}
</style>