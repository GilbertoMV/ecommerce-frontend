<template>
    <form @submit.prevent="registrarUsuario">
        <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label" :name="field.name"
            v-model="formData[field.name]" />
        <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$dirty">Name is required</div>
        <div class="error" v-if="!$v.formData.name.minLength && $v.formData.name.$dirty">Name must be at least 3
            characters</div>
        <div class="error" v-if="!$v.formData.name.alpha && $v.formData.name.$dirty">Name must only contain letters
        </div>
        <div class="error" v-if="!$v.formData.paternalLastName.required && $v.formData.paternalLastName.$dirty">Paternal
            Last Name is
            required</div>
        <div class="error" v-if="!$v.formData.paternalLastName.minLength && $v.formData.paternalLastName.$dirty">
            Paternal Last Name
            must be at least 3 characters</div>
        <div class="error" v-if="!$v.formData.paternalLastName.alpha && $v.formData.paternalLastName.$dirty">Paternal
            Last Name must
            only contain letters</div>
        <div class="error" v-if="!$v.formData.maternalLastName.required && $v.formData.maternalLastName.$dirty">Maternal
            Last Name is
            required</div>
        <div class="error" v-if="!$v.formData.maternalLastName.minLength && $v.formData.maternalLastName.$dirty">
            Maternal Last Name
            must be at least 3 characters</div>
        <div class="error" v-if="!$v.formData.maternalLastName.alpha && $v.formData.maternalLastName.$dirty">Maternal
            Last Name must
            only contain letters</div>
        <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$dirty">Email is required</div>
        <div class="error" v-if="!$v.formData.email.email && $v.formData.email.$dirty">Invalid email</div>
        <div class="error" v-if="!$v.formData.password.required && $v.formData.password.$dirty">Password is required
        </div>
        <div class="error" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">Password must be at
            least 6
            characters</div>
        <div class="error" v-if="!$v.formData.birthdate.required && $v.formData.birthdate.$dirty">Birthdate is required
        </div>
        <div class="error" v-if="!$v.formData.birthdate.validDate && $v.formData.birthdate.$dirty">Birthdate must be
            after January
            2005</div>


        <button type="submit">Register</button>
    </form>
</template>

<script>
import { required, email, minLength, alpha } from 'vuelidate/lib/validators';
import { helpers } from 'vuelidate/lib/validators'
import formInput from './formInput.vue';
import Swal from 'sweetalert2';

const validDate = helpers.withParams(
    { message: 'Date must be before January 2005' },
    value => {
        const date = new Date(value);
        const cutoffDate = new Date('2005-01-01');
        return date < cutoffDate;
    }
);

export default {
    name: 'RegisterForm',
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
                birthdate: '',
            },
            fields: [
                { name: 'name', type: 'text', label: 'Name' },
                { name: 'paternalLastName', type: 'text', label: 'Paternal Last Name' },
                { name: 'maternalLastName', type: 'text', label: 'Maternal Last Name' },
                { name: 'email', type: 'email', label: 'Email' },
                { name: 'password', type: 'password', label: 'Password' },
                { name: 'birthdate', type: 'date', label: 'Birthdate' }
            ]
        };
    },
    validations: {
        formData: {
            name: { required, minLength: minLength(3), alpha },
            paternalLastName: { required, minLength: minLength(3), alpha },
            maternalLastName: { required, minLength: minLength(3), alpha },
            email: { required, email },
            password: { required, minLength: minLength(6) },
            birthdate: { required, validDate }
        }
    },
    methods: {
        registrarUsuario() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                Swal.fire({
                    icon: "warning",
                    title: "Error when registering, invalid data",
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                return;
            }
            Swal.fire({
                icon: "success",
                title: "Successful registration",
                toast: true,
                position: "bottom-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            console.log(JSON.stringify(this.formData, null, 2));
        }
    },
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