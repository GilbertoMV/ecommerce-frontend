<template>
    <div class="search-container" :class="{ 'dark-mode': isDarkMode }">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
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
.search-container {
    display: flex;
    justify-content: center;
    border-radius: 1rem;
    border: solid .2rem #ebebeb;
    align-items: center;
    width: 40%;
    height: 60%;
    padding: .2rem;
}

.search-input {
    border: none;
    outline: none;
    padding: 0rem 1.5rem;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    background-color: transparent;
}

.search-button {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 1.3rem 1.8rem;
    cursor: pointer;
    border-radius: 0 1rem 1rem 0;
}

.svg {
    width: 2rem;
    height: 2rem;
}

/*Dark Mode*/
.dark-mode {
    transition: all .3s ease;
    border-color: #ebead632;
}

.dark-mode .svg {
    color: #ebead632;
}

@media (width <=768px) {

    .search-container {
        width: 65%;
        height: 60%;
    }

    .search-button {
        padding: 1rem 1.5rem;
    }
}

@media (width <=390px) {
    .search-container {
        height: 80%;
    }

    .search-input {
        font-size: 1.1rem;
    }
}
</style>