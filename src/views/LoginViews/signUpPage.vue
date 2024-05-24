<template>
    <div class="register-view">
        <h1 class="h1">SIGN UP</h1>
        <RegisterForm />
    </div>
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

<style scoped>
.register-view {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.h1 {
    color: #62ab18;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
</style>