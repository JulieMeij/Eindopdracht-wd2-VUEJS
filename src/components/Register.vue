<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form>
            <h2>Register</h2>
            <div class="mb-3">
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
            <button
              type="button"
              @click="register()"
              class="btn btn-outline-light"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axios-auth";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      axios.post("users/register", {
        username: this.username,
        password: this.password,
      }).then((res) => {
         console.log(res);
        this.$router.push('/login');
      }).catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>