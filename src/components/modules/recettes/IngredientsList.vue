<template>
  <div>
    <div v-for="(lists, type) in ingredientList" class="card" :key="type">
      <div class='card-header'>
        <p class='card-header-title'>{{type | capitalize}}</p>
        <add-ingredient class='card-header-icon' :type="type" @add="addIngredient"></add-ingredient>
      </div>

      <div class="card-content">
        <div class="columns is-multiline is-mobile">
          <item v-for="(ingredient, key) in lists"
            :itemData="ingredient"
            :key="key"
            :id="key"
            :type="type"
            class="column is-full">
            <div class="control is-expanded">
              <input class="input" type="text" v-model="ingredient.name" readonly>
            </div>
            <div class="control">
              <input class="input" type="text" v-model="ingredient.amount">
            </div>
            <div class="control" v-if="type === 'fermentable'">
              <div class="select">
                <select v-model="$config.weightUnitie">
                  <option v-for="option in unitList.weight" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-else-if="type === 'hop'">
              <div class="select">
                <select v-model="$config.hopUnitie">
                    <option v-for="option in unitList.weight" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-else-if="type === 'yeast'">
              <div class="select">
                <select v-model="$config.yeastUnitie">
                    <option v-for="option in unitList.yeast" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="control" v-if="type === 'hop'">
              <input class="input" type="text" v-model="ingredient.time">
            </div>
            <div class="control" v-if="type === 'hop'">
              <div class="select">
                <select v-model="$config.timeUnitie">
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
              <button class="button is-danger" @click="deleteIngredient(type, ingredient)"><i class="fa fa-trash-o"></i>
                <span class="icon is-small">
                  <icon :icon="['fas', 'trash']" />
                </span>
                <span class="desktop-only">Remove</span>
              </button>
            </div>
            <ingredient-detail :ingredient="ingredient" :notShow="['name', 'amount', 'time', 'use']" slot="content"></ingredient-detail>
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
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

export default {
  components: {
    Item,
    AddIngredient,
    VInput,
    VTextarea,
    IngredientDetail: () => import('components/ui/IngredientDetail')
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
