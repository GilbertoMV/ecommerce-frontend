<template>
    <button class="payment" @click="createPaymentPreference">
        <mercadoPagoIcon /> Pay with Mercado Pago
    </button>
</template>
<script>
import apiClient from '../../store/auth-vuex';
import mercadoPagoIcon from '../icons/mercadoPagoIcon.vue'

export default {
    name: 'buttonPaymentComponent',
    components: {
        mercadoPagoIcon
    },
    data() {
        return {
            paymentLink: ''
        }
    },
    props: {
        total: {
            type: String,
            required: true
        }
    },
    methods: {
        async createPaymentPreference() {
            try {
                const response = await apiClient.post('/pago', {
                    title: 'Producto de ejemplo',
                    quantity: 1,
                    unit_price: this.total, // Precio del producto
                });

                // Una vez que se obtiene la respuesta, redirigimos al cliente al enlace de pago
                this.paymentLink = response.data.link;
                window.location.href = this.paymentLink; // Redirigir al cliente a la pasarela de pago
            } catch (error) {
                console.error('Error al crear la preferencia de pago:', error);
                alert('Hubo un error al generar el enlace de pago');
            }
        }
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