<template>
    <div class="sidebar">
        <h2>My account</h2>
        <ul class="options">
            <li><router-link to="/" class="option"> My Orders</router-link></li>
            <li><router-link to="/" class="option">Items</router-link></li>
            <li><router-link to="/" class="option">Product Catalog</router-link></li>
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
    width: 15%;
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
    text-decoration: none;
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
    background-color: transparent;
    transition: background-color 0.3s;
}

.option:hover::before {
    background-color: #62ab18;
    /* Cambia a cualquier color que necesites */
}
</style>