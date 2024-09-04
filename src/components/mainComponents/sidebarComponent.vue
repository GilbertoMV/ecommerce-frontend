<template>
    <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
        <h2>My account</h2>
        <ul class="list">
            <li v-for="option in options" :key="option.name">
                <router-link :to="option.route" class="item">
                    <component :is="option.icon"></component>
                    <span> {{ option.label }}</span>
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>

import { mapGetters } from 'vuex';
export default {
    name: 'SideBar',
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    components: {
        userIcon: () => import('../icons/userIcon.vue'),
        ordersIcon: () => import('../icons/odersIcon.vue'),
        rewardsIcon: () => import('../icons/rewardsIcon.vue'),
        addressIcon: () => import('../icons/addressIcon.vue'),
        securityIcon: () => import('../icons/securityIcon.vue'),
        privacyIcon: () => import('../icons/privacyIcon.vue'),
        supportIcon: () => import('../icons/supportIcon.vue'),
        accessibilityIcon: () => import('../icons/accessibilityIcon.vue')

    },
    computed: {
        ...mapGetters(['isDarkMode'])
    }
}
</script>
<style scoped>
.sidebar {
    width: 15%;
    background-color: #fff;
}

h2 {
    margin: 2rem 0rem;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
}

.list {
    display: grid;
    grid-template-rows: repeat(9, 4rem);
    font-size: 1.6rem;
    row-gap: 1.5rem;
    align-items: center;
}

.item {
    display: flex;
    position: relative;
    list-style: none;
    padding: 2rem;
    column-gap: 1rem;
    cursor: pointer;
    color: black;
    transition: all 0.3s;
    text-decoration: none;
}

.item:hover {
    color: #62ab18;
}

.is-active {
    color: #62ab18;
}

.logout {
    color: var(--txtc-error);
}

.svg {
    width: 1.7rem;
    height: 1.7rem;
}

.svg:hover {
    fill: #62ab18;
}

.item::before,
.is-active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: .5rem;
    background-color: transparent;
    transition: background-color 0.3s;
}

.is-active::before {
    background-color: #62ab18;
}

.item:hover::before {
    background-color: #62ab18;
    ;
}

.dark-mode {
    transition: all .5s ease;
    background-color: var(--bg-darkmode-2);
}


.dark-mode h2 {
    color: var(--txtc-darkmode-1);
}

.dark-mode .item {
    color: var(--txtc-darkmode-2);

}

.dark-mode .item:hover,
.dark-mode .item.is-active {
    color: var(--txtc-darkmode-1);
}

.dark-mode .item:hover::before,
.dark-mode .is-active:before {
    background-color: var(--txtc-darkmode-1);
}

.dark-mode .logout {
    color: var(--txtc-error);
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

    .item span {
        display: none;
    }
}
</style>