import Vue from 'vue';
import Vuex from 'vuex';
// import files from './modules/files';

import filestack from 'filestack-js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiHandler: null
    },
    getters: {
        isApiInitialized: (state) => {
            return !!state.apiHandler;
        }
    },
    actions: {
        initializeApi: (ctx, apiKey) => {
            const handler = filestack.init(apiKey);
            ctx.commit('setApiHandler', handler);
            return handler;
        }
    },
    mutations: {
        setApiHandler: (state, apiHandler) => {
            state.apiHandler = apiHandler;
        }
    },
    modules: {
        // auth
    }
});
