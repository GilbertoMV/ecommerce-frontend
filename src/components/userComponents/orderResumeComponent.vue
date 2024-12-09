<template>
    <aside class="details">
        <div class="quantity">
            <h2 class="quantity__subtitle">Product:</h2>
            <p>$100.00</p>
        </div>
        <div class="delivery">
            <h2 class="delivery__subtitle">Delivery:</h2>
            <p>Free</p>
        </div>
        <a class="code">Enter a discount code</a>
        <div class="total">
            <h2 class="total__subtitle">Total:</h2>
            <p>$100.00</p>
        </div>
        <div class="buttonPayment">
            <payButtonComponent />
        </div>
    </aside>
</template>
<script>
import payButtonComponent from '../mainComponents/payButtonComponent.vue'
export default {
    name: 'orderResumeComponent',
    components: {
        payButtonComponent
    }
}
</script>
<style scoped>
.details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--primary-background-color);
    width: 100%;
    height: 20rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    border-radius: 1.5rem;
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
}
</style>