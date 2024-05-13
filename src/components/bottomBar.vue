<template>
  <header>
    <div class="navbarDown">
      <ul>
        <li><a href="#">All Categories</a></li>
        <li><router-link to="/best-sellers" active-class="active">Best Sellers</router-link></li>
        <li><router-link to="/new-items" active-class="active">New Items</router-link></li>
        <li><router-link to="/more-eco-friendly" active-class="active">More eco-friendly</router-link></li>
      </ul>
    </div>
  </header>
</template>
<script>

export default {
  name: 'NavBar'
};
</script>
<style scoped>
.navbarDown {
  background-color: #62ab18;
}

.navbarDown ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
}

.navbarDown a {
  font-weight: 500;
  text-decoration: none;
  color: #000;
}


.navbarDown a {
  font-size: 20px;
  transition: color 0.5s;
}

.navbarDown a:hover,
.navbarDown .active {
  color: hsl(54, 70%, 86%);
}
</style>