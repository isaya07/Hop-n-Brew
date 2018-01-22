import Vue from 'vue'
import Router from 'vue-router'
import { Menu } from 'components/Menu'
import Error404 from 'components/Error404'
// import lazyLoading from 'components/lazyLoading'

Vue.use(Router)

function generateRoute (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoute(item.children, routes)
    }
  }
  return routes
}

export default new Router({
  mode: 'history', // hash ou history ou abstract
  linkActiveClass: '',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'acceuil',
      component: () => import('components/modules/acceuil'),
      meta: { requiresAuth: false }
    },
    ...generateRoute(Menu),
    {
      path: '/edit/:name',
      name: 'edit',
      component: () => import('components/modules/recettes/EditRecette'),
      meta: { requiresAuth: true }
    },
    /* {
      path: '/success',
      name: 'success',
      component: () => import('components/modules/users/succes')
    }, */
    {
      path: '/login',
      name: 'login',
      component: () => import('components/modules/users/login')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('components/modules/users/signup')
    },
    /* {
      path: '/user',
      name: 'user',
      component: () => import('components/modules/users/User')
    }, */
    {
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
