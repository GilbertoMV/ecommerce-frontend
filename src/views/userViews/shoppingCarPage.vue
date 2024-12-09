<template>
    <main>
        <div class="principal">
            <section class="listProducts">
                <h3 class="listProducts__title">Products in the shopping cart:</h3>
                <cartProducts />
            </section>
            <aside class="resume">
                <h2 class="resume__title">Order Resume:</h2>
                <orderResume />
            </aside>
        </div>
    </main>
</template>
<script>

import cartProducts from "../../components/userComponents/cartProductsComponent.vue"
import orderResume from "../../components/userComponents/orderResumeComponent.vue";
export default {
    name: 'shoppingCar',
    components: {
        cartProducts,
        orderResume
    }
}
</script>
