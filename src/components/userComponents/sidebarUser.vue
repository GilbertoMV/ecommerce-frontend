<template>
    <div class="sidebar">
        <h2>My account</h2>
        <ul class="options">
            <li class="option">My Orders</li>
            <li class="option">Sold Items</li>
            <li class="option">Product Catalog</li>
            <li class="option"><a @click="Logout" class="logout">Log Out</a></li>
        </ul>
    </div>

</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'SideBar',
    methods: {
        ...mapActions(['logout']),
        Logout() {
            this.logout();
        }
    }
}
</script>
<style scoped>
.sidebar {
    width: 20%;
    padding: 20px 0px;
    background: #fff;
}

h2 {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}

.options {
    display: grid;
    grid-template-rows: repeat(4, 40px);
    margin-top: 40px;
    font-size: 16px;
    row-gap: 15px;
    align-items: center;


}

.option {
    position: relative;
    list-style: none;
    padding: 10px;
    padding-left: 20px;
    cursor: pointer;
    color: black;
    transition: all 0.3s;
}

.option:hover {
    color: #62ab18;
}

.option::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    /* Ajusta el ancho de la línea según necesites */
    background-color: transparent;
    /* Inicialmente hacemos la línea transparente */
    transition: background-color 0.3s;
    /* Suaviza la transición de color */
}

.option:hover::before {
    background-color: #62ab18;
    /* Cambia a cualquier color que necesites */
}
</style>