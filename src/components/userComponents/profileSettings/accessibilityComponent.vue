<template>
    <div class="container">
        <div class="gridOptions">
            <div class="row">
                <div class="iconOption">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-moon-fill icon" viewBox="0 0 16 16">
                        <path
                            d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-type icon" viewBox="0 0 16 16">
                        <path
                            d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081zm2.7-7.923L6.34 9.314H3.51l1.4-4.156zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525" />
                    </svg>
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
import toggleComponent from '../../mainComponents/toggleComponent.vue';
export default {
    name: 'infoUserComponent',
    components: {
        toggleComponent
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


.icon {
    width: 3rem;
    height: 3rem;
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
    font-size: 1.6rem;
}

.dark-mode .gridOptions {
    background-color: var(--bg-darkmode-3);
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