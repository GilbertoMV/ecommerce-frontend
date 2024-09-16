<template>
  <header class="navbarTop" :class="{ 'dark-mode': isDarkMode }">
    <div class="logoContainer">
      <router-link to="/">
        <img src="@/assets/images/logo.webp" alt="logo">
      </router-link>
    </div>
    <template v-if="isAuthenticated">
      <searchComponent />
      <!-- en lugar de los links se muestra un menu hamburguesa -->
      <div class="menu">
        <button class="hamburger hamburger--collapse" type="button" @click="hamburgerMenu">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <!-- se muestran los links en telefonos -->
      <ul class="menuResponsive">
        <li @click="removeMenu"><router-link to="/user/profile">
            <userIcon />
            {{ username }}
          </router-link></li>
        <li><a @click="categoriesMenu">All Categories</a></li>
        <li @click="removeMenu"><router-link to="/shopping-car">
            <shoppingcarIcon /> Shopping Car
          </router-link></li>
        <li @click="removeMenu"><router-link to="/favorites">
            <favoritesIcon /> Favorites
          </router-link></li>
        <li><a @click="handleLogout">
            <logoutIcon /> Log Out
          </a></li>
      </ul>
      <ul class="categoriesMenu">
        <li @click="removeMenu" v-for="category in categories" :key="category.id_categoria"><router-link
            :to="{ name: 'categoryPage', params: { categoryId: category.id_categoria } }">{{
              category.nombre }}</router-link></li>
      </ul>
      <!-- se muestran los links en computadoras -->
      <ul class="linksContainer">
        <div class="dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
          <span class="dropdown-button link">
            <userIcon />
            {{ username }}
          </span>
          <div class="dropdown-menu" :class="{ visible: isMenuVisible }" @mouseover="cancelHideMenu"
            @mouseleave="scheduleHideMenu">
            <router-link to="/user/my-orders" class="dropdown-item">
              <ordersIcon /> My Orders
            </router-link>
            <router-link to="/user/rewards" class="dropdown-item">
              <rewardsIcon /> Rewards
            </router-link>
            <router-link to="/user/accessibility" class="dropdown-item">
              <accessibilityIcon /> Accessibility
            </router-link>
            <a @click="handleLogout" class="dropdown-item">
              <logoutIcon /> Log Out
            </a>
          </div>
        </div>
        <router-link to="/shopping-car" class="link">
          <shoppingcarIcon /> Shopping Car
        </router-link>
        <router-link to="/favorites" class="link">
          <favoritesIcon /> Favorites
        </router-link>

      </ul>
    </template>
    <template v-else>
      <searchComponent />
      <div class="sesionContainer">
        <router-link to="/shopping-car" class="link">
          <shoppingcarIcon />
          <p class="handleText">Shopping car</p>
        </router-link>
        <router-link to="/favorites" class="link">
          <favoritesIcon />
          <p class="handleText">Favorites</p>
        </router-link>
        <router-link to="/sign-in" class="link">Login</router-link>
        <router-link to="/sign-up" class="link sign-up">Signup</router-link>
      </div>
    </template>
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
      document.querySelector('.hamburger').classList.toggle('is-active')
      document.querySelector('.menuResponsive').classList.toggle('is-active')
      document.querySelector('.categoriesMenu').classList.remove('is-active')
    },
    removeMenu() {
      document.querySelector('.hamburger').classList.remove('is-active')
      document.querySelector('.menuResponsive').classList.remove('is-active')
      document.querySelector('.categoriesMenu').classList.remove('is-active')
    },
    categoriesMenu() {
      document.querySelector('.categoriesMenu').classList.toggle('is-active')
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
.navbarTop {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 998;
  background-color: var(--bg-lightmode-3);
  border-bottom: .5rem solid var(--bg-lightmode-2);
  height: 6rem;
  padding: .5rem 0;
  transition: all .5s ease;
}

.svg {
  width: 1.8rem;
  height: 1.8rem;
}

.logoContainer {
  width: auto;
  height: 100%;
}

.logoContainer img {
  margin: 0 auto;
  height: 100%;
}

.menu {
  -webkit-tap-highlight-color: transparent;
  width: auto;
  height: 100%;
  display: none;
}

.menuResponsive,
.categoriesMenu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 999;
  background-color: var(--bg-lightmode-2);
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateX(100%);
  transition: all .3s ease;
}

.categoriesMenu {
  transform: translateX(-100%);
}

.menuResponsive li a,
.categoriesMenu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: .5rem;
  color: #000;
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.is-active {
  transform: translateX(0);
}

.linksContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: auto;
  gap: 2rem;
  height: 100%;
}

.handleText {
  display: initial;
}

.sesionContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  width: auto;
}

.navbarTop .link {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  color: #000000;
  text-transform: lowercase;
}

.sign-up {
  display: flex;
  border: .2rem solid var(--bg-lightmode-2);
  border-radius: 1rem;
  padding: 1rem;
  color: #000;
  background: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.sign-up:hover {
  background-color: var(--bg-lightmode-2);
  color: #fff;
}

.dropdown {
  position: relative;
  display: flex;
  gap: .5rem;
}

.dropdown-button {
  cursor: pointer;
}

.dropdown-menu {
  visibility: hidden;
  position: absolute;
  background-color: white;
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

.dropdown-menu.visible {
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  opacity: 1;

}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 1rem 1rem 1rem;
  border-style: solid;
  border-color: transparent transparent white transparent;
}

.dropdown-item {
  font-size: 1.6rem;
  color: #000;
  padding: 1.2rem 1.6rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  border-radius: .7rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

/*Dark Mode*/
.dark-mode {
  transition: all .3s ease;
  border-bottom: .5rem solid var(--bg-darkmode-3)
}

.dark-mode,
.dark-mode .dropdown-menu {
  background-color: var(--bg-darkmode-2);
}

.dark-mode .dropdown-menu::before {
  border-color: transparent transparent var(--bg-darkmode-2) transparent;
}

.dark-mode .dropdown-item:hover {
  background-color: var(--bg-darkmode-4);
}

.dark-mode .link,
.dark-mode .dropdown-item {
  color: var(--txtc-darkmode-1);
}

.dark-mode .menuResponsive,
.dark-mode .categoriesMenu {
  background-color: var(--bg-darkmode-4);
}

.dark-mode .menuResponsive li a,
.dark-mode .categoriesMenu li a {
  color: var(--txtc-darkmode-1);
}

.dark-mode .sign-up {
  border: solid .2rem var(--bg-darkmode-3);
}

.dark-mode .sign-up:hover {
  background-color: var(--bg-darkmode-3);
}

@media (width <=768px) {

  .menuResponsive,
  .categoriesMenu {
    display: flex;
    top: 7rem;
  }

  .menuResponsive li,
  .categoriesMenu li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2.3rem;
  }


  .linksContainer {
    display: none;
  }

  .svg {
    width: 2rem;
    height: 2rem;
  }

  .hamburger {
    padding: .5rem;
  }

  .menu {
    display: inherit;
  }

  .sign-up {
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--bg-lightmode-2);
    color: #fff !important;
  }

  .sesionContainer {
    column-gap: 2rem;
  }

  .navbarTop .link {
    font-size: 1.3rem;
  }

  .dark-mode .sign-up {
    background-color: var(--bg-darkmode-3);
  }
}

@media (width <=390px) {
  .navbarTop {
    height: 4rem;
  }

  .navbarTop .link {
    font-size: 1.2rem;
    padding: .7rem .7rem;
  }

  .svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 3rem;
    height: .3rem;
  }

  .menuResponsive,
  .categoriesMenu {
    display: flex;
    top: 5rem;
    left: 0;
  }

  .menuResponsive li,
  .categoriesMenu li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .handleText {
    display: none;
  }

  .sign-up {
    display: none !important;
  }

  .sesionContainer {
    column-gap: 0rem;
  }
}
</style>
