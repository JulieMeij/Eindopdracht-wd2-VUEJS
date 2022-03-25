import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store.js'

import Home from './components/Home.vue';
import Blackjack from './components/play/Blackjack.vue';
import Login from './components/Login.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/blackjack', component: Blackjack},
    { path: '/login', component: Login},
];

const router = createRouter({
    "history": createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');