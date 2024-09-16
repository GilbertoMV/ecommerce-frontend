<template>
    <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
        <div class="profile">
            <div class="eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                    stroke="#bebebe" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
            </div>
            <h2>{{ username }} {{ paternalLastName }}</h2>
        </div>
        <ul class="list">
            <li v-for="(option, index) in options" :key="index">
                <!-- Si la opción no tiene submenú, usa router-link directamente -->
                <router-link v-if="!option.menu" :to="option.route" exact-active-class="is-active" class="item-click">
                    <div class="list__item">
                        <component :is="option.icon"></component>
                        {{ option.label }}
                    </div>
                </router-link>

                <!-- Si la opción tiene submenú, permite el desplegable -->
                <div v-else @click="toggleMenu(index)" :class="{ 'item-click': true, 'isActive': isActive(index) }">
                    <div class="list__item">
                        <component :is="option.icon"></component>
                        <span>{{ option.label }}</span>
                    </div>
                    <div class="list__item__icon">
                        <optionsIcon class="desplegableIcon" />
                    </div>
                </div>

                <!-- Menú desplegable -->
                <ul v-if="option.menu" :class="{ 'menu': true, 'active': isActive(index) }">
                    <router-link :to="opt.route" v-for="(opt, i) in option.opts" :key="i" exact-active-class="is-active"
                        class="menu_item">
                        {{ opt.label }}
                    </router-link>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
//sidebar user icons
const userIcon = () => import('../icons/userIcon.vue')
const ordersIcon = () => import('../icons/ordersIcon.vue')
const rewardsIcon = () => import('../icons/rewardsIcon.vue')
const addressIcon = () => import('../icons/addressIcon.vue')
const securityIcon = () => import('../icons/securityIcon.vue')
const privacyIcon = () => import('../icons/privacyIcon.vue')
const supportIcon = () => import('../icons/supportIcon.vue')
const accessibilityIcon = () => import('../icons/accessibilityIcon.vue')
const optionsIcon = () => import('../icons/optionsIcon.vue')

//sidebar admin icons
const homeIcon = () => import('../icons/houseIcon.vue')
const attributeIcon = () => import('../icons/attributeIcon.vue')
const categoryIcon = () => import('../icons/categoryIcon.vue')
const productIcon = () => import('../icons/productIcon.vue')

export default {
    name: 'SideBar',
    props: {
        title: {
            type: String,
            required: false
        },
        options: {
            type: Array,
            required: false
        }
    },
    components: {
        userIcon,
        ordersIcon,
        rewardsIcon,
        addressIcon,
        securityIcon,
        privacyIcon,
        supportIcon,
        accessibilityIcon,
        optionsIcon,
        homeIcon,
        attributeIcon,
        categoryIcon,
        productIcon
    },
    computed: {
        ...mapGetters(['isDarkMode', 'username', 'paternalLastName'])
    },
    data() {
        return {
            activeItem: null
        };
    },
    methods: {
        toggleMenu(index) {
            this.activeItem = this.activeItem === index ? null : index;
        },
        isActive(index) {
            return this.activeItem === index;
        }
    }
}
</script>
<style scoped>
.sidebar {
    height: 100vh;
    width: 15%;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 50px -30px rgb(150, 150, 150);
    -moz-box-shadow: 0px 0px 50px -30px rgb(150, 150, 150);
    box-shadow: 0px 0px 50px -30px rgb(150, 150, 150);
    z-index: 990;
}

h2 {
    padding: 1.5rem 0;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
}

.list {
    display: flex;
    flex-direction: column;
    align-items: left;
}

.item-click {
    display: flex;
    justify-content: space-between;
    position: relative;
    column-gap: 1rem;
    cursor: pointer;
    color: black;
    text-decoration: none;
}

.list__item,
.list__item__icon {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 1.6rem;
    padding: 2rem;
    width: 100%;
    transition: all .1s;
}

.list__item__icon {
    width: initial;
}

.list__item:hover {
    transform: translate(1rem);
}

.menu {
    margin-left: 5rem;
    font-size: 1.3rem;
    max-height: 0;
    overflow: hidden;
    border-left: solid .2rem var(--txtc-principal);
    opacity: 0;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.menu.active {
    max-height: 500px;
    opacity: 1;
}

.menu_item {
    display: flex;
    padding: 1rem;
    color: #5c5c5c;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.3rem;
}

.menu_item.is-active {
    color: #62ab18;
}

.desplegableIcon {
    transition: transform 0.3s ease-in-out;
}

.isActive .desplegableIcon {
    transform: rotate(90deg);
}

.item-click:hover,
.menu_item:hover,
.item-click.is-active {
    color: #62ab18;
}

.svg {
    width: 1.8rem;
    height: 1.8rem;
}

.item-click::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: .5rem;
    background-color: transparent;
    transition: background-color 0.3s;
}

.item-click:hover::before,
.item-click.is-active::before {
    background-color: #62ab18;
}

.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding-top: 1rem;
}

.eliminar {
    width: 10rem;
    height: 10rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: #efeded;

}

.dark-mode {
    transition: all .5s ease;
    background-color: var(--bg-darkmode-2);
    box-shadow: none;
}

.dark-mode h2 {
    color: var(--txtc-darkmode-1);
}

.dark-mode .item-click {
    color: var(--txtc-darkmode-2);
}

.dark-mode .item-click:hover,
.dark-mode .item-click.is-active {
    color: var(--txtc-darkmode-1);
    background-color: #62ab182e;
}

.dark-mode .item:hover::before {
    background-color: var(--txtc-darkmode-1);
}

@media (width <=768px) {
    .sidebar {
        width: 25%;
    }

    .items {
        margin-top: 3rem;
        font-size: 1.5rem;
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

    .item-click span {
        display: none;
    }
}
</style>