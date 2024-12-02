<template>
    <section class="listProduct">
        <article v-for="(product, index) in productList" :key="index" class="product">
            <figure class="product__image">
                <img :src="product.image" :alt="product.title">
            </figure>
            <div class="product__info">
                <header>
                    <h4 class="product__title">{{ product.title }}</h4>
                </header>
                <section class="product__description">{{ product.description }} </section>
                <section class="product__data">
                    <p class="carbonFootprint">{{ product.carbonFootprint }} CO₂e</p>
                    <p class="rewardsPoints">{{ product.rewardsPoints }} Rewards Points</p>
                </section>
                <footer class="product__actions">
                    <p class="product__price">${{ product.price }} MXN</p>
                    <button class="product__button">
                        <shoppingCarIcon /> Add to car
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
    </section>
</template>
<script>
import shoppingCarIcon from '../icons/shoppingcarIcon.vue';

export default {
    name: 'listProductComponent',
    components: {
        shoppingCarIcon,
    },
    data() {
        return {
            productList: [
                { image: 'https://http2.mlstatic.com/D_Q_NP_873193-MLU70690340718_072023-P.webp', title: 'Bicicleta de dontaña', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '12', rewardsPoints: '0', price: '100' },
                { image: 'https://officemax.vtexassets.com/arquivos/ids/1349020/63127_1.jpg?v=638158826290600000', title: 'Silla de oficina', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '10', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_630630-MLM71588078978_092023-P.webp', title: 'CeraVe crema', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '28', rewardsPoints: '80', price: '120' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_731289-MLU79048599058_092024-P.webp', title: 'Pantalla de 45" samsung OLED', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '50', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_911090-MLU73905272150_012024-P.webp', title: 'Tableta Xiaomi 13" pulgadas full HD', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_931210-MLM76823570771_062024-P.webp', title: 'Camiseta Polo azul con blanco', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_903515-MLM79307306680_092024-P.webp', title: 'Guantes de latex para cocina', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_861977-MLU76901588090_062024-P.webp', title: 'Laptop lenovo 20" para estudiantes', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_612726-MLU77023115255_062024-P.webp', title: 'Colchon matrimonial con resorte', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
                { image: 'https://http2.mlstatic.com/D_Q_NP_688190-MLU75151642343_032024-P.webp', title: 'Crema para la piel nutrogena', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisciconsequuntur eius id cum totam. Debitis repellendus harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci', carbonFootprint: '120', rewardsPoints: '100', price: '1,200' },
            ]
        }
    }
}
</script>
<style scoped>
.listProduct {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 80vh;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.listProduct .loader {
    width: 7rem;
    height: 7rem;
}

.product {
    display: flex;
    width: 100%;
    height: 18rem;
    min-height: 18rem;
    border-bottom: .1rem solid var(--separators-color);
    padding: 1rem 0rem;
    cursor: pointer;
}

.product:last-of-type {
    border: none;
}

.product__image {
    width: 30rem;
    min-width: 30rem;
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
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
}

.product__title {
    font-size: var(--font-size-bigest);
    font-weight: 500;
    color: var(--text-color-title);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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

.product__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carbonFootprint {
    font-size: var(--font-size-medium);
    color: var(--primary-color);
    border: dotted .1rem var(--primary-color);
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

@media (width <=390px) {
    .product__image {
        width: 10rem;
        min-width: 10rem;
    }

    .product__title {
        font-size: var(--font-size-medium);
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