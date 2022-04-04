<template>
  <nav class="navbar navbar-expand-sm navbar-dark nav-color">
    <div class="container">
      <a class="navbar-brand fs-1 nav-link" href="#">
        &clubs; &hearts; &spades; &diams;
      </a>
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item mx-2 fs-5 fw-bold">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item mx-2 fs-5 fw-bold">
          <router-link to="/blackjack" class="nav-link" active-class="active"
            >Play</router-link
          >
        </li>
        <li class="nav-item mx-2 fs-5 fw-bold" v-if="this.$store.state.loggedIn">
          <router-link to="/management" class="nav-link" active-class="active" 
            >Management</router-link
          >
        </li>
        <li class="nav-item mx-2 fs-5 fw-bold" v-if="!this.$store.state.loggedIn">
          <router-link
            to="/login"
            class="btn btn-outline-light"
            active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item mx-2 fs-5 fw-bold" v-if="this.$store.state.loggedIn">
          <button
            @click="logout"
            class="btn btn-outline-light"
            active-class="active"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit('LoggedInFalse');
      this.$router.push('/');
    },
  },
};
</script>

<style>
.nav-color {
  background-color: #161616;
}
</style>