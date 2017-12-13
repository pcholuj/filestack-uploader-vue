import Vue from 'vue'
import Vuex from 'vuex'
import App from './app'
import router from './router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
