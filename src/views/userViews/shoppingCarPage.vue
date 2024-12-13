<template>
    <main>
        <orderResume />
    </main>
</template>
<script>
const orderResume = () => import('../../components/userComponents/orderResumeComponent.vue')
export default {
    name: 'shoppingCar',
    components: {
        orderResume
    }
}
</script>
