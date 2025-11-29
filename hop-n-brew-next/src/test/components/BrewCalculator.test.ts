import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BrewCalculator from '../../components/ui/BrewCalculator.vue'
import { BrewCalculator as BrewCalc } from '../../lib/brew-calculator'

// Mock des dépendances externes
vi.mock('../../lib/brew-calculator', () => {
  return {
    BrewCalculator: {
      calculateOriginalGravity: vi.fn().mockReturnValue(1.050),
      calculateFinalGravity: vi.fn().mockReturnValue(1.010),
      calculateABV: vi.fn().mockReturnValue(5.2),
      calculateIBU: vi.fn().mockReturnValue(35),
      calculateColor: vi.fn().mockReturnValue(12),
      calculateEfficiency: vi.fn().mockReturnValue(75),
      calculateCalories: vi.fn().mockReturnValue(180)
    }
  }
})

describe('BrewCalculator', () => {
  it('renders correctly', () => {
    const wrapper = mount(BrewCalculator)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h3.title.is-4').text()).toBe('Ingrédients')
    expect(wrapper.find('h3.title.is-4:nth-child(2)').text()).toBe('Résultats')
  })

  it('displays calculated values', async () => {
    const wrapper = mount(BrewCalculator)
    
    // Attendre que les calculs soient effectués
    await wrapper.vm.$nextTick()
    
    // Vérifier que les valeurs calculées sont affichées
    const results = wrapper.findAll('.brew-results .box')
    expect(results.length).toBe(6)
    
    // Vérifier les valeurs spécifiques
    expect(wrapper.find('.brew-results .box:first-child .title').text()).toBe('1.050')
    expect(wrapper.find('.brew-results .box:nth-child(2) .title').text()).toBe('1.010')
    expect(wrapper.find('.brew-results .box:nth-child(3) .title').text()).toBe('5.2%')
    expect(wrapper.find('.brew-results .box:nth-child(4) .title').text()).toBe('35')
    expect(wrapper.find('.brew-results .box:nth-child(5) .title').text()).toBe('12 SRM')
    expect(wrapper.find('.brew-results .box:last-child .title').text()).toBe('180')
  })

  it('calls BrewCalculator methods with correct parameters', async () => {
    const wrapper = mount(BrewCalculator)
    
    // Attendre que les calculs soient effectués
    await wrapper.vm.$nextTick()
    
    // Vérifier que les méthodes sont appelées avec les bons paramètres
    expect(BrewCalc.calculateOriginalGravity).toHaveBeenCalled()
    expect(BrewCalc.calculateFinalGravity).toHaveBeenCalledWith(1.050, 75)
    expect(BrewCalc.calculateABV).toHaveBeenCalledWith(1.050, 1.010)
    expect(BrewCalc.calculateIBU).toHaveBeenCalled()
    expect(BrewCalc.calculateColor).toHaveBeenCalled()
    expect(BrewCalc.calculateCalories).toHaveBeenCalledWith(1.050, 1.010)
  })

  it('handles addFermentable correctly', async () => {
    const wrapper = mount(BrewCalculator)
    const initialLength = wrapper.vm.recipe.fermentables.length
    
    // Simuler l'ajout d'un fermentable
    await wrapper.vm.addFermentable()
    
    // Vérifier que la liste a augmenté
    expect(wrapper.vm.recipe.fermentables.length).toBe(initialLength + 1)
    
    // Vérifier que le nouvel élément a les bonnes propriétés par défaut
    const newFermentable = wrapper.vm.recipe.fermentables[initialLength]
    expect(newFermentable).toEqual({
      name: '',
      weight: 0,
      yield: 0,
      color: 0
    })
  })

  it('handles addHop correctly', async () => {
    const wrapper = mount(BrewCalculator)
    const initialLength = wrapper.vm.recipe.hops.length
    
    // Simuler l'ajout d'un houblon
    await wrapper.vm.addHop()
    
    // Vérifier que la liste a augmenté
    expect(wrapper.vm.recipe.hops.length).toBe(initialLength + 1)
    
    // Vérifier que le nouvel élément a les bonnes propriétés par défaut
    const newHop = wrapper.vm.recipe.hops[initialLength]
    expect(newHop).toEqual({
      name: '',
      weight: 0,
      alphaAcid: 0,
      boilTime: 0
    })
  })
})