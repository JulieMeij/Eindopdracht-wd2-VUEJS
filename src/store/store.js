import { createStore } from 'vuex';
import axios from '../axios-auth';

const store = createStore({
    state(){
        return{
            token: null,
            loggedUser: null,
            userType: null
        }
    },
    getters: {

    },
    mutations: {
        updateStorage(state, parameters){
            state.token = parameters.token;
            state.username = parameters.username;
            state.type = parameters.type;
        }
    },
    actions: {
        autoLogin({commit}){
            let token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            var type = localStorage.getItem('type');

            if(token){
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                commit('updateStorage', {
                    token: token,
                    username: username,
                    type: type
                });
            }
        },
        login({commit}, parameters){
            return new Promise((resolve, reject) => {
                axios.post("users/login", {
                username: parameters.username,
                password: parameters.password,
            })
            .then((res) => {
                axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
                console.log(res.data);

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('type' , res.data.type);

                commit('updateStorage', {
                    token: res.data.token,
                    username: res.data.username,
                    type: res.data.type
                });
                resolve();
            })
            .catch((error) => reject(error));
            })
        }
    }
});

export default store;