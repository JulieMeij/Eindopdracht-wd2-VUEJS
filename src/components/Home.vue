<template>
    <div class="container mt-5">
      <h1 class="py-3">Welcome {{ loggedUser }} </h1>
      <p>On this website you can play blackjack against the computer.</p>
      <h2>Rules of blackjack</h2>
      <p>
        You need to attempt to beat the dealer by getting a count as close to 21
        as possible, without going over 21. Face cards are 10 and any other card
        is its number's value. Aces are either worth 11 if you're under 21 and
        worth 1 if you would have gone over 21. Pressing HIT means you get a
        random card. Pressing STAND means it's the dealers turn to get cards.
      </p>
      <p>Tip: it's best to STAND if your score is 17 or higher.</p>

      <h4>When do you win?</h4>
      <ul>
        <li>
          If you get 21 you win, unless the dealer gets 21 as well then it's a
          tie.
        </li>
        <li>If you go over 21 you lose.</li>
        <li>If at the end your score is higher then the dealer's you win.</li>
        <li>If the dealer goes over 21 you win.</li>
      </ul>

      <router-link to="/blackjack" class="btn btn-outline-light" active-class="active"> Play blackjack </router-link>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loggedUser: localStorage.getItem('username'),
    };
  },
};
</script>

<style>
.dnone {
  display: none;
}
</style>