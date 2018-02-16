// import lazyLoading from './lazyLoading'

const Menu =
  [
    {
      name: 'Recettes',
      path: '/recettes',
      component: () => import('components/modules/recettes/RecettesList'),
      meta: {
        // icon: 'home',
        expanded: false,
        requiresAuth: true
      }
    },
    {
      name: 'Ingrédients',
      path: '',
      meta: {
        // icon: 'fa-bar-chart-o',
        expanded: false
      },
      children: [
        {
          name: 'Fermentables',
          path: '/fermentables',
          component: () => import('components/modules/ingredients/Fermentables'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Yeasts',
          path: '/yeasts',
          component: () => import('components/modules/ingredients/Yeasts'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Hops',
          path: '/hops',
          component: () => import('components/modules/ingredients/Hops'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Miscs',
          path: '/miscs',
          component: () => import('components/modules/ingredients/Miscs'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Waters',
          path: '/waters',
          component: () => import('components/modules/ingredients/Waters'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      name: 'Profils',
      path: '',
      meta: {
        // icon: 'home',
        expanded: false
      },
      children: [
        {
          name: 'Style',
          path: '/style',
          component: () => import('components/modules/profils/Style'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Fermentation',
          path: '/fermentation',
          component: () => import('components/modules/profils/Fermentation'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Carbonation',
          path: '/carbonation',
          component: () => import('components/modules/profils/Carbonation'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Equipment',
          path: '/equipment',
          component: () => import('components/modules/profils/Equipment'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Mash',
          path: '/mash',
          component: () => import('components/modules/profils/MashList'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      name: 'Test',
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
