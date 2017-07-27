<template>
  <div class='grid'>
    <div class='col is-1-2'>
      <h5>fermentables</h5>
    </div>
    <div class='col is-1-2'>
      <add-ingredient :type="'fermentable'" @add="addIngredient"></add-ingredient>
    </div>
    <ingredient-item v-for="fermentable in fermentableList"
      :ingredientData="fermentable"
      :key="fermentable.name"
      :type="'fermentable'"
      @content-visible="toggleContent"
      class="col is-full">
    </ingredient-item>
    <div class='col is-1-2'>
      <h5>Hops</h5>
    </div>
    <div class='col is-1-2'>
      <add-ingredient :type="'hop'" @add="addIngredient"></add-ingredient>
    </div>
    <ingredient-item v-for="hop in hopList"
      :ingredientData="hop"
      :key="hop.name"
      :type="'hop'"
      @content-visible="toggleContent"
      class="col is-full">
    </ingredient-item>
    <div class='col is-1-2'>
      <h5>Yeast</h5>
    </div>
    <div class='col is-1-2'>
      <add-ingredient :type="'yeast'" @add="addIngredient"></add-ingredient>
    </div>
    <ingredient-item v-for="yeast in yeastList"
      :ingredientData="yeast"
      :key="yeast.name"
      :type="'yeast'"
      @content-visible="toggleContent"
      class="col is-full">
    </ingredient-item>
  </div>
</template>

<script>
import Fermentable from 'api/recettes/Fermentable'
import Hop from 'api/recettes/Hop'
import Utils from 'api/recettes/Utils'
import IngredientItem from './IngredientItem'
import AddIngredient from 'components/modules/test/AddIngredient'

export default {
  components: {
    IngredientItem,
    AddIngredient
  },

  props: {
    recepice: {},
    ingredientsData: Array,
    editableValue: ''
  },

  data () {
    let sortOrders = {}
    const data = {
      sortKey: '',
      sortOrders: sortOrders,
      colName: ['number', 'type', 'name', 'quantitie', 'percent', 'inventory', 'price']
    }
    data.colName.forEach((key) => {
      sortOrders[key] = 1
    })
    return data
  },

  computed: {
    fermentableList () {
      return this.recepice.fermentables
    },
    hopList () {
      return this.recepice.hops
    },
    yeastList () {
      return this.recepice.yeasts
    },
    filteredData () {
      var sortKey = this.sortKey
      var order = this.sortOrders[sortKey] || 1
      if (this.ingredientsData !== undefined) {
        var data = this.ingredientsData
        if (sortKey) {
          data = data.slice().sort((a, b) => {
            a = a[sortKey]
            b = b[sortKey]
            if (/^[0-9.]+$/.test(a) && /^[0-9.]+$/.test(b)) {
              a = parseFloat(a)
              b = parseFloat(b)
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        let weight = []
        let totalWeight = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].displayAmount !== null) {
            data[i].quantitie = data[i].displayAmount
          } else {
            data[i].quantitie = data[i].amount.toString()
          }
          data[i].number = i
          if (data[i] instanceof Fermentable) {
            let fermWeight = Utils.extarctDisplayValue(data[i].quantitie)
            totalWeight += fermWeight.weight
            console.log(totalWeight)
            weight.push({id: i, weight: fermWeight.weight})
          }
          if (data[i] instanceof Hop) {
            data[i].percent = data[i].bitterness(this.recepice.ibuMethod, this.recepice.estOg, this.recepice.batchSize)
          }
        }
        for (let i = 0; i < weight.length; i++) {
          // weight[i].perc = weight[i].weight * 100 / totalWeight
          data[weight[i].id].percent = Math.round(weight[i].weight * 100 / totalWeight)
        }
        return data
      } else {
        return null
      }
    }
  },

  filters: {
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
  },

  methods: {
    editable (e, field, data) {
      if (field === this.editableValue) {
        var that = this
        that.$editable(e, 'input is-primary is-small', function (value) {
          that.$emit('quantitieUp', data, value)
        })
      }
    },
    select (field, data) {
      console.log(field + ' => ' + data)
    },
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    toggleContent (comp) {
      let items = this.fermentableList.concat(this.hopList).concat(this.yeastList)
      // let items = this.$refs.modalIngredients
      for (let i = 0; i < items.length; i++) {
        let tempItem = items[i]
        if (tempItem !== comp && tempItem.contentVisible) tempItem.contentVisible = false
      }
    },
    addIngredient (type, ingredient) {
      this.$emit('add', type, ingredient)
    }
  }
}
</script>
