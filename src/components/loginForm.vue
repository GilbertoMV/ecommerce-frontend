<template>
    <div>
        <form @submit.prevent="signIn">
            <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label"
                :name="field.name" v-model="formData[field.name]" />
            <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">email is required</div>
            <div class="error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">email is invalid</div>
            <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">password is required
            </div>
            <router-link to="/userConfig/forgetPassword" class="forgetPass">Do you forget your password?</router-link>
            <button class="login">Login</button>
            <span class="register">Don't have an account? <router-link to="/sign-up">Signup</router-link></span>
        </form>
        <div class="divider">
            <div class="line"></div>
            <div><span class="text">Or</span></div>
            <div class="line"></div>
        </div>
        <div class="login-container">
            <button class="login-btn facebook">
                <i class="bi bi-facebook"></i> Login with Facebook
            </button>
            <button class="login-btn google">
                <i class="bi bi-google"></i> Login with Google
            </button>
        </div>
    </div>

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
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error when login in, invalid data",
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
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    this.$store.dispatch('updateAuthenticationStatus', true);
                    await this.$store.dispatch('fetchAndSetUserData');
                    this.$router.push('/');
                    console.log('token ' + response.data.token)
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
    margin-top: 1rem;
    font-size: 1.6rem;
}

.login {
    width: 100%;
    padding: 1.3rem;
    background-color: #62ab18;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: .5rem;
}

.login:hover {
    background-color: #4a8b14;
}

.error {
    color: rgba(255, 0, 0, 0.5);
    padding: .3rem 0;
    font-size: 1.5rem;
}

.forgetPass,
.register {
    display: block;
    padding: .5rem 0 2.5rem;
    text-align: center;
    font-size: 1.4rem;
    color: #4a8b14;
    text-decoration: none;
}

.register {
    padding: 2rem;
    color: initial;
}

.register a {
    color: #4a8b14;
    text-decoration: none;

}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
}

.line {
    flex-grow: 1;
    height: 1px;
    background-color: #ccc;
}

.text {
    padding: 0 1rem;
    color: #666;
    font-size: 1.4rem;
}

.login-container {
    width: 100%;
    margin-top: 1rem;
}

.login-btn {
    font-size: 1.4rem;
    width: 100%;
    padding: 1.3rem;
    border: none;
    color: white;
    border-radius: .5rem;
    cursor: pointer;
    margin: .5rem 0;
}

.facebook {
    background-color: #3B5998;
}

.google {
    background-color: transparent;
    border: solid .1rem #666;
    color: #666;
}

@media (width <=390px) {
    button {

        padding: 1rem;
    }

    .forgetPass,
    .register {
        padding: .5rem 0rem 1.5rem;
        font-size: 1.2rem;
    }

    .register {
        padding: 1rem;
    }

    .error {
        text-align: center;
        color: red;
        font-size: 1rem;
        padding: .3rem 0;
    }

}
</style>