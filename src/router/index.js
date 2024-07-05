import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js";
// MAIN VIEWS
import NotFoundPage from "../views/mainViews/notFoundPage.vue";
import homePage from "../views/mainViews/homePage.vue";
import signInPage from "../views/LoginViews/signInPage.vue";
import signUpPage from "../views/LoginViews/signUpPage.vue";
import bestSellersPage from "../views/mainViews/bestSellersPage.vue";
import newItemsPage from "../views/mainViews/newItemsPage.vue";
import moreEcofriendlyPage from "../views/mainViews/moreEcofriendlyPage.vue";
import shoppingCarPage from "../views/userViews/shoppingCarPage.vue";
import outletPage from "../views/mainViews/outletPage.vue";
import promosPage from "../views/mainViews/promosPage.vue";
// ADMIN VIEWS
// import indexAdminPage from "../views/adminViews/index.vue";
// USER VIEWS
import userProfilePage from "../views/userViews/userProfilePage.vue";


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: homePage},
    {path: '/sign-in',name: 'signInPage', component: signInPage, meta:{requiresGuest: true}},
    {path: '/sign-up',name: 'signUpPage', component: signUpPage, meta:{requiresGuest: true}},
    {path: '/outlet', name: 'outletPage', component: outletPage},
    {path: '/promotions', name: 'promosPage',component: promosPage},
    {path: '/best-sellers', name: 'bestSellersPage', component: bestSellersPage},
    {path: '/new-items', name: 'newItemPages', component: newItemsPage},
    {path: '/more-ecofriendly', name: 'moreEcofriendlyPage', component: moreEcofriendlyPage},
    {path: '/shopping-car',name: 'shoppingCarPage',component: shoppingCarPage, meta: {requiresAuth:true}},
    {path: '/user', name: 'userProfilePage', component: userProfilePage, meta: {requiresAuth:true}},
    // {path: '/admin/index', name: 'indexAdminPage', component: indexAdminPage, meta: {requiresAuth:false}},
    {path: '*', name: '404NotFound',component: NotFoundPage},
]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) ? next('/') : next();
});


export default router