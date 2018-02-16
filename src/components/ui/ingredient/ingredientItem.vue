<template>
<item @delete="deleteIngredient">
    <div class="item-data">
      <div class="item-data-base">
        <div class="item-name">
          <input class="input" type="text" v-model="ingredient.name" readonly>
        </div>
        <div class="item-value">
          <input v-debounce="1000" class="input" type="text" v-model.number.lazy="amount">
        </div>
        <div class="item-unit">
          <div v-if="type === 'fermentable'" class="select">
            <select v-model="weightSelected">
              <option v-for="option in unitList.weight" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div v-else-if="type === 'hop'" class="select">
            <select v-model="hopSelected">
              <option v-for="option in unitList.weight" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div v-else-if="type === 'yeast'" class="select">
            <select v-model="yeastSelected">
              <option v-for="option in unitList.yeast" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
        <div v-if="type === 'hop'" class="item-data-plus">
          <div class="item-value">
            <input v-debounce="1000" class="input" type="text" v-model.number.lazy="time">
          </div>
          <div class="item-unit">
            <div class="select">
              <select v-model="timeSelected">
                <option v-for="option in unitList.time" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <div class="item-unit">
            <div class="select">
              <select v-model="ingredient.use">
                <option v-for="option in useSelect" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
    </div>
    <ingredient-detail slot="content" :ingredient="ingredient" :notShow="['name', 'amount', 'time', 'use']"></ingredient-detail>
</item>
</template>

<script>
import Hop from 'api/recettes/Hop'
import Item from 'components/ui/Item'
// import VInput from 'components/ui/base/Input'
// import VTextarea from 'components/ui/base/Textarea'

export default {
  name: 'ingredientItem',

  components: {
    Item,
    IngredientDetail: () => import('components/ui/IngredientDetail')
  },

  props: {
    ingredient: Object,
    type: String
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      useSelect: Hop.getUseList(),
      weightSelected: this.$config.weightUnitie,
      hopSelected: this.$config.hopUnitie,
      yeastSelected: this.$config.yeastUnitie,
      timeSelected: this.$config.timeUnitie,
      contentVisible: false
    }
  },

  computed: {
    amount: {
      get: function () {
        return this.ingredient.getAmount(this.ingredientUnitie)
      },
      set: function (value) {
        this.ingredient.setAmount(value, this.ingredientUnitie)
      }
    },
    time: {
      get: function () {
        return this.ingredient.getTime(this.timeSelected)
      },
      set: function (value) {
        this.ingredient.setTime(value, this.timeSelected)
      }
    },
    ingredientUnitie () {
      switch (this.type) {
        case 'fermentable':
          return this.weightSelected
        case 'hop':
          return this.hopSelected
        case 'yeast':
          return this.yeastSelected
        default:
          return this.$config.weightUnitie
      }
    }
  },

  methods: {
    deleteIngredient () {
      this.$emit('delete', this.type, this.ingredient)
    }
  }
}
</script>
