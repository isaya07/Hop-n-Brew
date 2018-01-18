<template>
  <div>
    <div v-for="(lists, type) in ingredientList"
      class="grid"
      :key="type">
      <div class='col is-full'>
        <div class="grid">
          <h5 class='col'>{{type | capitalize}}</h5>
          <add-ingredient class='col' :type="type" @add="addIngredient"></add-ingredient>
        </div>
      </div>

      <div class="col is-full">
        <div class="grid card invert">
          <item v-for="(ingredient, key) in lists"
            :itemData="ingredient"
            :key="key"
            :id="key"
            :type="type"
            class="col is-full">
            <input class="is-flex-grow-2" type="text" v-model="ingredient.name" readonly>
            <input class="is-flex-grow-1" type="text" v-model="ingredient.amount">
            <div class="select is-flex-grow-4">
              <select v-if="type === 'fermentable'" v-model="$config.weightUnitie">
                <option v-for="option in unitList.weight" :key="option">
                  {{ option }}
                </option>
              </select>
              <select v-else-if="type === 'hop'" v-model="$config.hopUnitie">
                  <option v-for="option in unitList.weight" :key="option">
                  {{ option }}
                </option>
              </select>
              <select v-else-if="type === 'yeast'" v-model="$config.yeastUnitie">
                  <option v-for="option in unitList.yeast" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <input v-if="type === 'hop'" class="is-flex-grow-1" type="text" v-model="ingredient.time">
            <div class="select is-flex-grow-4" v-if="type === 'hop'">
              <select v-model="$config.timeUnitie">
                <option v-for="option in unitList.time" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="select is-flex-grow-3" v-if="type === 'hop'">
              <select v-model="ingredient.use">
                <option v-for="option in useSelect" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <button class="btn last" @click="deleteIngredient(type, ingredient)"><i class="fa fa-trash-o"></i><span class="desktop-only">Remove</span></button>
            <div v-for="(value, key) in ingredient"
              :key="key"
              class="item-data col middle grid-2"
              :class="key === 'notes' ? 'item-last is-full' : ''"
              slot="content">
              <div :class="key === 'notes' ? 'col is-1-6' : 'col is-1-3'">
                <label>{{ key | capitalize }}:</label>
              </div>
              <div :class="key === 'notes' ? 'col is-5-6' : 'col is-2-3'">
                <textarea v-if="key === 'notes'" :value="value" type="text" disabled></textarea>
                <input v-else-if="key === 'alpha'" type="text" :value="value">
                <input v-else type="text" :value="value" disabled>
              </div>
            </div>
          </item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hop from 'api/recettes/Hop'
import Item from 'components/ui/Item'
import AddIngredient from 'components/modules/recettes/AddIngredient'

export default {
  components: {
    Item,
    AddIngredient
  },

  props: {
    recepice: {},
    ingredientsData: Array
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList()
    }
  },

  computed: {
    ingredientList () {
      return {
        fermentable: this.recepice.fermentables,
        hop: this.recepice.hops,
        yeast: this.recepice.yeasts,
        misc: this.recepice.miscs,
        water: this.recepice.waters
      }
    },
    useSelect () {
      return Hop.getUseList()
    }
  },

  methods: {
    addIngredient (type, ingredient) {
      this.$emit('add', type, ingredient)
    },
    deleteIngredient (type, ingredient) {
      console.log(type, ingredient)
      this.$emit('delete', type, ingredient)
    }
  }
}
</script>
