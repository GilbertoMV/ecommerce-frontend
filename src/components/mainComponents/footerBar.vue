<template>
    <footer class="footer" :class="{ 'dark-mode': isDarkMode }">
        <div class="footer-top">
            <button @click="scrollToTop" class="scroll-to-top">
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-arrow-up svg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                </svg>
            </button>
        </div>
        <div class="footer-content">
            <nav class="footer-nav">
                <router-link to="/" class="footer-link">About us</router-link>
                <router-link to="/" class="footer-link">Terms and conditions</router-link>
                <router-link to="/" class="footer-link">Privacy policy</router-link>
                <router-link to="/" class="footer-link">Help</router-link>
            </nav>
        </div>
        <div class="footer-logo">
            <img src="@/assets/images/logo.webp" alt="Green Market logo">
        </div>
        <div class="footer-copy">
            <p>&copy; All rights reserved May {{ copy }} </p>
        </div>

    </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'FooterBar',
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
.svg {
    fill: var(--bg-lightmode-2);
    width: 1.6rem;
    height: 1.6rem;
}

.footer {
    background-color: var(--bg-lightmode-2);
    color: var(--txtc-negro);
    text-align: center;
    padding: 2rem 0rem 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 997;
}

.footer-top {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
}

.scroll-to-top {
    background: var(--txtc-blanco);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 1.2rem;
    box-shadow: 0rem .4rem .8rem rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: center;
    column-gap: 2rem;
}

.footer-nav {
    grid-column: span 4;
    display: flex;
    justify-content: space-around;
}

.footer-link {
    color: var(--txtc-negro);
    font-size: 1.6rem;
    text-decoration: none;
    transition: color .5s;
}

.footer-logo {
    margin: .5rem 0;
    display: flex;
    justify-content: center;
}

.footer-logo img {
    max-width: 5rem;
}

.footer-link:hover {
    color: var(--txtc-text-hover);
}

.footer-copy {
    margin-top: .5rem;
    grid-column: span 4;
    font-size: 1rem;
    color: var(--txtc-negro);
}

@media (width <=768px) {
    .footer-nav {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .footer-link {
        font-size: 1.4rem;
    }
}

@media (width <=390px) {
    .footer-logo img {
        max-width: 3rem;
    }

    .footer-link {
        font-size: 1rem;
    }

    .footer-copy {
        margin-top: 0;
        font-size: .7rem;
    }

    .svg {
        width: 1.3rem;
        height: 1.3rem;
    }

    .footer-nav {
        margin-top: .5rem;
    }
}

/* DARK MODE*/
.dark-mode {
    transition: all .3s ease;
}


.dark-mode {
    background-color: var(--bg-darkmode-3);
}

.dark-mode .footer-link,
.dark-mode .footer-copy {
    color: var(--txtc-darkmode-2);
}

.dark-mode .footer-link:hover {
    color: var(--txtc-darkmode-1);
}

.dark-mode .scroll-to-top {
    background-color: var(--bg-darkmode-5);
}

.dark-mode .svg {
    fill: var(--txtc-darkmode-1);
}
</style>