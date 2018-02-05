// import lazyLoading from './lazyLoading'

const Menu =
  [
    {
      name: 'recettes',
      path: '/recettes',
      component: () => import('components/modules/recettes/RecettesList'),
      meta: {
        // icon: 'home',
        expanded: false,
        requiresAuth: true
      }
    },
    {
      name: 'ingrédients',
      path: '',
      meta: {
        // icon: 'fa-bar-chart-o',
        expanded: false
      },
      children: [
        {
          name: 'fermentables',
          path: '/fermentables',
          component: () => import('components/modules/ingredients/Fermentables'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'yeasts',
          path: '/yeasts',
          component: () => import('components/modules/ingredients/Yeasts'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'hops',
          path: '/hops',
          component: () => import('components/modules/ingredients/Hops'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'miscs',
          path: '/miscs',
          component: () => import('components/modules/ingredients/Miscs'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'waters',
          path: '/waters',
          component: () => import('components/modules/ingredients/Waters'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      name: 'profils',
      path: '',
      meta: {
        // icon: 'home',
        expanded: false
      },
      children: [
        {
          name: 'style',
          path: '/style',
          component: () => import('components/modules/profils/Style'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'fermentation',
          path: '/fermentation',
          component: () => import('components/modules/profils/Fermentation'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'carbonation',
          path: '/carbonation',
          component: () => import('components/modules/profils/Carbonation'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'equipment',
          path: '/equipment',
          component: () => import('components/modules/profils/Equipment'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'mash',
          path: '/mash',
          component: () => import('components/modules/profils/MashList'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      name: 'test',
      path: '',
      meta: {
        icon: 'home',
        expanded: false
      },
      children: [
        {
          name: 'test',
          path: 'test',
          component: () => import('components/modules/test/Test'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]

export { Menu }
