<template>
  <header class="navbarTop">
    <div class="logoContainer">
      <router-link to="/">
        <img src="@/assets/images/logo.webp" alt="logo">
      </router-link>
    </div>
    <template v-if="isAuthenticated">
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#006400" class="bi bi-search svgs" viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      <!-- en lugar de los links se muestra un menu hamburguesa -->
      <div class="menu">
        <button class="hamburger hamburger--collapse" type="button" @click="hamburgerMenu">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <ul class="menuResponsive">
        <li @click="removeMenu"><router-link to="/userProfile">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-square svgs"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
            </svg> {{ username }}</router-link></li>
        <li><a @click="categoriesMenu">All Categories</a></li>
        <li @click="removeMenu"><router-link to="/shopping-car">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart svgs" viewBox="0 0 16 16">
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg> Shopping Car</router-link></li>
        <li @click="removeMenu"><router-link to="/favorites">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-star svgs" viewBox="0 0 16 16">
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg> Favorites</router-link></li>
        <li><a @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-box-arrow-right svgs"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
              <path fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg> Log Out</a></li>
      </ul>
      <ul class="categoriesMenu">
        <li v-for="name in nameCategories" :key="name"><router-link :to="`/${name.replace(/\s+/g, '-')}`"> {{ name
            }}</router-link></li>
      </ul>

      <!-- se muestran los links en computadoras -->
      <ul class="linksContainer">
        <div class="dropdown" @mouseover="showMenu" @mouseleave="scheduleHideMenu">
          <a to="/userProfile" class="dropdown-button link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-square svgs"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
            </svg> {{ username }}</a>
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
        <router-link to="/shopping-car" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart svgs" viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg> Shopping Car</router-link>
        <a to="/" class="link"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-star svgs"
            viewBox="0 0 16 16">
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
          </svg> Favorites</a>
      </ul>
    </template>
    <template v-else>
      <div class="search-containerSesion">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#62ab18" class="bi bi-search svgs" viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      <div class="sesionContainer">
        <router-link to="/sign-in" class="link signIn">Login</router-link>
        <router-link to="/sign-up" class="sign-up link signUp"><i class="bi bi-person-circle"></i> Signup</router-link>
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import apiClient from '../../store/auth-vuex';

export default {
  name: 'NavBarTop',
  data() {
    return {
      isMenuVisible: false,
      hideMenuTimeout: null,
      categories: [],
      nameCategories: [],
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
        this.nameCategories = this.categories.map(category => category.nombre);
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.isMenuVisible = false;
    this.fetchCategories()
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
  z-index: 999;
  background-color: #fff;
  border-bottom: .5rem solid #62ab18;
  height: 6rem;
  padding: .5rem 0;
}

.svgs {
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

.search-container {
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  background-color: rgba(199, 233, 176, 0.7);
  align-items: center;
  width: 60%;
  height: 80%;
}

.search-containerSesion {
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  background-color: rgba(199, 233, 176, 0.7);
  align-items: center;
  width: 40%;
  height: 80%;
}

.search-input {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0rem 1.5rem;
  font-size: 1.3rem;
  width: 100%;
  height: 100%;
}

.search-input::placeholder {
  color: #006400;
}

.search-button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 1.3rem 2rem;
  cursor: pointer;
  border-radius: 0 1rem 1rem 0;
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
  background-color: #62ab18;
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
  color: #000;
  text-transform: lowercase;
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

  .search-container {
    width: 65%;
    height: 60%;
  }

  .search-button {
    padding: 1rem 1.5rem;
  }

  .svgs {
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
    background-color: #62ab18;
    color: #fff !important;
  }

  .sesionContainer {
    column-gap: 2rem;
  }

  .navbarTop .link {
    font-size: 1.3rem;
  }
}

@media (width <=390px) {
  .navbarTop {
    height: 4rem;
  }

  .search-container {
    height: 80%;
  }

  .search-input {
    font-size: 1.1rem;
  }

  .navbarTop .link {
    font-size: 1.2rem;
    padding: .7rem .7rem;
  }

  .svgs {
    width: 1.3rem;
    height: 1.3rem;
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
}
</style>
