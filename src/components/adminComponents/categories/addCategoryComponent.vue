<template>
    <div class="addCategory">
        <h1 class="addCategory__title">Add Category</h1>
        <div class="adAttribute__container">
            <form @submit.prevent="addCategory" class="addCategory__form">
                <div class="addCategory__row"> <!--ROW NAME-->
                    <label for="name" class="addCategory__label">Category Name
                        <span class="addCategory__required">*</span></label>
                    <input type="text" class="addCategory__input" id="name" placeholder="Enter category name"
                        v-model="formData.name">
                </div>
                <div class="addCategory__row"> <!--ROW CATEGORY-->
                    <label for="name" class="addCategory__label">Category Description
                        <span class="addCategory__required">*</span></label>
                    <input type="text" class="addCategory__input" id="description"
                        placeholder="Enter category description" v-model="formData.description">
                </div>
                <div class="addCategory__row"> <!--ROW IMAGE-->
                    <h3 class="addCategory__label">Category Image <span class="addCategory__required">*</span></h3>
                    <div class="addCategory__upload-image addCategory__image--border" v-if="!imagePreview">
                        <label for="upload_images" class="addCategory__label--file">
                            <uploadImageIcon />
                            <span class="addCategory__upload-text">Drop your images here or select <span
                                    class="addCategory__upload-text--bold">click to browse</span></span>
                        </label>
                        <input type="file" accept="/image/*" id="upload_images" name="image"
                            class="addCategory__input addCategory__input--file" @change="handleImageSelect">
                    </div>
                    <div class="addCategory__image" v-else>
                        <img :src="imagePreview" alt="category image">
                        <div class="form__image-wrapper" @click="removeImage">
                            <trashIcon />
                        </div>
                    </div>
                </div>
                <div class="addCategory__row"> <!--ROW LOGS ERROR-->
                    <div class="addCategory__label"></div>
                    <div class="attribute__errors">
                        <span class="attribute__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name
                            category is required.</span>
                        <span class="attribute__error"
                            v-if="!$v.formData.description.required && $v.formData.name.$error">Description
                            category is required.</span>
                    </div>
                </div>
                <div class="addCategory__row">
                    <div class="addCategory__label"></div>
                    <div class="addCategory__button-container">
                        <button type="submit" class="addCategory__button">Save</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import uploadImageIcon from '../../icons/uploadImageIcon.vue';
import trashIcon from '../../icons/trashIcon.vue';
import axios from 'axios';
import apiClient from '../../../store/auth-vuex.js'
export default {
    name: 'addCategoryComponent',
    components: {
        uploadImageIcon,
        trashIcon
    },
    data() {
        return {
            imageSelected: null,
            imagePreview: null,
            formData: {
                name: '',
                description: '',
                image_url: ''
            }
        }
    },
    validations: {
        formData: {
            name: { required },
            description: { required }
        }
    },
    methods: {
        handleImageSelect(event) {
            const image = event.target.files[0]

            if (!image) { return }
            this.imageSelected = image;
            this.imagePreview = URL.createObjectURL(image);

            event.target.value = ''
        },
        removeImage() {
            this.imagePreview = null
            this.imageSelected = null
        },
        async addCategory() {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            this.$v.$touch();
            try {
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        text: "Error when adding category, invalid data",
                        width: 'auto',
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return;
                }
                //si todo es correcto
                //falta validar que se suba una imagen de cateogria

                const cloudinaryUrl = "https://api.cloudinary.com/v1_1/koalaMarket/upload";
                const uploadPreset = "koalaPreset2";
                const image = this.imageSelected;
                const formDataImage = new FormData();

                formDataImage.append('file', image);
                formDataImage.append('upload_preset', uploadPreset)
                const response = await axios.post(cloudinaryUrl, formDataImage);
                const uploadedUrl = response.data.secure_url;
                await apiClient.post('/categories/', {
                    nombre: this.formData.name,
                    descripcion: this.formData.description,
                    url_imagen: uploadedUrl
                })
                Swal.fire({
                    icon: "success",
                    title: "Successful category registration",
                    width: 'auto',
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            } catch (error) {
                console.error(error.response ? error.response.data : error)
            } finally {
                this.$store.dispatch('setLoading', false);  // Desactivar loader al inicio
            }
        }
    }
}
</script>
<style scoped>
.adAttribute__container {
    margin: 3rem 0 3rem;
    background-color: var(--primary-background-color);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.addCategory__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.addCategory__row {
    display: flex;
    align-items: center;
    justify-content: start;
}

.addCategory__label {
    width: 25rem;
    font-size: var(--font-size-small);
    color: var(--text-color-title);
}

.addCategory__input,
.addCategory__select,
.addCategory__upload-image,
.addCategory__image {
    width: calc(100% - 25rem);
}

.addCategory__button:hover {
    background-color: var(--text-color-hover-buttons)
}

.addCategory__input--file {
    display: none;
}
</style>