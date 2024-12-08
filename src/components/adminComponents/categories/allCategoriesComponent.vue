<template>
    <div class="crud">
        <h1 class="crud__title">All Categories</h1>
        <div class="crud__container">
            <div class="crud__header">
                <div class="crud__entries">
                </div>
                <div class="crud__search">
                    <searchComponent :searchAction="searchCategories" :placeholder="placeholder" />
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
                    <li class="form__log" v-if="categoriesState === 'loading' && filteredCategories.length === 0">
                        <tinyLoader />
                        <span>
                            Loading categories data...
                        </span>
                    </li>
                    <li class="form__log" v-if="categoriesState === 'error'">
                        <errorIcon />
                        <span>
                            Error loading categories data...
                        </span>
                    </li>
                    <li class="form__log" v-if="filteredCategories.length === 0 && categoriesState !== 'loading'">
                        <errorIcon />
                        <span>No categories found.</span>
                    </li>
                    <li v-for="(category, index) in filteredCategories" :key="index" class="table__row">
                        <p>{{ category.id_categoria }}</p>
                        <p class="table__images">
                            <img class="table__image" :src="`${category.url_imagen}`"
                                :alt="'Category image: ' + category.nombre">
                        </p>
                        <p>{{ category.nombre }}</p>
                        <p>{{ category.descripcion }}</p>
                        <p class="table__icons">
                            <router-link class="table__icon"
                                :to="{ name: 'editCategoryComponent', params: { categoryId: category.id_categoria } }">
                                <editIcon class="edit" />
                            </router-link>
                            <span class="table__icon" @click="deleteCategory(category.id_categoria)">
                                <trashIcon class="delete" />
                            </span>
                        </p>
                    </li>
                </ul>

            </div>
            <div class="pagination">
                <button class="pagination__button" @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1">Last</button>
                <span class="pagination__text">Page {{ currentPage }} of {{ totalPages }}</span>
                <button class="pagination__button" @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages">Next</button>
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
        ...mapGetters('categories', ['filteredCategories', 'currentPage', 'totalPages', 'totalCategories']),
    },
    data() {
        return {
            columnsTable: [
                { label: 'ID', field: 'id_categoria' },
                { label: 'Image', field: 'url_imagen' },
                { label: 'Name', field: 'nombre' },
                { label: 'Description', field: 'descripcion' },
                { label: 'Actions', field: 'actions' }
            ],
            searchTerm: '', // Campo para el término de búsqueda
            categoriesState: '', // Estado de carga de las categorías
            placeholder: 'Search by name or id'
        };
    },
    methods: {
        ...mapActions('categories', ['fetchCategories', 'filterCategories']),
        searchCategories(searchTerm) {
            if (searchTerm.trim() === '') {
                this.fetchCategories({ page: this.currentPage, limit: 7 });
            } else {
                this.filterCategories(searchTerm);
            }
        },
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
                    await this.fetchCategories({ page: this.currentPage }); // Refrescar la página actual
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
                    // Manejar error de eliminación
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
        },
        async goToPage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.categoriesState = 'loading';
                await this.fetchCategories({ page });
                this.categoriesState = 'success';
            }
        }
    },
    created() {
        this.categoriesState = 'loading';
        this.fetchCategories({ page: 1 })
            .then(() => {
                this.categoriesState = 'success'; // Estado cargado
            })
            .catch((error) => {
                this.categoriesState = 'error'; // Error en la carga
                console.error(error);
            });
    }
};

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
    margin: 2rem 0;
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

.crud__button,
.pagination__button {
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

.crud__button:hover,
.pagination__button:hover {
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
    width: 95%;
    min-height: 55rem;
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
    /*DESCRIPTION*/
    width: 30%;
}

.table__row p:nth-child(4) {
    text-align: left;
    overflow: hidden;
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

.pagination {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.pagination__button {
    font-size: var(--font-size-smallest);
    margin-right: 0rem;
    padding: 1rem;
}

.pagination__text {
    font-family: var(--font-size-medium);
    color: var(--text-color-body)
}
</style>