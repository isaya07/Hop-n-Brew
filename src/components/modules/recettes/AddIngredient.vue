<template>
  <div>
    <v-button @click="showModal()" :class="'is-info'">
      <span class="icon is-small">
        <icon :icon="['fas', 'plus']" />
      </span>
      <span>
        Add
      </span>
    </v-button>
    <modal
      v-if="modalVisible"
      :title="modalTitle"
      :cancelText='""'
      :okText='""'
      :size='"large"'
      @close="hideModal()"
      @cancel="hideModal()"
      @ok="hideModal()">
      <div slot="header" class="columns is-multiline is-mobile is-centered">
        <div class="column is-6">
          <v-search-input :value="filterKey" @input="searchPress"></v-search-input>
        </div>
        <div class="column is-6">
          <label>
            <input type="checkbox" v-model="instock">In stock
          </label>
        </div>
        <div v-show="error.has" class="center">
          <p class="help is-danger">{{ error.mess }}</p>
        </div>
      </div>
      <div v-if="modalIngredients" class="columns is-multiline is-mobile">
        <ingredient-item v-for="data in filteredData" :key="data.id" :ingredient="data" :type="type" :add="true" @press="addIngredient"></ingredient-item>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-narrow">
          <loader :loading="loading"></loader>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import Modal from 'components/layout/Modal'
import Loader from 'components/ui/Loader'
import Item from 'components/ui//Item'
import Hop from 'api/recettes/Hop'
import VButton from 'components/ui/base/Button'
import VSearchInput from 'components/ui/base/SearchInput'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import IngredientItem from 'components/ui/ingredient/ingredientItem'
import Utils from 'api/recettes/Utils'

export default {
  name: 'add-ingredient',

  components: {
    Modal,
    Item,
    Loader,
    VButton,
    VSearchInput,
    VInput,
    VTextarea,
    IngredientItem,
    IngredientDetail: () => import('components/ui/IngredientDetail')
  },

  props: {
    type: ''
  },

  data () {
    return {
      loading: true,
      modalVisible: false,
      modalIngredients: [],
      filterKey: '',
      instock: false,
      database: this.type + 's',
      unitList: this.$config.getUnitiesList(),
      useSelect: Hop.getUseList(),
      error: {
        has: false,
        mess: ''
      }
    }
  },

  computed: {
    modalTitle () {
      return 'Select a ' + this.type
    },
    filteredData () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      if (this.modalIngredients !== undefined) {
        var data = this.modalIngredients
        if (filterKey) {
          let rowParam = ['name', 'laboratory', 'productId']
          data = data.filter(row => {
            let ret = false
            for (let i = 0; i < rowParam.length; i++) {
              ret = String(row[rowParam[i]]).toLowerCase().indexOf(filterKey) > -1
              if (ret) return ret
            }
            return ret
          })
        }
        if (this.instock) {
          data = data.filter(row => {
            return row.inventory > 0
          })
        }
        return data
      } else {
        return null
      }
    }
  },

  methods: {
    searchPress: _debounce(function (value) {
      this.filterKey = value
    }, 1000),
    showModal () {
      this.loading = true
      this.modalVisible = true
      this.$nextTick(function () {
        this.$bind(this.modalIngredients, this.$db.collection(this.database).orderBy('name') /* .limit(25) */)
          .then(result => {
            this.modalIngredients = result
            // this.lastVisible = this.modalIngredients[this.modalIngredients.length-1].id
            this.loading = false
            /* document.querySelector('.modal-card-body').addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
          }) */
          })
          .catch(err => {
            console.log(err)
            this.$store.commit('setMessage', { type: 'error', text: 'Fetch data failed: ' + err })
            this.loading = false
          })
      })
    },
    hideModal () {
      this.modalVisible = false
      this.modalIngredients = []
    },
    addIngredient (type, ingredient, amountUnitie, timeUnitie) {
      if (ingredient.amount === 0 || ingredient.amount === undefined) {
        this.error.has = true
        this.error.mess = 'Please enter weight value'
      } else if (type === 'hop' && ingredient.time === undefined) {
        this.error.has = true
        this.error.mess = 'Please enter time value'
      } else {
        if (((type === 'yeast' || type === 'misc') && ingredient.amountIsWeight === 'FALSE') || type === 'water') {
          ingredient.displayAmount = Utils.convertTo(ingredient.amount + ' l', amountUnitie, 3) + ' ' + amountUnitie
        } else {
          ingredient.displayAmount = Utils.convertTo(ingredient.amount + ' kg', amountUnitie, 3) + ' ' + amountUnitie
        }
        if (type === 'hop' || type === 'misc') {
          ingredient.displayTime = ingredient.time + ' ' + timeUnitie
          ingredient.time = Utils.convertTo(ingredient.time + ' ' + timeUnitie, 'min', 3)
        }
        this.$emit('add', type, ingredient)
      }
    }
  }
}
</script>
