<template>
<div class='is-clearfix'>
  <ingredient-item v-for="data in sortData" :key="data.id" :ingredient="data" :type="type" @press="deleteIngredient"></ingredient-item>
  <add-ingredient class='is-pulled-right' :type="type" @add="addIngredient"></add-ingredient>
</div>
</template>

<script>
import AddIngredient from 'components/modules/recettes/AddIngredient'
import IngredientItem from 'components/ui/ingredient/ingredientItem'
import _orderBy from 'lodash/orderBy'

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

  data () {
    var sortOrders = {}
    const data = {
      columns: ['amount', 'time', 'use'],
      sortKey: '',
      sortOrders: sortOrders // ,
      // sortData: null
    }
    data.columns.forEach(key => {
      sortOrders[key] = 1
    })
    return data
  },

  computed: {
    sortData () {
      if (this.type === 'hop') {
        return _orderBy(this.lists, ['time', 'use', 'amount'], ['desc', 'desc', 'desc'])
      } else if (this.type === 'yeast') {
        return _orderBy(this.lists, ['attenuation'], ['desc'])
      }
      return _orderBy(this.lists, ['amount'], ['desc'])
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

<style>

</style>
