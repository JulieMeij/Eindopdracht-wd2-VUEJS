<template>
  <section>
    <div class="container mt-5">
      <h2 class="mt-3 mt-lg-5">Users</h2>
      <table class="table text-light">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">points</th>
            <th scope="col">type</th>
            <th scope="col">manage</th>
          </tr>
        </thead>
        <tbody>
          <user-list-item
            v-for="user in users"
            :key="user.id"
            :user="user"
            @update="loadUsers"
          />
        </tbody>
      </table>
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