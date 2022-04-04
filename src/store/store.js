import { createStore } from 'vuex';
import axios from '../axios-auth';

const store = createStore({
    state() {
        return {
            token: null,
            loggedIn: false,
            admin: false
        }
    },
    getters: {

    },
    mutations: {
        Logout(state) {
            state.loggedIn = false;
            state.admin = false;
        },
        updateStorage(state, parameters) {
            state.token = parameters.token;
        }
    },
    actions: {
        autoLogin({ commit }) {
            let token = localStorage.getItem('token');

            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                commit('updateStorage', {
                    token: token,
                });
            }
        },
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                axios.post("users/login", {
                    username: parameters.username,
                    password: parameters.password,
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

                        localStorage.setItem('token', res.data.token);
                        if (res.data.usertype == 'admin') {
                            this.state.admin = true;
                        }
                        this.state.loggedIn = true;

                        commit('updateStorage', {
                            token: res.data.token,
                        });
                        resolve();
                    }
                }).catch((error) => reject(error));
            })
        }
    }
});

export default store;