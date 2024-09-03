<template>
  <header>
    <div class="navbarDown" :class="{ 'dark-mode': isDarkMode }">
      <ul>
        <li><router-link to="/outlet" active-class="active">Outlet</router-link></li>
        <div class="dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
          <a to="" class="dropdown-button link">All Categories</a>
          <div class="dropdown-menu-wrapper" :class="{ visible: isMenuVisible }">
            <div class="dropdown-menu" :class="{ visible: isMenuVisible }" @mouseover="cancelHideMenu"
              @mouseleave="scheduleHideMenu">
              <router-link v-for="category in categories" :key="category.id_categoria"
                :to="{ name: 'categoryPage', params: { categoryId: category.id_categoria } }" class="dropdown-item">{{
                  category.nombre }}</router-link>
            </div>
          </div>
        </div>
        <li><router-link to="/promotions" active-class="active">Promos</router-link></li>
        <li><router-link to="/best-sellers" active-class="active">Best Sellers</router-link></li>
        <li><router-link to="/new-items" active-class="active">New Items</router-link></li>
        <li><router-link to="/more-ecofriendly" active-class="active">More eco-friendly</router-link></li>
        <li><router-link to="/rewards-shop" active-class="active">Rewards Shop</router-link></li>
      </ul>
    </div>
  </header>
</template>
<script>
import apiClient from '../../store/auth-vuex';
import { mapGetters } from 'vuex';
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null,
      categories: [],
    }
  },
  computed: {
    ...mapGetters(['isDarkMode'])
  },
  methods: {
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
    async fetchCategories() {
      this.$store.dispatch('setLoading', true)
      try {
        const response = await apiClient.get("/categories");
        this.categories = response.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  created() {
    this.isMenuVisible = false;
    this.fetchCategories();
  },
  beforeDestroy() {
    if (this.hideMenuTimeout) {
      clearTimeout(this.hideMenuTimeout);
      this.hideMenuTimeout = null;
    }
  }
};
</script>

<style scoped>
.navbarDown {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-lightmode-2);
  margin-top: 7rem;
  z-index: 997;
}

.navbarDown ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem 0;
}

.navbarDown a {
  font-weight: 500;
  text-decoration: none;
  color: var(--txtc-negro);
}


.navbarDown a {
  font-size: 1.5rem;
  transition: color 0.5s;
}


.navbarDown .active,
.navbarDown a:hover {
  color: var(--txtc-text-hover);
}

.dropdown {
  position: relative;
}

.dropdown-button {
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.dropdown-menu-wrapper {
  position: relative;
}

.dropdown-menu {
  visibility: hidden;
  position: absolute;
  background-color: var(--txtc-blanco);
  min-width: 27rem;
  box-shadow: 0rem .8rem 1.6rem 0rem rgba(0, 0, 0, 0.2);
  z-index: 1;
  left: 50%;
  transform: translateX(-50%) translateY(-1rem);
  top: 100%;
  margin-top: 2.5rem;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
  border-radius: .5rem;
  overflow: auto;
  max-height: 60rem;
}

.dropdown-menu a:hover {
  color: var(--txtc-negro);
  background-color: var(--txtc-gris);
  border-radius: .5rem;
}

.dropdown-menu.visible {
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.dropdown-menu-wrapper::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 1rem 1rem 1rem;
  border-style: solid;
  border-color: transparent transparent #ffffff transparent;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.dropdown-menu-wrapper.visible::before {
  opacity: 1;
  visibility: visible;
}

.dropdown-item {
  font-size: 1.6rem;
  color: var(--txtc-negro);
  padding: 1.2rem 1.6rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
}


@media (width <=780px) {
  .navbarDown {
    display: none;
  }
}

/* DARK MODE*/
.dark-mode {
  transition: all .3s ease;
}

.dark-mode {
  background-color: var(--bg-darkmode-3);
}

.dark-mode .navbarDown a {
  color: var(--txtc-darkmode-2);
}

.dark-mode .navbarDown a:hover {
  color: var(--txtc-darkmode-1);
}

.dark-mode .dropdown-menu {
  background-color: var(--bg-darkmode-3);
}

.dark-mode .dropdown-menu-wrapper::before {
  border-color: transparent transparent var(--bg-darkmode-3) transparent;

}

.dark-mode .dropdown-menu a:hover {
  background-color: var(--bg-darkmode-4);
}

.dark-mode .navbarDown .active {
  color: var(--txtc-darkmode-1);
}
</style>
