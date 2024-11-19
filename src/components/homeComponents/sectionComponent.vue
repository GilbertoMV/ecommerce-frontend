<template>
    <section class="productSection">
        <header class="productSection__header">
            <h3 class="productSection__title"> {{ title }}</h3>
            <router-link to="/">Ver todo</router-link>
        </header>
        <div class="products">
            <productCardComponent />
            <productCardComponent />
            <productCardComponent />
            <productCardComponent />
            <productCardComponent />
        </div>
    </section>
</template>
<script>
import productCardComponent from '../mainComponents/productCardComponent.vue';

export default {
    name: "productSection",
    components: {
        productCardComponent
    },
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>
<style scooped>
.productSection {
    display: flex;
    flex-direction: column;
    width: 70vw;
    background-color: var(--primary-background-color);
    border-radius: 1.5rem;
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
    width: calc(70vw - 4rem);
    overflow-x: hidden;
    gap: 1rem;
    padding: 0rem 2rem 2rem;
}

.productSection__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
}

.productSection__header a {
    color: var(--primary-color);
    font-size: var(--font-size-small)
}

@media (width <=768px) {
    .productSection {
        width: 90vw;
        margin-top: 1rem;
    }

    .productSection__title {
        font-size: var(--font-size-small);
    }

    .productSection__header {
        margin: 1.5rem;
    }

    .products {
        padding: 0rem 1.5rem 1.5rem 1.5rem;
        width: calc(90vw - 3rem);
        overflow-x: scroll;
    }
}
</style>