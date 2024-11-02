<template>
    <div class="crud">
        <h1 class="crud__title">User Information</h1>
        <div class="userInfoGrid">
            <div class="leftContainer">
                <h2 class="crud__subtitle">Orders History</h2>
                <div class="table">
                    <ul class="table__head-orders">
                        <li v-for="(col, index) in columnsOrders" :key="index"> {{ col.label }}</li>
                    </ul>
                    <ul class="table__body">
                        <li class="form__log" v-if="orders.length === 0">
                            <alertIcon />
                            <span>No orders found.</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rightContainer">
                <div class="rows">
                    <div class="row info">
                        <h2 class="crud__subtitle">User Information</h2>
                        <div class="userInfoContainer">
                            <div class="userInfo">
                                <div class="data">
                                    <p class="name">{{ userData.nombre }} {{ userData.apellido_paterno }} {{
                                        userData.apellido_paterno }}</p>
                                    <p class="email">{{ userData.correo }} </p>
                                </div>
                                <div class="photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                        viewBox="0 0 24 24" fill="none" stroke="#bebebe" stroke-width="1"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-user">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row rewards">
                        <h2 class="crud__subtitle">Rewards History</h2>
                        <div class="table">
                            <ul class="table__head-rewards">
                                <li v-for="(col, index) in columnsRewards" :key="index"> {{ col.label }}</li>
                            </ul>
                            <ul class="table__body">
                                <li class="form__log" v-if="rewards.length === 0">
                                    <alertIcon />
                                    <span>No rewards found.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <h2 class="crud__subtitle">Change Password</h2>
                        <div class="change_pass">
                            <form action="" class="form">
                                <label for="passwrod" class="form__label">
                                    New Password <span class="form__required">*</span></label>
                                <input type="text" id="passwrod" name="passwrod" placeholder="Enter new password"
                                    class="form__input" maxlength="50" minlength="10" required>
                                <label for="confirm_passwrod" class="form__label">
                                    Confirm Password <span class="form__required">*</span></label>
                                <input type="text" id="confirm_passwrod" name="confirm_passwrod"
                                    placeholder="Enter new password confirm" class="form__input" maxlength="50"
                                    minlength="10" required>
                                <button type="submit" class="form__submit">
                                    <plusIcon />
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apiClient from '../../../store/auth-vuex.js'
import plusIcon from '../../icons/plusIcon.vue';
// import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
// import errorIcon from '../../icons/errorIcon.vue';
import alertIcon from '../../icons/alertIcon.vue';

export default {
    name: 'editUserComponent',
    components: {
        plusIcon,
        // tinyLoader,
        // errorIcon,
        alertIcon
    },
    data() {
        return {
            columnsOrders: [
                { label: 'ID', field: 'id_pedido' },
                { label: 'ID address', field: 'id_direccion_destino' },
                { label: 'Payment method', field: 'metodo_de_pago' },
                { label: 'Status', field: 'estado' },
                { label: 'Actions', field: 'actions' }
            ],
            columnsRewards: [
                { label: 'ID', field: 'id_recompensa' },
                { label: 'ID order', field: 'id_pedido' },
                { label: 'rewards Points', field: 'puntos_recibidos' }
            ],
            userData: {},
            rewards: [],
            orders: [],
            ordersState: '',
            rewardsState: ''
        }
    },
    async created() {
        const userId = this.$route.params.userId;
        try {
            const response = await apiClient.get(`/users/${userId}`)
            this.userData = response.data;
        } catch (e) {
            console.error(e)
        }
    }
}
</script>
<style scoped>
.userInfoGrid {
    display: flex;
    column-gap: 2rem;
    width: 100%;
    /*quitar*/
    height: 80vh;
    margin: 3rem 0 3rem;
}

.crud__subtitle {
    margin-top: 1.5rem;
    padding-left: 1.5rem;
    width: 100%;
    text-align: left;
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
}

.rightContainer {
    width: 40%;
}

.leftContainer {
    width: 60%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.rows {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 2rem;
}

.row {
    border-radius: 1rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.row.info {
    height: 25%;
}

.row.rewards {
    height: 40%;
}

.table {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

.table__head-orders,
.table__head-rewards {
    display: flex;
    justify-content: space-around;
    width: 95%;
    margin-top: 2rem;
    padding: 1rem 0;
    font-size: var(--font-size-small);
    border-radius: 1rem;
    color: var(--text-color-title);
    background-color: var(--option-hover-color);
    text-align: center;
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

.table__body {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 95%;
}

.table__row-orders p:nth-child(1),
.table__head-orders li:nth-child(1) {
    /*ID*/
    width: 10%;
}

.table__row-orders p:nth-child(2),
.table__head-orders li:nth-child(2) {
    /*address*/
    width: 25%;
}

.table__row-orders p:nth-child(3),
.table__head-orders li:nth-child(3) {
    /*payment method*/
    width: 25%;
}

.table__row-orders p:nth-child(4),
.table__head-orders li:nth-child(4) {
    /*status*/
    width: 15%;
}

.table__row-orders p:nth-child(5),
.table__head-orders li:nth-child(5) {
    /*actions*/
    width: 25%;
}

.table__head-rewards p:nth-child(1),
.table__head-rewards li:nth-child(1) {
    width: 25%;
}

.table__head-rewards p:nth-child(2),
.table__head-rewards li:nth-child(2) {
    width: 25%;
}

.table__head-rewards p:nth-child(3),
.table__head-rewards li:nth-child(3) {
    width: 50%;
}

.userInfoContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80%;
}

.userInfo {
    display: flex;
    width: 95%;
    justify-content: center;
    align-items: center;
}

.data {
    width: 70%;
}

.name,
.email {
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
}

.name {
    font-size: var(--font-size-big);
    padding-bottom: 1rem;
    text-transform: capitalize;
    font-weight: 600;
}

.photo {
    width: 30%;
    height: 100%;
    max-width: 10rem;
    max-height: 10rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: var(--option-hover-color);
}

.change_pass {
    display: flex;
    justify-content: center;
}

.form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    gap: 1rem;
    margin: 1rem 0 1.5rem;
}

.form__label {
    font-size: var(--font-size-small);
    font-weight: 500;
    color: var(--text-color-body);
    margin-top: 1rem;
}

.form__submit {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    margin-top: 1rem;
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