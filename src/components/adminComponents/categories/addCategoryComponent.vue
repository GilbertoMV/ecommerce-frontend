<template>
    <div class="addCategory">
        <h1 class="addCategory__title">Add Category</h1>
        <div class="adAttribute__container">
            <form @submit.prevent="handleSubmitCategory" class="addCategory__form">
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
                            v-if="!$v.formData.name.minLength && $v.formData.name.$error">Name category must be at least
                            5 character.</span>
                        <span class="attribute__error"
                            v-if="!$v.formData.name.maxLength && $v.formData.name.$error">Name category cannot exceed 30
                            characters.</span>
                        <span class="attribute__error"
                            v-if="!$v.formData.description.required && $v.formData.description.$error">Description
                            category is required.</span>
                        <span class="attribute__error"
                            v-if="!$v.formData.description.maxLength && $v.formData.description.$error">Description
                            category
                            cannot exceed 30 characters.</span>
                        <span class="attribute__error"
                            v-if="!$v.formData.description.minLength && $v.formData.description.$error">Description
                            category
                            must be at least 20 character.</span>
                        <!-- <span class="attribute__error"
                            v-if="!$v.imageSelected.isSingleFile && $v.imageSelected.$error">Select
                            only 1 image</span>
                        <span class="attribute__error"
                            v-if="!$v.imageSelected.required && $v.imageSelected.$error">Select a image</span> -->

                    </div>
                    <div class="form__logs">
                        <div class="form__log" v-if="categoryState === 'loading'">
                            <tinyLoader />
                            <span>
                                {{ isEditMode ? 'Updating category.' : 'Adding Category.' }}
                            </span>
                        </div>
                        <div class="form__log" v-if="categoryState === 'success'">
                            <checkIcon />
                            <span>
                                {{ isEditMode ? 'Category updated successfully.' : 'Category added successfully.' }}
                            </span>
                        </div>
                        <div class="form__log" v-if="categoryState === 'error'">
                            <errorIcon />
                            <span>
                                {{ isEditMode ? 'Error when updating category.' : 'Error when assigning category.' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="addCategory__row">
                    <div class="addCategory__label"></div>
                    <div class="addCategory__button-container">
                        <button type="submit" class="addCategory__button">
                            {{ isEditMode ? 'Update Category' : 'Add Category' }}</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import { fetchCategoryData } from '../../../utils/apiUtils.js'
import Swal from 'sweetalert2';
import uploadImageIcon from '../../icons/uploadImageIcon.vue';
import trashIcon from '../../icons/trashIcon.vue';
import axios from 'axios';
import apiClient from '../../../store/auth-vuex.js';
import checkIcon from '../../icons/checkIcon.vue';
import errorIcon from '../../icons/errorIcon.vue';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
export default {
    name: 'addCategoryComponent',
    components: {
        uploadImageIcon,
        trashIcon,
        checkIcon,
        tinyLoader,
        errorIcon
    },
    data() {
        return {
            imageSelected: null, // archivo
            imagePreview: null, // url temporal
            formData: {
                name: '',
                description: '',
                image_url: ''
            },
            originalData: {}, // Aquí guardamos los datos originales para comparar
            categoryState: '',
            isEditMode: false
        }
    },
    async created() {
        const categoryId = this.$route.params.categoryId;
        if (categoryId) {
            this.isEditMode = true;
            const categoryData = await fetchCategoryData(categoryId);
            this.formData.name = categoryData.nombre;
            this.formData.description = categoryData.descripcion;
            this.formData.image_url = categoryData.url_imagen;
            this.imagePreview = categoryData.url_imagen;

            // Guardar los datos originales
            this.originalData = {
                name: categoryData.nombre,
                description: categoryData.descripcion,
                image_url: categoryData.url_imagen
            };
        }
    },
    validations: {
        formData: {
            name: { required, minLength: minLength(5), maxLength: maxLength(30) },
            description: { required, minLength: minLength(20), maxLength: maxLength(50) }
        }
    },
    methods: {
        async handleSubmitCategory() {
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

                if (this.isEditMode) {
                    // Verificar si los datos han cambiado
                    if (this.isDataUnchanged()) {
                        Swal.fire({
                            icon: "info",
                            text: "No changes have been made",
                            width: 'auto',
                            toast: true,
                            position: "bottom-right",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        return;
                    }

                    this.categoryState = 'loading';
                    await this.updateCategory();
                    this.categoryState = 'success';

                    setTimeout(() => {
                        this.$router.push('/admin/all-categories');
                    }, 3000);
                } else {
                    this.categoryState = 'loading';
                    await this.addCategory();
                    this.categoryState = 'success';
                    this.clearForm();
                }

            } catch (error) {
                console.error(error.response ? error.response.data : error);
                this.categoryState = 'error';
            }
        },
        isDataUnchanged() {
            return (
                this.formData.name === this.originalData.name &&
                this.formData.description === this.originalData.description &&
                this.formData.image_url === this.originalData.image_url &&
                !this.imageSelected // Verifica que no se ha seleccionado una nueva imagen
            );
        },
        handleImageSelect(event) {
            const image = event.target.files[0];

            if (!image) { return; }
            this.imageSelected = image;
            this.imagePreview = URL.createObjectURL(image);

            event.target.value = '';
        },
        removeImage() {
            this.imagePreview = null;
            this.imageSelected = null;
            this.formData.image_url = null
        },
        async uploadImage() {
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/koalaMarket/upload";
            const uploadPreset = "koalaPreset2";
            const image = this.imageSelected;
            const formDataImage = new FormData();

            formDataImage.append('file', image);
            formDataImage.append('upload_preset', uploadPreset);
            const response = await axios.post(cloudinaryUrl, formDataImage);
            const uploadedUrl = response.data.secure_url;
            return uploadedUrl;
        },
        async addCategory() {
            const imageUrl = await this.uploadImage();

            await apiClient.post('/categories/', {
                nombre: this.formData.name,
                descripcion: this.formData.description,
                url_imagen: imageUrl
            });
        },
        async updateCategory() {
            const categoryId = this.$route.params.categoryId;
            console.log(this.formData); // Verifica qué datos estás enviando antes del submit

            if (this.imageSelected) {
                const imageUrl = await this.uploadImage();
                await apiClient.put(`/categories/${categoryId}`, {
                    nombre: this.formData.name,
                    descripcion: this.formData.description,
                    url_imagen: imageUrl
                });
            } else {
                await apiClient.put(`/categories/${categoryId}`, {
                    nombre: this.formData.name,
                    descripcion: this.formData.description,
                    url_imagen: this.formData.image_url
                });
            }
        },
        clearForm() {
            this.formData.name = '';
            this.formData.description = '';
            this.formData.image_url = '';
            this.imageSelected = '';
            this.imagePreview = '';
            setTimeout(() => {
                this.categoryState = '';
            }, 5000);
            this.$v.$reset();
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
    width: 100%;
}


.addCategory__row {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 2rem;
}

.addCategory__row:nth-last-child(3) {
    margin-bottom: 0;
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