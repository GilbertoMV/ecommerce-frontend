<template>
    <div class="loader"></div>
</template>
<style scoped>
/* From Uiverse.io by Fernando-sv */
.loader {
    border: .2rem solid var(--primary-color);
    border-radius: 50%;
    margin: .1rem;
    border-left-color: transparent;
    width: 1.2rem;
    height: 1.2rem;
    animation: spin89345 1s linear infinite;
}

@keyframes spin89345 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>