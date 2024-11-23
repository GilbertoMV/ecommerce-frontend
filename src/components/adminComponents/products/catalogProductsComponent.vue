<template>
    <div class="crud">
        <h1 class="crud__title">Product Catalog</h1>
        <div class="crud__container">
            <div class="crud__header">
                <div class="crud__entries">
                </div>
                <div class="crud__search">
                    <searchComponent :searchAction="searchProduct" :placeholder="placeholder" />
                    <!-- esto cambia por la funcion de buscar productos -->
                </div>
                <div class="crud__button-container">
                    <router-link to="/admin/add-product" class="crud__button">
                        <plusIcon />
                        Add new
                    </router-link>
                </div>
            </div>
            <div class="table">
                <ul class="table__head">
                    <li v-for="(col, index) in columnsTable" :key="index"> {{ col.label }}</li>
                </ul>
                <ul class="table__body">
                    <li class="form__log" v-if="productsState === 'loading' && filteredProducts.length === 0">
                        <tinyLoader />
                        <span>
                            Loading products data...
                        </span>
                    </li>
                    <li class="form__log" v-if="productsState === 'error'">
                        <errorIcon />
                        <span>
                            Error loading products data...
                        </span>
                    </li>
                    <li class="form__log" v-if="filteredProducts.length === 0 && productsState !== 'loading'">
                        <errorIcon />
                        <span>No products found.</span>
                    </li>
                    <li v-for="(product, index) in filteredProducts" :key="index" class="table__row">
                        <p>{{ product.id_producto }}</p>
                        <!-- <p class="table__images">
                            <img class="table__image" :src="`${product.url_imagen}`"
                                :alt="'Category image: ' + product.nombre">
                        </p> -->
                        <p>{{ product.id_categoria }}</p>
                        <p>{{ product.nombre }}</p>
                        <p>{{ product.descripcion }}</p>
                        <p>{{ product.precio }}</p>
                        <p>{{ product.existencias }}</p>
                        <p>{{ product.huella_carbono }}</p>
                        <p class="table__icons">
                            <!-- <router-link class="table__icon"
                                :to="{ name: 'editCategoryComponent', params: { categoryId: category.id_categoria } }">
                            </router-link> -->
                            <!-- Aqui ira un componente nuevo de form para editar los datos del producto (solo datos de venta) -->
                            <editIcon class="edit" />
                            <span class="table__icon" @click="deleteProduct(product.id_product)">
                                <trashIcon class="delete" />
                            </span>
                        </p>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>
<script>
import searchComponent from '../../mainComponents/searchComponent.vue';
import plusIcon from '../../icons/plusIcon.vue';
import { mapGetters, mapActions } from 'vuex';
import trashIcon from '../../icons/trashIcon.vue';
import editIcon from '../../icons/editIcon.vue';
import apiClient from '../../../store/auth-vuex';
import Swal from 'sweetalert2';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
import errorIcon from '../../icons/errorIcon.vue';

export default {
    name: 'allCrudComponent',
    components: {
        searchComponent,
        plusIcon,
        trashIcon,
        editIcon,
        errorIcon,
        tinyLoader
    },
    computed: {
        ...mapGetters('products', ['filteredProducts']),
    },
    data() {
        return {
            columnsTable: [
                { label: 'ID', field: 'id_producto' },
                { label: 'Category', field: 'id_categoria' },
                { label: 'Name', field: 'nombre' },
                { label: 'Description', field: 'descripcion' },
                { label: 'Price', field: 'precio' },
                { label: 'Stock', field: 'existencias' },
                { label: 'CO₂e', field: 'huella de carbono' },
                { label: 'Actions', field: 'actions' } // Si necesitas acciones para la fila, por ejemplo, editar/eliminar
            ],
            productsState: '',
            placeholder: 'Search by name or id'
        }
    },
    methods: {
        ...mapActions('products', ['fetchProducts', 'filterProducts']),

        searchProduct(searchTerm) {
            if (searchTerm.trim() === '') {
                this.fetchProducts();
            } else {
                this.filterProducts(searchTerm);
            }
        },
        async deleteProduct(id_product) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#68ab18",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                focusCancel: true,
                focusConfirm: false
            });

            if (result.isConfirmed) {
                try {
                    await apiClient.delete(`/products/${id_product}`);
                    await this.fetchCategories();
                    Swal.fire({
                        icon: "success",
                        text: `Product ${id_product} has been deleted.`,
                        toast: true,
                        width: 'auto',
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } catch (error) {
                    // Manejar error de eliminación
                    let errorMessage = 'Error deleting the product: ' + (error.response ? error.response.data : error.message);
                    console.error(errorMessage);
                    Swal.fire({
                        icon: "warning",
                        text: errorMessage,
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
            }
        }
    },
    created() {
        this.productsState = 'loading';
        this.fetchProducts()
            .then(() => {
                this.productsState = 'success'; // Estado cargado
            })
            .catch((error) => {
                console.error(error);
                this.productsState = 'error'; // Error en la carga
            });
    }
}
</script>

<style scoped>
.crud__container {
    display: flex;
    flex-direction: column;
    margin: 3rem 0 3rem;
    width: 100%;
    background-color: var(--primary-background-color);
    border-radius: 1rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.crud__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    gap: 1rem;
    padding: 1rem 0 1rem;
}

.crud__text {
    font-size: var(--font-size-smallest);
    color: var(--text-color-body);
}

.crud__entries {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 2rem;
    gap: 1rem;
    width: 15%;
}

.crud__search {
    display: flex;
    justify-content: center;
    width: 60%;
}

.crud__search .search {
    height: 10%;
    width: 70%;
    padding: 0;
}

.crud__button-container {
    display: flex;
    justify-content: right;
    width: 25%;
}

.crud__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 5rem;
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    border-radius: .7rem;
    transition: all .3s ease-in-out;
    margin-right: 2rem;
    text-decoration: none;
}

.crud__button:hover {
    background-color: var(--text-color-hover-buttons);
}

.table {
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

.table__head {
    display: flex;
    justify-content: space-around;
    width: 95%;
    padding: 1rem 0;
    font-size: var(--font-size-small);
    border-radius: 1rem;
    color: var(--text-color-title);
    background-color: var(--option-hover-color);
    text-align: center;
}

.table__body {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 95%;
}

.table__row {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 1rem;
    padding: 1rem 0rem;
    font-size: var(--font-size-smallest);
    color: var(--text-color-body);
    transition: background-color .1s ease-in-out;
}

.table__row:hover,
.table__row:nth-child(odd):hover {
    background-color: var(--row-option-hover-color);
}

.table__row:nth-child(odd) {
    background-color: var(--option-hover-color);
}

.table__row p {
    text-align: center;
}

.table__row p:nth-child(1),
.table__head li:nth-child(1) {
    /*ID PRODUCT*/
    width: 5%;
}

.table__row p:nth-child(2),
.table__head li:nth-child(2) {
    /*CATEGORY*/
    width: 5%;
}

.table__row p:nth-child(3),
.table__head li:nth-child(3) {
    /*NAME*/
    width: 25%;
}

.table__row p:nth-child(4) {
    text-align: left;
}

.table__row p:nth-child(4),
.table__head li:nth-child(4) {
    /*DESCRIPTION*/
    width: 40%;
}

.table__row p:nth-child(5),
.table__head li:nth-child(5) {
    /*PRICE*/
    width: 5%;
}

.table__row p:nth-child(6),
.table__head li:nth-child(6) {
    /*STOCK*/
    width: 5%;
}

.table__row p:nth-child(7),
.table__head li:nth-child(7) {
    /*CO2E*/
    width: 5%;
}

.table__row p:nth-child(8),
.table__head li:nth-child(8) {
    /*actions*/
    width: 10%;
}

.table__icons {
    display: flex;
    justify-content: center;
    column-gap: 2rem;
}

.edit,
.delete {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
}

.edit {
    color: var(--edit-color);
}

.delete {
    color: var(--required-color);
}

.form__log {
    justify-content: center;
    flex-direction: column;
    row-gap: 1rem;
}

.form__log .loader,
.form__log svg {
    width: 5rem;
    height: 5rem;
}
</style>