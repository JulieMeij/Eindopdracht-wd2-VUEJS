import { createStore } from 'vuex';
import axios from '../axios-auth';

const store = createStore({
    state() {
        return {
            token: null,
            loggedIn: false,
        }
    },
    getters: {

    },
    mutations: {
        LoggedInTrue(state) {
            state.loggedIn = true;
        },
        LoggedInFalse(state) {
            state.loggedIn = false;
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
                })
                    .then((res) => {
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
                        console.log(res.data);

                        localStorage.setItem('token', res.data.token);

                        commit('updateStorage', {
                            token: res.data.token,
                        });
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        }
    }
});

export default store;