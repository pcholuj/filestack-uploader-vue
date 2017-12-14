import Vue from 'vue';
import App from './app';
import router from './router';
import Vuetify from 'vuetify';
import store from './store';
import VueLocalStorage from 'vue-localstorage';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueLocalStorage);

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
