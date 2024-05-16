<template>
    <form @submit.prevent="signIn">
        <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label" :name="field.name"
            v-model="formData[field.name]" />
        <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">email is required</div>
        <div class="error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">email is invalid</div>
        <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">password is required
        </div>

        <button type="submit">Sign In</button>
    </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import formInput from './formInput.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name: 'SignInForm',
    components: {
        formInput,
    },
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            fields: [
                { name: 'email', type: 'email', label: 'email' },
                { name: 'password', type: 'password', label: 'password' }
            ]
        }
    },
    validations: {
        formData: {
            email: { required, email, minLength: minLength(3) },
            password: { required }
        }
    },
    methods: {
        async signIn() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error when loggin in, invalid data",
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return;

                }
                const response = await axios.post('https://back-end-production-c8eb.up.railway.app/login', {
                    correo: this.formData.email,
                    contrasena: this.formData.password
                });
                // console.log(response)
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    this.$store.dispatch('updateAuthenticationStatus', true);
                    await this.$store.dispatch('fetchAndSetUserData');
                    this.$router.push('/');
                }
            } catch (error) {
                let errorMessage = "Login failed";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ": " + error.response.data.message;
                }
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        },
        async fetchUserData() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://back-end-production-c8eb.up.railway.app/user/me/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.$store.dispatch('fetchUserData', response.data);
            } catch (error) {
                let errorMessage = "error";
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage += ": " + error.response.data.error;
                }
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        }


    }
}
</script>

<style scoped>
form {
    margin-top: 10px;
}

button {
    padding: 10px 15px;
    background-color: #62ab18;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #4a8b14;
}

.error {
    color: red;
    padding: 5px 0;
}
</style>