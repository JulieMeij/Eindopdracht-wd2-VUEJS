<template>
  <div
    :class="{ red: card.colour == 'red', black: card.colour == 'black' }"
    class="playingcard bg-light border border-dark rounded-1 me-2 shadow mb-3"
  >
    <h2 class="text-center">{{ card.name }}</h2>
    <h1 v-if="card.type == 'diams'" class="text-center">&diams;</h1>
    <h1 v-if="card.type == 'spades'" class="text-center">&spades;</h1>
    <h1 v-if="card.type == 'hearts'" class="text-center">&hearts;</h1>
    <h1 v-if="card.type == 'clubs'" class="text-center">&clubs;</h1>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
  },
};
</script>

<style>
.playingcard {
  width: 4em;
}
.red {
  color: red;
}
.black {
  color: black;
}
</style>