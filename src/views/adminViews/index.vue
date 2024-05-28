<template>
    <main>
        <div class="login-register-view">
            <h1 class="h1">New Category</h1>
            <form @submit.prevent="loadCategory">
                <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label"
                    :name="field.name" v-model="formData[field.name]">
                </formInput>
                <button type="submit">Create</button>

                <!-- Validations for name -->
                <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$dirty">Category Name is
                    required</div>
                <div class="error" v-if="$v.formData.name.$dirty && !$v.formData.name.minLength">Category Name
                    must be at least 5 characters long</div>
                <div class="error" v-if="$v.formData.name.$dirty && !$v.formData.name.maxLength">Category Name
                    must be less than 20 characters long</div>

                <!-- Validations for description -->
                <div class="error" v-if="!$v.formData.description.required && $v.formData.description.$dirty">
                    Description is required</div>
                <div class="error" v-if="$v.formData.description.$dirty && !$v.formData.description.minLength">
                    Description must be at least 15 characters long</div>
                <div class="error" v-if="$v.formData.description.$dirty && !$v.formData.description.maxLength">
                    Description must be less than 30 characters long</div>

                <!-- Validations for url_photo -->
                <div class="error" v-if="!$v.formData.url_photo.required && $v.formData.url_photo.$dirty">URL Photo is
                    required</div>
                <div class="error" v-if="$v.formData.url_photo.$dirty && !$v.formData.url_photo.minLength">URL
                    Photo must be at least 20 characters long</div>
                <div class="error" v-if="$v.formData.url_photo.$dirty && !$v.formData.url_photo.url">URL Photo
                    must be a valid URL</div>

            </form>
        </div>
    </main>
</template>

<script>
import formInput from '../../components/formInput.vue'
import { required, minLength, maxLength, url } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'indexAdmin',
    components: {
        formInput
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                url_photo: ''
            },
            fields: [
                { name: 'name', type: 'text', label: 'Category Name' },
                { name: 'description', type: 'text', label: 'Category Description' },
                { name: 'url_photo', type: 'url', label: 'Url description' }
            ]
        };
    },
    validations: {
        formData: {
            name: { required, minLength: minLength(5), maxLength: maxLength(20) },
            description: { required, minLength: minLength(15), maxLength: maxLength(30) },
            url_photo: { required, minLength: minLength(20), url }
        }
    },
    methods: {
        resetForm() {
            this.formData = {
                name: '',
                descripcion: '',
                url_photo: ''
            }
            this.$v.$reset()
        },
        async loadCategory() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error when create a new category",
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return;
                }
                await axios.post('https://back-end-production-c8eb.up.railway.app/categorys/create', {
                    nombre: this.formData.name,
                    descripcion: this.formData.description,
                    url_imagen: this.formData.url_photo
                })
                let successMessage = 'Category ' + this.formData.name + ' successfully created'
                Swal.fire({
                    icon: "success",
                    title: successMessage,
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                this.resetForm()
            } catch (error) {
                let errorMessage = 'Error when create category'
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage += ': ' + error.response.data.error
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