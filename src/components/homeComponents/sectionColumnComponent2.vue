<template>
    <section class="productSectionColumns">
        <div class="productSectionColumns__column--big">
            <h3 class="productSectionColumns__title"> {{ title }}</h3>
            <!-- Aqui van varios productos o banner grande -->
            <productCardComponent />
        </div>
        <div class="productSectionColumns__column--small">
            <h3 class="productSectionColumns__title"> {{ titleProductSpecial }}</h3>
            <!-- Aqui va 1 solo producto especial o banner -->
            <div class="specialProduct">
                <productCardComponent />
            </div>

        </div>
    </section>
</template>
<script>
import productCardComponent from '../mainComponents/productCardComponent.vue';


export default {
    name: 'productsectionComponent2',
    components: {
        productCardComponent
    },
    props: {
        title: {
            type: String,
            required: true
        },
        titleProductSpecial: {
            type: String,
            required: true
        }
    }
}
</script>

<style scooped>
.productSectionColumns {
    display: flex;
    justify-content: center;
    width: 70vw;
    height: auto;
    min-height: 35rem;
    gap: 2rem;
}

.productSectionColumns__column--small,
.productSectionColumns__column--big {
    width: 30%;
    background-color: var(--primary-background-color);
    border-radius: 1.5rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.productSectionColumns__column--big {
    width: 70%;
}

.productSectionColumns__column--small {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.specialProduct {
    display: flex;
    justify-content: center;
}
</style>