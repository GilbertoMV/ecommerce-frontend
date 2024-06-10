<template>
    <div class="sidebar">
        <h2>My account</h2>
        <ul class="options">
            <li><a class="option" @click="activeComponent('infoUser')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle svg"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <span>Profile</span>
                </a></li>
            <li><a class="option">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bag svg"
                        viewBox="0 0 16 16">
                        <path
                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                    <span>My Orders</span>
                </a></li>
            <li><a class="option">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shop svg"
                        viewBox="0 0 16 16">
                        <path
                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                    </svg>
                    <span>Sold Items</span>
                </a></li>
            <li><a class="option">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shop-window svg"
                        viewBox="0 0 16 16">
                        <path
                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <span>Product Catalog</span></a></li>
            <li><a class="option" @click="activeComponent('accesibilityComponent')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        class="bi bi-universal-access-circle svg" viewBox="0 0 16 16">
                        <path
                            d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z" />
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8" />
                    </svg>
                    <span>Accesibility</span></a></li>
            <li><a @click="Logout" class="logout option">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-box-arrow-right svg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fill-rule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                    <span>Log Out </span>
                </a></li>
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
        },
        activeComponent(component) {
            this.$emit('change-component', component)
        }
    }
}
</script>
<style scoped>
.sidebar {
    width: 15%;
    background: #fff;
}

h2 {
    margin-top: 2rem;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
}

.options {
    display: grid;
    grid-template-rows: repeat(6, 4rem);
    margin-top: 4rem;
    font-size: 1.6rem;
    row-gap: 1.5rem;
    align-items: center;
}

.option {
    display: flex;
    align-content: center;
    position: relative;
    list-style: none;
    padding: 2rem;
    padding-left: 2rem;
    column-gap: 1rem;
    cursor: pointer;
    color: black;
    transition: all 0.3s;
    text-decoration: none;
}

.option:hover {
    color: #62ab18;
}

.svg {
    width: 1.7rem;
    height: 1.7rem;
}

.svg:hover {
    fill: #62ab18;
}


.option::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: .5rem;
    background-color: transparent;
    transition: background-color 0.3s;
}

.option:hover::before {
    background-color: #62ab18;
    /* Cambia a cualquier color que necesites */
}

@media (width <=768px) {
    .sidebar {
        width: 25%;
    }

    .options {
        margin-top: 3rem;
        font-size: 1.3rem;
        row-gap: 1.5rem;
        align-items: center;
    }
}

@media (width <=390px) {
    .sidebar {
        width: 15%;
    }

    .sidebar h2 {
        display: none;
    }

    .option span {
        display: none;
    }
}
</style>