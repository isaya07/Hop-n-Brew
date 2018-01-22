<template>
  <div>
    <my-button @click="showModal()">
      <span class="icon is-small">
        <icon :icon="['fas', 'plus']" />
      </span>
      <span>
        Add
      </span>
    </my-button>
    <modal
      v-if="modalVisible"
      :title="modalTitle"
      :cancelText='""'
      :okText='""'
      :size='"large"'
      @close="hideModal()"
      @cancel="hideModal()"
      @ok="hideModal()">
      <div slot="header" class="columns">
        <div class="column is-6">
          <my-search v-model="filterKey"></my-search>
        </div>
        <div class="column">
          <label>
            <input type="checkbox" v-model="instock">In stock
          </label>
        </div>
        <loader :loading="loading"></loader>
        <div v-show="error.has" class="item-inline-error center">
          <span class="form-message is-alert">{{ error.mess }}</span>
        </div>
      </div>
      <div v-if="modalIngredients" class="columns is-multiline is-mobile">
        <item v-for="(ingredient, key) in filteredData"
          :key="key"
          :id="key"
          class="column is-full">
          <div class="control is-expanded">
            <input class="input" type="text" v-model="ingredient.name" readonly>
          </div>
          <div class="control">
            <input class="input" type="text" v-model="ingredient.amount">
          </div>
          <div class="control" v-if="type !== 'yeast'">
            <span class="select">
              <select v-model="$config.weightUnitie">
                <option v-for="option in unitList.weight" selected="selectedWeight" :key="option">
                  {{ option }}
                </option>
              </select>
            </span>
          </div>
          <div class="control" v-else>
            <span class="select">
              <select v-model="$config.yeastUnitie">
                <option v-for="option in unitList.yeast" selected="selectedWeight" :key="option">
                  {{ option }}
                </option>
              </select>
            </span>
          </div>
          <div class="control" v-if="type === 'hop'">
            <input class="input" type="text" v-model="ingredient.time">
          </div>
          <div class="control" v-if="type === 'hop'">
            <span class="select">
              <select v-model="$config.timeUnitie">
                <option v-for="option in unitList.time" selected="selectedTime" :key="option">
                  {{ option }}
                </option>
              </select>
            </span>
          </div>
          <div class="control" v-if="type === 'hop'">
            <span class="select">
              <select v-model="ingredient.use">
                <option v-for="option in useSelect" selected="selectedUse" :key="option">
                  {{ option }}
                </option>
              </select>
            </span>
          </div>
          <div class="control">
           <button class="button" @click="addIngredient(ingredient)">Add</button>
          </div>
          <ingredient-detail :ingredient="ingredient" slot="content"></ingredient-detail>
        </item>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from 'components/layout/Modal'
import Loader from 'components/ui/Loader'
import Item from 'components/ui//Item'
import Hop from 'api/recettes/Hop'
import MyButton from 'components/ui/base/MyButton'
import MySearch from 'components/ui/base/MySearch'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

export default {
  name: 'add-ingredient',

  components: {
    Modal,
    Item,
    Loader,
    MyButton,
    MySearch,
    VInput,
    VTextarea,
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
    useSelect () {
      return Hop.getUseList()
    },
    filteredData () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      if (this.modalIngredients !== undefined) {
        var data = this.modalIngredients
        if (filterKey) {
          data = data.filter((row) => {
            return String(row.name).toLowerCase().indexOf(filterKey) > -1
          })
        }
        if (this.instock) {
          data = data.filter((row) => {
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
    /* toggleContent (comp) {
      let items = this.$refs.modalIngredients
      for (let i = 0; i < items.length; i++) {
        let tempItem = items[i]
        if (tempItem !== comp && tempItem.contentVisible) tempItem.contentVisible = false
      }
    }, */
    showModal () {
      this.modalVisible = true
      this.$db.gets(this.database).then(rows => {
        this.modalIngredients = rows
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    hideModal () {
      this.modalVisible = false
      this.loading = true
    },
    addIngredient (ingredient) {
      if (ingredient.amount === 0 || ingredient.amount === undefined) {
        this.error.has = true
        this.error.mess = 'Please enter weight value'
      } else if (this.type === 'hop' && (ingredient.time === 0 || ingredient.time === undefined)) {
        this.error.has = true
        this.error.mess = 'Please enter time value'
      } else {
        ingredient.displayAmount = ingredient.amount + ' ' + this.$config.weightUnitie
        if (this.type === 'hop') {
          ingredient.displayTime = ingredient.time + ' ' + this.$config.timeUnitie
        }
        this.$emit('add', this.type, ingredient)
      }
    }
  }
}
</script>
