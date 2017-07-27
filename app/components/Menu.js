const Menu =
  [
    {
      name: 'Recette',
      path: 'recetteslist',
      meta: {
        // icon: 'home',
        expanded: false,
        link: 'modules/recettes/RecettesList.vue'
      },
      // component: lazyLoading('charts', true),

      children: [
        {
          name: 'Recette',
          path: 'recetteslist',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/recettes/RecettesList.vue'
          }
        }
      ]
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
        },
        {
          name: 'Style',
          path: 'style',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/test/Style.vue'
          }
        },
        {
          name: 'EditRecettes',
          path: 'editrecettes',
          // component: lazyLoading('charts/Chartist'),
          meta: {
            link: 'modules/test/EditRecette.vue'
          }
        }
      ]
    }
  ]

export { Menu }
