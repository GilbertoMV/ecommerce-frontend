<template>
    <div class="header">
        <nav class="header__nav">
            <div class="header__search">
                <searchComponent />
            </div>
            <ul class="header__options">
                <li class="header__option header__option-notification">
                    <bellIcon />
                    <span>Notifications</span>
                </li>
                <li class="header__option">
                    <userIcon />
                    <span>{{ username }}</span>
                </li>
                <li class="header__option" @click="toggleDarkMode">
                    <transition name="fade" mode="out-in">
                        <component :is="currentModeIcon" />
                    </transition>
                </li>
            </ul>
        </nav>
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
    justify-content: center;
    width: 100%;
    height: 6.5rem;
    padding: .5rem 0;
    background-color: var(--primary-background-color);
    transition: background-color 0.3s ease, color 0.3s ease;
    box-shadow: 0px 4px 24px 0px var(--box-shadow-color);

}

.header__nav {
    width: 100%;
    display: flex;
    max-width: 150rem;
    justify-content: center;
}

.header__search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.header__search div {
    width: 60%;
}

.header__options {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 100%;
    width: fit-content;
    padding: 0 2rem;
    color: var(--text-color-title);
}

.header__option {
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
    text-transform: capitalize;
}

.menu__item-notification::after {
    content: '';
    position: absolute;
    top: -0.3rem;
    right: -0.6rem;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
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
</style>