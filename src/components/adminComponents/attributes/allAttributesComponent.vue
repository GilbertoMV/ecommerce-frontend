<template>
    <div class="attributes">
        <h1 class="attributes__title">All attributes</h1>
        <div class="attributes__container">
            <div class="attributes__header">
                <div class="attributes__entries">
                    <span class="attributes__text">Showing</span>
                    <select name="entries" id="entries" class="attributes__select">
                        <option value="5">10</option>
                        <option value="10">20</option>
                        <option value="10">30</option>
                    </select>
                    <span class="attributes__text">entries</span>
                </div>
                <div class="attributes__search">
                    <searchComponent />
                </div>
                <div class="attributes__button-container">
                    <router-link to="/admin/add-attribute" class="attributes__button" @click="addAttribute">
                        <plusIcon />
                        Add new
                    </router-link>
                </div>
            </div>
            <div class="attributes__body">

            </div>
        </div>
    </div>
</template>
<script>
import searchComponent from '../../mainComponents/searchComponent.vue';
import plusIcon from '../../icons/plusIcon.vue';
export default {
    name: 'allAttributesComponent',
    components: {
        searchComponent,
        plusIcon
    },
    methods: {
        addAttribute() {
        }
    }
}
</script>
<style scoped>
.attributes__container {
    display: flex;
    flex-direction: column;
    margin: 3rem 0 3rem;
    width: 100%;
    background-color: var(--primary-background-color);
    border-radius: 1rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.attributes__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    gap: 1rem;
    padding: 1rem 0 1rem;
}

.attributes__text {
    font-size: var(--font-size-smallest);
    color: var(--text-color-body);
}

.attributes__entries {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 2rem;
    gap: 1rem;
    width: 15%;
}

.attributes__search {
    display: flex;
    justify-content: center;
    width: 60%;
}

.attributes__search .search {
    height: 10%;
    width: 70%;
    padding: 0;
}

.attributes__button-container {
    display: flex;
    justify-content: right;
    width: 25%;
}

.attributes__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 5rem;
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    border-radius: .7rem;
    transition: all .3s ease-in-out;
    margin-right: 2rem;
    text-decoration: none;
}

.attributes__button:hover {
    background-color: var(--text-color-hover-buttons);
}
</style>