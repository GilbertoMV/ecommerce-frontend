<template>
    <main>
        <div class="login-register-view">
            <h1>LOGIN</h1>
            <loginForm />
        </div>
    </main>
</template>

<script>
const loginForm = () => import('../../components/loginForm.vue');
export default {
    name: 'LoginPage',
    components: {
        loginForm
    }
}
</script>
