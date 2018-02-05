<template>
<div class='columns is-multiline is-mobile'>
  <div class="column"></div>
  <div class="column is-narrow">
    <add-ingredient class='' :type="type" @add="addIngredient"></add-ingredient>
  </div>
  <ingredient-item v-for="data in lists" :key="data.id" :ingredient="data" :type="type" @delete="deleteIngredient"></ingredient-item>
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
