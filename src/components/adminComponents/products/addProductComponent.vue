<template>
    <div class="addProducto">
        <h1 class="addProducto___title">Add Product</h1>
        <form @submit.prevent="submitForm" class="form">
            <fieldset class="form__column">
                <h2 class="form__subtitle">Product Details</h2>
                <label for="product_name" class="form__label">
                    Product Name <span class="form__required">*</span></label>
                <input type="text" id="product_name" name="producto_name" placeholder="Enter product name"
                    class="form__input" maxlength="50" minlength="10" required>
                <span class="form__input-helps">Do not exceed 50 characters when entering the product name.
                </span>
                <label for="categories" class="form__label">
                    Category <span class="form__required">*</span>
                </label>
                <select name="categories" id="categories" class="form__select" required>
                    <option value="" selected disabled> Select a category</option>
                    <option v-for="category in categories" :key="category.id_categoria" :value="category.id_categoria">
                        {{ category.nombre }}</option>
                </select>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="sizes" class="form__label">
                            Sizes <span @click="toggleDisable('sizes')" class="form__input-helps toggle"
                                id="sizes_toggle">
                                {{ sizesDisabled ? 'enable' : 'disable' }}
                            </span>
                        </label>
                        <VueSelect :options="sizesOptions" v-model="selectedSizes" :disabled="sizesDisabled"
                            :multiple="true" id="sizes" name="sizes" required>
                        </VueSelect>
                    </div>
                    <div class="form__column-block">
                        <label for="colors" class="form__label">
                            Colors <span @click="toggleDisable('colors')" class="form__input-helps toggle"
                                id="colors_toggle">
                                {{ colorsDisabled ? 'enable' : 'disable' }}
                            </span>
                        </label>
                        <VueSelect :options="colorOptions" v-model="selectedColors" :disabled="colorsDisabled"
                            :multiple="true" id="colors" name="colors" required>
                        </VueSelect>
                    </div>
                </div>
                <label for="description" class="form__label">
                    Description <span class="form__required">*</span>
                </label>
                <textarea name="description" id="description" cols="30" rows="12"
                    placeholder="Enter product description" class="form__textarea" maxlength="100" minlength="30"
                    required></textarea>
                <span class="form__input-helps">Do not exceed 100 characters when entering the product description.
                </span>
            </fieldset>
            <fieldset class="form__column">
                <h2 class="form__subtitle">Product Extras</h2>
                <h3 class="form__label">Upload Images</h3>
                <div class="form__images">
                    <!--Aqui se muestra la preview de la imagen-->
                    <div class="form__image" v-for="(image, index) in previewImages" :key="index">
                        <img :src="image.url" :alt="'Imagen ' + index" />
                        <div class="form__image-wrapper" @click="removeImage(index)">
                            <trashIcon />
                        </div>
                    </div>
                    <div class="form__image form__image--border" v-if="previewImages.length < 6">
                        <label for="upload_images" class="form__label--file">
                            <uploadImageIcon />
                            <span class="form__upload-text">Drop your images here or select <span
                                    class="form__upload-text--bold">click to browse</span></span>
                        </label>
                        <input type="file" accept="/images/*" multiple id="upload_images" name="upload_images"
                            class="form__input form__input--file" @change="handleImageSelect" required>
                    </div>
                </div>
                <span class="form__input-helps">You need to add at least 4 images. Pay attention to the quality of the
                    pictures you add, comply with the background color standards. Pictures must be in certain
                    dimensions. Notice that the product shows all the details
                </span>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="price" class="form__label">
                            Price <span class="form__required">*</span>
                        </label>
                        <input type="number" id="price" name="price" placeholder="Enter product price"
                            class="form__input" step="1" min="1" required>
                    </div>
                    <div class="form__column-block">
                        <label for="carbon_footprint" class="form__label">
                            Carbon Footprint <span class="form__required">*</span>
                        </label>
                        <input type="number" id="carbon_footprint" name="carbon_footprint"
                            placeholder="Enter carbon footprint" class="form__input" step="1" min="1" required>
                    </div>
                </div>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="stock" class="form__label">
                            Stock <span class="form__required">*</span>
                        </label>
                        <input type="number" id="stock" name="stock" placeholder="Enter product stock"
                            class="form__input" step="1" min="1" max="999">
                    </div>
                    <div class="form__column-block">
                        <label for="reward_points" class="form__label">
                            Rewards Points <span class="form__required">*</span>
                        </label>
                        <input type="number" id="reward_points" name="reward_points" placeholder="Enter rewards points"
                            class="form__input">
                    </div>
                </div>

                <button type="submit" class="form__submit">
                    <plusIcon />
                    Add Product
                </button>
            </fieldset>
        </form>
    </div>
</template>
<script>
import { fetchCategoryData } from '../../../utils/apiUtils';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
//import { required, minLength } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import plusIcon from '../../icons/plusIcon.vue';
import uploadImageIcon from '../../icons/uploadImageIcon.vue'
import trashIcon from '../../icons/trashIcon.vue';
export default {
    name: 'addProduct',
    components: {
        plusIcon,
        uploadImageIcon,
        trashIcon,
        VueSelect
    },
    data() {
        return {
            sizesDisabled: false, //estado del input sizes
            colorsDisabled: false, //estado del input colors
            categories: [], //Array de las categorias
            selectedColors: [], //Array de los colores seleccionados
            selectedSizes: [], //Array para los tamanos seleccionados
            sizesOptions: [
                { value: 's', label: 'Pequeño' },
                { value: 'm', label: 'Mediano' },
                { value: 'l', label: 'Grande' },
                { value: 'xl', label: 'Extra Grande' }
            ],
            colorOptions: [
                { value: 'red', label: 'Rojo' },
                { value: 'green', label: 'Verde' },
                { value: 'blue', label: 'Azul' },
                { value: 'yellow', label: 'Amarillo' },
                { value: 'black', label: 'Negro' }
            ],
            selectedImages: [], //Array de los archivos de imagen,
            previewImages: [], //Array de las urls temporales de previsualizacion
            formData: {
                id_category: '',
                name: '',
                features: '',
                description: '',
                price: '',
                stock: '',
                carbon_footprint: '',
                rewards_points: ''
            }
        }
    },
    methods: {
        toggleDisable(type) {
            if (type === 'sizes') {
                this.sizesDisabled = !this.sizesDisabled; // Cambiar estado de tamaños
            } else if (type === 'colors') {
                this.colorsDisabled = !this.colorsDisabled; // Cambiar estado de colores
            }
        },
        handleImageSelect(event) {
            const files = Array.from(event.target.files);

            //verificamos cuantas imagenes hay seleccionadas
            if (this.selectedImages.length + files.length > 6) {
                Swal.fire({
                    icon: "warning",
                    text: "You can upload a maximum of 6 images.",
                    width: 'auto',
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                return;
            }
            //Añadimos las nuevas imagenes al array
            files.forEach(file => {
                if (this.selectedImages.length < 6) {
                    this.selectedImages.push(file);
                    this.previewImages.push({
                        url: URL.createObjectURL(file) //Generamos la url temporal para la visualizacion
                    });
                }
            });
        },
        removeImage(index) {
            //Eliminamos la imagen del array de imágenes seleccionada
            this.selectedImages.splice(index, 1);
            //Eliminamos la URL de previsualizacion
            this.previewImages.splice(index, 1);
        },

    },
    async created() {
        this.categories = await fetchCategoryData();
    }
}
</script>
<style scoped>
.addProducto {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 150rem;
    height: auto;
}

.addProducto___title {
    font-size: var(--font-size-big);
    color: var(--text-color-title);
    padding: 4rem 0rem;
    text-align: left;
    font-weight: 600;
}

.form {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 2rem;
}

.form__column {
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: var(--primary-background-color);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);

}

.form__column--inline {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width: 100%;
}

.form__column-block {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form__subtitle {
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
    font-weight: 600;
    padding: 1rem 0 0 0;
}

.form__label {
    font-size: var(--font-size-small);
    font-weight: 500;
    padding: 1rem 0;
    color: var(--text-color-body);
    margin-top: 1rem;
}

.form__input-helps {
    margin-top: .5rem;
    padding-left: .5rem;
    font-size: var(--font-size-smallest);
    color: var(--help-color);
}

.toggle {
    cursor: pointer;
}

.form__required {
    color: var(--required-color);
}

.form__input,
.form__select,
.form__textarea {
    padding: 1rem;
    font-size: var(--font-size-small);
    background-color: var(--primary-background-color);
    color: var(--text-color-body);
    border-radius: .7rem;
    border: solid .1rem var(--border-color);
    outline: none;
}

.form__input::placeholder,
.form__textarea::placeholder,
.form__select::placeholder {
    color: var(--help-color);
}

.form__input:focus,
.form__select:focus,
.form__textarea:focus {
    border-color: var(--text-color-body);
}


.form__textarea {
    resize: vertical;
    max-height: 30rem;
    min-height: 10rem;
}

.form__submit {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 2rem;
    border-radius: .7rem;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    cursor: pointer;
}

.form__images {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.form__image {
    position: relative;
    width: calc(31% - 2rem);
    height: 17rem;
    border: solid .1rem var(--border-color);
    border-radius: .7rem;
    overflow: hidden;
    padding: 1rem;
    transition: all .3s ease-in-out;
}

.form__image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.form__image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: #00000058;
    transition: all .3s ease-in-out;
    cursor: pointer;
}

.form__image-wrapper svg {
    width: 5rem;
    height: 5rem;
    color: var(--required-color)
}

.form__image-wrapper:hover {
    opacity: 1;
}

.form__image--border {
    border: dashed .1rem var(--primary-color);
}


.form__label--file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.form__upload-text {
    width: 70%;
    color: var(--help-color);
    font-size: 1.2rem;
    line-height: 1.5rem;
    text-align: center;
}

.form__upload-text--bold {
    color: var(--primary-color);
}

.form__label--file .svg {
    width: 5rem;
    height: 5rem;
    color: var(--primary-color);
}

.form__input--file {
    display: none;
}
</style>