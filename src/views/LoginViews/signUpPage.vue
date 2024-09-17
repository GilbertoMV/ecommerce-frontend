<template>
    <main>
        <div class="login-register-view">
            <h1>SIGN UP</h1>
            <RegisterForm />
        </div>
    </main>
</template>

<script>
import RegisterForm from '../../components/registerForm.vue';

export default {
    name: 'RegisterView',
    components: {
        RegisterForm
    }
};
</script>
