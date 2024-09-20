<template>
  <nav>
    <div class="header__navbar">
      <ul class="header__nav-list">
        <li class="header__nav-item"><router-link to="/outlet" active-class="active">Outlet</router-link></li>
        <div class="header__dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
          <a to="" class="header__dropdown-button header__link">All Categories</a>
          <div class="header__dropdown-menu-wrapper"
            :class="{ 'header__dropdown-menu-wrapper--visible': isMenuVisible }">
            <div class="header__dropdown-menu" :class="{ 'header__dropdown-menu--visible': isMenuVisible }"
              @mouseover="cancelHideMenu" @mouseleave="scheduleHideMenu">
              <router-link v-for="category in categories" :key="category.id_categoria"
                :to="{ name: 'categoryPage', params: { categoryId: category.id_categoria } }"
                class="header__dropdown-item">{{ category.nombre }}</router-link>
            </div>
          </div>
        </div>
        <li class="header__nav-item"><router-link to="/promotions" active-class="active">Promos</router-link></li>
        <li class="header__nav-item"><router-link to="/best-sellers" active-class="active">Best Sellers</router-link>
        </li>
        <li class="header__nav-item"><router-link to="/new-items" active-class="active">New Items</router-link></li>
        <li class="header__nav-item"><router-link to="/more-ecofriendly" active-class="active">More
            eco-friendly</router-link></li>
        <li class="header__nav-item"><router-link to="/rewards-shop" active-class="active">Rewards Shop</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { fetchCategoryData } from '../../utils/apiUtils.js'
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
    // async fetchCategories() {
    //   this.$store.dispatch('setLoading', true)
    //   try {
    //     const response = await fetchCategoryData();
    //     this.categories = response.data;
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     this.$store.dispatch('setLoading', false)
    //   }
    // }
  },
  async created() {
    this.isMenuVisible = false;
    this.categories = await fetchCategoryData();
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
.header__navbar {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  margin-top: 7rem;
  z-index: 997;
}

.header__nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  width: 100%;
  max-width: 150rem;
}

.header__nav-item a,
.header__link {
  font-weight: 500;
  text-decoration: none;
  color: var(--text-color-title);
  font-size: var(--font-size-small);
  transition: color 0.5s;
}

.header__nav-item .active,
.header__nav-item a:hover,
.header__link:hover {
  color: var(--text-color-hover-options);
}

.header__dropdown {
  position: relative;
}

.header__dropdown-button {
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.header__dropdown-menu-wrapper {
  position: relative;
}

.header__dropdown-menu {
  visibility: hidden;
  position: absolute;
  background-color: var(--primary-background-color);
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

.header__dropdown-menu a:hover {
  color: var(--text-color-title);
  background-color: var(--background-hover-menus);
  border-radius: .5rem;
}

.header__dropdown-menu--visible {
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.header__dropdown-menu-wrapper::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 1rem 1rem 1rem;
  border-style: solid;
  border-color: transparent transparent var(--primary-background-color) transparent;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.header__dropdown-menu-wrapper.header__dropdown-menu-wrapper--visible::before {
  opacity: 1;
  visibility: visible;
}

.header__dropdown-item {
  font-size: 1.6rem;
  color: var(--text-color-title);
  padding: 1.2rem 1.6rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

@media (width <=780px) {
  .header__navbar {
    display: none;
  }
}
</style>
