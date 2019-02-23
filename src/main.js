import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue Flash Message
import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'

// Plugins
Vue.use(BootstrapVue)
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 2000,
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
