<template>
    <article class="product">
        <figure class="product__image">
            <img src="https://res.cloudinary.com/koalamarket/image/upload/v1731464352/h6keqmg8x6elirasfjli.webp"
                alt="Silla de Oficina">
        </figure>
        <div class="product__info">
            <header>
                <h4 class="product__title">Silla de Oficina</h4>
            </header>
            <section class="product__data">
                <p class="carbonFootprint">120 CO₂e</p>
                <p class="rewardsPoints">100 pts</p>
            </section>
            <footer class="product__actions">
                <p class="product__price">$1,200</p>
                <button class="product__button">
                    <shoppingCarIcon /> Add to car
                </button>
            </footer>
        </div>
    </article>

</template>
<script>
import shoppingCarIcon from '../icons/shoppingcarIcon.vue'
export default {
    name: 'productCardComponent',
    components: {
        shoppingCarIcon
    }
}
</script>

<style>
/* Contenedor principal de la tarjeta */
.product {
    display: flex;
    flex-direction: column;
    min-width: 22rem;
    width: 22rem;
    max-width: 22rem;
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
    padding: 1.5rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Título del producto */
.product__title {
    font-size: var(--font-size-medium);
    margin: 0;
    color: var(--text-color-title);
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
    border: dotted .1rem var(--primary-color);
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
    font-size: var(--font-size-big);
    color: var(--text-color-title);
}

.product__button {
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: .5rem;
    padding: 1rem;
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
        min-width: 18rem;
        width: 18rem;
        max-width: 18rem;
    }

    .product__image {
        height: 20rem;
    }

    .product__info {
        gap: .5rem;
    }

    .product__title {
        font-size: var(--font-size-small);
        overflow: hidden;
    }

    .carbonFootprint {
        font-size: var(--font-size-smallest);
    }
}
</style>