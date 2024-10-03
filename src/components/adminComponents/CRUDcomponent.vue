<template>
    <div class="crud">
        <h1 class="crud__title">{{ title }}</h1>
        <div class="crud__container">
            <div class="crud__header">
                <div class="crud__entries">
                    <span class="crud__text">Showing</span>
                    <select name="entries" id="entries" class="crud__select">
                        <option value="5">10</option>
                        <option value="10">20</option>
                        <option value="10">30</option>
                    </select>
                    <span class="crud__text">entries</span>
                </div>
                <div class="crud__search">
                    <searchComponent />
                </div>
                <div class="crud__button-container">
                    <router-link :to="route" class="crud__button">
                        <plusIcon />
                        Add new
                    </router-link>
                </div>
            </div>
            <div class="table">
                <ul class="table__head">
                    <li v-for="(col, index) in columns" :key="index"> {{ col.label }}</li>
                </ul>
                <ul class="table__body">
                    <li v-for="(item, index) in data" :key="index" class="table__row">
                        <p v-for="(col, idx) in columns" :key="idx">{{ item[col.field] }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import searchComponent from '../../components/mainComponents/searchComponent.vue';
import plusIcon from '../../components/icons/plusIcon.vue';
export default {
    name: 'allCrudComponent',
    components: {
        searchComponent,
        plusIcon
    },
    props: {
        title: {
            type: String,
            required: true
        },
        route: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>
.crud__container {
    display: flex;
    flex-direction: column;
    margin: 3rem 0 3rem;
    width: 100%;
    background-color: var(--primary-background-color);
    border-radius: 1rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.crud__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    gap: 1rem;
    padding: 1rem 0 1rem;
}

.crud__text {
    font-size: var(--font-size-smallest);
    color: var(--text-color-body);
}

.crud__entries {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 2rem;
    gap: 1rem;
    width: 15%;
}

.crud__search {
    display: flex;
    justify-content: center;
    width: 60%;
}

.crud__search .search {
    height: 10%;
    width: 70%;
    padding: 0;
}

.crud__button-container {
    display: flex;
    justify-content: right;
    width: 25%;
}

.crud__button {
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

.crud__button:hover {
    background-color: var(--text-color-hover-buttons);
}

.table {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

.table__head {
    display: flex;
    justify-content: space-around;
    width: 95%;
    padding: 1rem 0;
    font-size: var(--font-size-small);
    border-radius: 1rem;
    color: var(--text-color-title);
    background-color: var(--option-hover-color);
    text-align: center;

}

.table__body {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 95%;
}

.table__row {
    display: flex;
    width: 100%;
    border-radius: 1rem;
    padding: 2rem 0rem;
    font-size: var(--font-size-smallest);
    color: var(--text-color-body);
    cursor: pointer;
    transition: background-color .1s ease-in-out;
}

.table__row:hover,
.table__row:nth-child(odd):hover {
    background-color: #ededed35;
}

.table__row:nth-child(odd) {
    background-color: var(--option-hover-color);
}

.table__row p {
    text-align: center;
}

.table__row p:nth-child(1),
.table__head li:nth-child(1) {
    /*ID*/
    width: 10%;
}

.table__row p:nth-child(2),
.table__head li:nth-child(2) {
    /*IMAGE*/
    width: 15%;
}

.table__row p:nth-child(3),
.table__head li:nth-child(3) {
    /*NAME*/
    width: 60%;
}

.table__row p:nth-child(4),
.table__head li:nth-child(4) {
    /*actions*/
    width: 15%;
}
</style>