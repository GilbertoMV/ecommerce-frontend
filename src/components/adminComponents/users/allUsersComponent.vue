<template>
    <div class="crud">
        <h1 class="crud__title">Customers</h1>
        <div class="crud__container">
            <div class="crud__header">
                <div class="crud__search">
                    <searchComponent :searchAction="searchUsers" :placeholder="placeholder" />
                </div>
            </div>
            <div class="table">
                <ul class="table__head">
                    <li v-for="(col, index) in columnsTable" :key="index"> {{ col.label }}</li>
                </ul>
                <ul class="table__body">
                    <li class="form__log" v-if="usersState === 'loading' && filteredUserData.length === 0">
                        <tinyLoader />
                        <span>
                            Loading customers data...
                        </span>
                    </li>
                    <li class="form__log" v-if="usersState === 'error'">
                        <errorIcon />
                        <span>
                            Error loading customers data...
                        </span>
                    </li>
                    <li class="form__log" v-if="filteredUserData.length === 0 && usersState !== 'loading'">
                        <errorIcon />
                        <span>No customers found.</span>
                    </li>
                    <li v-for="(user, idx) in filteredUserData" :key="idx" class="table__row">
                        <p>{{ user.id_usuario }}</p>
                        <p>{{ user.nombre }} {{ user.apellido_paterno }} {{ user.apellido_materno }}</p>
                        <p>{{ user.correo }}</p>
                        <p>{{ user.fecha_registro.split('T')[0] }}</p>
                        <p v-if="user.estado_cuenta === '0'">inactive</p>
                        <p v-else-if="user.estado_cuenta === '1'">customer</p>
                        <p v-else>admin</p>
                        <p class="table__icons">
                            <router-link :to="{ name: 'viewUserComponent', params: { userId: user.id_usuario } }"
                                class="table__icon">
                                <viewIcon class="edit" />
                            </router-link>
                            <span class="table__icon" @click="confirmDisabled(user.id_usuario)"
                                v-if="user.estado_cuenta !== '0'">
                                <enabledIcon class="enabled" />
                            </span>
                            <span v-else class="table__icon" @click="confirmEnabled(user.id_usuario)">
                                <disabledIcon class="disabled" />
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
import { mapGetters, mapActions } from 'vuex';
import viewIcon from '../../icons/viewIcon.vue';
import enabledIcon from '../../icons/enabledIcon.vue';
import disabledIcon from '../../icons/disabledIcon.vue';
import Swal from 'sweetalert2';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
import errorIcon from '../../icons/errorIcon.vue';
import apiClient from '../../../store/auth-vuex';

export default {
    name: 'allCrudComponent',
    components: {
        searchComponent,
        viewIcon,
        tinyLoader,
        errorIcon,
        enabledIcon,
        disabledIcon,
    },
    computed: {
        ...mapGetters('usersData', ['filteredUserData']),
    },
    data() {
        return {
            columnsTable: [
                { label: 'Id', field: 'id' },
                { label: 'Name', field: 'nombre' },
                { label: 'Email', field: 'email' },
                { label: 'Join Date', field: 'registro' },
                { label: 'Role', field: 'estado' },
                { label: 'Actions', field: 'acciones' }

            ],
            usersState: '',
            placeholder: 'Search by name or id',
        }
    },
    methods: {
        ...mapActions('usersData', ['fetchAllUsers', 'filterUserData']),
        searchUsers(searchTerm) {
            if (searchTerm.trim() === '') {
                this.fetchAllUsers();
            } else {
                this.filterUserData(searchTerm);
            }
        },
        viewUserInfo() {
            Swal.fire('hola')
        },
        async confirmDisabled(userId) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to disable the account?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#68ab18",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, disable it!",
                focusCancel: true,
                focusConfirm: false
            });

            if (result.isConfirmed) {
                try {
                    const updateUser = { id_usuario: userId, estado_cuenta: '0' };
                    await apiClient.put(`/users/${userId}`, { estado_cuenta: '0' });
                    this.$store.commit('usersData/UPDATE_USER_STATE', updateUser);
                    Swal.fire({
                        icon: "success",
                        text: `User with id: ${userId} has been disabled.`,
                        toast: true,
                        width: 'auto',
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } catch (error) {
                    let errorMessage = 'Error updating user: ' + (error.response ? error.response.data : error.message);
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
        async confirmEnabled(userId) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to enable the account?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#68ab18",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, enable it!",
                focusCancel: true,
                focusConfirm: false
            });

            if (result.isConfirmed) {
                try {
                    const updateUser = { id_usuario: userId, estado_cuenta: '1' };
                    await apiClient.put(`/users/${userId}`, { estado_cuenta: '1' });
                    this.$store.commit('usersData/UPDATE_USER_STATE', updateUser);
                    Swal.fire({
                        icon: "success",
                        text: `User with id: ${userId} has been enabled.`,
                        toast: true,
                        width: 'auto',
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } catch (error) {
                    let errorMessage = 'Error updating user: ' + (error.response ? error.response.data : error.message);
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
        editUser() {
            console.log("hola")
        }
    },
    async created() {
        this.usersState = 'loading'
        try {
            await this.fetchAllUsers();
            this.usersState = ''
        } catch (error) {
            this.usersState = 'error'
            console.error(error);
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
    padding: 1rem 0rem;
}

.crud__header {
    display: flex;
    justify-content: center;
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

.table {
    margin-top: 1rem;
    margin-bottom: 1rem;
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
    background-color: #ededed35;
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
    width: 10%;
}

.table__row p:nth-child(2),
.table__head li:nth-child(2) {
    /*name*/
    width: 30%;
}

.table__row p:nth-child(3),
.table__head li:nth-child(3) {
    /*email*/
    width: 20%;
}

.table__row p:nth-child(4),
.table__head li:nth-child(4) {
    /*join date*/
    width: 15%;
}

.table__row p:nth-child(5),
.table__head li:nth-child(5) {
    /*status*/
    width: 10%;
}

.table__row p:nth-child(6),
.table__head li:nth-child(6) {
    /*actions*/
    width: 15%;
}


.table__images {
    display: flex;
    justify-content: center;
}

.table__image {
    width: 10rem;
}

.table__icons {
    display: flex;
    justify-content: center;
    column-gap: 2rem;
}

.enabled,
.disabled,
.edit {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
}

.edit {
    color: var(--edit-color);
}

.enabled {
    color: var(--view-color);
}

.disabled {
    color: var(--required-color)
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