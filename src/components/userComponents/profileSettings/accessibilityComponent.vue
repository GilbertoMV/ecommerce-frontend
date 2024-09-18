<template>
    <div class="accessibility">
        <div class="accessibility__row">
            <div class="accessibility__icon">
                <darkmodeIcon />
            </div>
            <div class="accessibility__information">
                <h2>Dark Mode</h2>
                <p>This setting improves readability and reduces eye fatigue during nighttime or prolonged use.
                </p>
            </div>
            <div class="accessibility__button">
                <toggleComponent />
            </div>
        </div>
        <div class="accessibility__row">
            <div class="accessibility__icon">
                <textsizeIcon />
            </div>
            <div class="accessibility__information">
                <h2>Text Size</h2>
                <p>This option is especially useful for visually impaired users.
                </p>
            </div>
            <div class="accessibility__button">
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
.accessibility {
    display: flex;
    flex-direction: column;
    width: 85%;
    max-width: 120rem;
    margin-top: 5rem;
    background-color: var(--primary-background-color);
    border-radius: 2rem;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

}

.accessibility__row {
    display: grid;
    grid-template-columns: 7% auto 10%;
    padding: 2rem 1rem;
    column-gap: 1rem;
    border-bottom: solid .1rem var(--separators-color);
}

.accessibility__row:last-of-type {
    border-bottom: none;
}

.accessibility__icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

.accessibility__button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.svg {
    width: 4rem;
    height: 4rem;
    fill: var(--primary-color);
    stroke: var(--primary-color);
}

.accessibility__information {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

h2 {
    font-size: var(--font-size-big);
    font-weight: 500;
    padding: .5rem 0;
    color: var(--text-color-title);
}

p {
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
}


@media (width <=768px) {
    .accessibility__row {
        grid-template-columns: 10% auto 12%;
    }

    .accessibility {
        width: 90%;
    }

    h2 {
        font-size: var(--font-size-medium);
    }

    p {
        font-size: var(--font-size-small);
    }

    .switch {
        font-size: unset;
    }

}

@media (width <=390px) {
    .accessibility__row {
        grid-template-columns: 8% auto 13%;
    }

    h2 {
        font-size: var(--font-size-small);
    }

    p {
        font-size: var(--font-size-smallest);
    }

}
</style>