<template>
    <article class="product">
        <figure class="product__image">
            <img :src="url" :alt="name">
        </figure>
        <div class="product__info">
            <header>
                <h4 class="product__title">{{ name }}</h4>
            </header>
            <section class="product__description">{{ description }} </section>
            <section class="product__data">
                <p class="carbonFootprint">{{ cf }} CO₂e</p>
                <p class="rewardsPoints">{{ rwp }} Rewards Points</p>
            </section>
            <footer class="product__actions">
                <p class="product__price">${{ price }} MXN</p>
                <button class="product__button" @click="handleAddToCart">
                    <shoppingCarIcon /> Add to cart
                </button>
            </footer>
        </div>
    </article>

    <!-- Paginacion proxima a traer -->
    <!-- <div class="pagination">
            <button class="pagination__button" @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1">Last</button>
            <span class="pagination__text">Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="pagination__button" @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages">Next</button>
        </div> -->
</template>
<script>
import shoppingCarIcon from '../icons/shoppingcarIcon.vue';
import { addToCart } from '../../utils/apiUtils.js'
import { mapGetters } from 'vuex';

export default {
    name: 'listProductComponent',
    components: {
        shoppingCarIcon,
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
.product {
    display: flex;
    height: 18rem;
    min-height: 18rem;
    border-bottom: .1rem solid var(--separators-color);
    padding: 1.5rem;
    gap: 1rem;
    cursor: pointer;
}

.product:last-of-type {
    border: none;
}

.product__image {
    width: 25rem;
    min-width: 25rem;
    height: 100%;
    overflow: hidden;
}

.product__image img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.product__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    overflow: hidden;
}

.product__title {
    font-size: var(--font-size-bigest);
    font-weight: 500;
    color: var(--text-color-title);
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

.product__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carbonFootprint {
    font-size: var(--font-size-medium);
    color: var(--primary-color);
    border: solid .1rem var(--primary-color);
    padding: .7rem 1rem;
    border-radius: .5rem;
    /* Color para la huella de carbono */
}

.rewardsPoints {
    font-size: var(--font-size-small);
    color: red;
}

.product__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product__price {
    font-size: var(--font-size-bigest);
    color: var(--text-color-title);
}

.product__button,
.pagination__button {
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 1rem;
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

.pagination {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.pagination__button {
    font-size: var(--font-size-small);
    margin-right: 0rem;
    padding: 1rem;
    border-radius: .7rem;
}

.pagination__text {
    font-size: var(--font-size-smallest);
    color: var(--text-color-body)
}

@media (width <=768px) {
    .product__image {
        width: 12rem;
        min-width: 12rem;
    }
}

@media (width <=390px) {

    .listProduct,
    .product {
        min-height: 15rem;
    }

    .product {
        height: 15rem;
        padding: 0;
    }

    .product__info {
        gap: .5rem;
    }

    .product__description {
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .product__image {
        width: 10rem;
        min-width: 10rem;
    }

    .product__title {
        font-size: var(--font-size-small);
    }

    .product__description {
        font-size: var(--font-size-smallest)
    }

    .rewardsPoints,
    .carbonFootprint {
        font-size: var(--font-size-smallest);
    }

    .product__price {
        font-size: var(--font-size-medium);
    }

    .product__button {
        font-size: var(--font-size-smallest);
        padding: .7rem;
    }

}
</style>