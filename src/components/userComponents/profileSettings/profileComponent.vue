<template>
    <div class="container" :class="{ 'dark-mode': isDarkMode }">
        <div class="gridOptions">
            <div class="row">
                <div class="iconOption">
                    <userIcon />
                </div>
                <div class="infoOption">
                    <h2>{{ username }} {{ paternalLastName }} {{ maternalLastName }} </h2>
                    <p>{{ email }} </p>
                </div>
                <div class="optionsButton">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
const userIcon = () => import('../../icons/userIcon.vue')
export default {
    name: 'profileComponent',
    components: {
        userIcon
    },
    computed: {
        ...mapGetters(['username', 'paternalLastName', 'maternalLastName', 'email', 'isDarkMode'])
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 5rem;
}

.gridOptions {
    display: grid;
    grid-template-rows: repeat(1, 7rem);
    width: 70%;
    height: fit-content;
    background-color: #fff;
    border-radius: 2rem;
}

.row {
    display: grid;
    grid-template-columns: 7% auto;
    padding: 1rem;
    column-gap: 1rem;
    border-bottom: solid .1rem #f2f2f2;
}

.row:last-of-type {
    border-bottom: none;
}

.iconOption {
    display: flex;
    justify-content: center;
    align-items: center;
}

.optionsButton {
    display: flex;
    justify-content: center;
    align-items: center;
}


.svg {
    width: 5rem;
    height: 5rem;
    fill: #62ab18;
}

.infoOption {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

h2 {
    font-size: 1.8rem;
    font-weight: 500;
    text-transform: capitalize;
}

p {
    margin-top: .5rem;
    font-size: 1.6rem;
}

.dark-mode .gridOptions {
    background-color: #3a5816;
}

.dark-mode .icon {
    fill: var(--txtc-darkmode-2);
}

.dark-mode h2 {
    color: var(--txtc-darkmode-1);
}

.dark-mode p {
    color: var(--txtc-darkmode-2);
}

@media (width <=768px) {
    .row {
        grid-template-columns: 15% auto;
    }

    .gridOptions {
        width: 80%;
    }

    h2 {
        font-size: 1.6rem;
    }

    p {
        font-size: 1.4rem;
    }
}

@media (width <=390px) {
    .container {
        padding-top: 3rem;
    }

    .gridOptions {
        width: 90%;
    }

    h2 {
        font-size: 1.4rem;
    }

    p {
        font-size: 1.2rem;
    }
}
</style>