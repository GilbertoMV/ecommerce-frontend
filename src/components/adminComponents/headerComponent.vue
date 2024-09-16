<template>
    <div class="header" :class="{ 'dark-mode': isDarkMode }">
        <div class="search_container">
            <searchComponent />
        </div>
        <ul class="menu">
            <li class="menu__item has-notification">
                <bellIcon />
                <span>Notifications</span>
            </li>
            <li class="menu__item">
                <userIcon />
                <span>{{ username }}</span>
            </li>
            <li class="menu__item" @click="toggleDarkMode">
                <transition name="fade" mode="out-in">
                    <component :is="currentModeIcon" />
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
import userIcon from '../icons/userIcon.vue';
import darkmodeIcon from '../icons/darkmodeIcon.vue';
import lightmodeIcon from '../icons/lightmodeIcon.vue';
import bellIcon from '../icons/bellIcon.vue';
import searchComponent from '../mainComponents/searchComponent.vue'

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        userIcon,
        darkmodeIcon,
        lightmodeIcon,
        bellIcon,
        searchComponent
    },
    computed: {
        ...mapGetters(['username', 'isDarkMode']),
        currentModeIcon() {
            return this.isDarkMode ? 'lightmodeIcon' : 'darkmodeIcon';
        }
    },
    methods: {
        ...mapActions(['toggleDarkMode']),
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 6.5rem;
    padding: .5rem 0;
    background-color: #ffffff;
}

.search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.search_container div {
    width: 60%;
}

.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 100%;
    padding: 0 2rem;
}

.menu__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    gap: 0.5rem;
    position: relative;
}

span {
    font-size: 1.6rem;
}

.menu__item.has-notification::after {
    content: '';
    position: absolute;
    top: -0.3rem;
    right: -0.6rem;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
}

.svg {
    width: 1.8rem;
    height: 1.8rem;
}

.rotate {
    width: 2rem;
    height: 2rem;
    transform: rotate(90deg);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.dark-mode {
    background-color: var(--bg-darkmode-2);
}

.dark-mode .svg,
.dark-mode span {
    color: var(--txtc-darkmode-1);
}
</style>