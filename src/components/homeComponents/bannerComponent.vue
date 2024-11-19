<template>
    <div class="slider-container">
        <div class="image-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="banner" v-for="(banner, index) in banners" :key="index">
                <img :src="banner.image" :alt="banner.alt" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            banners: [
                { image: "https://res.cloudinary.com/koalamarket/image/upload/v1731509643/lgcg68avjvwgjvj3clxj.webp", alt: "Banner Koala 1" },
                { image: "https://res.cloudinary.com/koalamarket/image/upload/v1731510710/lz7pyt7lurfyuodp4bip.webp", alt: "Banner Koala 2" },
                { image: "https://res.cloudinary.com/koalamarket/image/upload/v1731509642/svzxgkatanphdfwmcl1h.webp", alt: "Banner Koala 3" },
                { image: "https://res.cloudinary.com/koalamarket/image/upload/v1731509641/zavcwtsgdetevrjqhx75.webp", alt: "Banner Koala 4" },
            ],
            currentIndex: 0,
        };
    },
    mounted() {
        this.startSlider();
    },
    methods: {
        startSlider() {
            this.sliderInterval = setInterval(() => {
                this.nextSlide();
            }, 10000); // Cambia cada 10 segundos
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.banners.length;
        },
        stopSlider() {
            clearInterval(this.sliderInterval);
        },
    },
    beforeDestroy() {
        this.stopSlider();
    },
};
</script>

<style scoped>
.slider-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
}

.image-container {
    display: flex;
    transition: transform 1s ease;
    width: 100%;
    height: 100%;
}

.banner {
    position: relative;
    width: 100%;
    flex-shrink: 0;
}

.banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--secondary-background-color) 100%);
}
</style>