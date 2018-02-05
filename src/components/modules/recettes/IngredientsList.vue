<template>
  <tabs>
    <tab v-for="(lists, type) in ingredientList" class="box" :name="type | capitalize" :key="type">
      <ingredient-tab :type="type" :lists="lists" @add="addIngredient" @delete="deleteIngredient"></ingredient-tab>
    </tab>
  </tabs>
</template>

<script>
import Hop from 'api/recettes/Hop'
import Item from 'components/ui/Item'
import AddIngredient from 'components/modules/recettes/AddIngredient'
import IngredientTab from 'components/ui/ingredient/ingredientTab'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import {Tab, Tabs} from 'components/ui/Tabs'

export default {
  components: {
    IngredientTab,
    Item,
    AddIngredient,
    VInput,
    VTextarea,
    IngredientDetail: () => import('components/ui/IngredientDetail'),
    Tab,
    Tabs
  },

  props: {
    recepice: {},
    ingredientsData: Array
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      useSelect: Hop.getUseList()/* ,
      ingredientList: {
        fermentable: this.recepice.getIngredientList('fermentable'),
        hop: this.recepice.getIngredientList('hop'),
        yeast: this.recepice.getIngredientList('yeast'),
        misc: this.recepice.getIngredientList('misc'),
        water: this.recepice.getIngredientList('water')
      } */
    }
  },

  computed: {
    ingredientList () {
      return {
        fermentable: this.recepice.getIngredientList('fermentable'),
        hop: this.recepice.getIngredientList('hop'),
        yeast: this.recepice.getIngredientList('yeast'),
        misc: this.recepice.getIngredientList('misc'),
        water: this.recepice.getIngredientList('water'),
      }
    }
  },

  methods: {
    addIngredient (type, ingredient) {
      this.$emit('add', type, ingredient)
    },
    deleteIngredient (type, ingredient) {
      this.$emit('delete', type, ingredient)
    }
  }
}
</script>
