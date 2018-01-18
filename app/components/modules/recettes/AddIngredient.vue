<template>
  <div>
    <button class="btn primary" @click="showModal()"><i class="fa fa-plus"></i>Add</button>
    <modal
      v-if="modalVisible"
      :title="modalTitle"
      :cancelText='""'
      :okText='""'
      :size='"large"'
      @close="hideModal()"
      @cancel="hideModal()"
      @ok="hideModal()">
      <div slot="header" class="grid-3">
        <div class="col is-1-2">
          <h4 class="txtcenter">{{ modalTitle }}</h4>
        </div>
        <div class="col is-1-4">
          <div class="has-icon">
            <input type="text" placeholder="Search" name="query" v-model="filterKey">
            <icon name="search" class="fa icon-right" />
          </div>
        </div>
        <div class="col is-1-4">
          <label>
            <input type="checkbox" v-model="instock">In stock
          </label>
        </div>
        <loader :loading="loading"></loader>
        <div v-show="error.has" class="item-inline-error center">
          <span class="form-message is-alert">{{ error.mess }}</span>
        </div>
      </div>
      <div v-if="modalIngredients" class="is-full">
        <item v-for="(ingredient, key) in filteredData"
          :key="key"
          :id="key"
          class="col is-full">
          <input class="is-flex-grow-2" type="text" v-model="ingredient.name" readonly>
          <input class="is-flex-grow-1" type="text" v-model="ingredient.amount">
          <span class="select is-flex-grow-4" v-if="type !== 'yeast'">
            <select v-model="$config.weightUnitie">
              <option v-for="option in unitList.weight" selected="selectedWeight" :key="option">
                {{ option }}
              </option>
            </select>
          </span>
          <span class="select is-flex-grow-4" v-else>
            <select v-model="$config.yeastUnitie">
              <option v-for="option in unitList.yeast" selected="selectedWeight" :key="option">
                {{ option }}
              </option>
            </select>
          </span>
          <input v-if="type === 'hop'" class="is-flex-grow-1" type="text" v-model="ingredient.time">
          <span class="select is-flex-grow-4" v-if="type === 'hop'">
            <select v-model="$config.timeUnitie">
              <option v-for="option in unitList.time" selected="selectedTime" :key="option">
                {{ option }}
              </option>
            </select>
          </span>
          <span class="select is-flex-grow-3" v-if="type === 'hop'">
            <select v-model="ingredient.use">
              <option v-for="option in useSelect" selected="selectedUse" :key="option">
                {{ option }}
              </option>
            </select>
          </span>
          <button class=" btn last" @click="addIngredient(ingredient)">Add</button>

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
    </modal>
  </div>
</template>

<script>
import Modal from 'components/layout/Modal'
import Loader from 'components/ui/Loader'
import Item from 'components/ui//Item'
import Hop from 'api/recettes/Hop'

export default {
  name: 'add-ingredient',

  components: {
    Modal,
    Item,
    Loader
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
