import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
