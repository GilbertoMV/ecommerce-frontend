<template>
    <div class="container">
        <div class="gridOptions">
            <div class="row">
                <div class="iconOption">
                    <darkmodeIcon />
                </div>
                <div class="infoOption">
                    <h2>Dark Mode</h2>
                    <p>This setting improves readability and reduces eye fatigue during nighttime or prolonged use.
                    </p>
                </div>
                <div class="optionsButton">
                    <toggleComponent />
                </div>
            </div>
            <div class="row">
                <div class="iconOption">
                    <textsizeIcon />
                </div>
                <div class="infoOption">
                    <h2>Text Size</h2>
                    <p>This option is especially useful for visually impaired users.
                    </p>
                </div>
                <div class="optionsButton">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
const toggleComponent = () => import('../../mainComponents/toggleComponent.vue');
const darkmodeIcon = () => import('../../icons/darkmodeIcon.vue');
const textsizeIcon = () => import('../../icons/textsizeIcon.vue');
export default {
    name: 'infoUserComponent',
    components: {
        toggleComponent,
        darkmodeIcon,
        textsizeIcon
    },
    computed: {
        ...mapGetters(['username', 'paternalLastName', 'maternalLastName', 'email'])
    },
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
    grid-template-rows: repeat(2, 7rem);
    width: 70%;
    height: fit-content;
    background-color: #fff;
    border-radius: 2rem;
}

.row {
    display: grid;
    grid-template-columns: 7% auto 10%;
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
    width: 4rem;
    height: 4rem;
    fill: var(--bg-lightmode-2);
    stroke: var(--bg-lightmode-2);
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
    font-size: 1.6rem;
}

.dark-mode .gridOptions {
    background-color: var(--bg-darkmode-3);
}

.dark-mode .svg {
    fill: var(--txtc-darkmode-2);
    stroke: var(--txtc-darkmode-2);
}

.dark-mode h2 {
    color: var(--txtc-darkmode-1);
}

.dark-mode p {
    color: var(--txtc-darkmode-2);
}

.dark-mode .row {
    border-bottom: solid .1rem #7e7e7e;
}

.dark-mode .row:last-of-type {
    border-bottom: unset;
}

@media (width <=768px) {
    .row {
        grid-template-columns: 10% auto 10%;
    }

    .gridOptions {
        width: 90%;
    }

    h2 {
        font-size: 1.7rem;
    }

    p {
        font-size: 1.3rem;
    }

    .switch {
        font-size: unset;
    }

}

@media (width <=390px) {
    .row {
        grid-template-columns: 8% auto 13%;
    }

    h2 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.1rem;
    }

}
</style>