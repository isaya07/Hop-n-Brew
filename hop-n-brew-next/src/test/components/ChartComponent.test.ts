import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ChartComponent from '../../components/ui/ChartComponent.vue'

// Mock de Chart.js
vi.mock('chart.js', async () => {
  const actual = await vi.importActual('chart.js')
  return {
    ...actual,
    Chart: vi.fn().mockImplementation(() => ({
      destroy: vi.fn(),
      update: vi.fn(),
      data: {},
      options: {}
    })),
    registerables: []
  }
})

describe('ChartComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(ChartComponent, {
      props: {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{
            label: 'Test Data',
            data: [10, 20, 30]
          }]
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('sets default props correctly', () => {
    const wrapper = mount(ChartComponent)
    
    expect(wrapper.props().type).toBe('line')
    expect(wrapper.props().height).toBe(400)
    expect(wrapper.props().width).toBeUndefined()
  })

  it('applies height and width styles correctly', () => {
    const wrapper = mount(ChartComponent, {
      props: {
        height: 300,
        width: 500
      }
    })
    
    const container = wrapper.find('.chart-container')
    expect(container.element.style.height).toBe('300px')
    expect(container.element.style.width).toBe('500px')
  })

  it('uses 100% width when width prop is not provided', () => {
    const wrapper = mount(ChartComponent, {
      props: {
        height: 300
      }
    })
    
    const container = wrapper.find('.chart-container')
    expect(container.element.style.width).toBe('100%')
  })
})