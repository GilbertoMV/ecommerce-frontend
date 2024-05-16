import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js"

import NotFoundPage from "../views/notFoundPage.vue";
import homePage from "../views/homePage.vue";
import bestSellers from "../views/bestSellersPage.vue";
import newItems from "../views/newItemsPage.vue";
import moreEcofriendly from "../views/moreEcofriendlyPage.vue";
import shoppingCar from "../views/shoppingCarPage.vue"
import userProfile from "../views/userProfilePage.vue";
import signIn from "../views/signInPage.vue"
import signUp from "../views/signUpPage.vue"

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path:'/', name: 'home', component: homePage},
    {path:'/best-sellers', name: 'bestSellers', component: bestSellers},
    {path:'/new-items', name: 'newItems', component: newItems},
    {path:'/more-ecofriendly', name: 'moreEcofriendly', component: moreEcofriendly},
    {path: '/shopping-car',name: 'shoppingCar',component: shoppingCar, meta: {requiresAuth:true}},
    {path: '/userProfile', name: 'userProfile', component: userProfile, meta: {requiresAuth:true}},
    {path: '/sign-in',name: 'signIn', component: signIn, meta:{requiresGuest: true}},
    {path: '/sign-up',name: 'signUn', component: signUp, meta:{requiresGuest: true}},
    {path: '*', name: '404NotFound',component: NotFoundPage},
]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) ? next('/') : next();
});


export default router