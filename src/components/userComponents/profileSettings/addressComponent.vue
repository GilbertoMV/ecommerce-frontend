<template>
    <div class="address">
        <div class="address__information">
            <span>{{ addresses.length }} of 3 address</span>
            <router-link to="/config-address" class="address__add-button"
                v-if="addresses.length < 3 && addresses.length > 0">
                New Address</router-link>
        </div>
        <div v-if="addresses.length === 0">
            <p>No addresses available</p>
        </div>
        <div v-else class="address__grid" v-for="address in addresses" :key="address.id">
            <div class="address__row">
                <div class="address__icon" v-if="address.tipo_direccion === 'Laboral'">
                    <officeIcon />
                </div>
                <div class="address__icon" v-else>
                    <houseIcon />
                </div>
                <div class="address__info">
                    <h2>
                        {{ address.colonia }} {{ address.municipio }} {{ address.estado }}
                    </h2>
                    <p>
                        {{ address.tipo_direccion }} - {{ address.codigo_postal }} - {{ address.calle }} # {{
                            address.num_exterior }}
                        - {{ address.nombre_completo }} - {{ address.telefono_contacto }}
                    </p>
                </div>
                <div class="address__options" :ref="'menu-' + address.id_direccion">
                    <div class="address__menu-container">
                        <span class="address__menu-trigger" @click="toggleMenu(address.id_direccion)">
                            <configIcon />
                        </span>
                        <div v-if="address.id_direccion === openMenuId" class="address__menu-options">
                            <ul>
                                <router-link
                                    :to="{ name: 'editAddressPage', params: { addressId: address.id_direccion } }">
                                    <editIcon />Edit address
                                </router-link>
                                <li @click="deleteAddress(address.id_direccion)">
                                    <trashIcon />Delete address
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
import houseIcon from '../../icons/houseIcon.vue';
import officeIcon from '../../icons/officeIcon.vue';
import configIcon from '../../icons/configIcon.vue';
import trashIcon from '../../icons/trashIcon.vue';
import editIcon from '../../icons/editIcon.vue'
export default {
    name: 'addressComponent',
    components: {
        houseIcon,
        officeIcon,
        configIcon,
        trashIcon,
        editIcon
    },
    computed: {
        ...mapGetters(['isDarkMode', 'idUser'])
    },
    data() {
        return {
            addresses: [],
            openMenuId: null,
            retardo: null
        }
    },
    created() {
        document.addEventListener('click', this.handleOutsideClick);
        this.retardo = setTimeout(() => {
            this.fetchUserAddress();
        }, 500);
    },
    beforeDestroy() {
        clearTimeout(this.retardo);
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
.address {
    display: flex;
    flex-direction: column;
    width: 100rem;
    max-width: 120rem;
    margin-top: 5rem;
    border-radius: 2rem;
}

.address__information {
    padding: 2rem 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.address__add-button {
    font-size: var(--font-size-medium);
    padding: 1rem;
    background-color: var(--primary-color);
    border-radius: 1rem;
    text-decoration: none;
    color: var(--text-color-base);
}

.address__grid {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    width: 100%;
    background-color: var(--primary-background-color);
    border-radius: 2rem;
    margin-bottom: 1rem;
}

.address__row {
    display: grid;
    grid-template-columns: 7% auto 5%;
    padding: 1rem;
    column-gap: 1rem;
    border-bottom: solid .1rem var(--separators-color);
}

.address__row:last-of-type {
    border-bottom: none;
}

.address__icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

.address__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.address__options {
    display: flex;
    justify-content: center;
    align-items: center;
}

.address__menu-container {
    position: relative;
    display: inline-block;
}

.address__menu-trigger {
    cursor: pointer;
}

.address__menu-options {
    position: absolute;
    background-color: var(--primary-background-color);
    box-shadow: 0rem .2rem .5rem rgba(0, 0, 0, 0.3);
    width: 20rem;
    top: 4rem;
    right: 0;
    z-index: 999;
    border-radius: .7rem;
}

.address__menu-options ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.address__menu-options li,
.address__menu-options a {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-size: var(--font-size-medium);
    padding: 1.2rem 1rem;
    cursor: pointer;
    border-radius: .7rem;
    transition: all .3s ease;
    text-decoration: none;
    color: var(--black-color);
}

.address__menu-options li:last-child {
    border-bottom: unset;
}

.address__menu-options li:last-child:hover {
    color: var(--error-color);
}

.address__menu-options li:hover,
.address__menu-options a:hover {
    background-color: var(--background-hover-menus);
}

.svg {
    width: 2.5rem;
    height: 2.5rem;
    stroke: var(--primary-color);
}

h2 {
    font-size: var(--font-size-big);
    font-weight: 500;
    text-transform: capitalize;
}

p {
    font-size: var(--font-size-medium);
    margin-top: 1rem;
    text-transform: capitalize;
}

@media (width <=768px) {
    .address {
        width: 90%;
    }

    .address__row {
        grid-template-columns: 10% auto 10%;
    }


    h2 {
        font-size: var(--font-size-medium);
    }

    p {
        font-size: var(--font-size-small);
        line-height: 1.8rem;
        margin-top: .5rem;
    }

}

@media (width <=390px) {
    .address__row {
        grid-template-columns: 8% auto 10%;
    }

    h2 {
        display: none;
    }

    p {
        font-size: 1.1rem;
    }

    .address__add-button {
        font-size: 1.3rem;
        padding: .7rem;
    }

    .address__menu-options {
        width: 17rem;
    }

    .address__menu-options li,
    .address__menu-options a {
        font-size: 1.4rem;
    }

}
</style>