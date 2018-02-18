<template>
  <tabs>
    <tab v-for="(lists, type) in ingredientList" :name="type | capitalize" :key="type">
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
    recipe: {},
    ingredientsData: Array
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      useSelect: Hop.getUseList()
    }
  },

  computed: {
    ingredientList () {
      return {
        fermentable: this.recipe.fermentables, // this.recipe.getIngredientList('fermentable')
        hop: this.recipe.hops, // this.recipe.getIngredientList('hop')
        yeast: this.recipe.yeasts, // this.recipe.getIngredientList('yeast')
        misc: this.recipe.miscs, // this.recipe.getIngredientList('misc')
        water: this.recipe.waters // this.recipe.getIngredientList('water')
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
