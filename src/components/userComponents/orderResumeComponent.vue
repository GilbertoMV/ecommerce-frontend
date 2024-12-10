<template>
    <div class="principal">
        <section class="listProducts">
            <h3 class="listProducts__title">Products in the shopping cart:</h3>
            <div class="emptyCart" v-if="productList.length === 0">
                <h3 class="emptyCart__title">Empty cart</h3>
            </div>
            <div v-else class="listProduct">
                <article v-for="(product, index) in productList" :key="index" class="product">
                    <figure class="product__image">
                        <img :src="product.imagen" :alt="product.nombre">
                    </figure>
                    <div class="product__info">
                        <header>
                            <h4 class="product__title">{{ product.nombre }}</h4>
                        </header>
                        <section class="product__description">{{
                            product.descripcion }} </section>
                        <section class="product__data">
                            <p class="carbonFootprint">{{ product.huella_carbono }} CO₂e</p>
                            <p class="rewardsPoints">{{ product.puntos_recompensas }} Rewards Points</p>
                        </section>
                        <footer class="product__actions">
                            <p class="product__price">${{ product.precio_total }} MXN</p>
                            <div class="addDelete">
                                <counterComponent :initialCount="product.cantidad" :min="1" :max="10"
                                    @update:count="newCount => onCountUpdate(newCount, index)" />
                                <button class="btnDelete" @click="removeProduct(product.id_detalle)">

                                    <trashIcon />
                                </button>
                            </div>
                        </footer>
                    </div>
                </article>
            </div>
            <!-- Paginacion proxima a traer -->
            <!-- <div class="pagination">
            <button class="pagination__button" @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1">Last</button>
            <span class="pagination__text">Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="pagination__button" @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages">Next</button>
        </div> -->
        </section>
        <aside class="resume">
            <h2 class="resume__title">Order Resume:</h2>
            <div class="details">
                <div class="quantity">
                    <h2 class="quantity__subtitle">Product:</h2>
                    <p>${{ cartTotal.toFixed(2) }}</p>
                </div>
                <div class="delivery">
                    <h2 class="delivery__subtitle">Delivery:</h2>
                    <p>Free</p>
                </div>
                <a class="code">Enter a discount code</a>
                <div class="total">
                    <h2 class="total__subtitle">Total:</h2>
                    <p>${{ cartTotal.toFixed(2) }}</p>
                </div>
                <div class="buttonPayment">
                    <payButtonComponent :total="cartTotal.toFixed(2)" />
                </div>
            </div>
        </aside>
    </div>
</template>
<script>
import payButtonComponent from '../mainComponents/payButtonComponent.vue';
import apiClient from '../../store/auth-vuex';
import counterComponent from '../mainComponents/counterComponent.vue';
import trashIcon from '../../components/icons/trashIcon.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'orderResumeComponent',
    components: {
        payButtonComponent,
        counterComponent,
        trashIcon
    },
    data() {
        return {
            productList: [], // Lista completa con detalles de productos
            selectedCount: 1
        }
    },
    computed: {
        ...mapGetters('session', ['idUser']), // Obteniendo el ID del usuario desde Vuex
        cartTotal() {
            // Verifica que los valores sean números válidos
            return this.productList.reduce((total, product) => {
                const precioTotal = Number(product.precio_total) || 0; // Convierte a número o usa 0 como valor por defecto
                return total + precioTotal;
            }, 0); // Inicia el total en 0
        }
    },
    methods: {
        async fetchCarId() {
            try {
                const response = await apiClient.get(`carts/me/${this.idUser}`);
                const cartId = response.data[0]?.id_carrito;
                if (!cartId) throw new Error('Cart ID no encontrado');
                return cartId;
            } catch (error) {
                console.error('Error al obtener el ID del carrito:', error.message);
                throw error;
            }
        },
        async fetchShoppingCar() {
            try {
                const cartId = await this.fetchCarId();
                const response = await apiClient.get(`/carts/cart/${cartId}/details`);
                return response.data; // Devuelve el array con los detalles del carrito
            } catch (error) {
                console.error('Error al obtener los detalles del carrito:', error.message);
                return [];
            }
        },
        onCountUpdate(newCount, productIndex) {
            // Actualiza la cantidad y recalcula el precio del producto
            const product = this.productList[productIndex];
            if (product) {
                product.cantidad = newCount; // Actualiza la cantidad
                product.precio_total = product.precio_unitario * newCount; // Recalcula el precio total
            }
        },
        async removeProduct(detailId) {
            try {
                await apiClient.delete(`carts/${detailId}/details`);
                this.productList = this.productList.filter(product => product.id_detalle !== detailId);
            } catch (error) {
                console.error(`Error al eliminar el producto con ID ${detailId}:`, error.message);
            }
        }
    },
    async created() {
        try {
            const fullShoppingCart = await this.fetchShoppingCar();
            this.productList = fullShoppingCart;
        } catch (error) {
            console.error('Error durante la inicialización:', error.message);
        }
    }
}
</script>
<style scoped>
.details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 20rem;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    padding: 1.5rem 0;
}

.quantity,
.delivery,
.total {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quantity p,
.delivery p {
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
}

.delivery p {
    color: var(--primary-color);
}

.quantity__subtitle,
.delivery__subtitle {
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
}

.total__subtitle {
    font-size: var(--font-size-big);
    color: var(--text-color-title);

}

.total p {
    font-size: var(--font-size-bigest);
    color: var(--text-color-body);

}

.code {
    width: 90%;
    font-size: var(--font-size-small);
    text-align: left;
    color: var(--primary-color);
}

.buttonPayment {
    width: 90%;
}

.product {
    display: flex;
    height: 18rem;
    min-height: 18rem;
    border-bottom: .1rem solid var(--separators-color);
    padding: 1.5rem;
    gap: 1rem;
    cursor: pointer;
}

.emptyCart {
    display: flex;
    height: 23rem;
    min-height: 23rem;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
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
    overflow: hidden;
    gap: 1rem;
}

.product__title,
.emptyCart__title {
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
    color: var(--required-color);
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

.addDelete {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.svg {
    color: var(--required-color);
}

.btnDelete {
    background-color: transparent;
    border: none;
    cursor: pointer;
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
        width: 18rem;
        min-width: 18rem;
    }
}

@media (width <=390px) {

    .quantity__subtitle,
    .delivery__subtitle,
    .total__subtitle {
        font-size: var(--font-size-medium);
    }

    .quantity p,
    .delivery p,
    .quantity__subtitle,
    .delivery__subtitle {
        font-size: var(--font-size-small);
    }

    .total p {
        font-size: var(--font-size-big);

    }

    .code {
        font-size: var(--font-size-smallest);
    }

    .listProduct,
    .product {
        min-height: 15rem;
    }

    .product {
        height: 15rem;
        padding: 1rem;
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


    .product__title,
    .emptyCart__title {
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