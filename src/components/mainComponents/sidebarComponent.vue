<template>
    <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
        <h2>{{ title }}</h2>
        <ul class="list">
            <li v-for="(option, index) in options" :key="index">
                <!-- Si la opción no tiene submenú, usa router-link directamente -->
                <router-link v-if="!option.menu" :to="option.route" exact-active-class="is-active" class="item-click">
                    <div class="list__item">
                        <component :is="option.icon"></component>
                        <span> {{ option.label }}</span>
                    </div>
                </router-link>

                <!-- Si la opción tiene submenú, permite el desplegable -->
                <div v-else @click="toggleMenu(index)" :class="{ 'item-click': true, 'isActive': isActive(index) }">
                    <div class="list__item">
                        <component :is="option.icon"></component>
                        <span>{{ option.label }}</span>
                    </div>
                    <div class="list__item">
                        <optionsIcon class="desplegableIcon" />
                    </div>
                </div>

                <!-- Menú desplegable -->
                <ul v-if="option.menu" :class="{ 'menu': true, 'active': isActive(index) }">
                    <li v-for="(opt, i) in option.opts" :key="i">
                        <router-link :to="opt.route" class="menu_item">
                            <span>{{ opt.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
//sidebar user icons
const userIcon = () => import('../icons/userIcon.vue')
const ordersIcon = () => import('../icons/odersIcon.vue')
const rewardsIcon = () => import('../icons/rewardsIcon.vue')
const addressIcon = () => import('../icons/addressIcon.vue')
const securityIcon = () => import('../icons/securityIcon.vue')
const privacyIcon = () => import('../icons/privacyIcon.vue')
const supportIcon = () => import('../icons/supportIcon.vue')
const accessibilityIcon = () => import('../icons/accessibilityIcon.vue')
const optionsIcon = () => import('../icons/optionsIcon.vue')

//sidebar admin icons
const newProductIcon = () => import('../icons/newproductIcon.vue')

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
        newProductIcon
    },
    computed: {
        ...mapGetters(['isDarkMode'])
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
}

h2 {
    padding: 3rem 0 2rem;
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
    padding: 2rem;
    column-gap: 1rem;
    cursor: pointer;
    color: black;
    text-decoration: none;
}

.list__item {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 1.6rem;
}

.menu {
    margin-left: 5rem;
    border-left: .3rem solid var(--txtc-principal);
    font-size: 1.3rem;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transition: max-height .3s ease-in-out, padding .3s ease-in-out;
}

.menu.active {
    max-height: 500px;
    padding: 1rem 0;
}

.menu_item {
    padding: 1rem;
    color: #5c5c5c;
    cursor: pointer;
    text-decoration: none;
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
    background-color: #f9fff3;
}

.svg {
    width: 1.7rem;
    height: 1.7rem;
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



.dark-mode {
    transition: all .5s ease;
    background-color: var(--bg-darkmode-2);
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