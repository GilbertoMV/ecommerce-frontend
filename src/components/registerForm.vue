<template>
    <form @submit.prevent="signUp">
        <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label" :name="field.name"
            v-model="formData[field.name]" />
        <button type="submit">Sign Up</button>
        <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$dirty">Name is required</div>
        <div class="error" v-if="!$v.formData.name.minLength && $v.formData.name.$dirty">Name must be at least 3
            characters</div>
        <div class="error" v-if="!$v.formData.name.hasSpace && $v.formData.name.$dirty">Name must only contain letters
        </div>
        <div class="error" v-if="!$v.formData.paternalLastName.required && $v.formData.paternalLastName.$dirty">Paternal
            Last Name is required</div>
        <div class="error" v-if="!$v.formData.paternalLastName.minLength && $v.formData.paternalLastName.$dirty">
            Paternal Last Name must be at least 3 characters</div>
        <div class="error" v-if="!$v.formData.paternalLastName.hasSpace && $v.formData.paternalLastName.$dirty">Paternal
            Last Name must only contain letters</div>
        <div class="error" v-if="!$v.formData.maternalLastName.required && $v.formData.maternalLastName.$dirty">Maternal
            Last Name is required</div>
        <div class="error" v-if="!$v.formData.maternalLastName.minLength && $v.formData.maternalLastName.$dirty">
            Maternal Last Name must be at least 3 characters</div>
        <div class="error" v-if="!$v.formData.maternalLastName.hasSpace && $v.formData.maternalLastName.$dirty">Maternal
            Last Name must only contain letters</div>
        <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">Email is required</div>
        <div class="error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">Invalid email</div>
        <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">Password is required
        </div>
        <div class="error" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">Password must be at
            least 6 characters</div>
        <div class="error" v-if="!$v.formData.birthdate.required && $v.formData.birthdate.$dirty">Birthdate is required
        </div>
        <div class="error" v-if="!$v.formData.birthdate.validDate && $v.formData.birthdate.$dirty">Birthdate must be
            before January 2005</div>
        <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">Password is required
        </div>
        <div class="error" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">Password must be at
            least 8 characters</div>
        <div class="error" v-if="!$v.formData.password.hasNumber && $v.formData.password.$dirty">Password must contain
            at least one number</div>
        <div class="error" v-if="!$v.formData.password.hasUpper && $v.formData.password.$dirty">Password must contain at
            least one uppercase letter</div>
        <div class="error" v-if="!$v.formData.password.hasSpecialChar && $v.formData.password.$dirty">Password must
            contain at least one special character</div>
        <div class="error" v-if="!$v.formData.passwordConfirm.sameAsPassword && $v.formData.passwordConfirm.$dirty">
            Passwords do not match</div>
        <div class="error" v-if="!$v.formData.passwordConfirm.required && $v.formData.passwordConfirm.$dirty">
            Confirmation password is required</div>
    </form>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { helpers } from 'vuelidate/lib/validators'
import formInput from './formInput.vue';
import Swal from 'sweetalert2';
import Axios from 'axios';

//VALIDACIONES
const validDate = helpers.withParams(
    { message: 'Date must be before January 2005' },
    value => {
        const date = new Date(value);
        const cutoffDate = new Date('2005-01-01');
        return date < cutoffDate;
    }
);
const hasNumber = helpers.regex('hasNumber', /\d/);
const hasUpper = helpers.regex('hasUpper', /[A-Z]/);
const hasSpecialChar = helpers.regex('hasSpecialChar', /[^a-zA-Z0-9]/);
const hasSpace = helpers.regex('hasSpace', /^[A-Za-z\s]*$/)

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

                await Axios.post('https://back-end-production-c8eb.up.railway.app/register', {
                    nombre: this.formData.name,
                    apellido_paterno: this.formData.paternalLastName,
                    apellido_materno: this.formData.maternalLastName,
                    correo: this.formData.email,
                    contrasena: this.formData.password,
                    fecha_nacimiento: this.formData.birthdate,
                    estado_cuenta: '1'
                });

                Swal.fire({
                    icon: "success",
                    title: "Successful registration",
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    this.$router.push('/sign-in');
                }, 3000);

            } catch (error) {
                let errorMessage = 'Error when registering'
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ': ' + error.response.data.message
                }
                Swal.fire({
                    icon: "warning",
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