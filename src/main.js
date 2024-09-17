import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import './assets/styles/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(Vuelidate)

store.dispatch('initializeStore').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
})

//antes de inicializar vue junto con el router, vuex se encarga de haber completado
//la inicializacion del estado (autenticado o no) para que asi el router pueda manejar las rutas correctamente
