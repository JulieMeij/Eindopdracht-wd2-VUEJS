<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {

    }
  },
  created(){
    this.$store.dispatch('autoLogin');
  }
};
</script>

<style>
body {
background-color:#006c7a;
color: white;
}

</style>
