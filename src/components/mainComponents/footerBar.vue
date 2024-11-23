<template>
    <footer class="footer">
        <div class="footer__top">
            <span @click="scrollToTop" class="footer__scroll-to-top">
                <uparrowIcon />
            </span>
        </div>
        <div class="footer__menu">
            <nav class="footer__nav">
                <router-link to="/" class="footer__link">About us</router-link>
                <router-link to="/" class="footer__link">Terms and conditions</router-link>
                <router-link to="/" class="footer__link">Privacy policy</router-link>
                <router-link to="/" class="footer__link">Help</router-link>
            </nav>
        </div>
        <div class="footer__logo">
            <img src="@/assets/images/logo.webp" alt="Green Market logo">
        </div>
        <div class="footer__copy">
            <p>&copy; All rights reserved May {{ copy }} </p>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import uparrowIcon from '../icons/uparrowIcon.vue';
export default {
    name: 'FooterBar',
    components: {
        uparrowIcon
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    computed: {
        copy() {
            return new Date().getFullYear()
        },
        ...mapGetters(['isDarkMode'])
    }
}
</script>

<style scoped>
.footer__icon {
    fill: var(--text-color-title);
    width: 1.6rem;
    height: 1.6rem;
}

.footer {
    background-color: var(--primary-color);
    color: var(--text-color-title);
    text-align: center;
    padding: 2rem 0rem 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 997;
}

.footer__top {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -2rem;
    left: 50%;
    color: var(--text-color-title);
    transform: translateX(-50%);
}

.footer__scroll-to-top {
    background: var(--primary-background-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 1.2rem;
    box-shadow: 0rem .4rem .8rem rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer__menu {
    width: 100%;
    display: flex;
    justify-content: center;
}

.footer__nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 150rem;
}

.footer__link {
    color: var(--text-color-title);
    font-size: var(--font-size-small);
    text-decoration: none;
    transition: color .5s;
}

.footer__logo {
    margin: .5rem 0;
    display: flex;
    justify-content: center;
}

.footer__logo img {
    max-width: 5rem;
}

.footer__link:hover {
    color: var(--text-color-hover-options);
}

.footer__copy {
    margin-top: .5rem;
    grid-column: span 4;
    font-size: 1rem;
    color: var(--text-color-title);
}

@media (width <=768px) {
    .footer__nav {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .footer__link {
        font-size: var(--font-size-small);
    }
}

@media (width <=390px) {
    .footer__logo img {
        max-width: 3rem;
    }

    .footer__link {
        font-size: 1rem;
    }

    .footer__copy {
        margin-top: 0;
        font-size: .7rem;
    }

    .footer__icon {
        width: 1.3rem;
        height: 1.3rem;
    }

    .footer__nav {
        margin-top: .5rem;
    }
}
</style>