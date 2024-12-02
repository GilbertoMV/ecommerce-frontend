<template>
    <div class="addProducto">
        <h1 class="addProducto___title">Add Product</h1>
        <transition name="fade">
            <div v-if="handleForms">
                <form @submit.prevent="carbon__footprint" class="form form__foot">
                    <div class="form__column">
                        <h2 class="form__subtitle">Product Information
                            <helperComponent :title="helpers.productInfo.title" :text="helpers.productInfo.text" />
                        </h2>
                        <label for="materials" class="form__label">
                            Production Materials
                            <span class="form__required">*</span>
                        </label>
                        <div v-for="(material, index) in materiales" :key="`material-${index}`" class="materials">
                            <template v-if="material.tipo !== 'otro'">
                                <select v-model="material.tipo" @change="handleMaterialChange(index)" name="materials"
                                    id="materials" class="form__select materials__select" required>
                                    <option value="madera">Madera</option>
                                    <option value="metal">Metal</option>
                                    <option value="plastico">Plástico</option>
                                    <option value="vidrio">Vidrio</option>
                                    <option value="textil">Textil</option>
                                    <option value="otro">otro</option>
                                </select>
                                <input type="number" v-model="material.cantidad" id="amount" name="amount"
                                    class="form__input materials__input" placeholder="Amount in grams" min="0"
                                    max="100000" step=".1" required />
                                <button type="button" v-if="index > 0" @click="removeMaterial(index)"
                                    class="btn__delete materials__delete">
                                    <trashIcon />
                                </button>
                            </template>
                            <template v-else>
                                <input type="text" class="form__input" v-model="material.customMaterial"
                                    placeholder="Enter material name" minLength="0" maxLength="30" required />
                                <input type="number" v-model="material.cantidad" id="amount" name="amount"
                                    class="form__input materials__input" placeholder="Amount in grams" min="0"
                                    max="100000" step=".1" required />
                                <button v-if="index > 0" type="button" @click="removeMaterial(index)"
                                    class="btn__delete materials__delete">
                                    <trashIcon />
                                </button>
                            </template>
                        </div>
                        <button type="button" @click="addMaterial" class="btn__add">
                            <plusIcon /> Add Material
                        </button>
                        <span class="form__input-helps">Select a material and specify the weight in grams.
                        </span>
                        <!-- Energía utilizada en producción -->
                        <label for="energies" class="form__label">Production energies <span
                                class="form__required">*</span></label>
                        <div v-for="(energia, index) in energias" :key="`energia-${index}`" class="energies">
                            <template v-if="energia.tipo !== 'otro'">
                                <select v-model="energia.tipo" @change="handleEnergieChange(index)" name="energies"
                                    id="energies" class="form__select materials__select" required>
                                    <option value="redElectrica">Red eléctrica</option>
                                    <option value="solar">Solar</option>
                                    <option value="eolica">Eólica</option>
                                    <option value="fosil">Fósil</option>
                                    <option value="otro">otro</option>
                                </select>
                                <input type="number" v-model="energia.cantidad" placeholder="Amount in kWh"
                                    id="amount_energie" name="amount_energie" class="form__input materials__input"
                                    min="0" max="100000" step=".1" required />
                                <button type="button" v-if="index > 0" @click="removeEnergia(index)"
                                    class="btn__delete energies__delete">
                                    <trashIcon />
                                </button>
                            </template>
                            <template v-else>
                                <input type="text" class="form__input" v-model="energia.customEnergie"
                                    placeholder="Enter material name" minLength="0" maxLength="30" required />
                                <input type="number" v-model="energia.cantidad" placeholder="Amount in kWh"
                                    id="amount_energie" name="amount_energie" class="form__input materials__input"
                                    min="0" max="100000" step=".1" required />
                                <button v-if="index > 0" type="button" @click="removeEnergia(index)"
                                    class="btn__delete energies__delete">
                                    <trashIcon />
                                </button>
                            </template>
                        </div>
                        <button type="button" @click="addEnergia" class="btn__add">
                            <plusIcon /> Add Energie
                        </button>
                        <span class="form__input-helps">Select the energy type and enter the kWh used.
                        </span>

                    </div>
                    <div class="form__column">
                        <h2 class="form__subtitle">Transportation
                            <helperComponent :title="helpers.transportation.title"
                                :text="helpers.transportation.text" />
                        </h2>
                        <label for="distanciaAvion" class="form__label">Distance in kilometers (Airplane) <span
                                class="form__required">*</span></label>
                        <input type="number" placeholder="Enter distance in kilometers" v-model="transporte.avion"
                            id="distanciaAvion" class="form__input" min="0" max="100000" required />

                        <label for="distanciaCamion" class="form__label">Distance in kilometers (Truck) <span
                                class="form__required">*</span></label>
                        <input type="number" placeholder="Enter distance in kilometers" v-model="transporte.camion"
                            id="distanciaCamion" class="form__input" min="0" max="100000" step=".1" required />

                        <label for="distanciaBarco" class="form__label">Distance in kilometers (Ship) <span
                                class="form__required">*</span></label>
                        <input type="number" placeholder="Enter distance in kilometers" v-model="transporte.barco"
                            id="distanciaBarco" class="form__input" min="0" max="100000" step=".1" required />
                        <span class="form__input-helps">Enter the distance traveled by each transport type in km.
                        </span>
                        <div class="divisor"></div>
                        <!-- Reciclabilidad -->
                        <h2 class="form__subtitle">Recyclability
                            <helperComponent :title="helpers.recyclability.title" :text="helpers.recyclability.text" />
                        </h2>
                        <label for="reciclabilidad" class="form__label">Recycling percentage <span
                                class="form__required">*</span></label>
                        <input type="number" v-model="reciclabilidad" placeholder="Percentage (0-100)"
                            id="reciclabilidad" class="form__input" min="0" max="100" step=".1" required />
                        <span class="form__input-helps">Choose an approximate recycling percentage for the product.
                        </span>
                        <button class="form__submit">Calculate carbon footprint</button>
                        <div class="form__logs">
                            <div class="form__log" v-if="calculateState === 'loading'">
                                <tinyLoader />
                                <span>
                                    Calculating carbon footprint...
                                </span>
                            </div>
                            <div class=" form__log" v-if="calculateState === 'success'">
                                <checkIcon />
                                <span>
                                    Successful Calculation.
                                </span>
                            </div>
                            <div class="form__log" v-if="calculateState === 'error'">
                                <errorIcon />
                                <span>
                                    Error when calculating the carbon footprint
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="!handleForms">
                <form @submit.prevent="addProduct" class="form form__details">
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
                        <select name="categories" id="categories" class="form__select" required
                            v-model="formData.id_category">
                            <option value="" selected disabled> Select a category</option>
                            <option v-for="category in categories" :key="category.id_categoria"
                                :value="category.id_categoria">
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
                                    :multiple="true" id="sizes" name="sizes"
                                    :get-option-label="option => option.nombre">
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
                                    :multiple="true" id="colors" name="colors"
                                    :get-option-label="option => option.nombre">
                                </VueSelect>

                            </div>
                        </div>
                        <label for="description" class="form__label">
                            Description <span class="form__required">*</span>
                        </label>
                        <textarea name="description" id="description" cols="30" rows="12"
                            placeholder="Enter product description" class="form__textarea" maxlength="100"
                            minlength="30" required v-model="formData.description"></textarea>
                        <span class="form__input-helps">Do not exceed 100 characters when entering the product
                            description.
                        </span>
                        <div class="form__errors">
                            <!-- Name -->
                            <span class="form__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name
                                is
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
                                v-if="!$v.formData.description.required && $v.formData.description.$error">Description
                                is
                                required.</span>
                            <span class="form__error"
                                v-if="!$v.formData.description.minLength && $v.formData.description.$error">Description
                                must
                                be
                                at least 20 characters long.</span>
                            <span class="form__error"
                                v-if="!$v.formData.description.maxLength && $v.formData.description.$error">Description
                                cannot
                                exceed 200 characters.</span>

                            <!-- Price -->
                            <span class="form__error"
                                v-if="!$v.formData.price.required && $v.formData.price.$error">Price
                                is
                                required.</span>
                            <span class="form__error"
                                v-if="!$v.formData.price.minValue && $v.formData.price.$error">Price
                                must
                                be greater than 0.</span>
                            <span class="form__error"
                                v-if="!$v.formData.price.maxValue && $v.formData.price.$error">Price
                                cannot exceed 1,000,000.</span>
                            <span class="form__error"
                                v-if="!$v.formData.price.numeric && $v.formData.price.$error">Price
                                must
                                be a valid number.</span>

                            <!-- Stock -->
                            <span class="form__error"
                                v-if="!$v.formData.stock.required && $v.formData.stock.$error">Stock
                                is
                                required.</span>
                            <span class="form__error"
                                v-if="!$v.formData.stock.minValue && $v.formData.stock.$error">Stock
                                must
                                be at least 1.</span>
                            <span class="form__error"
                                v-if="!$v.formData.stock.maxValue && $v.formData.stock.$error">Stock
                                cannot exceed 100.</span>
                            <span class="form__error"
                                v-if="!$v.formData.stock.numeric && $v.formData.stock.$error">Stock
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
                        <span class="form__input-helps">You need to add at least 3 images. Pay attention to the quality
                            of
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
                                <label for="stock" class="form__label">
                                    Stock <span class="form__required">*</span>
                                </label>
                                <input type="number" id="stock" name="stock" placeholder="Enter product stock"
                                    class="form__input" step="1" min="1" max="999" v-model="formData.stock">
                            </div>

                        </div>
                        <div class="form__column--inline">
                            <div class="form__column-block">
                                <label for="carbon_footprint" class="form__label">
                                    Carbon Footprint <span class="form__required">*</span>
                                </label>
                                <!-- <input type="number" id="carbon_footprint" name="carbon_footprint"
                                    placeholder="Enter carbon footprint" class="form__input" step="1" min="1" required
                                    disabled v-model="formData.carbon_footprint"> -->
                                <p class="form__input">{{ formData.carbon_footprint }} kgCO₂e.</p>
                            </div>
                            <div class="form__column-block">
                                <label for="reward_points" class="form__label">
                                    Rewards Points <span class="form__required">*</span>
                                </label>
                                <!-- <input type="number" id="reward_points" name="reward_points"
                                    placeholder="Enter rewards points" class="form__input" disabled
                                    v-model="formData.rewards_points"> -->
                                <p class="form__input">{{ formData.rewards_points }} pts.</p>
                            </div>
                        </div>
                        <button type="submit" class="form__submit">
                            <plusIcon />
                            Add Product
                        </button>
                        <button type="button" class="form__submit--back" @click="backForm"> Back Around</button>
                    </fieldset>
                </form>
            </div>
        </transition>
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
import trashIcon from '../../icons/trashIcon.vue';
import checkIcon from '../../icons/checkIcon.vue';
import errorIcon from '../../icons/errorIcon.vue';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
import apiClient from '../../../store/auth-vuex';
import axios from 'axios';
import helperComponent from '../../mainComponents/helperComponent.vue';
export default {
    name: 'addProduct',
    components: {
        plusIcon,
        uploadImageIcon,
        trashIcon,
        VueSelect,
        checkIcon,
        tinyLoader,
        errorIcon,
        helperComponent
    },
    computed: {
        ...mapGetters(['idUser'])
    },
    data() {
        return {
            //MANEJO DE ESTADOS
            sizesDisabled: true, //estado del input sizes
            colorsDisabled: true, //estado del input colors
            productState: '',
            imagesState: '',
            colorsState: '',
            sizesState: '',
            calculateState: '',
            handleForms: true,

            //ARREGLOS DE DATOS
            categories: [], //Array de las categorias
            sizesOptions: [], //Array de tamanos
            colorOptions: [], //Array de colores
            selectedSizes: [], //Array con los tamanos seleccionados
            selectedColors: [], //Array con los colores seleccionados
            previewImages: [], //Array de las urls temporales de previsualizacion
            imagesFiles: [], //Array de los archivos de imagen seleccionadas
            uploadedImages: [], //Array con las url de cloudinary

            //OBJETOS DE DATOS
            formData: {
                name: '',
                id_category: '',
                description: '',
                price: 0,
                stock: 0,
                carbon_footprint: 0,
                rewards_points: 0
            },
            materiales: [
                { tipo: 'madera', cantidad: null, customMaterial: '' }
            ],
            energias: [
                { tipo: 'redElectrica', cantidad: null, customEnergie: '' },
            ],
            transporte: {
                avion: null,
                camion: null,
                barco: null,
            },
            reciclabilidad: null,

            //HELPERS
            helpers: {
                productInfo: {
                    title: 'Production Product Information', text: `<div class="popup-content">
                        <h2>Instructions for Materials and Energy Data</h2>
                        <p>1. Consult with the Supplier or Manufacturer: If there is no direct information available on the materials or energy consumption, request these details from the supplier or manufacturer. They often have specific information about the components and production processes.</p>
                        <p>2. Review Technical Documentation: Check if the product has a technical sheet or material certificate, as these documents often include the composition and weight of each material.</p>
                        <p>3. Estimate Materials and Production Energy</p>
                        <ul>
                            <li>3.1 Materials: Weigh the complete product, and if it consists of different materials (e.g., wood and metal), calculate the approximate percentage of each material in the total weight. This technique allows for an approximate estimate when the exact weight of each component is not available.</li>
                            <li>3.2 Energy Consumption: If the production process is in-house, use the electricity records (in kWh) of the machines involved. Measure the energy consumed in a typical production cycle and divide it by the number of products manufactured in that cycle.</li>
                        </ul>
                        <p>4. Use Online Estimation Tools: There are online calculators available to estimate energy consumption and carbon footprint based on the type of material and manufacturing process. This can be useful when specific information for each process is not available.</p>
                        <p>5. Maintain Consistency in Estimations: Once estimates for a product are obtained, use the same methods for similar products. This helps improve the accuracy of estimates and facilitates data comparison between products.</p>
                    </div>` },
                transportation: {
                    title: 'Transportation', text: `<div class="popup-content">
    <h2>Instructions to Fill Out the Transportation Section</h2>
    <p>To complete the transportation section, follow these steps:</p>
    <p>1. Determine the mode of transportation used: Identify the different modes of transportation (truck, airplane, ship) that were used to move the product from its manufacturing location to the point of sale.</p>
    <p>2. Calculate the distance traveled by truck: Estimate the total distance in kilometers that the product traveled by truck, from the manufacturing location to its first distribution point (e.g., warehouses, ports, etc.).</p>
    <p>3. Calculate the distance traveled by airplane: Estimate the total distance in kilometers that the product traveled by airplane, if this mode of transportation was used during any part of its journey.</p>
    <p>4. Calculate the distance traveled by ship: Estimate the total distance in kilometers that the product traveled by ship, if it was transported by this method during any part of the journey.</p>
    <p>5. Add up the distances: Sum the distances traveled by truck, airplane, and ship to obtain the total kilometers traveled before the product was sold.</p>
    <p>Formula: <em>Total distance = Truck distance + Airplane distance + Ship distance</em></p>
</div>

                ` },
                recyclability: {
                    title: 'Reci', text: `<div class="popup-content">
    <h2>Instructions to Calculate the Recycling Percentage of the Product</h2>
    <p>To calculate the recycling percentage of the product, follow these steps:</p>
    <p>1. Identify recyclable materials: Determine which parts of the product are made from recyclable materials (such as metal, glass, recyclable plastic, paper, etc.).</p>
    <p>2. Weigh each recyclable material: Obtain the approximate weight in grams of each recyclable component of the product.</p>
    <p>3. Calculate the total recyclable weight: Add up the weight of all identified recyclable materials.</p>
    <p>4. Calculate the recycling percentage: Divide the total weight of recyclable materials by the total weight of the product and multiply the result by 100 to obtain the recycling percentage.</p>
    <p>Formula: <em>(Total weight of recyclable materials / Total weight of the product) x 100 = Recycling percentage</em></p>
</div>

                ` },
                details: { title: 'details', text: 'Texto' },
                extras: { title: 'extras', text: 'Texto' },
            }
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
        addMaterial() {
            this.materiales.push({ tipo: 'madera', cantidad: null, customMaterial: '' });
        },
        addEnergia() {
            this.energias.push({ tipo: 'redElectrica', cantidad: null, customEnergie: '' });
        },
        removeMaterial(index) {
            this.materiales.splice(index, 1);
        },
        removeEnergia(index) {
            this.energias.splice(index, 1);
        },
        handleMaterialChange(index) {
            // Limpiar el campo customMaterial si el tipo cambia de 'otro' a algo más
            if (this.materiales[index].tipo !== 'otro') {
                this.materiales[index].customMaterial = '';
            }
        },
        handleEnergieChange(index) {
            if (this.energias[index].tipo !== 'otro') {
                this.energias[index].customEnergie = ''
            }
        },
        async carbon__footprint() {
            try {
                // Obtenemos los datos para el input
                const input = this.dataformat();
                this.calculateState = 'loading';

                // Realizamos el POST para obtener el runId
                const response = await apiClient.post("/carbonfootprint", { message: input });
                const runId = response.data.runId;

                // Esperamos la respuesta del asistente
                let respuesta = null;
                let attempts = 0;

                // Esperamos de manera secuencial hasta obtener el resultado
                while (!respuesta && attempts < 10) {
                    attempts++;

                    // Intentamos obtener el resultado
                    try {
                        const result = await apiClient.get(`/carbonfootprint/getCarbonFootprint/${runId}`);
                        if (result.data && result.data.respuesta) {
                            respuesta = result.data.respuesta;
                        }
                    } catch (error) {
                        console.log('Intento fallido:', error);
                    }

                    // Si no tenemos el resultado, esperamos 2 segundos antes de intentar nuevamente
                    if (!respuesta) {
                        await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 2 segundos
                    }
                }

                if (respuesta) {
                    console.log('Respuesta obtenida:', respuesta);
                    this.calculateState = 'success';
                    this.formData.carbon_footprint = Number(respuesta);
                    this.formData.rewards_points = this.rewards_pointsCalculate(respuesta)
                    this.handleForms = false;
                } else {
                    console.log('No se pudo obtener la respuesta después de varios intentos.');
                    this.calculateState = 'error';
                }
            } catch (e) {
                console.log('Error en la función carbon__footprint:', e);
                this.calculateState = 'error';
            }
        },
        backForm() {
            this.handleForms = true; // Oculta el primer formulario y muestra el segundo

        },
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
                this.handleForms = true
                this.clearForm();
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
            this.materiales
            setTimeout(() => {
                this.productState = ''
                this.imagesState = ''
                this.colorsState = ''
                this.sizesState = ''
            }, 5000);
            this.$v.$reset()
        },
        dataformat() {
            let materialesTexto = this.materiales.map(material =>
                `Tipo de material: ${material.tipo.charAt(0).toUpperCase() + material.tipo.slice(1)}, Cantidad (en gramos): ${material.cantidad}`
            ).join(", ");

            // Formatear energías
            let energiasTexto = this.energias.map(energia =>
                `Tipo de energía: ${energia.tipo.charAt(0).toUpperCase() + energia.tipo.slice(1)}, Cantidad (en Kwh): ${energia.cantidad}`
            ).join(", ");

            // Formatear transporte
            let transporteTexto = `Distancia en avión (en km): ${this.transporte.avion}, Distancia en camión (en km): ${this.transporte.camion}, Distancia en barco (en km): ${this.transporte.barco}`;

            // Formatear reciclabilidad
            let reciclabilidadTexto = `Porcentaje de reciclabilidad (%): ${this.reciclabilidad}`;

            // Concatenar todo
            const textoFinal = `${materialesTexto}. ${energiasTexto}. ${transporteTexto}. ${reciclabilidadTexto}.`;

            return textoFinal;
        },
        rewards_pointsCalculate(carbonfootprint) {
            const maxFootprint = 5000; // Huella de carbono máxima (kg CO2)
            const maxPoints = 1000; // Puntos máximos
            const minPoints = 0;    // Puntos mínimos

            // Verificamos que la huella de carbono no sea negativa
            if (carbonfootprint < 0) {
                console.log("La huella de carbono no puede ser negativa.");
                return minPoints;
            }

            // Calculamos los puntos en base a la huella de carbono
            const points = ((maxFootprint - carbonfootprint) / maxFootprint) * maxPoints;
            console.log(points)
            // Aseguramos que los puntos estén dentro del rango de 0 a 1000
            return Math.min(Math.max(points, minPoints), maxPoints);
        }
    },
    async created() {
        this.$store.dispatch('setLoading', true);  // Activar loader al inicio
        try {
            this.categories = await fetchCategoryData();
            this.sizesOptions = await fetchSizes();
            this.colorOptions = await fetchColors();
        } catch (error) {
            console.error(error)
        } finally {
            this.$store.dispatch('setLoading', false);  // Desactivar loader al inicio
        }

    }
}
</script>
<style scoped>
.form {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    margin: 3rem 0 3rem;
}

.form__foot,
.form__details {
    display: flex;
    flex-direction: row;
    margin: 3rem 0 3rem;
}

.materials,
.energies {
    display: flex;
    column-gap: 1rem;
    width: 100%;
    margin: 1rem 0rem;
}


.materials__input,
.energies__input {
    width: 100%;
}

.materials__delete,
.materials__add,
.energies__delete,
.energies__add {
    width: 7%;
}

.btn__delete {
    background-color: transparent;
    border: .1rem solid var(--border-color);
    border-radius: .7rem;
    color: var(--required-color);
    cursor: pointer;
}

.btn__add {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: var(--text-color-body);
    border: .1rem solid var(--border-color);
    border-radius: .7rem;
    cursor: pointer;
    padding: .5rem;
    font-size: var(--font-size-smallest);
}


.form__column {
    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 55rem;
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
    display: flex;
    gap: 1rem;
    align-items: center;
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

.form__submit,
.form__submit--back {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 0;
    border-radius: .7rem;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    transition: all .3s ease-in-out;
    cursor: pointer;
}

.form__submit--back {
    background-color: transparent;
    color: var(--primary-color);
    margin-top: 1rem;
    border: dashed .1rem var(--primary-color);
}

.form__submit--back:hover {
    background-color: var(--text-color-hover-buttons);
    color: var(--text-color-base);
    border: solid;
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

.divisor {
    margin: 1rem 0 1rem;
    width: 100%;
    background-color: var(--border-color);
    height: .1rem;
}

/* Clases de transición para el desvanecimiento */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>