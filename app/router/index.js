import Vue from 'vue'
import Router from 'vue-router'
// import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  // mode: 'hash', // hash ou history ou abstract
  linkActiveClass: 'active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [ {
    path: '/fermentables',
    name: 'fermentables',
    component: require('components/modules/ingredients/Fermentables'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hops',
    name: 'hops',
    component: require('components/modules/ingredients/Hops'),
    meta: { requiresAuth: true }
  },
  {
    path: '/yeasts',
    name: 'yeasts',
    component: require('components/modules/ingredients/Yeasts'),
    meta: { requiresAuth: true }
  },
  {
    path: '/miscs',
    name: 'miscs',
    component: require('components/modules/ingredients/Miscs'),
    meta: { requiresAuth: true }
  },
  {
    path: '/waters',
    name: 'waters',
    component: require('components/modules/ingredients/Waters'),
    meta: { requiresAuth: true }
  },
  {
    path: '/recetteslist',
    name: 'recetteslist',
    component: require('components/modules/recettes/RecettesList'),
    meta: { requiresAuth: true }
  }, /*
  {
    path: '/recette',
    name: 'recette',
    component: require('components/modules/recettes/Recette'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editrecette',
    name: 'editrecette',
    component: require('components/modules/recettes/EditRecette'),
    meta: { requiresAuth: true }
  }, */
  {
    path: '/test',
    name: 'test',
    component: require('components/modules/test/Test'),
    meta: { requiresAuth: true }
  },
  {
    path: '/style',
    name: 'style',
    component: require('components/modules/profils/Style'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fermentation',
    name: 'fermentation',
    component: require('components/modules/profils/Fermentation'),
    meta: { requiresAuth: true }
  },
  {
    path: '/carbonation',
    name: 'carbonation',
    component: require('components/modules/profils/Carbonation'),
    meta: { requiresAuth: true }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: require('components/modules/profils/Equipment'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mash',
    name: 'mash',
    component: require('components/modules/profils/MashList'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editrecettes',
    name: 'editrecettes',
    component: require('components/modules/recettes/EditRecette'),
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/acceuil',
    name: 'acceuil',
    component: require('components/modules/acceuil'),
    meta: { requiresAuth: false }
  },
  {
    path: '/success',
    name: 'success',
    component: require('components/modules/users/succes')
  },
  {
    path: '/login',
    name: 'login',
    component: require('components/modules/users/login')
  },
  {
    path: '/user',
    name: 'user',
    component: require('components/modules/users/User')
  },
  {
    path: '*',
    redirect: '/acceuil',
    meta: { requiresAuth: false }
  }
  ]
})
