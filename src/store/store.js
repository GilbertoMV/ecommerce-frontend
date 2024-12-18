import Vue from 'vue';
import Vuex from 'vuex';
import session from './modules/session';
import theme from './modules/theme';
import loader from './modules/loader';
import usersData from './modules/users';
import categories from './modules/categories';
import attributes from './modules/attributes';
import products from './modules/products';
import fontSize from './modules/font-size';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    theme,
    fontSize,
    loader,
    usersData,
    categories,
    attributes,
    products,
  }
});
