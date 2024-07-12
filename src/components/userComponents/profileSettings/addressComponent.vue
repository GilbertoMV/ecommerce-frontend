<template>
    <div class="container" :class="{ 'dark-mode': isDarkMode }">
        <div class="configContainer">
            <div>
                <span>1 of 3 address</span>
            </div>
            <router-link to="/config-address" class="addAddressBtn">+ Address</router-link>
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
                        Código postal {{ address.codigo_postal }} - {{ address.calle }} # {{ address.num_exterior }}
                        - {{ address.nombre_completo }} - {{ address.telefono_contacto }}
                    </p>
                </div>
                <div class="optionsButton">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-three-dots-vertical optionIcon"
                        viewBox="0 0 16 16">
                        <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiClient from '../../../store/auth-vuex'
export default {
    name: 'addressComponent',
    computed: {
        ...mapGetters(['isDarkMode'])
    },
    data() {
        return {
            addresses: []
        }
    },
    created() {
        this.fetchUserAddress()
    },
    methods: {
        async fetchUserAddress() {
            try {
                const response = await apiClient('/address');
                this.addresses = response.data;
            } catch (err) {
                console.error(err);
            }
        }
    }
}
</script>

<style scoped>
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