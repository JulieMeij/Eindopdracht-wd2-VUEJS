<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/blackjack" class="nav-link" active-class="active"
            >Play</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/management" class="nav-link" active-class="active"
            >Management</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      //doet t alleen met refresh dus fixen
      userType: localStorage.getItem("type"),
    };
  },
};
</script>

<style>
</style>