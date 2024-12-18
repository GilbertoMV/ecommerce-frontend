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
                <p class="carbonFootprint">
                    <leafIcon />
                    {{ cf }} CO₂e
                </p>
                <p class="rewardsPoints">+{{ rwp }}pts</p>
            </section>
            <footer class="product__actions">
                <p class="product__price">${{ price }}</p>
            </footer>
        </div>
    </article>

</template>
<script>
import leafIcon from '../icons/leafIcon.vue'
export default {
    name: 'productCardComponent',
    components: {
        leafIcon
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
    }
}
</script>

<style scoped>
/* Contenedor principal de la tarjeta */
.product {
    display: flex;
    flex-direction: column;
    min-width: 18rem;
    width: 18rem;
    max-width: 18rem;
    background-color: var(--primary-background-color);
    cursor: pointer;
}

/* Imagen del producto */
.product__image {
    width: 100%;
    height: 15rem;
    overflow: hidden;
    padding-top: 1rem;
}

.product__image img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

/* Información del producto */
.product__info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

/* Título del producto */
.product__title {
    font-size: var(--font-size-medium);
    margin: 0;
    color: var(--text-color-title);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
}

.product__description {
    font-size: var(--font-size-small);
    color: var(--text-color-body);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
    height: 3.3rem;
}

/* Datos del producto (huella de carbono y puntos) */
.product__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carbonFootprint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .3em;
    font-size: var(--font-size-small);
    color: var(--primary-color);
    /* Color para la huella de carbono */
}

.rewardsPoints {
    font-size: var(--font-size-small);
    color: var(--help-color);
    /* Color para los puntos */
}

/* Acciones del producto (precio y botón) */
.product__actions {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: .5rem;
}

.product__price {
    font-size: var(--font-size-bigest);
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
        min-width: 16rem;
        width: 15rem;
        max-width: 15rem;
    }

    .product__image {
        padding: 0;
        height: 10rem;
    }

    .product__info {
        gap: .5rem;
        padding: 0rem 1rem;
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
        width: 12rem;
        max-width: 12rem;
        min-width: 12rem;
    }

    .product__image {
        height: 9rem;
    }

    .product__description {
        font-size: var(--font-size-smallest);
        height: 2.5rem;
    }

    .product__info {
        padding: .5rem 0rem;
    }

    .product__title {
        font-size: var(--font-size-small);
    }

    .carbonFootprint,
    .rewardsPoints {
        font-size: var(--font-size-smallest);
    }

    .product__price {
        font-size: var(--font-size-medium)
    }
}
</style>