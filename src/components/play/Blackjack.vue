<template>
  <section>
    <div class="container mt-5">
      <button
        @click="hit"
        type="button"
        class="btn btn-outline-light me-2"
        :class="{ dnone: endgame }"
      >
        HIT
      </button>

      <button
        @click="(stand = true), getCard(this.computer)"
        type="button"
        class="btn btn-outline-light"
        :class="{ dnone: endgame }"
      >
        STAND
      </button>

      <div :class="{ dnone: !endgame }">
        <h1>Winner: {{ winner }}</h1>
        <button
          @click="loadCards"
          type="button"
          class="btn btn-outline-secondary"
        >
          Play Again
        </button>
      </div>

      <h2 class="mt-3 mt-lg-5">Computer: {{ computer.points }}</h2>
      <div class="row">
        <div class="col">
          <hand :hand="computer.hand" />
        </div>
      </div>

      <h2 class="mt-3 mt-lg-5">You: {{ user.points }}</h2>
      <div class="row">
        <div class="col">
          <hand :hand="user.hand" />
        </div>
      </div>


    </div>
  </section>
</template>

<script>
import Hand from "./Hand.vue";
import axios from "../../axios-auth";
export default {
  name: "Blackjack",
  components: {
    Hand,
  },
  data() {
    return {
      deck: [],
      computer: {
        hand: [],
        points: 0,
      },
      user: {
        hand: [],
        points: 0,
      },
      endgame: false,
      winner: "",
      stand: false,
    };
  },
  mounted() {
    this.loadCards();
  },
  methods: {
    loadCards() {
      axios
        .get("/cards")
        .then((res) => {
          console.log(res);
          this.deck = res.data;
        })
        .then(() => {
          this.stand = false;
          this.winner = "";
          this.endgame = false;
          this.computer.hand = [];
          this.user.hand = [];
          this.computer.points = 0;
          this.user.points = 0;
          //gives first cards to player and computer
          setTimeout(() => {
            this.getCard(this.computer);
          }, 500);
          setTimeout(() => {
            this.getCard(this.user);
          }, 1500);
          setTimeout(() => {
            this.getCard(this.user);
          }, 2500);
        });
    },
    hit() {
      this.getCard(this.user);
    },
    getCard(player) {
      if (!this.endgame) {
        var card = this.deck[Math.floor(Math.random() * this.deck.length)];
        player.hand.push(card);
        setTimeout(() => {
          this.addPoints(player, card);
        }, 500);
        const index = this.deck.indexOf(card);
        if (index > -1) this.deck.splice(index, 1);
      }
    },
    addPoints(player, card) {
      let value = 0;
      if (card.number == 14) value = 11;
      else if (card.number > 10) value = 10;
      else value = card.number;
      if (player.points > 10 && value == 11) value = 1;
      player.points += value;

      if (player.points >= 21) {
        this.stand = true;
      }

      if (this.stand == true && this.computer.points < 17) {
        setTimeout(() => {
          this.getCard(this.computer);
        }, 500);
      }

      this.setWin();

      return player.points;
    },
    setWin() {
      if (this.stand == true && this.user.points > 21) {
        this.winner = "computer";
        this.endgame = true;
      }
      if (this.stand == true && this.computer.points >= 17) {
        if (this.computer.points == 21 && this.user.points != 21) {
          this.winner = "computer";
          this.endgame = true;
        } else if (this.computer.points != 21 && this.user.points == 21) {
          this.winner = "you";
          this.endgame = true;
        } else if (this.computer.points > 21) {
          this.winner = "you";
          this.endgame = true;
        } else if (this.computer.points < this.user.points) {
          this.winner = "you";
          this.endgame = true;
        } else if (this.computer.points == this.user.points) {
          this.winner = "tie";
          this.endgame = true;
        } else {
          this.winner = "computer";
          this.endgame = true;
        }
      }
    },
  },
};
</script>

<style>
</style>