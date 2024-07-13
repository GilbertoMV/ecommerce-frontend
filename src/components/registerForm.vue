<template>
    <div>
        <form @submit.prevent="signUp">
            <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label"
                :name="field.name" v-model="formData[field.name]" />
            <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$dirty">Name is required</div>
            <div class="error" v-if="!$v.formData.name.minLength && $v.formData.name.$dirty">Name must be at least 3
                characters</div>
            <div class="error" v-if="!$v.formData.name.hasSpace && $v.formData.name.$dirty">Name must only contain
                letters
            </div>
            <div class="error" v-if="!$v.formData.paternalLastName.required && $v.formData.paternalLastName.$dirty">
                Paternal
                Last Name is required</div>
            <div class="error" v-if="!$v.formData.paternalLastName.minLength && $v.formData.paternalLastName.$dirty">
                Paternal Last Name must be at least 3 characters</div>
            <div class="error" v-if="!$v.formData.paternalLastName.hasSpace && $v.formData.paternalLastName.$dirty">
                Paternal
                Last Name must only contain letters</div>
            <div class="error" v-if="!$v.formData.maternalLastName.required && $v.formData.maternalLastName.$dirty">
                Maternal
                Last Name is required</div>
            <div class="error" v-if="!$v.formData.maternalLastName.minLength && $v.formData.maternalLastName.$dirty">
                Maternal Last Name must be at least 3 characters</div>
            <div class="error" v-if="!$v.formData.maternalLastName.hasSpace && $v.formData.maternalLastName.$dirty">
                Maternal
                Last Name must only contain letters</div>
            <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">Email is required</div>
            <div class="error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">Invalid email</div>
            <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">Password is required
            </div>
            <div class="error" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">Password must be at
                least 6 characters</div>
            <div class="error" v-if="!$v.formData.birthdate.required && $v.formData.birthdate.$dirty">Birthdate is
                required
            </div>
            <div class="error" v-if="!$v.formData.birthdate.validDate && $v.formData.birthdate.$dirty">Birthdate must be
                before January 2005</div>
            <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">Password is required
            </div>
            <div class="error" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">Password must be at
                least 8 characters</div>
            <div class="error" v-if="!$v.formData.password.hasNumber && $v.formData.password.$dirty">Password must
                contain
                at least one number</div>
            <div class="error" v-if="!$v.formData.password.hasUpper && $v.formData.password.$dirty">Password must
                contain at
                least one uppercase letter</div>
            <div class="error" v-if="!$v.formData.password.hasSpecialChar && $v.formData.password.$dirty">Password must
                contain at least one special character</div>
            <div class="error" v-if="!$v.formData.passwordConfirm.sameAsPassword && $v.formData.passwordConfirm.$dirty">
                Passwords do not match</div>
            <div class="error" v-if="!$v.formData.passwordConfirm.required && $v.formData.passwordConfirm.$dirty">
                Confirmation password is required</div>
            <button type="submit" class="signup">Sign Up</button>
            <span class="login">Already have an account? <router-link to="/sign-in">Login</router-link></span>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { helpers } from 'vuelidate/lib/validators'
import formInput from './formInput.vue';
import Swal from 'sweetalert2';
import apiClient from '../store/auth-vuex'

//VALIDACIONES
const validDate = helpers.withParams(
    { message: 'Date must be before January 2005' },
    value => {
        const date = new Date(value);
        const cutoffDate = new Date('2005-01-01');
        return date < cutoffDate;
    }
);
const hasNumber = helpers.regex('hasNumber', /\d/); //valida que la cadena tenga un numero
const hasUpper = helpers.regex('hasUpper', /[A-Z]/); //valida que la cadena tenga una mayuscula
const hasSpecialChar = helpers.regex('hasSpecialChar', /[^a-zA-Z0-9]/); //valida que la cadena solo contenga letras y numeros
const hasSpace = helpers.regex('hasSpace', /^[A-Za-z\s]*$/); //valida que la cadena solo contenga letras y espacios

export default {
    name: 'SignUpForm',
    components: {
        formInput
    },
    data() {
        return {
            formData: {
                name: '',
                paternalLastName: '',
                maternalLastName: '',
                email: '',
                password: '',
                passwordConfirm: '',
                birthdate: '',
            },
            fields: [
                { name: 'name', type: 'text', label: 'Name' },
                { name: 'paternalLastName', type: 'text', label: 'Paternal Last Name' },
                { name: 'maternalLastName', type: 'text', label: 'Maternal Last Name' },
                { name: 'email', type: 'email', label: 'Email' },
                { name: 'password', type: 'password', label: 'Password' },
                { name: 'passwordConfirm', type: 'password', label: 'Confirm Password' },
                { name: 'birthdate', type: 'date', label: 'Birthdate' }
            ]
        };
    },
    validations: {
        formData: {
            name: { required, minLength: minLength(3), hasSpace },
            paternalLastName: { required, minLength: minLength(3), hasSpace },
            maternalLastName: { required, minLength: minLength(3), hasSpace },
            email: { required, email },
            password: { required, minLength: minLength(8), hasNumber, hasUpper, hasSpecialChar },
            passwordConfirm: { required, sameAsPassword: sameAs('password') },
            birthdate: { required, validDate }
        }
    },
    methods: {
        async signUp() {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error when registering, invalid data",
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    return;
                }
                await apiClient.post("/register", {
                    nombre: this.formData.name.toUpperCase(),
                    apellido_paterno: this.formData.paternalLastName.toUpperCase(),
                    apellido_materno: this.formData.maternalLastName.toUpperCase(),
                    correo: this.formData.email.toLowerCase(),
                    contrasena: this.formData.password,
                    fecha_nacimiento: this.formData.birthdate,
                    estado_cuenta: '1'
                })

                Swal.fire({
                    icon: "success",
                    title: "Successful registration",
                    width: 'auto',
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    this.$router.push('/sign-in');
                }, 1500);

            } catch (error) {
                let errorMessage = 'Error when registering'
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ': ' + error.response.data.message
                }
                Swal.fire({
                    icon: "warning",
                    title: errorMessage,
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false); //desactiva el loader independientemente del resultado
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

.signup {
    width: 100%;
    padding: 1.3rem;
    background-color: #62ab18;
    border: unset;
    color: white;
    cursor: pointer;
    border-radius: .5rem;
    transition: all .5s ease;
    margin-top: 1rem;
}

.signup:hover {
    background-color: #4a8b14;
}

.error {
    color: rgba(255, 0, 0, 0.5);
    padding: .3rem 0;
    font-size: 1.5rem;
}

.login {
    display: block;
    padding: 1rem;
    margin: 1rem 0rem;
    text-align: center;
    font-size: 1.4rem;
    color: #4a8b14;
    text-decoration: none;
}

.login a {
    color: #4a8b14;
    text-decoration: none;

}

.login {
    color: initial;
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
    font-size: 1.4rem;

    width: 100%;
    margin-top: 1rem;
}

.login-btn {
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

.dark-mode {
    background-color: #3a5816;
}

.dark-mode .google {
    border: solid .1rem #ebead6;
    color: #ebead6;
}

.dark-mode .login,
.dark-mode .text {
    color: #ebead6;
}

.dark-mode .signup {
    background-color: #223012;
    color: #ebead6;
}

.dark-mode .signup:hover {
    background-color: #4a8b14;
}

.dark-mode .error {
    color: #ffd5d580;
}

.dark-mode .login a {
    color: #B0CB7F;
}
</style>