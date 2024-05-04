<template>
  <div class="navbarTop">
        <router-link to="/">
          <img src="@/assets/images/logo.webp" alt="e-commerce logo">
        </router-link>
        <div class="search-container">
          <input type="text" placeholder="Search..." class="search-input">
          <button class="search-button">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <router-link to="/shopping-car"><i class="bi bi-bag-heart-fill"></i> Shopping Car</router-link>
        <router-link to="/user-info"><i class="bi bi-person-circle"></i> Account</router-link>
      </div>
</template>
<script>
export default {
    name: 'NavBarTop'
  };
</script>