<template>
    <div class="info">
        <div class="userData">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24">
                    <path fill="#62ab18"
                        d="M9.8 14.2h4.4l.8 2.225q.1.275.325.425t.5.15q.475 0 .738-.387t.087-.813l-3.425-9.2q-.1-.275-.337-.437T12.35 6h-.7q-.3 0-.537.163t-.338.437L7.35 15.825q-.175.425.088.8t.737.375q.275 0 .5-.162T9 16.4zm.55-1.6l1.6-4.55h.1l1.6 4.55zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.325 0 5.663-2.337T20 12t-2.337-5.663T12 4T6.337 6.338T4 12t2.338 5.663T12 20" />
                </svg>
            </div>
            <div class="data">
                <p class="title">High Contrast</p>
                <p class="text">Change the colors of the page to high contrast colors to improve visibility</p>
            </div>
            <div class="icon">
                <!-- toggle -->
            </div>
            <!-- SEGUNDA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 256 256">
                    <path fill="#62ab18"
                        d="M87.24 52.59a8 8 0 0 0-14.48 0l-64 136a8 8 0 1 0 14.48 6.81L39.9 160h80.2l16.66 35.4a8 8 0 1 0 14.48-6.81ZM47.43 144L80 74.79L112.57 144ZM200 96c-12.76 0-22.73 3.47-29.63 10.32a8 8 0 0 0 11.26 11.36c3.8-3.77 10-5.68 18.37-5.68c13.23 0 24 9 24 20v3.22a42.76 42.76 0 0 0-24-7.22c-22.06 0-40 16.15-40 36s17.94 36 40 36a42.73 42.73 0 0 0 24-7.25a8 8 0 0 0 16-.75v-60c0-19.85-17.94-36-40-36m0 88c-13.23 0-24-9-24-20s10.77-20 24-20s24 9 24 20s-10.77 20-24 20" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Text Size</p>
                <p class="text">Change the text size to improve readability</p>
            </div>
            <div class="icon">
                <!-- toggle -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'infoUserComponent',
    computed: {
        ...mapGetters(['username', 'paternalLastName', 'maternalLastName', 'email'])
    },
}
</script>

<style scoped>
.info {
    display: grid;
    grid-template-rows: 10% auto;
    width: 100%;
    justify-items: center;
    margin-top: 3rem;
    min-height: 10%;
}

.userData {
    display: grid;
    margin-top: 1rem;
    grid-template-columns: 5% auto 3%;
    grid-template-rows: repeat(2, 6rem);
    row-gap: 2rem;
    width: 60%;
    background: white;
    padding: 1rem 2rem;
    column-gap: 1rem;
    border-radius: 1rem;
    max-height: 20rem;
}

.data {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.title {
    font-size: 1.6rem;
    font-weight: 500;
}

.text {
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: .5rem;

}
</style>