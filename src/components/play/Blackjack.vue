<template>
  <section>
    <div class="container">
        <button @click="getCard(this.playerHand)" type="button" class="btn btn-primary">
           HIT
        </button>
 
       <button @click="getCard(this.computerHand)" type="button" class="btn btn-primary">
           STAND
        </button>

        <button @click="loadCards" type="button" class="btn btn-outline-secondary">
           Play Again
        </button>

    <h2 class="mt-3 mt-lg-5">Computer: {{ computerPoints }}</h2>
      <div class="row mt-3">
        <hand
          :hand="computerHand"
        />
      </div>

    <h2 class="mt-3 mt-lg-5">Player: {{ playerPoints }}</h2>
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
      computerPoints: 0,
      playerPoints: 0,
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
        this.computerPoints = 0;
        this.playerPoints = 0;
        //gives first cards to player and computer
        setTimeout(() => { this.getCard(this.computerHand); }, 500);
        setTimeout(() => { this.calculatePoints(this.computerHand, "computer") }, 1300);
        setTimeout(() => { this.getCard(this.playerHand); }, 1500);
        setTimeout(() => { this.calculatePoints(this.playerHand, "player") }, 2300);
        setTimeout(() => { this.getCard(this.playerHand); }, 2500);
        setTimeout(() => { this.calculatePoints(this.playerHand, "player") }, 3300);
      });
    },
    getCard(hand){
        var card = this.deck[Math.floor(Math.random() * this.deck.length)];
        hand.push(card);
        const index = this.deck.indexOf(card);
        if (index > -1) this.deck.splice(index, 1); 
    },
    calculatePoints(hand, type){
        hand.forEach((card) => {
            if(type == "computer") this.computerPoints += card.number;
            else this.playerPoints += card.number;
        });

    }
  },
};
</script>

<style>
</style>