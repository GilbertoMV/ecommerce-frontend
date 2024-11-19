<template>
    <div class="bannerMP">
        <img src="https://res.cloudinary.com/koalamarket/image/upload/v1731514500/oe4qbfamvzsnpp1yfh0e.webp"
            alt="Banner Mercado Pago">
    </div>
</template>
<style scoped>
.bannerMP {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 8rem;
    background-color: var(--primary-background-color);
    border-radius: 1.5rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    margin-bottom: 2rem;
}

.bannerMP img {
    width: auto;
    height: 70%;
}

@media (width <=768px) {
    .bannerMP {
        width: 90vw;
        height: 6rem;
    }
}

@media (width <=390px) {
    .bannerMP {
        width: 90vw;
        height: 4rem;
    }
}
</style>