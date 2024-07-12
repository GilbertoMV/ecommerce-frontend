<template>
    <main>
        <div class="config-address-view">
            <h1 class="h1">Address Configuration</h1>
            <addressForm />
        </div>
    </main>
</template>
<script>
import addressForm from '../../components/userComponents/profileSettings/addressForm.vue'
export default {
    name: 'configAddressPage',
    components: {
        addressForm
    }
}
</script>