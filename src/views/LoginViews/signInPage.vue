<template>
    <main>
        <div class="login-register-view">
            <h1 class="h1">LOGIN</h1>
            <loginForm />
        </div>
    </main>
</template>

<script>
import loginForm from '../../components/loginForm.vue';
export default {
    name: 'LoginPage',
    components: {
        loginForm
    }
}
</script>
