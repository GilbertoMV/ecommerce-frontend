<template>
    <main>
        <div class="config-address-view">
            <h1 class="h1">Address Form</h1>
            <addressForm />
        </div>
    </main>
</template>
<script>
const addressForm = () => import('../../components/userComponents/profileSettings/addressForm.vue')
export default {
    name: 'configAddressPage',
    components: {
        addressForm
    }
}
</script>