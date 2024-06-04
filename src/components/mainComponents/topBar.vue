<template>
  <div class="navbarTop">
    <router-link to="/">
      <img src="@/assets/images/logo.webp" alt="e-commerce logo">
    </router-link>
    <template v-if="isAuthenticated">
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <router-link to="/shopping-car" class="link"><i class="bi bi-bag-heart-fill"></i> Shopping Car</router-link>
      <div class="dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
        <a to="/userProfile" class="dropdown-button link"><i class="bi bi-person-circle"></i> {{ username }}</a>
        <div class="dropdown-menu" :class="{ visible: isMenuVisible }" @mouseover="cancelHideMenu"
          @mouseleave="scheduleHideMenu">
          <router-link to="/userProfile" class="dropdown-item">
            <i class="bi bi-person-square"></i> Profile</router-link>
          <router-link to="/userProfile/my-orders" class="dropdown-item">
            <i class="bi bi-bag"></i> My Orders</router-link>
          <router-link to="/userProfile/sold-items" class="dropdown-item">
            <i class="bi bi-shop"></i> Sold Items</router-link>
          <a @click="handleLogout" class="dropdown-item"><i class="bi bi-box-arrow-right"></i> Log Out</a>
        </div>
      </div>
      <a to="/" class="link"><i class="bi bi-heart-fill"></i> Favorites</a>
    </template>
    <template v-else>
      <div class="search-container search">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <router-link to="/sign-in" class="link signIn">Sign In</router-link>
      <router-link to="/sign-up" class="sign-up link signUp"><i class="bi bi-person-circle"></i> Sign Up</router-link>
    </template>
    <!-- <a @click="handleLogout" class="dropdown-item"><i class="bi bi-box-arrow-right"></i> Log Out</a> -->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBarTop',
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'username'])
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
    }
  }
  ,
  mounted() {
    this.isMenuVisible = false;
  }
}
</script>


<style scoped>
.navbarTop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  display: grid;
  grid-template-columns: 15% 55% auto auto auto;
  justify-items: center;
  align-items: center;
  column-gap: 1rem;
  border-bottom: .5rem solid #62ab18;
}

.navbarTop .link {
  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  color: #000;
}

.signIn {
  grid-column: 4/5;
}

.search {
  grid-column: 2/4;
}

.search-container {
  display: flex;
  width: 90%;
  justify-content: space-between;
  border-radius: 1rem;
  transition: box-shadow 0.3s;
}

.search-input {
  border: none;
  background-color: rgba(199, 233, 176, 0.7);
  outline: none;
  padding: 1.5rem;
  font-size: 1.2rem;
  border-radius: 1rem 0 0 1rem;
  flex: 1;
}

.search-input::placeholder {
  color: #006400;
}

.search-button {
  background-color: #d8f0c8;
  border: none;
  outline: none;
  padding: 0rem 2rem;
  cursor: pointer;
  border-radius: 0 1rem 1rem 0;
}

.search-container:hover {
  box-shadow: 0 0 1rem #a9bc9c;
}

.search-icon {
  width: 2.4rem;
  height: auto;
}

img {
  margin: 0 auto;
  width: 20%;
  padding: 1rem 0;
}

.sign-up {
  border: .2rem solid #62ab18;
  border-radius: 1rem;
  padding: 1rem;
  color: #000;
  background: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.sign-up:hover {
  background-color: #62ab18;
  color: #fff;
}

.dropdown {
  position: relative;
  display: inline-block;
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
  z-index: 1;
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
  display: block;
  border-radius: .7rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
