<template>
    <div class="search">
        <input type="text" placeholder="Search..." class="search__input">
        <button class="search__button">
            <searchIcon />
        </button>
    </div>

</template>
<script>
import { mapGetters } from 'vuex';
const searchIcon = () => import('../icons/searchIcon.vue')
export default {
    components: {
        searchIcon
    }, computed: {
        ...mapGetters(['isDarkMode'])
    }
}
</script>
<style scoped>
.search {
    display: flex;
    justify-content: center;
    border-radius: 1rem;
    border: solid .1rem var(--border-color);
    align-items: center;
    width: 40%;
    height: 60%;
    padding: .2rem;
}

.search__input {
    border: none;
    outline: none;
    padding: 0rem 1.5rem;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: var(--text-color-title);
}

.search__button {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 1.3rem 1.8rem;
    cursor: pointer;
    border-radius: 0 1rem 1rem 0;
    color: var(--text-color-title);
}

@media (width <=768px) {
    .search {
        width: 65%;
        height: 60%;
    }

    .search__button {
        padding: 1rem 1.5rem;
    }
}

@media (width <=390px) {
    .search__input {
        font-size: 1.1rem;
    }
}
</style>