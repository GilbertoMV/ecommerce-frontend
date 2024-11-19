<template>
    <div class="cards-container">
        <!-- Aquí puedes añadir tus tarjetas u otros elementos -->
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    </div>
</template>
<script>
</script>
<style scoped>
.cards-container {
    display: flex;
    justify-content: center;
    transform: translateY(-10rem);
    gap: 1.5rem;
    padding: 1rem;
    width: 80vw;
    height: 30rem;
}

.card {
    border-radius: 1.5rem;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
    width: 20%;
    height: 100%;
}

@media (width <=768px) {
    .cards-container {
        transform: translateY(-7rem);
        gap: 1rem;
        width: 95vw;
        height: 15rem;
    }
}

@media (width <=390px) {
    .cards-container {
        transform: translateY(-4rem);
        gap: 1rem;
        width: 95vw;
        height: 8rem;
    }
}
</style>