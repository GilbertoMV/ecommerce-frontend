<template>
    <div class="info">
        <div class="userMainData">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#62ab18" class="bi bi-person-circle profilePhoto"
                viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
            <div class="data">
                <p class="name"> {{ username }} {{ paternalLastName }} {{ maternalLastName }} </p>
                <p class="email"> {{ email }} </p>
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
    }
}
</script>

<style scoped>
.info {
    display: grid;
    grid-template-rows: 7rem auto;
    width: 100%;
    justify-items: center;
    padding-top: 2rem;
}

.userMainData {
    display: grid;
    grid-template-columns: 10% auto;
    width: 60%;
    border-radius: 1rem;
    padding: 1rem 2rem;
    background: white;
    column-gap: 1rem;
}

.profilePhoto {
    width: 5rem;
    height: 5rem;
}

.data {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.name {
    font-size: 2rem;
    font-weight: 500;
}

.email {
    font-size: 1.8rem;
    font-weight: 400;
    margin-top: 1rem;
}

@media (width <=768px) {
    .userMainData {
        width: 75%;
        grid-template-columns: 5rem auto;
        padding: 1rem;
    }
}

@media (width <=390px) {
    .profilePhoto {
        width: 3rem;
        height: 3rem;
    }

    .info {
        grid-template-rows: 5rem;
    }

    .name {
        font-size: 1rem;
    }

    .email {
        font-size: .8rem;
    }

    .title {
        font-size: 1rem;
    }
}
</style>