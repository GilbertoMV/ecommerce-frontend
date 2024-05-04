import Vue from "vue";
import Router from "vue-router";
import NotFoundPage from "../views/notFoundPage.vue";
import homePage from "../views/homePage.vue";
import bestSellers from "../views/bestSellersPage.vue";
import newItems from "../views/newItemsPage.vue";
import moreEcofriendly from "../views/moreEcofriendlyPage.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path:'/', name: 'home', component: homePage},
    {path:'/best-sellers', name: 'bestSellers', component: bestSellers},
    {path:'/new-items', name: 'newItems', component: newItems},
    {path:'/more-ecofriendly', name: 'moreEcofriendly', component: moreEcofriendly},
    {path: '*', name: '404NotFound',component: NotFoundPage},
]
})      