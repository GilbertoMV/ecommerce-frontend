<template>
    <footer class="footer">
        <div class="footer-top">
            <button @click="scrollToTop" class="scroll-to-top">
                <i class="bi bi-arrow-up"></i>
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
        }
    }
}
</script>

<style scoped>
.footer {
    background-color: #62ab18;
    color: #000;
    text-align: center;
    padding: 20px 0px 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.footer-top {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
}

.scroll-to-top {
    background: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: center;
    column-gap: 20px;
}

.footer-nav {
    grid-column: span 4;
    display: flex;
    justify-content: space-around;
}

.footer-link {
    color: #000;
    font-size: 16px;
    text-decoration: none;
    transition: color .5s;
}

.footer-logo {
    margin: 5px 0;
    display: flex;
    justify-content: center;
}

.footer-logo img {
    max-width: 50px;
}

.footer-link:hover {
    color: hsl(54, 70%, 86%);
}

.footer-copy {
    margin-top: 5px;
    grid-column: span 4;
    font-size: 0.9rem;
    color: #000;
}
</style>