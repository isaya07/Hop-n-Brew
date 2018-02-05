<template>
          <item
            :itemData="ingredient"
            :type="type"
            class="column is-full">
            <div class="control is-expanded">
              <input class="input" type="text" v-model="ingredient.name" readonly>
            </div>
            <div class="control">
              <input class="input" type="text" v-model.number="ingredient.amount">
            </div>
            <div class="control" v-if="type === 'fermentable'">
              <div class="select">
                <select v-model="weightSelected">
                  <option v-for="option in unitList.weight" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-else-if="type === 'hop'">
              <div class="select">
                <select v-model="hopSelected">
                    <option v-for="option in unitList.weight" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-else-if="type === 'yeast'">
              <div class="select">
                <select v-model="yeastSelected">
                    <option v-for="option in unitList.yeast" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-if="type === 'hop'">
              <input class="input" type="text" v-model.number="ingredient.time">
            </div>
            <div class="control" v-if="type === 'hop'">
              <div class="select">
                <select v-model="timeSelected">
                  <option v-for="option in unitList.time" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-if="type === 'hop'">
              <div class="select">
                <select v-model="ingredient.use">
                  <option v-for="option in useSelect" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control">
              <button class="button is-danger" @click="deleteIngredient(type, ingredient)">
                <span class="icon is-small">
                  <icon :icon="['fas', 'trash']" />
                </span>
                <span class="is-hidden-touch">Remove</span>
              </button>
            </div>
            <ingredient-detail :ingredient="ingredient" :notShow="['name', 'amount', 'time', 'use']" slot="content"></ingredient-detail>
          </item>
</template>

<script>
import Hop from 'api/recettes/Hop'
import Item from 'components/ui/Item'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

export default {
  name: 'ingredientItem',

  components: {
    Item,
    IngredientDetail: () => import('components/ui/IngredientDetail'),
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
      timeSelected: this.$config.timeUnitie
    }
  },

  methods: {
    deleteIngredient (type, ingredient) {
      this.$emit('delete', type, ingredient)
    }
  }
}
</script>
