<template>
  <section>
    <div class="container mt-5 col-md-3">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Add User</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">Username</span>
          <input type="text" class="form-control" v-model="user.username" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input type="text" class="form-control" v-model="user.password" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Points</span>
          <input type="number" class="form-control" v-model="user.points" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Type</span>
          <select class="form-select" v-model="user.type">
            <option>user</option>
            <option>admin</option>
          </select>
        </div>

        <div class="mb-3">
          <button @click="add" type="button" class="btn btn-outline-light me-2">
            Add User
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="this.$router.push('/management')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
export default {
  name: "AddUser",
  data() {
    return {
      user: {
        username: "",
        password: "",
        points: 10,
        type: "",
      },
    };
  },
  methods: {
    add() {
      axios
        .post("users", {
          username: this.user.username,
          password: this.user.password,
          points: this.user.points,
          type: this.user.type,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) this.$router.push("/management");
        });
    },
  },
};
</script>

<style>
</style>