<template>
<div class='is-clearfix'>
  <ingredient-item v-for="data in lists" :key="data.id" :ingredient="data" :type="type" @delete="deleteIngredient"></ingredient-item>
  <add-ingredient class='is-pulled-right' :type="type" @add="addIngredient"></add-ingredient>
</div>
</template>

<script>
import AddIngredient from 'components/modules/recettes/AddIngredient'
import IngredientItem from 'components/ui/ingredient/ingredientItem'

export default {
  name: 'ingredientTab',

  components: {
    AddIngredient,
    IngredientItem
  },

  props: {
    lists: Array,
    type: String
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

<style>

</style>
