<template>
    <div class="crud">
        <h1 class="crud__title">All Categories</h1>
        <div class="crud__container">
            <div class="crud__header">
                <div class="crud__entries">
                    <!-- <span class="crud__text">Showing</span>
                    <select name="entries" id="entries" class="crud__select">
                        <option value="5">10</option>
                        <option value="10">20</option>
                        <option value="10">30</option>
                    </select>
                    <span class="crud__text">entries</span> -->
                </div>
                <div class="crud__search">
                    <searchComponent />
                </div>
                <div class="crud__button-container">
                    <router-link to="/admin/add-category" class="crud__button">
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
                    <li class="form__log" v-if="categoriesState === 'loading'">
                        <tinyLoader />
                        <span>
                            Loading categories...
                        </span>
                    </li>
                    <li class="form__log" v-if="categoriesState === 'error'">
                        <errorIcon />
                        <span>
                            Error loading categories...
                        </span>
                    </li>
                    <li v-for="(category, index) in categories" :key="index" class="table__row">
                        <p>{{ category.id_categoria }}</p>
                        <p class="table__images">
                            <img class="table__image" :src="`${category.url_imagen}`"
                                :alt="'Category image: ' + category.nombre">
                        </p>
                        <p>{{ category.nombre }}</p>
                        <p>{{ category.descripcion }}</p>
                        <p class="table__icons">
                            <router-link class="table__icon"
                                :to="{ name: 'editCategoryComponenst', params: { categoryId: category.id_categoria } }">
                                <editIcon class="edit" />
                            </router-link>
                            <span class="table__icon" @click="deleteCategory(category.id_categoria)">
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
import { fetchCategoryData } from '../../../utils/apiUtils.js';
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
    data() {
        return {
            columnsTable: [
                { label: 'ID', field: 'id_categoria' },
                { label: 'Image', field: 'url_imagen' },
                { label: 'Name', field: 'nombre' },
                { label: 'Description', field: 'descripcion' },
                { label: 'Actions', field: 'actions' } // Si necesitas acciones para la fila, por ejemplo, editar/eliminar
            ],
            categories: [],
            categoriesState: ''
        }
    },
    methods: {
        async deleteCategory(id_category) {
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
                    await apiClient.delete(`/categories/${id_category}`);
                    this.categories = this.categories.filter(category => category.id_categoria !== id_category);
                    Swal.fire({
                        icon: "success",
                        text: `Category ${id_category} has been deleted.`,
                        toast: true,
                        width: 'auto',
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } catch (error) {
                    let errorMessage = 'Error deleting the category: ' + (error.response ? error.response.data : error.message);
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
    async created() {
        try {
            this.categoriesState = 'loading'
            this.categories = await fetchCategoryData();
            this.categoriesState = ''
        } catch (error) {
            console.error(error)
            this.categoriesState = 'error'
        }
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
    /*ID*/
    width: 5%;
}

.table__row p:nth-child(2),
.table__head li:nth-child(2) {
    /*IMAGE*/
    width: 10%;
}

.table__row p:nth-child(3),
.table__head li:nth-child(3) {
    /*NAME*/
    width: 30%;
}

.table__row p:nth-child(4),
.table__head li:nth-child(4) {
    width: 40%;
}

.table__row p:nth-child(5),
.table__head li:nth-child(5) {
    /*actions*/
    width: 15%;
}

.table__images {
    display: flex;
    justify-content: center;
}

.table__image {
    width: 5rem;
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