<template>
  <section>
    <div class="container mt-5 col-md-3">
      <form>
        <h2>Login</h2>
        <div class="my-4">
          <label for="inputUsername" class="form-label">Username</label>
          <input
            id="inputUsername"
            type="text"
            class="form-control"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="password"
          />
        </div>
        <button type="button" @click="login()" class="btn btn-outline-light">
          Login
        </button>
      </form>

      <p class="mt-4">
        If you don't have an account, you can register
        <router-link to="/register" class="link-light" active-class="active"
          >here</router-link
        >
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/"); 
        })
        .catch((error) => console.log(error));
       
    },
  },
};
</script>

<style>
</style>