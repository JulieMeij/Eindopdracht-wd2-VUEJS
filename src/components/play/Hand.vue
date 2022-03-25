<template>
  <section>
      <card
        v-for="card in hand"
        :key="card.id"
        :card="card"
      />
  </section>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Hand",
  props: {
    hand: Array,
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>