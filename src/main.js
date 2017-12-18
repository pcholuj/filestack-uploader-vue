import Vue from 'vue';
import App from './app';
import router from './router';
import Vuetify from 'vuetify';
import store from './store';
import VueLocalStorage from 'vue-localstorage';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueLocalStorage);
Vue.use(Toasted, {
    fullWidth: true,
    fitToScreen: true,
    singleton: true,
    position: 'bottom-center',
    duration: 2500
});

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
