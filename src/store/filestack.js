import Vue from 'vue';
import Vuex from 'vuex';
// import { filestack } from 'filestack-js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        files: [],
        auth: {}
    },
    getters: {
        isAuthenticated: () => {
            return true;
        },
        apiKey: () => {
            return '123123';
        }
    },
    actions: {
        authenticate: (apikey) => {

        }
    }
});
