<template>
  <section>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create a product</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">Name</span>
          <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input type="number" class="form-control" v-model="product.price" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea
            class="form-control"
            v-model="product.description"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Image URL</span>
          <input type="text" class="form-control" v-model="product.image" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select" v-model="product.category_id">
            <option v-for="category in categories" :value="category.id" :key="category.id" >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="input-group mt-4">
          <button @click="postproduct" type="button" class="btn btn-primary">
            Create product
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="this.$router.push('/products')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateProduct",
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        image: "",
        category_id: 0,
      },
      categories: [],
    };
  },
  methods: {
    postproduct() {
      axios
        .post("http://localhost/products", this.product)
        .then((response => {
          console.log(response);
          if(response.status == 200) this.$router.push('/products')
        }));
    },
  },
  mounted() {
    axios.get("http://localhost/categories").then((res) => {
      console.log(res);
      this.categories = res.data;
    });
  },
};
</script>

<style>
</style>