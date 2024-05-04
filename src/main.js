import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import "./assets/styles/main.css"
import "bootstrap-icons/font/bootstrap-icons.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
