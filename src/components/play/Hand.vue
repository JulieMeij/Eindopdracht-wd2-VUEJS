<template>
    <TransitionGroup class="col d-inline" name="card">
      <card v-for="card in hand" :key="card.id" :card="card" />
    </TransitionGroup>
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
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>