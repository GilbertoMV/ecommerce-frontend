import Vue from "vue";
import Router from "vue-router";
import store from "../store/store.js";

// ADMIN VIEWS
const adminProfilePage = () => import('../views/adminViews/adminProfilePage.vue')
const dashboardComponent = () => import('../components/adminComponents/dashboardComponent.vue')
//User
const userComponent = () => import('../components/adminComponents/users/userComponent.vue')
//Product
const addproductComponent = () => import('../components/adminComponents/products/addProductoComponent.vue')
const catalogProductsComponent = () => import('../components/adminComponents/products/catalogProductsComponent.vue')
const productDetailsComponent = () => import('../components/adminComponents/products/productDetailsComponent.vue')
//Categories
const addCategoryComponent = () => import('../components/adminComponents/categories/addCategoryComponent.vue')
const allCategoriesComponent = () => import('../components/adminComponents/categories/allCategoriesComponent.vue')
//Attributes
const addAttributeComponent = () => import('../components/adminComponents/attributes/addAttributeComponent.vue')
const allAttributesComponent = () => import('../components/adminComponents/attributes/allAttributesComponent.vue')
//Orders
const allOrdersComponent = () => import('../components/adminComponents/orders/allOrdersComponent.vue')
const orderDetailsComponent = () => import('../components/adminComponents/orders/orderDetailsComponent.vue')


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
const myOrdersComponent = () => import('../components/userComponents/profileSettings/myOrdersComponent.vue')
const rewardsComponent = () => import('../components/userComponents/rewardsComponent.vue')
const addressComponent = () => import('../components/userComponents/profileSettings/addressComponent.vue')
const securityComponent = () => import('../components/userComponents/profileSettings/securityComponent.vue')
const accessibilityComponent = () => import('../components/userComponents/profileSettings/accessibilityComponent.vue')
const privacyComponent = () => import('../components/userComponents/profileSettings/privacyComponent.vue')
const supportComponent = () => import('../components/userComponents/profileSettings/supportComponent.vue')
const favoritesComponent = () => import('../views/userViews/favoritesPage.vue')
const shoppingCarPage = () => import('../views/userViews/shoppingCarPage.vue')
const configAddressPage  = () => import('../views/userViews/configAddressPage.vue')

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
    {path: '/rewards-shop', name: 'rewardsShopComponent', component: rewardsShopComponent, meta:{title: 'Rewards Shop'}},
    {path: '/config-address', name: 'configAddressPage', component: configAddressPage, meta: {title: 'Address', requiresAuth: true}},
    {path: '/config-address/:addressId', name: 'editAddressPage', component: configAddressPage, meta: {title: 'Address', requiresAuth: true}, props:true},
    {path: '/user', redirect: '/user/security', name:'userProfilePage',component: userProfilePage, meta: {requiresAuth: true, title: 'Profile'}, 
      children :[
        {path: 'my-orders', name: 'myOrdersComponent', component: myOrdersComponent, meta: {title: 'My Orders'}},
        {path: 'rewards', name: 'rewardsComponent', component: rewardsComponent, meta: {title: 'My Rewards'}},
        {path: 'address', name: 'addressComponent', component: addressComponent, meta: {title: 'My Address'}},
        {path: 'security', name: 'securityComponent', component: securityComponent, meta: {title: 'Security Settings'}},
        {path: 'accessibility', name: 'accessibilityComponent', component: accessibilityComponent, meta: {title: 'Accessibility Settings'}},
        {path: 'privacy', name: 'privacyComponent', component: privacyComponent, meta: {title: 'Privacy Settings'} },
        {path: 'support', name: 'supportComponent', component: supportComponent, meta: {title: 'Support and Help'}},
    ]},
    {path: '/admin', redirect: '/admin/dashboard', name: 'adminProfilePage', component: adminProfilePage, meta:{title:'Dashboard'},
      children: [
        {path: 'dashboard', name: 'dashboardComponent', component: dashboardComponent, meta: {title: 'Dashboard'} },
        //USERS
        {path:'users', name: 'userComponent', component: userComponent, meta: {title: 'Users'}},
        //PRODUCTS
        {path: 'add-product', name: 'addproductComponent', component: addproductComponent, meta: {title: 'Add Product'}},
        {path: 'product-catalog', name: 'productcatalogComponent', component: catalogProductsComponent, meta: {title: 'Product Catalog'}},
        {path: 'product-details', name: 'productdetailComponent', component: productDetailsComponent, meta: {title: 'Product Detail'}},
        //CATEGORIES
        {path: 'add-category', name: 'addCategoryComponent', component: addCategoryComponent, meta: {title: 'Add Category'}},
        {path: 'all-categories', name:'allCategoriesComponent', component: allCategoriesComponent, meta:{title: 'All Categories'}},
        //ATTRIBUTES
        {path:'add-attribute', name: 'addAttributeComponent', component: addAttributeComponent, meta:{title:'Add Attribute'}},
        {path:'all-attributes', name: 'allAttributesComponent', component: allAttributesComponent, meta:{title:'All Attributes'}},
        //ORDERS
        {path: 'all-orders', name: 'allOrdersComponent', component: allOrdersComponent, meta:{title: 'All Orders'}},
        {path: 'order-details', name: 'orderDetailsComponent', component: orderDetailsComponent, meta:{title: 'Order Details'}},
    ]},
    {path: '*', name: '404NotFound',component: NotFoundPage, meta: {title: 'Not Found Page'}},
]
})
router.beforeEach(async(to, from, next) => {
  next();
  const isAuthenticated = store.getters.isAuthenticated;

  (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) ? next('/') : next();
  (to.matched.some(record => record.meta.requiresSesionActive) && !isAuthenticated) ? next('/sign-in') : next();

  //establecer titulos de la pagina dinamicamente
  document.title = to.meta.title || 'Mapache E-commerce'

});



export default router