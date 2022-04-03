<template>
  <section>
    <div class="container mt-5">
      <h1 class="mb-3">Blackjack</h1>
      <div class="buttonsdiv">
        <button
          @click="hit"
          type="button"
          class="btn btn-outline-light btn-lg me-2"
          :class="{ dnone: hitdisplay }"
        >
          HIT
        </button>
        
        <button
          @click="(stand = true), (hitdisplay = true), getCard(this.computer)"
          type="button"
          class="btn btn-outline-light btn-lg"
          :class="{ dnone: hitdisplay }"
        >
          STAND
        </button>

        <div :class="{ dnone: !endgame }">
          <h2>Winner: {{ winner }}</h2>
          <button
            @click="loadCards"
            type="button"
            class="btn btn-outline-light btn-lg"
          >
            Play Again
          </button>
        </div>
      </div>
      <h2 class="mt-3 mt-lg-5">Computer: {{ computer.points }}</h2>
      <div class="row">
        <hand :hand="computer.hand" />
      </div>

      <h2 class="mt-3 mt-lg-5">You: {{ user.points }}</h2>
      <div class="row">
        <hand :hand="user.hand" />
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
      hitdisplay: true,
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
          this.hitdisplay = true;
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
          setTimeout(() => {
            this.hitdisplay = false;
          }, 3500);
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
        this.hitdisplay = true;
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
        this.hitdisplay = true;
      }
      if (this.stand == true && this.computer.points >= 17) {
        if (this.computer.points == 21 && this.user.points != 21) {
          this.winner = "computer";
          this.endgame = true;
          this.hitdisplay = true;
        } else if (this.computer.points != 21 && this.user.points == 21) {
          this.winner = "you";
          this.endgame = true;
          this.hitdisplay = true;
        } else if (this.computer.points > 21) {
          this.winner = "you";
          this.endgame = true;
          this.hitdisplay = true;
        } else if (this.computer.points < this.user.points) {
          this.winner = "you";
          this.endgame = true;
          this.hitdisplay = true;
        } else if (this.computer.points == this.user.points) {
          this.winner = "tie";
          this.endgame = true;
          this.hitdisplay = true;
        } else {
          this.winner = "computer";
          this.endgame = true;
          this.hitdisplay = true;
        }
      }
    },
  },
};
</script>

<style>
.buttonsdiv {
  height: 7em;
}
</style>