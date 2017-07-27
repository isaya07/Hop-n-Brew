<template>
  <div class="item center">
    <!-- <div class="item"> -->
      <div class="item-inline">
        <button class="btn first" @click="toggleContent">
          <span class="right-arrow" :class="contentVisible ? 'close' : ''"></span>
        </button>
        <input class="is-flex-grow-2" type="text" v-model="ingredientData.name" readonly>
        <input class="is-flex-grow-1" type="text" v-model="ingredientData.amount">
        <div class="select is-flex-grow-4">
          <select v-model="weightUnitie">
            <option v-for="option in weightUnitieSelect" selected="selectedWeight">
              {{ option }}
            </option>
          </select>
        </div>
        <input v-if="type === 'hop'" class="is-flex-grow-1" type="text" v-model="ingredientData.time">
        <div class="select is-flex-grow-4" v-if="type === 'hop'">
          <select v-model="timeUnitie">
            <option v-for="option in timeUnitieSelect" selected="selectedTime">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="select is-flex-grow-3" v-if="type === 'hop'">
          <select v-model="ingredientData.use">
            <option v-for="option in useSelect" selected="selectedUse">
              {{ option }}
            </option>
          </select>
        </div>
        <button class="btn last" @click="deleteIngredient"><i class="fa fa-trash-o"></i><span class="desktop-only">Remove</span></button>
      </div>

      <!-- <div v-show="error.has" class="item-inline-error">
        <span class="pure-form-message is-alert">{{ error.mess }}</span>
      </div> -->

      <transition name="fade">
        <div v-show="contentVisible" class="item-content grid-2 medium-1 small-1">
          <div v-for="(value, key) in filteredIngredientData" class="item-data col middle grid-2" :class="key === 'notes' ? 'item-last is-full' : ''">
            <div :class="key === 'notes' ? 'col is-1-6' : 'col is-1-3'">
              <label>{{ key | capitalize }}:</label>
            </div>
            <div :class="key === 'notes' ? 'col is-5-6' : 'col is-2-3'">
              <textarea v-if="key === 'notes'" :value="value" type="text" disabled></textarea>
              <input v-else-if="key === 'alpha'" type="text" :value="value">
              <input v-else type="text" :value="value" disabled>
            </div>
          </div>
        </div>
      </transition>
    </div>
  <!-- </div> -->
</template>

<script>
import Hop from 'api/recettes/Hop'

export default {
  name: 'ingredient-item',

  props: {
    ingredientData: Object,
    type: ''
  },

  data () {
    return {
      contentVisible: false,
      timeUnitie: 'min'
    }
  },

  computed: {
    filteredIngredientData () {
      let data = {}
      for (let key in this.ingredientData) {
        if (!/list/i.test(key)) {
          data[key] = this.ingredientData[key]
        }
      }
      return data
    },
    weightUnitie () {
      switch (this.type) {
        case 'fermentable':
          return 'kg'
        case 'hop':
          return 'g'
        default:
          return 'kg'
      }
    },
    weightUnitieSelect () {
      return ['kg', 'g']
    },
    timeUnitieSelect () {
      return ['min', 'hour', 'day', 'week']
    },
    useSelect () {
      return Hop.getUseList()
    }
  },

  filters: {
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
  },

  methods: {
    toggleContent () {
      this.contentVisible = !this.contentVisible
      if (this.contentVisible) this.$emit('content-visible', this)
    },
    deleteIngredient () {
      this.$emit('delete-ingredient', this)
    }
  }
}
</script>

<style lang="scss">
@import './../../../assets/scss/settings';
@import './../../../assets/scss/item';
</style>
