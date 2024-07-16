<template>
    <div class="container" :class="{ 'dark-mode': isDarkMode }">
        <div class="configContainer">
            <div>
                <span>{{ addresses.length }} of 3 address</span>
            </div>
            <router-link to="/config-address" class="addAddressBtn"> + Address</router-link>
        </div>
        <div v-if="addresses.length === 0">
            <p>no addresses available</p>
        </div>
        <div class="gridOptions" v-for="address in addresses" :key="address.id">
            <div class="row">
                <div class="iconOption">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-house-door icon" viewBox="0 0 16 16">
                        <path
                            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                </div>
                <div class="infoOption">
                    <h2>
                        {{ address.colonia }} {{ address.municipio }} {{ address.estado }}
                    </h2>
                    <p>
                        {{ address.tipo_direccion }} - {{ address.codigo_postal }} - {{ address.calle }} # {{
                        address.num_exterior }}
                        - {{ address.nombre_completo }} - {{ address.telefono_contacto }}
                    </p>
                </div>
                <div class="optionsButton" :ref="'menu-' + address.id_direccion">
                    <div class="menu-container">
                        <span class="menu-trigger" @click="toggleMenu(address.id_direccion)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-three-dots-vertical optionIcon"
                                viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </span>
                        <div v-if="address.id_direccion === openMenuId" class="menu-options">
                            <ul>
                                <router-link to="/" @click="editAddress(address.id_direccion)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>Edit address
                                </router-link>
                                <li @click="deleteAddress(address.id_direccion)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>Delete address
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiClient from '../../../store/auth-vuex';
import Swal from 'sweetalert2';
export default {
    name: 'addressComponent',
    computed: {
        ...mapGetters(['isDarkMode', 'idUser'])
    },
    data() {
        return {
            addresses: [],
            openMenuId: null,
        }
    },
    created() {
        document.addEventListener('click', this.handleOutsideClick);
        setTimeout(() => {

            this.fetchUserAddress();
        }, 500);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        toggleMenu(id) {
            this.openMenuId = this.openMenuId === id ? null : id;
        },
        closeMenu() {
            this.openMenuId = null;
        }, handleOutsideClick(e) {
            let isClickInsideAnyMenu = this.addresses.some(address => {
                const refName = 'menu-' + address.id_direccion;
                return this.$refs[refName] && this.$refs[refName][0].contains(e.target);
            });
            if (!isClickInsideAnyMenu) {
                this.closeMenu();
            }
        },
        async fetchUserAddress() {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            try {
                const response = await apiClient(`/address/me/${this.idUser}`);
                this.addresses = response.data;
            } catch (error) {
                let errorMessage = 'Error loading address' + error
                Swal.fire({
                    icon: "warning",
                    text: errorMessage,
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false);  // Desactivar loader al inicio
            }
        },
        editAddress() {
            console.log('manda la info a los inputs para editar la informacion');
            this.closeMenu()
        },
        async deleteAddress(id_direccion) {
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
                    await apiClient.delete(`address/delete/${id_direccion}`);
                    this.addresses = this.addresses.filter(address => address.id_direccion !== id_direccion); //filtra las direcciones para actualizar el DOM y mostrar solo las existentes despues de elimnarla
                    Swal.fire({
                        icon: "success",
                        text: "Your address has been deleted.",
                        toast: true,
                        width: 'auto',
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } catch (error) {
                    let errorMessage = 'error deleting the address' + error;
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
            this.closeMenu()
        },
    }
}
</script>

<style scoped>
.menu-container {
    position: relative;
    display: inline-block;
}

.menu-trigger {
    cursor: pointer;
}

.optionIcon {
    border-radius: 50%;
    padding: 1rem;
    width: 2rem;
    height: 2rem;
    fill: #62ab18;
}

.optionIcon:hover {
    background-color: rgba(131, 131, 131, 0.166);
}

.menu-options {
    position: absolute;
    background-color: white;
    box-shadow: 0 .2rem .5rem rgba(0, 0, 0, 0.2);
    width: 20rem;
    top: 4rem;
    right: 0;
    z-index: 999;
    border-radius: .7rem;
}

.menu-options ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-options li,
.menu-options a {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-size: 1.6rem;
    padding: 1.2rem 1rem;
    cursor: pointer;
    border-radius: .7rem;
    transition: all .3s ease;
    text-decoration: none;
    color: black
}

.menu-options li:last-child {
    border-bottom: unset;
}

.menu-options li:last-child:hover {
    color: #c10f0f;
}

.menu-options li:hover,
.menu-options a:hover {
    background-color: #f1f1f1;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 5rem;
}

.configContainer {
    padding: 0rem 1rem 1rem 1rem;
    width: 69%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
}

.addAddressBtn {
    font-size: 1.6rem;
    padding: 1rem;
    background-color: #62ab18;
    border-radius: 1rem;
    text-decoration: none;
    color: #ebead6;
}

.gridOptions {
    display: grid;
    grid-template-rows: repeat(1, 9rem);
    width: 70%;
    height: fit-content;
    background-color: #fff;
    border-radius: 2rem;
    margin-bottom: 1rem;
}

.row {
    display: grid;
    grid-template-columns: 7% auto 5%;
    padding: 1rem;
    column-gap: 1rem;
    border-bottom: solid .1rem #f2f2f2;
}

.row:last-of-type {
    border-bottom: none;
}

.iconOption {
    display: flex;
    justify-content: center;
    align-items: center;
}

.optionsButton {
    display: flex;
    justify-content: center;
    align-items: center;
}

.optionIcon {
    padding: 1rem;
    width: 2rem;
    height: 2rem;
    fill: #62ab18;
}

.icon {
    width: 3rem;
    height: 3rem;
    fill: #62ab18;
}

.infoOption {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

h2 {
    font-size: 1.8rem;
    font-weight: 500;
    text-transform: capitalize;
}

p {
    font-size: 1.6rem;
    margin-top: 1rem;
}

.dark-mode .gridOptions {
    background-color: #3a5816;
}

.dark-mode .icon {
    fill: #B0CB7F;
}

.dark-mode h2 {
    color: #ebead6;
}

.dark-mode p {
    color: #B0CB7F;
}

.dark-mode .row {
    border-bottom: solid .1rem #7e7e7e;
}

.dark-mode .row:last-of-type {
    border-bottom: unset;
}

.dark-mode span {
    color: #B0CB7F;
}


@media (width <=768px) {
    .row {
        grid-template-columns: 10% auto 10%;
    }

    .gridOptions {
        width: 90%;
    }

    .configContainer {
        width: 79%;
    }

    h2 {
        font-size: 1.7rem;
    }

    p {
        font-size: 1.3rem;
        line-height: 1.8rem;
        margin-top: .5rem;
    }

    .switch {
        font-size: unset;
    }

}

@media (width <=390px) {
    .row {
        grid-template-columns: 8% auto 13%;
    }

    h2 {
        font-size: 1.3rem;
    }

    p {
        font-size: 1.1rem;
    }

    .addAddressBtn {
        font-size: 1.3rem;
        padding: .7rem;
    }
}
</style>