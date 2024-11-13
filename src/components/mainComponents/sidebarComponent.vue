<template>
    <div class="sidebar">
        <div class="content">
            <div class="profile">
                <div class="photocontainer">
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
                    <router-link v-if="!option.menu" :to="option.route" exact-active-class="is-active"
                        class="item-click">
                        <div class="list__item">
                            <component :is="option.icon"></component>
                            <span>
                                {{ option.label }}
                            </span>
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
                        <router-link :to="opt.route" v-for="(opt, i) in option.opts" :key="i"
                            exact-active-class="is-active" class="menu_item">
                            {{ opt.label }}
                        </router-link>
                    </ul>
                </li>
            </ul>
            <div class="footer">
            </div>
        </div>
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
const logoutIcon = () => import('../icons/logoutIcon.vue')

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
        productIcon,
        logoutIcon
    },
    computed: {
        ...mapGetters(['username', 'paternalLastName']),
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
        },
    }
}
</script>
<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    width: 20%;
    max-width: 30rem;
    background-color: var(--primary-background-color);
    -webkit-box-shadow: 0px 0px 24px 2px var(--box-shadow-color);
    -moz-box-shadow: 0px 0px 24px 2px var(--box-shadow-color);
    box-shadow: 0px 0px 24px 2px var(--box-shadow-color);
    transition: all 0.3s ease-in-out, color 0.3s ease-in-out;
}

.content {
    position: fixed;
    width: 30rem;
}

h2 {
    padding: 1.5rem 0;
    font-size: var(--font-size-big);
    color: var(--text-color-title);
    font-weight: 600;
    text-align: center;
    text-transform: capitalize;
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
    color: var(--text-color-title);
    text-decoration: none;
}

.list__item,
.list__item__icon {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: var(--font-size-medium);
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
    font-size: var(--font-size-small);
    max-height: 0;
    overflow: hidden;
    border-left: solid .2rem var(--primary-color);
    opacity: 0;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.menu.active {
    max-height: 500px;
    opacity: 1;
}

.menu_item {
    display: flex;
    margin: 1rem;
    padding: 1rem;
    color: var(--help-color);
    cursor: pointer;
    text-decoration: none;
    font-size: var(--font-size-small);
}


.desplegableIcon {
    transition: transform 0.3s ease-in-out;
}

.isActive .desplegableIcon {
    transform: rotate(90deg);
}

.item-click:hover,
.menu_item:hover,
.item-click.is-active,
.menu_item.is-active {
    color: var(--primary-color);
}

.menu_item.is-active {
    color: var(--primary-color);
    background-color: var(--option-hover-color);
    border-radius: 1rem;
}


.item-click::before,
.item-click.logout::before {
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
    background-color: var(--primary-color);
}

.item-click.logout:hover::before {
    background-color: var(--required-color);
}

.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding-top: 2rem;
}

.photocontainer {
    width: auto;
    height: auto;
    max-width: 10rem;
    max-height: 10rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: var(--option-hover-color);

}

.item-click.logout {
    color: var(--required-color);
}

.footer {
    display: flex;
    justify-content: right;
    align-items: flex-end;
    padding-bottom: .3rem;
    height: 100%;
}

@media (width <=768px) {
    .sidebar {
        width: 25%;
    }

    .items {
        margin-top: 3rem;
        font-size: var(--font-size-small);
        row-gap: 1.5rem;
        align-items: center;
    }
}

@media (width <=390px) {
    .sidebar {
        width: 15%;
        margin-top: 2rem;
    }

    .sidebar h2 {
        display: none;
    }

    span {
        display: none;
    }

    .photocontainer {
        width: 2rem;
        height: 2rem;
    }
}
</style>