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
    <router-link to="/sign-in">Sing In</router-link>
    <router-link to="/sign-up" class="sign-up"><i class="bi bi-person-circle"></i> Sign Up</router-link>
  </div>
</template>
<script>
export default {
  name: 'NavBarTop'
};
</script>
<style scoped>
.navbarTop {
  padding: 10px 0;
  background-color: #fff;
  display: grid;
  grid-template-columns: 10% 60% 10% 10% 10%;
  justify-items: center;
  align-items: center;
}


.navbarTop a {
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: #000;
}

.search-container {
  display: flex;
  width: 80%;
  justify-content: space-between;
  border-radius: 10px;
  transition: box-shadow 0.3s;
}

.search-input {
  border: none;
  background-color: rgba(199, 233, 176, 0.7);
  outline: none;
  padding: 15px;
  font-size: 16px;
  border-radius: 10px 0 0 10px;
  flex: 1;
}

.search-input::placeholder {
  color: #006400;
}

.search-button {
  background-color: #d8f0c8;
  border: none;
  outline: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
}

.search-container:hover {
  box-shadow: 0 0 10px #a9bc9c;
}

.search-icon {
  width: 24px;
  height: auto;
}

img {
  margin: 0 auto;
  width: 50%;
}

.sign-up {
  border: 2px solid #62ab18;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.sign-up:hover {
  background-color: #62ab18;
  color: #fff;
}
</style>