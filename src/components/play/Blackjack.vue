<template>
  <section>
    <div class="container">
        <button @click="getCard(this.user.hand)" type="button" class="btn btn-primary">
           HIT
        </button>
 
       <button @click="getCard(this.computer.hand)" type="button" class="btn btn-primary">
           STAND
        </button>

        <button @click="loadCards" type="button" class="btn btn-outline-secondary">
           Play Again
        </button>

    <h2 class="mt-3 mt-lg-5">Computer: {{ computer.points }}</h2>
      <div class="row mt-3">
        <hand
          :hand="computer.hand"
        />
      </div>

    <h2 class="mt-3 mt-lg-5">You: {{ user.points }}</h2>
      <div class="row mt-3">
        <hand
          :hand="user.hand"
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
      computer: {
          hand: [],
          points: 0,
      },
      user: {
          hand: [],
          points: 0,
      },
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
        this.computer.hand = [];  
        this.user.hand = [];
        this.computer.points = 0;
        this.user.points = 0;
        //gives first cards to player and computer
        setTimeout(() => { this.getCard(this.computer); }, 500);
        setTimeout(() => { this.getCard(this.user); }, 1500);
        setTimeout(() => { this.getCard(this.user); }, 2500);
      });
    },
    getCard(player){
        var card = this.deck[Math.floor(Math.random() * this.deck.length)];
        player.hand.push(card);
        setTimeout(() => { this.addPoints(player, card);  }, 500);
        const index = this.deck.indexOf(card);
        if (index > -1) this.deck.splice(index, 1); 
    },
    addPoints(player, card){
        let value = 0;
        if(card.number == 14) value = 11;
        else if(card.number > 10) value = 10;
        else value = card.number;
        if(player.points > 10 && value == 11) value = 1;
        player.points += value;

        if(player.points > 21){ 
            this.setWin();
        }
    },
    setWin(){
        
    }
  },
};
</script>

<style>
</style>