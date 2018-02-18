<template>
<item @press="press" :add="add">
    <div class="item-data">
      <div class="item-data-base">
        <div class="item-name">
          <input class="input" type="text" v-model="ingredient.name" readonly>
        </div>
        <div class="item-value">
          <input class="input" type="text"  v-model.number="amount">
        </div>
        <div class="item-unit">
          <div class="select">
            <select v-model="amountSelected">
              <option v-for="option in amountUnitie" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
        <div v-if="type === 'hop' || type === 'misc'" class="item-data-plus">
          <div class="item-value">
            <input class="input" type="text" v-model.number="time">
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
import _debounce from 'lodash/debounce'
import Utils from 'api/recettes/Utils'
import Hop from 'api/recettes/Hop'
import Misc from 'api/recettes/Misc'
import Item from 'components/ui/Item'

let isFunc = (func) => typeof func === 'function'
let isLiquid = (type, ingr) => ((type === 'yeast' || type === 'misc') && !ingr.amountIsWeight) || type === 'water'

export default {
  name: 'ingredientItem',

  components: {
    Item,
    IngredientDetail: () => import('components/ui/IngredientDetail')
  },

  props: {
    ingredient: Object,
    type: String,
    add: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      useSelect: this.getUseSelect(),
      timeSelected: this.$config.timeUnitie,
      amountSelected: this.getAmountSelected(),
      contentVisible: false
    }
  },

  computed: {
    amount: {
      get: function () {
        if (isFunc(this.ingredient.getAmount)) {
          return this.ingredient.getAmount(this.amountSelected)
        } else {
          if (isLiquid(this.type, this.ingredient)) {
            return Utils.convertTo(this.ingredient.amount + ' l', this.amountSelected, 3)
          } else {
            return Utils.convertTo(this.ingredient.amount + ' kg', this.amountSelected, 3)
          }
        }
      },
      set: _debounce(function (value) {
        if (isFunc(this.ingredient.setAmount)) {
          this.ingredient.setAmount(value, this.amountSelected)
        } else {
          if (isLiquid(this.type, this.ingredient)) {
            this.ingredient.amount = Utils.convertTo(value + ' ' + this.amountSelected, 'l', 3)
          } else {
            this.ingredient.amount = Utils.convertTo(value + ' ' + this.amountSelected, 'kg', 3)
            console.log(this.ingredient.amount)
          }
        }
      }, 1000)
    },
    time: {
      get: function () {
        if (isFunc(this.ingredient.getTime)) {
          return this.ingredient.getTime(this.timeSelected)
        } else {
          return this.ingredient.time
        }
      },
      set: _debounce(function (value) {
        if (isFunc(this.ingredient.setTime)) {
          this.ingredient.setTime(value, this.timeSelected)
        } else {
          this.ingredient.time = value
        }
      }, 1000)
    },
    amountUnitie () {
      if (this.type === 'yeast') return this.unitList.yeast
      else if ((this.type === 'misc' && this.ingredient.amountIsWeight === 'FALSE') || this.type === 'water') return this.unitList.vol
      else return this.unitList.weight
    }
  },

  methods: {
    getAmountSelected () {
      switch (this.type) {
        case 'fermentable':
          return this.$config.weightUnitie
        case 'hop':
          return this.$config.hopUnitie
        case 'yeast':
          if (this.ingredient.amountIsWeight === 'TRUE') return this.$config.hopUnitie
          else return this.$config.yeastUnitie
        case 'water':
          return this.$config.volUnitie
        case 'misc':
          if (this.ingredient.amountIsWeight === 'TRUE') return this.$config.hopUnitie
          else return this.$config.volUnitie
        default:
          return this.$config.weightUnitie
      }
    },
    getUseSelect () {
      if (this.type === 'hop') return Hop.getUseList()
      else if (this.type === 'misc') return Misc.getUseList()
    },
    press () {
      this.$emit('press', this.type, this.ingredient, this.amountSelected, this.timeSelected)
    }
  }
}
</script>
