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
          <v-search-input v-model="filterKey"></v-search-input>
        </div>
        <div class="column is-6">
          <label>
            <input type="checkbox" v-model="instock">In stock
          </label>
        </div>
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
            <input class="input" type="text" v-model.number="ingredient.amount">
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
            <input class="input" type="text" v-model.number="ingredient.time">
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
      <div class="columns is-mobile is-centered">
        <div class="column is-narrow">
          <loader :loading="loading"></loader>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from 'components/layout/Modal'
import Loader from 'components/ui/Loader'
import Item from 'components/ui//Item'
import Hop from 'api/recettes/Hop'
import VButton from 'components/ui/base/Button'
import VSearchInput from 'components/ui/base/SearchInput'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

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
      } /* ,
      lastVisible: '',
      bottom: false */
    }
  },

  /* firestore() {
    return {
        // Collection
        modalIngredients: this.$db.collection(this.database)
        // Doc
        // ford: this.$db.collection('cars').doc('ford')
    }
  }, */

  computed: {
    modalTitle () {
      return 'Select a ' + this.type
    },
    filteredData () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      if (this.modalIngredients !== undefined) {
        var data = this.modalIngredients
        if (filterKey) {
          data = data.filter(row => {
            return (
              String(row.name)
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
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
    /* toggleContent (comp) {
      let items = this.$refs.modalIngredients
      for (let i = 0; i < items.length; i++) {
        let tempItem = items[i]
        if (tempItem !== comp && tempItem.contentVisible) tempItem.contentVisible = false
      }
    }, */
    showModal () {
      /* this.$binding(this.database, this.$db.db.collection(this.database))
      .then((data) => {
        this.modalIngredients = data
         this.loading = false
        // this.$bus.$emit('progress', 'stop')
      }).catch(err => {
        console.error(err)
      }) */
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
      /* this.$db.gets(this.database).then(rows => {
        this.modalIngredients = rows
        this.loading = false
      }).catch(err => {
        console.log(err)
      }) */
    },
    hideModal () {
      this.modalVisible = false
      // this.loading = true
      this.modalIngredients = []
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
    } /* ,
    bottomVisible() {
      let element = document.querySelector('.modal-card-body');
      const scrollY = element.scrollTop
      const visible = element.clientHeight
      const pageHeight = element.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight - 20
      return bottomOfPage || pageHeight < visible
    },
    addData() {
      this.loading = true
      this.$bind(this.modalIngredients,  this.$db.collection(this.database).orderBy("name").startAfter(this.lastVisible).limit(25)).then( result => {
      // this.$db.collection(this.database).orderBy("name").startAfter(this.lastVisible).limit(25).get().then( query => {
        console.log(result)
        this.modalIngredients = this.modalIngredients.concat(result)
        this.lastVisible = this.modalIngredients[this.modalIngredients.length-1].id
        console.log(this.lastVisible, this.modalIngredients[this.modalIngredients.length-1].name)
        // if (this.bottomVisible()) { this.addData() }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.$store.commit('setMessage', {type: 'error', text: 'Fetch data failed: ' + error})
        this.loading = false
      })
    } */
  }

  /* watch: {
    bottom(bottom) {
      if (bottom) {
        this.addData()
      }
    }
  } */
}
</script>
