<template>
    <div>
        <form @submit.prevent="signIn" class="account-form">
            <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label"
                :name="field.name" v-model="formData[field.name]" />
            <div class="account-form__logs">
                <div class="account-form__error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">email is
                    required</div>
                <div class="account-form__error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">email is
                    invalid</div>
                <div class="account-form__error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">
                    password is required
                </div>
            </div>
            <router-link to="/userConfig/forgetPassword" class="account-form__forget-password">Do you forget your
                password?</router-link>
            <button class="account-form__button-login">Login</button>
            <span class="account-form__register-link">Don't have an account? <router-link
                    to="/sign-up">Signup</router-link></span>
        </form>
        <div class="divider">
            <div class="divider__line"></div>
            <span class="divider__text">Or</span>
            <div class="divider__line"></div>
        </div>
        <div class="oauth">
            <button @click="signInFacebook" class="oauth__button oauth__button--facebook">
                <facebookIcon /> Login with Facebook
            </button>
            <!-- <button class="oauth__button oauth__button--google">
                <googleIcon /> Login with Google
            </button> -->
        </div>
    </div>

</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import apiClient from '../store/auth-vuex';
import { jwtDecode } from 'jwt-decode';


const formInput = () => import('./formInput.vue');
const facebookIcon = () => import('./icons/facebookIcon.vue');
// const googleIcon = () => import('./icons/googleIcon.vue')
export default {
    name: 'SignInForm',
    components: {
        formInput,
        facebookIcon,
        // googleIcon
    },
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            fields: [
                { name: 'email', type: 'email', label: 'Email' },
                { name: 'password', type: 'password', label: 'Password' }
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
            this.$store.dispatch('loader/setLoading', true);  // Activar loader al inicio
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        text: "Error when logging in, invalid data",
                        width: 'auto',
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return;
                }
                const response = await apiClient.post("/login", {
                    correo: this.formData.email,
                    contrasena: this.formData.password
                });
                if (response.data.token) {
                    sessionStorage.setItem('token', response.data.token);
                    this.$store.dispatch('session/updateAuthenticationStatus', true);
                    // Decodifica el token para obtener el tipo de cuenta
                    const decodedToken = jwtDecode(response.data.token);
                    this.$store.commit('session/SET_ACCOUNT_TYPE', decodedToken.cuenta);

                    await this.$store.dispatch('session/fetchAndSetUserData');
                    this.$router.push('/');
                }
            } catch (error) {
                let errorMessage = "Login failed";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ": " + error.response.data.message;
                }
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                    width: 'auto',
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('loader/setLoading', false);  // Desactivar loader al final, independientemente del resultado
            }
        },
        async signInFacebook() {
            const response = await apiClient.post('/facebook')
            console.log(response)
        }
    }
}
</script>

<style scoped></style>