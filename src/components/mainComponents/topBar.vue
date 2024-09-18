<template>
  <header class="navbartop">
    <nav class="header">
      <div class="header__logo-container">
        <router-link to="/">
          <img src="@/assets/images/logo.webp" alt="logo" class="header__logo">
        </router-link>
      </div>
      <template v-if="isAuthenticated">
        <searchComponent />
        <div class="header__menu">
          <button class="header__hamburger hamburger hamburger--collapse" type="button" @click="hamburgerMenu">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <ul class="header__menu-responsive">
          <li @click="removeMenu">
            <router-link to="/user/profile" class="header__menu-item">
              <userIcon />
              {{ username }}
            </router-link>
          </li>
          <li>
            <a @click="categoriesMenu" class="header__menu-item">All Categories</a>
          </li>
          <li @click="removeMenu">
            <router-link to="/shopping-car" class="header__menu-item">
              <shoppingcarIcon /> Shopping Car
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/favorites" class="header__menu-item">
              <favoritesIcon /> Favorites
            </router-link>
          </li>
          <li>
            <a @click="handleLogout" class="header__menu-item">
              <logoutIcon /> Log Out
            </a>
          </li>
        </ul>
        <ul class="header__categories-menu">
          <li @click="removeMenu" v-for="category in categories" :key="category.id_categoria">
            <router-link :to="{ name: 'categoryPage', params: { categoryId: category.id_categoria } }">
              {{ category.nombre }}
            </router-link>
          </li>
        </ul>
        <ul class="header__links-container">
          <div class="header__dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
            <span class="header__dropdown-button header__link">
              <userIcon />
              {{ username }}
            </span>
            <div class="header__dropdown-menu" :class="{ 'header__dropdown-menu--visible': isMenuVisible }"
              @mouseover="cancelHideMenu" @mouseleave="scheduleHideMenu">
              <router-link to="/user/my-orders" class="header__dropdown-item">
                <ordersIcon /> My Orders
              </router-link>
              <router-link to="/user/rewards" class="header__dropdown-item">
                <rewardsIcon /> Rewards
              </router-link>
              <router-link to="/user/accessibility" class="header__dropdown-item">
                <accessibilityIcon /> Accessibility
              </router-link>
              <a @click="handleLogout" class="header__dropdown-item">
                <logoutIcon /> Log Out
              </a>
            </div>
          </div>
          <router-link to="/shopping-car" class="header__link">
            <shoppingcarIcon /> Shopping Car
          </router-link>
          <router-link to="/favorites" class="header__link">
            <favoritesIcon /> Favorites
          </router-link>
        </ul>
      </template>
      <template v-else>
        <searchComponent />
        <div class="header__session-container">
          <router-link to="/shopping-car" class="header__link">
            <shoppingcarIcon />
            <p class="header__handle-text">Shopping car</p>
          </router-link>
          <router-link to="/favorites" class="header__link">
            <favoritesIcon />
            <p class="header__handle-text">Favorites</p>
          </router-link>
          <router-link to="/sign-in" class="header__link">Login</router-link>
          <router-link to="/sign-up" class="header__link header__link--sign-up">Signup</router-link>
        </div>
      </template>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import apiClient from '../../store/auth-vuex';
const shoppingcarIcon = () => import('../icons/shoppingcarIcon.vue')
const userIcon = () => import('../icons/userIcon.vue')
const accessibilityIcon = () => import('../icons/accessibilityIcon.vue')
const rewardsIcon = () => import('../icons/rewardsIcon.vue')
const ordersIcon = () => import('../icons/ordersIcon.vue')
const logoutIcon = () => import('../icons/logoutIcon.vue')
const favoritesIcon = () => import('../icons/favoritesIcon.vue')
const searchComponent = () => import('./searchComponent.vue')

export default {
  name: 'NavBarTop',
  components: {
    userIcon,
    accessibilityIcon,
    rewardsIcon,
    ordersIcon,
    logoutIcon,
    favoritesIcon,
    shoppingcarIcon,
    searchComponent
  },
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'username', 'isDarkMode'])
  },
  methods: {
    ...mapActions(['logout']),
    showMenu() {
      if (this.hideMenuTimeout) {
        clearTimeout(this.hideMenuTimeout);
        this.hideMenuTimeout = null;
      }
      this.isMenuVisible = true;
    },
    scheduleHideMenu() {
      this.hideMenuTimeout = setTimeout(() => {
        this.isMenuVisible = false;
      }, 500);
    },
    cancelHideMenu() {
      if (this.hideMenuTimeout) {
        clearTimeout(this.hideMenuTimeout);
        this.hideMenuTimeout = null;
      }
    },
    handleLogout() {
      this.isMenuVisible = false;
      this.logout();
    },
    hamburgerMenu() {
      document.querySelector('.header__hamburger').classList.toggle('is-active');
      document.querySelector('.header__menu-responsive').classList.toggle('is-active');
      document.querySelector('.header__categories-menu').classList.remove('is-active');
    },
    removeMenu() {
      document.querySelector('.header__hamburger').classList.remove('is-active');
      document.querySelector('.header__menu-responsive').classList.remove('is-active');
      document.querySelector('.header__categories-menu').classList.remove('is-active');
    },
    categoriesMenu() {
      document.querySelector('.header__categories-menu').classList.toggle('is-active');
    },

    async fetchCategories() {

      try {
        const response = await apiClient.get("/categories");
        this.categories = response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    this.isMenuVisible = false;
    this.fetchCategories();
  }
}
</script>

<style scoped>
.navbartop {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--primary-background-color);
  height: auto;
  position: fixed;
  top: 0;
  z-index: 998;
  border-bottom: .5rem solid var(--primary-color);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  left: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 150rem;
  height: 6rem;
  padding: .5rem 0;
  transition: all .5s ease;
}

.header__logo-container {
  width: auto;
  height: 100%;
}

.header__logo {
  margin: 0 auto;
  height: 100%;
}

.header__menu {
  -webkit-tap-highlight-color: transparent;
  width: auto;
  height: 100%;
  display: none;
}

.header__menu-responsive,
.header__categories-menu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 999;
  background-color: var(--primary-color);
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateX(100%);
  transition: all .3s ease;
}

.header__categories-menu {
  transform: translateX(-100%);
}

.header__menu-responsive li a,
.header__categories-menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: .5rem;
  color: var(--text-color-title);
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.header__menu-responsive.is-active,
.header__categories-menu.is-active {
  transform: translateX(0);
}

.header__links-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: auto;
  gap: 2rem;
  height: 100%;
}

.header__handle-text {
  display: initial;
}

.header__session-container {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  width: auto;
}

.header__link {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: var(--font-size-medium);
  font-weight: 500;
  text-decoration: none;
  color: var(--text-color-title);
  text-transform: lowercase;
}

.header__link--sign-up {
  display: flex;
  border: .2rem solid var(--primary-color);
  border-radius: 1rem;
  padding: 1rem;
  color: var(--text-color-title);
  background: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.header__link--sign-up:hover {
  background-color: var(--primary-color);
  color: var(--text-color-title);
}

.header__dropdown {
  position: relative;
  display: flex;
  gap: .5rem;
}

.header__dropdown-button {
  cursor: pointer;
}

.header__dropdown-menu {
  visibility: hidden;
  position: absolute;
  background-color: var(--primary-background-color);
  min-width: 20rem;
  box-shadow: 0rem .8rem 1.6rem 0rem rgba(0, 0, 0, 0.2);
  z-index: 998;
  left: 50%;
  transform: translateX(-50%) translateY(-1rem);
  top: 100%;
  margin-top: 4rem;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
  border-radius: .7rem;
}

.header__dropdown-menu.header__dropdown-menu--visible {
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.header__dropdown-menu::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 1rem 1rem 1rem;
  border-style: solid;
  border-color: transparent transparent var(--primary-background-color) transparent;
}

.header__dropdown-item {
  font-size: var(--font-size-medium);
  color: var(--text-color-title);
  padding: 1.2rem 1.6rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  border-radius: .7rem;
  transition: all .3s ease;
  cursor: pointer;
}

.header__dropdown-item:hover {
  background-color: var(--background-hover-menus);
}

.header__dropdown-item:last-child:hover {
  color: var(--error-color);
}

@media (width <=768px) {

  .header__menu-responsive,
  .header__categories-menu {
    display: flex;
    top: 7rem;
  }

  .header__menu-responsive li,
  .header__categories-menu li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2.3rem;
  }

  .header__links-container {
    display: none;
  }

  .svg {
    width: 2rem;
    height: 2rem;
  }

  .header__hamburger {
    padding: .5rem;
  }

  .header__menu {
    display: inherit;
  }

  .header__session-container {
    display: none;
  }
}
</style>
