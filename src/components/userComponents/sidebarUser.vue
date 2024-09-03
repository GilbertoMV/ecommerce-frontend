<template>
    <div class="sidebar" :class="{ 'dark-mode': isDarkMode }">
        <h2>My account</h2>
        <ul class="options">
            <li><router-link to="/user/profile" class="option" active-class="is-active">
                    <userIcon />
                    <span>Profile</span>
                </router-link></li>
            <li><router-link to="/user/my-orders" class="option" active-class="is-active">
                    <ordersIcon />
                    <span>My Orders</span>
                </router-link></li>
            <li><router-link to="/user/rewards" class="option" active-class="is-active">
                    <rewardsIcon />
                    <span>Rewards</span>
                </router-link></li>
            <li><router-link to="/user/address" class="option" active-class="is-active">
                    <addressIcon />
                    <span>Address</span>
                </router-link></li>
            <li><router-link to="/user/security" class="option" active-class="is-active">
                    <securityIcon />
                    <span>Security</span>
                </router-link></li>
            <li><router-link to="/user/accessibility" class="option" active-class="is-active">
                    <accessibilityIcon />
                    <span>Accessibility</span>
                </router-link></li>
            <li><router-link to="/user/privacy" class="option" active-class="is-active">
                    <privacyIcon />
                    <span>Privacy</span>
                </router-link></li>
            <li><router-link to="/user/support" class="option" active-class="is-active">
                    <supportIcon />
                    <span>Support</span>
                </router-link></li>
            <li><a @click="Logout" class="logout option">
                    <logoutIcon />
                    <span>Log Out</span>
                </a></li>
        </ul>
    </div>

</template>

<script>
import userIcon from '../icons/userIcon.vue';
import ordersIcon from '../icons/odersIcon.vue';
import rewardsIcon from '../icons/rewardsIcon.vue';
import addressIcon from '../icons/addressIcon.vue';
import securityIcon from '../icons/securityIcon.vue';
import accessibilityIcon from '../icons/accessibilityIcon.vue';
import privacyIcon from '../icons/privacyIcon.vue';
import supportIcon from '../icons/supportIcon.vue'
import logoutIcon from '../icons/logoutIcon.vue';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'SideBar',
    components: {
        userIcon,
        ordersIcon,
        rewardsIcon,
        addressIcon,
        securityIcon,
        accessibilityIcon,
        privacyIcon,
        supportIcon,
        logoutIcon
    },
    methods: {
        ...mapActions(['logout']),
        Logout() {
            this.logout();
        }
    },
    computed: {
        ...mapGetters(['isDarkMode'])
    }
}
</script>
<style scoped>
.sidebar {
    width: 15%;
    background-color: #fff;
}

h2 {
    margin: 2rem 0rem;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
}

.options {
    display: grid;
    grid-template-rows: repeat(9, 4rem);
    font-size: 1.6rem;
    row-gap: 1.5rem;
    align-items: center;
}

.option {
    display: flex;
    position: relative;
    list-style: none;
    padding: 2rem;
    column-gap: 1rem;
    cursor: pointer;
    color: black;
    transition: all 0.3s;
    text-decoration: none;
}

.option:hover {
    color: #62ab18;
}

.is-active {
    color: #62ab18;
}

.logout {
    color: var(--txtc-error);
}

.svg {
    width: 1.7rem;
    height: 1.7rem;
}

.svg:hover {
    fill: #62ab18;
}

.option::before,
.is-active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: .5rem;
    background-color: transparent;
    transition: background-color 0.3s;
}

.is-active::before {
    background-color: #62ab18;
}

.option:hover::before {
    background-color: #62ab18;
    ;
}

.dark-mode {
    transition: all .5s ease;
    background-color: var(--bg-darkmode-2);
}


.dark-mode h2 {
    color: var(--txtc-darkmode-1);
}

.dark-mode .option {
    color: var(--txtc-darkmode-2);

}

.dark-mode .option:hover,
.dark-mode .option.is-active {
    color: var(--txtc-darkmode-1);
}

.dark-mode .option:hover::before,
.dark-mode .is-active:before {
    background-color: var(--txtc-darkmode-1);
}

.dark-mode .logout {
    color: var(--txtc-error);
}

@media (width <=768px) {
    .sidebar {
        width: 25%;
    }

    .options {
        margin-top: 3rem;
        font-size: 1.5rem;
        row-gap: 1.5rem;
        align-items: center;
    }
}

@media (width <=390px) {
    .sidebar {
        width: 15%;
    }

    .sidebar h2 {
        display: none;
    }

    .option span {
        display: none;
    }
}
</style>