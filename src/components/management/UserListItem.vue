<template>
  <tr>
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.username }}</td>
    <td>{{ user.points }}</td>
    <td>{{ user.type }}</td>
    <td>
      <button class="btn btn-warning me-2" @click="editUser(user.id)">Edit</button>
      <button class="btn btn-danger me-2" @click="deleteUser(user.id)">Delete</button>
    </td>
  </tr>
</template>

<script>
import axios from "../../axios-auth";
export default {
  name: "UserListItem",
  props: {
    user: Object,
  },
  methods: {
    deleteUser(id) {
      axios.delete("users/" + id).then((response) => {
        console.log(response);
        if (response.status == 200) this.$emit("update");
      });
    },
    editUser(id) {
      this.$router.push("/edituser/" + id);
    },
  },
};
</script>

<style>
.black-text {
  color: black;
}
</style>