<template>
  <section>
    <div class="container">
        <button @click="getCard(this.playerHand, 1)" type="button" class="btn btn-primary">
           HIT
        </button>
 
       <button @click="getCard(this.computerHand, 1)" type="button" class="btn btn-primary">
           STAND
        </button>

    <h2 class="mt-3 mt-lg-5">Computer</h2>
      <div class="row mt-3">
        <hand
          :hand="computerHand"
        />
      </div>

    <h2 class="mt-3 mt-lg-5">Player</h2>
      <div class="row mt-3">
        <hand
          :hand="playerHand"
        />
      </div>  
      
    <h2 class="mt-3 mt-lg-5">Deck</h2>
      <div class="row mt-3">
        <card
          v-for="card in deck"
          :key="card.id"
          :card="card"
          @update="loadCards"
        />
    </div>
    </div> 
  </section>
</template>

<script>
import Card from "./Card.vue";
import Hand from "./Hand.vue";
import axios from "../../axios-auth";
export default {
  name: "Blackjack",
  components: {
    Card,
    Hand,
  },
  data() {
    return {
      deck: [],
      computerHand: [],
      playerHand: [],
    };
  },
  mounted() {
    this.loadCards();
  },
  methods: {
    loadCards() {
      axios.get("/cards").then((res) => {
        console.log(res);
        this.deck = res.data;
      }).then(() => {
        this.computerHand = [];  
        this.playerHand = [];
        this.getCard(this.computerHand, 1);
        this.getCard(this.playerHand, 2);
      });
    },
    getCard(hand, amount){
        for (let i = 0; i < amount; i++){
            var card = this.deck[Math.floor(Math.random() * this.deck.length)];
            hand.push(card);
            const index = this.deck.indexOf(card);
            if (index > -1) this.deck.splice(index, 1); 
        }
    },
    calculatePoints(){

    }
  },
};
</script>

<style>
</style>