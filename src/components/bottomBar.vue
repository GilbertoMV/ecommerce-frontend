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