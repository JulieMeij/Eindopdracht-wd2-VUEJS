<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Users</h2>

      <div class="row mt-3">
        <user-list-item
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
    </div>
  </section>
</template>

<script>
import UserListItem from "./UserListItem.vue";
import axios from "../../axios-auth";
export default {
  name: "UserList",
  components: {
    UserListItem,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      axios.get("/users").then((res) => {
        console.log(res);
        this.users = res.data;
      });
    },
  },
};
</script>

<style>
</style>