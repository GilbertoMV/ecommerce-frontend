<template>
  <header>
    <div class="navbarDown">
      <ul>
        <div class="dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
          <a to="" class="dropdown-button link">All Categories</a>
          <div class="dropdown-menu-wrapper" :class="{ visible: isMenuVisible }">
            <div class="dropdown-menu" :class="{ visible: isMenuVisible }" @mouseover="cancelHideMenu"
              @mouseleave="scheduleHideMenu">
              <router-link to="" v-for="name in nameCategories" :key="name" class="dropdown-item">{{ name
                }}</router-link>
            </div>
          </div>
        </div>
        <li><router-link to="/best-sellers" active-class="active">Best Sellers</router-link></li>
        <li><router-link to="/new-items" active-class="active">New Items</router-link></li>
        <li><router-link to="/more-ecofriendly" active-class="active">More eco-friendly</router-link></li>
      </ul>
    </div>
  </header>
</template>
<script>
import axios from 'axios';
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null,
      categories: [],
      nameCategories: []
    }
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
      try {
        const response = await axios.get('https://back-end-production-c8eb.up.railway.app/categorys/')
        this.categories = response.data
        this.nameCategories = this.categories.map(category => category.nombre);
        console.log(this.nameCategories)
      } catch (err) {
        console.error(err)
      }
    }
  },
  mounted() {
    this.isMenuVisible = false;
    this.fetchCategories()
  }
};
</script>

<style scoped>
.navbarDown {
  background-color: #62ab18;
  margin-top: 80px;
}

.navbarDown ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
}

.navbarDown a {
  font-weight: 500;
  text-decoration: none;
  color: #000;
}

.navbarDown a {
  font-size: 15px;
  transition: color 0.5s;
}

.navbarDown a:hover,
.navbarDown .active {
  color: hsl(54, 70%, 86%);
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
  background-color: #62AB18;
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  top: 100%;
  margin-top: 25px;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
  border-radius: 5px;
  overflow: auto;
  max-height: 600px;
}

.dropdown-menu.visible {
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.dropdown-menu-wrapper::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent #62AB18 transparent;
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
  font-size: 16px;
  color: #000;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
</style>
