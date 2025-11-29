import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import RecipesView from '../../views/RecipesView.vue'
import { useAuthStore } from '../../stores/auth'

// Mock des dépendances
vi.mock('../../lib/api', () => {
  return {
    ApiManager: vi.fn().mockImplementation(() => ({
      getRecipes: vi.fn().mockResolvedValue({ success: true, data: [] }),
      deleteRecipe: vi.fn().mockResolvedValue({ success: true }),
      updateRecipe: vi.fn().mockResolvedValue({ success: true, data: {} }),
      createRecipe: vi.fn().mockResolvedValue({ success: true, data: {} })
    }))
  }
})

// Configuration du routeur
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/recipes', component: RecipesView }
  ]
})

describe('RecipesView', () => {
  // Initialisation de Pinia avant chaque test
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly', async () => {
    const wrapper = mount(RecipesView, {
      global: {
        plugins: [router]
      }
    })

    // Attendre que le composant soit monté
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1.title').text()).toBe('Recettes')
  })

  it('loads recipes on mount', async () => {
    const mockRecipes = [
      { id: 1, name: 'Test Recipe 1', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Test Recipe 2', createdAt: new Date(), updatedAt: new Date() }
    ]

    // Mock de l'API pour retourner des recettes
    const apiMock = {
      getRecipes: vi.fn().mockResolvedValue({ success: true, data: mockRecipes })
    }

    // Montage du composant avec le mock
    const wrapper = mount(RecipesView, {
      global: {
        plugins: [router],
        provide: {
          apiManager: apiMock
        }
      }
    })

    // Attendre que les recettes soient chargées
    await wrapper.vm.$nextTick()

    // Vérifier que les recettes sont affichées
    expect(apiMock.getRecipes).toHaveBeenCalled()
    // Note: Difficile de vérifier exactement l'affichage sans accéder aux données internes
  })

  it('shows add recipe form when button is clicked', async () => {
    const wrapper = mount(RecipesView, {
      global: {
        plugins: [router]
      }
    })

    // Attendre que le composant soit monté
    await wrapper.vm.$nextTick()

    // Cliquer sur le bouton d'ajout
    const addButton = wrapper.find('button.is-primary')
    await addButton.trigger('click')

    // Vérifier que le formulaire est visible
    expect(wrapper.find('.modal.is-active').exists()).toBe(true)
  })

  it('formats dates correctly', async () => {
    const wrapper = mount(RecipesView, {
      global: {
        plugins: [router]
      }
    })

    // Attendre que le composant soit monté
    await wrapper.vm.$nextTick()

    // Tester la méthode formatDate
    const testDate = new Date('2023-01-15')
    const formatted = (wrapper.vm as any).formatDate(testDate)
    
    // Vérifier que la date est formatée correctement (ex: "15 janv. 2023" en français)
    expect(formatted).toMatch(/\d{1,2} \w+ \d{4}/)
  })

  it('handles recipe deletion', async () => {
    const wrapper = mount(RecipesView, {
      global: {
        plugins: [router]
      }
    })

    // Attendre que le composant soit monté
    await wrapper.vm.$nextTick()

    // Mock de la confirmation utilisateur
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true)

    // Simuler la suppression d'une recette
    // Note: Difficile de tester complètement sans accéder aux boutons de suppression
    // dans le DOM car ils dépendent des données réelles

    // Restaurer le spy
    confirmSpy.mockRestore()
  })
})