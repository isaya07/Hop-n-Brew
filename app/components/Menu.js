const Menu =
  [
    {
      name: 'Recette',
      path: 'recetteslist',
      meta: {
        // icon: 'home',
        expanded: false,
        link: 'modules/recettes/RecettesList.vue'
      }
    },
    {
      name: 'Ingrédients',
      path: '',
      meta: {
        // icon: 'fa-bar-chart-o',
        expanded: false
        // link: 'modules/ingredient.vue'
      },
      // component: lazyLoading('charts', true),

      children: [
        {
          name: 'Fermentables',
          path: 'fermentables',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/ingredients/Fermentables.vue'
          }
        },
        {
          name: 'Yeasts',
          path: 'yeasts',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/ingredients/Yeasts.vue'
          }
        },
        {
          name: 'Hops',
          path: 'hops',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/ingredients/Hops.vue'
          }
        },
        {
          name: 'Miscs',
          path: 'miscs',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/ingredients/Miscs.vue'
          }
        },
        {
          name: 'Waters',
          path: 'waters',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/ingredients/Waters.vue'
          }
        }
      ]
    },
    {
      name: 'Profils',
      path: '',
      meta: {
        icon: 'home',
        expanded: false// ,
        // link: 'modules/test/Test.vue'
      },
      children: [
        {
          name: 'Style',
          path: 'style',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/profils/Style.vue'
          }
        },
        {
          name: 'Fermentation',
          path: 'fermentation',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/profils/Fermentation.vue'
          }
        },
        {
          name: 'Carbonation',
          path: 'carbonation',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/profils/Carbonation.vue'
          }
        },
        {
          name: 'Equipment',
          path: 'equipment',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/profils/Equipment.vue'
          }
        },
        {
          name: 'Mash',
          path: 'mash',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/profils/MashList.vue'
          }
        }
      ]
    },
    {
      name: 'Test',
      path: '',
      meta: {
        icon: 'home',
        expanded: false,
        link: 'modules/test/Test.vue'
      },
      // component: lazyLoading('charts', true),

      children: [
        {
          name: 'Test',
          path: 'test',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/test/Test.vue'
          }
        }
      ]
    }
  ]

export { Menu }
