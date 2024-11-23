<template>
  <header class="navbartop">
    <nav class="header">
      <div class="header__logo-container">
        <router-link to="/">
          <img src="@/assets/images/logo.webp" alt="logo" class="header__logo">
        </router-link>
      </div>
      <searchComponent />
      <!-- Inicio responsive del top bar para usuarios logueados -->
      <div class="header__menu">
        <button class="header__hamburger hamburger hamburger--collapse" type="button" @click="hamburgerMenu">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <template v-if="accountType === '1' || !isAuthenticated">
        <ul class="header__menu-responsive">
          <li @click="removeMenu" v-if="!isAuthenticated">
            <router-link to="/sign-in" class="header__menu-item">
              <userIcon />Sign In
            </router-link>
          </li>
          <li @click="removeMenu" v-else>
            <router-link to="/user" class=" header__menu-item">
              <userIcon />
              {{ username }}
            </router-link>
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
            <a @click="sectionsMenu" class="header__menu-item">More Sections</a>
          </li>
          <li>
            <a @click="categoriesMenu" class="header__menu-item">All Categories</a>
          </li>
          <li v-if="isAuthenticated">
            <a @click="handleLogout" class="header__menu-item">
              <logoutIcon /> Log Out
            </a>
          </li>
        </ul>
        <ul class="header__sections-menu">
          <li @click="removeMenu">
            <router-link to="/outlet">
              Outlet
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/promotions">
              Promos
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/best-sellers">
              Best Sellers
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/new-items">
              New Items
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/more-ecofriendly">
              More Eco-friendly
            </router-link>
          </li>
          <li @click="removeMenu">
            <router-link to="/rewards-shop">
              Rewards Shop
            </router-link>
          </li>
        </ul>
        <ul class="header__categories-menu">
          <li @click="removeMenu" v-for="category in categories" :key="category.id_categoria">
            <router-link :to="{ name: 'categoryPage', params: { categoryId: category.id_categoria } }">
              {{ category.nombre }}
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else-if="isAuthenticated && accountType === '2'">
        <ul class="header__menu-responsive">
          <li @click="removeMenu">
            <a class="header__menu-item">
              <userIcon />
              {{ username }}
            </a>
          </li>
          <li>
            <router-link to="/admin" class="header__menu-item">
              <dashboardIcon /> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/admin/add-product" class="header__menu-item">
              <productIcon /> New Product
            </router-link>
          </li>
          <li>
            <router-link to="/admin/add-category" class="header__menu-item">
              <categoryIcon /> New Category
            </router-link>
          </li>
          <li>
            <router-link to="/admin/add-attribute" class="header__menu-item">
              <attributeIcon /> New Attribute
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <a @click="handleLogout" class="header__menu-item">
              <logoutIcon /> Log Out
            </a>
          </li>
        </ul>
      </template>
      <!-- Fin responsive del top bar para usuarios logueados -->
      <template v-if="isAuthenticated"> <!--Si el usuario esta logueado mostramos las opciones de usuario-->
        <ul class="header__links-container">
          <!-- Inicio de menu desplegable para usuarios -->
          <router-link to="" class="header__link" v-if="accountType === '2'">
            <bellIcon /> Notifications
          </router-link>
          <div class="header__dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
            <span class="header__dropdown-button header__link">
              <userIcon />
              {{ username }}
            </span>
            <div v-if="accountType === '1'" class="header__dropdown-menu"
              :class="{ 'header__dropdown-menu--visible': isMenuVisible }" @mouseover="cancelHideMenu"
              @mouseleave="scheduleHideMenu">
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
            <div v-else class="header__dropdown-menu" :class="{ 'header__dropdown-menu--visible': isMenuVisible }"
              @mouseover="cancelHideMenu" @mouseleave="scheduleHideMenu">
              <router-link to="/admin/dashboard" class="header__dropdown-item">
                <dashboardIcon /> Dashboard
              </router-link>
              <router-link to="/admin/add-product" class="header__dropdown-item">
                <productIcon /> New Product
              </router-link>
              <router-link to="/admin/add-category" class="header__dropdown-item">
                <categoryIcon /> New Category
              </router-link>
              <router-link to="/admin/add-attribute" class="header__dropdown-item">
                <attributeIcon /> New Attribute
              </router-link>
              <a @click="handleLogout" class="header__dropdown-item">
                <logoutIcon /> Log Out
              </a>
            </div>
          </div>
          <!-- Fin de menu desplegable para usuarios logueados -->
          <!-- si es usuario comprador -->


          <router-link v-if="accountType === '1'" to="/shopping-car" class="header__link">
            <shoppingcarIcon />Shopping Car
          </router-link>
          <!-- si es usuario vendedor -->
          <router-link v-if="accountType === '1'" to="/favorites" class="header__link">
            <favoritesIcon /> Favorites
          </router-link>
          <span class="header__link" @click="toggleDarkMode">
            <transition name="fade" mode="out-in">
              <component :is="currentModeIcon" />
            </transition>
          </span>
        </ul>
      </template>
      <template v-else> <!--Si el usuario no esta logueado mostramos las opciones de loguearse-->
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
          <span class="header__link" @click="toggleDarkMode">
            <transition name="fade" mode="out-in">
              <component :is="currentModeIcon" />
            </transition>
          </span>
        </div>
      </template>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import apiClient from '../../store/auth-vuex';
import shoppingcarIcon from '../icons/shoppingcarIcon.vue';
import userIcon from '../icons/userIcon.vue';
import accessibilityIcon from '../icons/accessibilityIcon.vue';
import rewardsIcon from '../icons/rewardsIcon.vue';
import ordersIcon from '../icons/ordersIcon.vue';
import logoutIcon from '../icons/logoutIcon.vue';
import favoritesIcon from '../icons/favoritesIcon.vue';
import searchComponent from './searchComponent.vue';
import dashboardIcon from '../icons/dashboardIcon.vue';
import productIcon from '../icons/productIcon.vue';
import categoryIcon from '../icons/categoryIcon.vue';
import attributeIcon from '../icons/attributeIcon.vue';
import darkmodeIcon from '../icons/darkmodeIcon.vue';
import lightmodeIcon from '../icons/lightmodeIcon.vue';
import bellIcon from '../icons/bellIcon.vue';

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
    searchComponent,
    dashboardIcon,
    productIcon,
    categoryIcon,
    attributeIcon,
    bellIcon,
    lightmodeIcon,
    darkmodeIcon
  },
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'username', 'accountType', 'isDarkMode']),
    currentModeIcon() {
      return this.isDarkMode ? 'lightmodeIcon' : 'darkmodeIcon';
    }
  },
  methods: {
    ...mapActions(['logout', 'toggleDarkMode']),
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
      const categoriesMenu = document.querySelector('.header__categories-menu');
      const sectionsMenu = document.querySelector('.header__sections-menu');

      document.querySelector('.header__hamburger').classList.toggle('is-active');
      document.querySelector('.header__menu-responsive').classList.toggle('is-active');
      if (categoriesMenu) categoriesMenu.classList.remove('is-active');
      if (sectionsMenu) sectionsMenu.classList.remove('is-active');
    },
    removeMenu() {
      document.querySelector('.header__hamburger').classList.remove('is-active');
      document.querySelector('.header__menu-responsive').classList.remove('is-active');

      const categoriesMenu = document.querySelector('.header__categories-menu');
      const sectionsMenu = document.querySelector('.header__sections-menu');

      if (categoriesMenu) categoriesMenu.classList.remove('is-active');
      if (sectionsMenu) sectionsMenu.classList.remove('is-active');
    },
    categoriesMenu() {
      document.querySelector('.header__categories-menu').classList.toggle('is-active');
    },
    sectionsMenu() {
      document.querySelector('.header__sections-menu').classList.toggle('is-active');
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
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  left: 0;
  border-bottom: .2rem solid var(--primary-color);
  box-shadow: 0px 4px 24px 0px var(--box-shadow-color);

}

.header {
  display: flex;
  justify-content: space-around;
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
.header__categories-menu,
.header__sections-menu {
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
.header__categories-menu li a,
.header__sections-menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: .5rem;
  color: var(--text-color-title);
  text-decoration: none;
  width: 100%;
  height: 100%;
  text-transform: capitalize;
  cursor: pointer;
}

.header__menu-responsive.is-active,
.header__categories-menu.is-active,
.header__sections-menu.is-active {
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
  text-transform: capitalize;
  cursor: pointer;
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
  padding: 1.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  transition: all .3s ease;
  cursor: pointer;
}

.header__dropdown-item:first-child {
  border-top-left-radius: .7rem;
  border-top-right-radius: .7rem;
}

.header__dropdown-item:last-child {
  border-bottom-left-radius: .7rem;
  border-bottom-right-radius: .7rem;
}


.header__dropdown-item:hover {
  background-color: var(--background-hover-menus);
}

.header__dropdown-item:last-child:hover {
  color: var(--error-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (width <=768px) {
  .navbartop {
    border-bottom: .5rem solid var(--primary-color);
  }

  .header__menu-responsive,
  .header__categories-menu,
  .header__sections-menu {
    display: flex;
    top: 7rem;
  }

  .header__menu-responsive li,
  .header__categories-menu li,
  .header__sections-menu li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2.3rem;
  }

  /*
  */
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

  .header {
    width: 90%;
  }
}
</style>
