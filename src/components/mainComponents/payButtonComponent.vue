<template>
    <button class="payment">
        <mercadoPagoIcon /> Pay with Mercado Pago
    </button>
</template>
<script>
import mercadoPagoIcon from '../icons/mercadoPagoIcon.vue'

export default {
    name: 'buttonPaymentComponent',
    components: {
        mercadoPagoIcon
    }
}
</script>

<style scoped>
.payment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: #009ee3;
    border: none;
    color: var(--text-color-base);
    cursor: pointer;
    border-radius: .5rem;
    transition: all .3s ease;
    font-size: var(--font-size-small);
    font-weight: 600;
    color: white;
}
</style>