<template>
    <div class="container" :class="{ 'dark-mode': isDarkMode }">
        <div class="gridOptions">
            <div class="row">
                <div class="iconOption">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#62ab18" class="bi bi-person-circle icon"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
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
export default {
    name: 'profileComponent',
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


.icon {
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
}

p {
    margin-top: .5rem;
    font-size: 1.6rem;
}

.dark-mode .gridOptions {
    background-color: #3a5816;
}

.dark-mode .icon {
    fill: #B0CB7F;
}

.dark-mode h2 {
    color: #ebead6;
}

.dark-mode p {
    color: #B0CB7F;
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