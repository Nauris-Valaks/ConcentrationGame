import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'
import router from './router'
import confirmDialog from './components/confirm/confirm.vue'
import 'vue-snotify/styles/material.css'

Vue.config.productionTip = false
Vue.component('confirm-dialog', confirmDialog)

new Vue({
  render: h => h(App),
  vuetify,
  router: router,
}).$mount('#app')

