import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js";

// ADMIN VIEWS
// import indexAdminPage from "../views/adminViews/index.vue";

// MAIN VIEWS
const NotFoundPage = () => import('../views/mainViews/notFoundPage.vue')
const homePage = () => import('../views/mainViews/homePage.vue')
const signInPage = () => import('../views/LoginViews/signInPage.vue')
const signUpPage = () => import('../views/LoginViews/signUpPage.vue')
const bestSellersPage = () => import('../views/mainViews/bestSellersPage.vue')
const newItemsPage = () => import('../views/mainViews/newItemsPage.vue')
const moreEcofriendlyPage = () => import('../views/mainViews/moreEcofriendlyPage.vue')
const outletPage = () => import('../views/mainViews/outletPage.vue')
const promosPage = () => import('../views/mainViews/promosPage.vue')
const categoryPage = () => import('../views/mainViews/categoriesPage.vue')
const rewardsShopComponent = () => import('../views/mainViews/rewardsShopPage.vue')

// USER VIEWS
const userProfilePage = () => import('../views/userViews/userProfilePage.vue')
const profileComponent = () => import('../components/userComponents/profileSettings/profileComponent.vue')
const myOrdersComponent = () => import('../components/userComponents/profileSettings/myOrdersComponent.vue')
const rewardsComponent = () => import('../components/userComponents/rewardsComponent.vue')
const addressComponent = () => import('../components/userComponents/profileSettings/addressComponent.vue')
const securityComponent = () => import('../components/userComponents/profileSettings/securityComponent.vue')
const accessibilityComponent = () => import('../components/userComponents/profileSettings/accessibilityComponent.vue')
const privacyComponent = () => import('../components/userComponents/profileSettings/privacyComponent.vue')
const supportComponent = () => import('../components/userComponents/profileSettings/supportComponent.vue')
const favoritesComponent = () => import('../views/userViews/favoritesPage.vue')
const shoppingCarPage = () => import('../views/userViews/shoppingCarPage.vue')

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: homePage, meta:{title: 'Home'}},
    {path: '/sign-in',name: 'signInPage', component: signInPage, meta:{requiresGuest: true, title: 'Login'}},
    {path: '/sign-up',name: 'signUpPage', component: signUpPage, meta:{requiresGuest: true, title: 'Signup'}},
    {path: '/outlet', name: 'outletPage', component: outletPage, meta: {title: 'Outlet'}},
    {path: '/category/:categoryId', name: 'categoryPage', component: categoryPage, meta: {title: 'Categories'}, props: true},
    {path: '/promotions', name: 'promosPage',component: promosPage, meta: {title: 'Promotions'}},
    {path: '/best-sellers', name: 'bestSellersPage', component: bestSellersPage, meta: {title: 'Best Sellers'}},
    {path: '/new-items', name: 'newItemPages', component: newItemsPage, meta: {title: 'New Items'}},
    {path: '/more-ecofriendly', name: 'moreEcofriendlyPage', component: moreEcofriendlyPage, meta: {title: 'More Eco-Friendly'}},
    {path: '/shopping-car',name: 'shoppingCarPage',component: shoppingCarPage, meta: {requiresSesionActive: true, title: 'Shopping Car'}},
    {path: '/favorites', name: 'favoritesComponent', component: favoritesComponent, meta: {requiresSesionActive: true, title: 'Favorites productos'}},
    {path: '/rewards-shop', name: 'RewardsShopComponent', component: rewardsShopComponent, meta:{title: 'Rewards Shop'}},
    {path: '/user', name:'userProfilePage',component: userProfilePage, meta: {requiresAuth: true, title: 'Profile'}, 
      children :[
        {path: 'profile', name: 'profileComponent', component: profileComponent, meta: {title: 'Profile'}}, // /user/profile
        {path: 'my-orders', name: 'myOrdersComponent', component: myOrdersComponent, meta: {title: 'My Orders'}}, // /user/my-orders
        {path: 'rewards', name: 'rewardsComponent', component: rewardsComponent, meta: {title: 'My Rewards'}}, // /user/rewards
        {path: 'address', name: 'addressComponent', component: addressComponent, meta: {title: 'My Address'}},// /user/address
        {path: 'security', name: 'securityComponent', component: securityComponent, meta: {title: 'Security Settings'}}, // /user/security
        {path: 'accessibility', name: 'accessibilityComponent', component: accessibilityComponent, meta: {title: 'Accessibility Settings'}}, // /user/accessibility
        {path: 'privacy', name: 'privacyComponent', component: privacyComponent, meta: {title: 'Privacy Settings'} }, // /user/privacy
        {path: 'support', name: 'supportComponent', component: supportComponent, meta: {title: 'Support and Help'}} // /user/support
      ]},
    // {path: '/admin/index', name: 'indexAdminPage', component: indexAdminPage, meta: {requiresAuth:false}},
    {path: '*', name: '404NotFound',component: NotFoundPage, meta: {title: 'Not Found Page'}},
]
})
router.beforeEach((to, from, next) => {
  //loader 
  store.commit('SET_LOADING', true);
  next();

  const isAuthenticated = store.getters.isAuthenticated;

  (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresSesionActive) && !isAuthenticated) ? next('/sign-in') : next();

  //establecer titulos de la pagina dinamicamente
  document.title = to.meta.title || 'Mapache E-commerce'

  
});

router.afterEach(()=> {
  //loader
  store.commit('SET_LOADING', false)
})


export default router