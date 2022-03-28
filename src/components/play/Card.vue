<template>
     <div :class="{ red: card.colour == 'red', black: card.colour == 'black' }" class="playingcard card border border-dark rounded-1 m-2">
        <h2 class="text-center"> {{ card.name }} </h2>
        <h2 class="text-center"> {{ card.type }} </h2>
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