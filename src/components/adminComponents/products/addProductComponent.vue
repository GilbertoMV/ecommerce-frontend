<template>
    <div class="addProducto">
        <h1 class="addProducto___title">Add Product</h1>
        <form @submit.prevent="addProduct" class="form">
            <fieldset class="form__column">
                <h2 class="form__subtitle">Product Details</h2>
                <label for="product_name" class="form__label">
                    Product Name <span class="form__required">*</span></label>
                <input type="text" id="product_name" name="producto_name" placeholder="Enter product name"
                    class="form__input" maxlength="50" minlength="10" required v-model="formData.name">
                <span class="form__input-helps">Do not exceed 50 characters when entering the product name.
                </span>
                <label for="categories" class="form__label">
                    Category <span class="form__required">*</span>
                </label>
                <select name="categories" id="categories" class="form__select" required v-model="formData.id_category">
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
                            :multiple="true" id="sizes" name="sizes" :get-option-label="option => option.nombre">
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
                            :multiple="true" id="colors" name="colors" :get-option-label="option => option.nombre">
                        </VueSelect>

                    </div>
                </div>
                <label for="description" class="form__label">
                    Description <span class="form__required">*</span>
                </label>
                <textarea name="description" id="description" cols="30" rows="12"
                    placeholder="Enter product description" class="form__textarea" maxlength="100" minlength="30"
                    required v-model="formData.description"></textarea>
                <span class="form__input-helps">Do not exceed 100 characters when entering the product description.
                </span>
                <div class="form__errors">
                    <!-- Name -->
                    <span class="form__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name is
                        required.</span>
                    <span class="form__error" v-if="!$v.formData.name.minLength && $v.formData.name.$error">Name
                        must be
                        at least 10 characters long.</span>
                    <span class="form__error" v-if="!$v.formData.name.maxLength && $v.formData.name.$error">Name
                        cannot
                        exceed 50 characters.</span>

                    <!-- Category -->
                    <span class="form__error"
                        v-if="!$v.formData.id_category.required && $v.formData.id_category.$error">Category is
                        required.</span>

                    <!-- Images -->
                    <span class="form__error" v-if="!$v.imagesFiles.required && $v.imagesFiles.$error">At
                        least one image is required.</span>
                    <span class="form__error" v-if="!$v.imagesFiles.minLength && $v.imagesFiles.$error">At
                        least 3 images are required.</span>
                    <span class="form__error" v-if="!$v.imagesFiles.maxLength && $v.imagesFiles.$error">A
                        maximum of 6 images are allowed.</span>

                    <!-- Description -->
                    <span class="form__error"
                        v-if="!$v.formData.description.required && $v.formData.description.$error">Description is
                        required.</span>
                    <span class="form__error"
                        v-if="!$v.formData.description.minLength && $v.formData.description.$error">Description must
                        be
                        at least 20 characters long.</span>
                    <span class="form__error"
                        v-if="!$v.formData.description.maxLength && $v.formData.description.$error">Description
                        cannot
                        exceed 200 characters.</span>

                    <!-- Price -->
                    <span class="form__error" v-if="!$v.formData.price.required && $v.formData.price.$error">Price
                        is
                        required.</span>
                    <span class="form__error" v-if="!$v.formData.price.minValue && $v.formData.price.$error">Price
                        must
                        be greater than 0.</span>
                    <span class="form__error" v-if="!$v.formData.price.maxValue && $v.formData.price.$error">Price
                        cannot exceed 1,000,000.</span>
                    <span class="form__error" v-if="!$v.formData.price.numeric && $v.formData.price.$error">Price
                        must
                        be a valid number.</span>

                    <!-- Stock -->
                    <span class="form__error" v-if="!$v.formData.stock.required && $v.formData.stock.$error">Stock
                        is
                        required.</span>
                    <span class="form__error" v-if="!$v.formData.stock.minValue && $v.formData.stock.$error">Stock
                        must
                        be at least 1.</span>
                    <span class="form__error" v-if="!$v.formData.stock.maxValue && $v.formData.stock.$error">Stock
                        cannot exceed 100.</span>
                    <span class="form__error" v-if="!$v.formData.stock.numeric && $v.formData.stock.$error">Stock
                        must
                        be a valid number.</span>
                    <!-- Carbon Footprint -->
                    <span class="form__error"
                        v-if="!$v.formData.carbon_footprint.required && $v.formData.carbon_footprint.$error">Carbon
                        footprint is required.</span>
                    <span class="form__error"
                        v-if="!$v.formData.carbon_footprint.minValue && $v.formData.carbon_footprint.$error">Carbon
                        footprint must be greater than 0.</span>
                    <span class="form__error"
                        v-if="!$v.formData.carbon_footprint.maxValue && $v.formData.carbon_footprint.$error">Carbon
                        footprint cannot exceed 100.</span>
                    <span class="form__error"
                        v-if="!$v.formData.carbon_footprint.between && $v.formData.carbon_footprint.$error">Carbon
                        footprint must be between 0.01 and 99.99.</span>
                    <span class="form__error"
                        v-if="!$v.formData.carbon_footprint.numeric && $v.formData.carbon_footprint.$error">Carbon
                        footprint must be a valid number.</span>

                    <!-- Rewards Points -->
                    <span class="form__error"
                        v-if="!$v.formData.rewards_points.required && $v.formData.rewards_points.$error">Rewards
                        points
                        are required.</span>
                    <span class="form__error"
                        v-if="!$v.formData.rewards_points.minValue && $v.formData.rewards_points.$error">Rewards
                        points
                        must be at least 0.</span>
                    <span class="form__error"
                        v-if="!$v.formData.rewards_points.maxValue && $v.formData.rewards_points.$error">Rewards
                        points
                        cannot exceed 1000.</span>
                    <span class="form__error"
                        v-if="!$v.formData.rewards_points.numeric && $v.formData.rewards_points.$error">Rewards
                        points
                        must be a valid number.</span>
                </div>
                <div class="form__logs">
                    <div class="form__log" v-if="productState === 'loading'">
                        <tinyLoader />
                        <span>
                            Subiendo información del producto...
                        </span>
                    </div>
                    <div class=" form__log" v-if="productState === 'success'">
                        <checkIcon />
                        <span>
                            Información del producto subida exitosamente.
                        </span>
                    </div>
                    <div class="form__log" v-if="productState === 'error'">
                        <errorIcon />
                        <span>
                            Error al subir la información del
                            producto.
                        </span>
                    </div>
                    <!-- Mostrar el loader o estado para la subida de imágenes -->
                    <div class="form__log" v-if="imagesState === 'loading'">
                        <tinyLoader />
                        <span>
                            Subiendo imágenes al servidor...
                        </span>
                    </div>
                    <div class="form__log" v-if="imagesState === 'success'">
                        <checkIcon />
                        <span>
                            Imágenes subidas al servidorexitosamente.
                        </span>
                    </div>
                    <div class="form__log" v-if="imagesState === 'error'">
                        <errorIcon />
                        <span>
                            Error al subir las imágenes.
                        </span>
                    </div>
                    <!-- Mostrar el loader o estado para la subida de tallas -->
                    <div class="form__log" v-if="sizesState === 'loading'">
                        <tinyLoader />
                        <span>
                            Asignando tallas al producto...
                        </span>
                    </div>
                    <div class="form__log" v-if="sizesState === 'success'">
                        <checkIcon />
                        <span>
                            Tallas asignadas correctamente.
                        </span>
                    </div>
                    <div class="form__log" v-if="sizesState === 'error'">
                        <errorIcon />
                        <span>
                            Error al asignar las tallas.
                        </span>
                    </div>
                    <!-- Mostrar el loader o estado para la asignación de colores -->
                    <div class="form__log" v-if="colorsState === 'loading'">
                        <tinyLoader />
                        <span>
                            Asignando tallas al producto...
                        </span>
                    </div>
                    <div class="form__log" v-if="colorsState === 'success'">
                        <checkIcon />
                        <span>
                            Colores asignadas correctamente.
                        </span>
                    </div>
                    <div class="form__log" v-if="colorsState === 'error'">
                        <errorIcon />
                        <span>
                            Error al asignar las tallas.
                        </span>
                    </div>
                </div>
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
                        <input type="file" accept="/image/*" multiple id="upload_images" name="upload_images"
                            class="form__input form__input--file" @change="handleImageSelect">
                    </div>
                </div>
                <span class="form__input-helps">You need to add at least 3 images. Pay attention to the quality of
                    the
                    pictures you add, comply with the background color standards. Pictures must be in certain
                    dimensions. Notice that the product shows all the details
                </span>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="price" class="form__label">
                            Price <span class="form__required">*</span>
                        </label>
                        <input type="number" id="price" name="price" placeholder="Enter product price"
                            class="form__input" step="1" min="1" required v-model="formData.price">
                    </div>
                    <div class="form__column-block">
                        <label for="carbon_footprint" class="form__label">
                            Carbon Footprint <span class="form__required">*</span>
                        </label>
                        <input type="number" id="carbon_footprint" name="carbon_footprint"
                            placeholder="Enter carbon footprint" class="form__input" step="1" min="1" required
                            v-model="formData.carbon_footprint">
                    </div>
                </div>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="stock" class="form__label">
                            Stock <span class="form__required">*</span>
                        </label>
                        <input type="number" id="stock" name="stock" placeholder="Enter product stock"
                            class="form__input" step="1" min="1" max="999" v-model="formData.stock">
                    </div>
                    <div class="form__column-block">
                        <label for="reward_points" class="form__label">
                            Rewards Points <span class="form__required">*</span>
                        </label>
                        <input type="number" id="reward_points" name="reward_points" placeholder="Enter rewards points"
                            class="form__input" v-model="formData.rewards_points">
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
import { mapGetters } from 'vuex';
import { fetchCategoryData, fetchColors, fetchSizes } from '../../../utils/apiUtils';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { required, minLength, maxLength, minValue, maxValue, between, numeric } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import plusIcon from '../../icons/plusIcon.vue';
import uploadImageIcon from '../../icons/uploadImageIcon.vue';
import checkIcon from '../../icons/checkIcon.vue'
import trashIcon from '../../icons/trashIcon.vue';
import errorIcon from '../../icons/errorIcon.vue';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue'
import apiClient from '../../../store/auth-vuex';
import axios from 'axios';
export default {
    name: 'addProduct',
    components: {
        plusIcon,
        uploadImageIcon,
        trashIcon,
        VueSelect,
        checkIcon,
        tinyLoader,
        errorIcon
    },
    computed: {
        ...mapGetters(['idUser'])
    },
    data() {
        return {
            categories: [], //Array de las categorias
            sizesDisabled: true, //estado del input sizes
            colorsDisabled: true, //estado del input colors
            sizesOptions: [], //Array de tamanos
            colorOptions: [], //Array de colores
            selectedSizes: [], //Array con los tamanos seleccionados
            selectedColors: [], //Array con los colores seleccionados
            previewImages: [], //Array de las urls temporales de previsualizacion
            imagesFiles: [], //Array de los archivos de imagen seleccionadas
            uploadedImages: [], //Array con las url de cloudinary
            formData: {
                name: '',
                id_category: '',
                description: '',
                price: 0,
                stock: 0,
                carbon_footprint: 0,
                rewards_points: 0
            }, //objeto de los datos del producto

            //Manejo del estado de subida de producto
            productState: '',
            imagesState: '',
            colorsState: '',
            sizesState: ''
        }
    },
    validations: {
        imagesFiles: { required, minLength: minLength(3), maxLength: maxLength(6) },
        formData: {
            name: { required, minLength: minLength(10), maxLength: maxLength(50) },
            id_category: { required },
            description: { required, minLength: minLength(20), maxLength: maxLength(200) },
            price: { required, minValue: minValue(1), maxValue: maxValue(1000000), numeric },
            stock: { required, minValue: minValue(1), maxValue: maxValue(100), numeric },
            carbon_footprint: { required, minValue: minValue(0), maxValue: maxLength(100), between: between(0.01, 99.99), numeric },
            rewards_points: { required, minValue: minValue(0), maxValue: maxValue(1000), numeric }
        }

    },
    methods: {
        async postProduct() {
            try {
                const response = await apiClient.post("/products", {
                    id_categoria: this.formData.id_category,
                    id_usuario: this.idUser,
                    nombre: this.formData.name,
                    caracteristicas: 'not available',
                    descripcion: this.formData.description,
                    precio: this.formData.price,
                    existencias: this.formData.stock,
                    huella_carbono: this.formData.carbon_footprint,
                    puntos_recompensa: this.formData.rewards_points,
                });
                return response.data.id;
            } catch (error) {
                console.error(error)
            }
        },
        async addProduct() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        text: "Error when adding product, invalid data",
                        width: 'auto',
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return;
                }
                this.productState = 'loading'
                const productId = await this.postProduct();
                this.productState = 'success'

                this.imagesState = 'loading'
                await this.uploadImage(productId);
                this.imagesState = 'success'


                if (this.selectedColors) {
                    this.colorsState = 'loading'
                    await this.assignColors(productId);
                    this.colorsState = 'success'

                }
                if (this.selectedSizes) {
                    this.sizesState = 'loading'
                    await this.assignSizes(productId);
                    this.sizesState = 'success'
                }
                this.clearForm()
                Swal.fire({
                    icon: "success",
                    text: "Product successfully published",
                    width: 'auto',
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            } catch (error) {
                console.error(error);
                this.productStatus = this.imageStatus = this.sizesColorsStatus = 'error';
            }
        },
        async uploadImage(productId) {
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/koalaMarket/upload";
            const uploadPreset = "koalaPreset";
            for (let i = 0; i < this.imagesFiles.length; i++) {
                const file = this.imagesFiles[i];

                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', uploadPreset);
                try {
                    const response = await axios.post(cloudinaryUrl, formData);
                    const uploadedUrl = response.data.secure_url;
                    this.uploadedImages.push(uploadedUrl);
                    await apiClient.post('/images/', {
                        id_producto: productId,
                        url_imagen: uploadedUrl,
                        descripcion: 'not available'
                    })
                } catch (error) {
                    console.error('Error al subir la imagen:', error.response ? error.response.data : error);
                }
            }
        },
        async assignColors(productId) {
            try {
                for (let i = 0; i < this.selectedColors.length; i++) {
                    await apiClient.post('/colors/products', {
                        id_producto: productId,
                        id_color: this.selectedColors[i].id_color
                    });
                }
            } catch (error) {
                throw new Error('error when assigning colors to the product')
            }
        },
        async assignSizes(productId) {
            try {
                for (let i = 0; i < this.selectedSizes.length; i++) {
                    await apiClient.post('/sizes/products', {
                        id_producto: productId,
                        id_talla: this.selectedSizes[i].id_talla
                    })
                }
            } catch (error) {
                throw new Error('error when assigning sizes to the product')
            }
        },
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
            if (this.imagesFiles.length + files.length > 6) {
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
                if (this.imagesFiles.length < 6) {
                    this.imagesFiles.push(file);
                    this.previewImages.push({
                        url: URL.createObjectURL(file) //Generamos la url temporal para la visualizacion
                    });
                }
            });
            //reseteamos el evento del input
            event.target.value = ''
        },
        removeImage(index) {
            //Eliminamos la imagen del array de imágenes seleccionada
            this.imagesFiles.splice(index, 1);
            //Eliminamos la URL de previsualizacion
            this.previewImages.splice(index, 1);
        },
        clearForm() {
            this.formData.name = ''
            this.formData.id_category = ''
            this.formData.description = ''
            this.formData.price = 0
            this.formData.stock = 0
            this.formData.carbon_footprint = 0
            this.formData.rewards_points = 0
            this.imagesFiles = []
            this.previewImages = []
            this.selectedColors = []
            this.selectedSizes = []
            setTimeout(() => {
                this.productState = ''
                this.imagesState = ''
                this.colorsState = ''
                this.sizesState = ''
            }, 5000);
            this.$v.$reset()
        }
    },
    async created() {
        this.$store.dispatch('setLoading', true);  // Activar loader al inicio
        this.categories = await fetchCategoryData();
        this.sizesOptions = await fetchSizes();
        this.colorOptions = await fetchColors();
        this.$store.dispatch('setLoading', false);  // Desactivar loader al inicio

    }
}
</script>
<style scoped>
.form {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 2rem;
    margin: 3rem 0 3rem;
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
    padding-bottom: .5rem;
    font-size: var(--font-size-smallest);
    color: var(--help-color);
}

.toggle {
    cursor: pointer;
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
    padding: 1.5rem;
    margin-top: 2rem;
    border-radius: .7rem;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    transition: all .3s ease-in-out;
    cursor: pointer;
}

.form__submit:hover {
    background-color: var(--text-color-hover-buttons)
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