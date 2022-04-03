import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store.js'

import Home from './components/Home.vue';
import Blackjack from './components/play/Blackjack.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UserList from './components/management/UserList.vue';
import EditUser from './components/management/EditUser.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/blackjack', component: Blackjack},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/management', component: UserList},
    { path: '/edituser/:id', component: EditUser, props: true }
];

const router = createRouter({
    "history": createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');