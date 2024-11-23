<template>
    <div class="banner">
        <div class="banner__image">
            <img :src="url" :alt="`Category image:  ${name}`">
        </div>
        <div class="banner__info">
            <h1>{{ name }}</h1>
            <p> {{ description }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bannerCategoryComponent',
    props: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
.banner {
    display: flex;
    width: 70vw;
    max-width: 150rem;
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    margin-top: 3rem;
    padding: 1rem;
    height: 10rem;
}

.banner__image {
    width: 30%;
    height: 100%;
}

.banner__image img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.banner__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 70%;
    height: 100%;
}

.banner__info h1 {
    font-size: var(--font-size-bigest);
    color: var(--text-color-title);
}

.banner__info p {
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
    text-align: center;
}

@media (width <=790px) {
    .banner {
        width: calc(90vw - 2rem);
        height: 10rem;
        padding: 1rem;
    }

    .banner__info h1 {
        font-size: var(--font-size-big);
    }

    .banner__info p {
        font-size: var(--font-size-small);
    }
}

@media (width <=790px) {

    .banner__info h1 {
        font-size: var(--font-size-medium);
    }

    .banner__info p {
        font-size: var(--font-size-smallest);
    }
}
</style>