<template>
  <div>
    <button class="primary" @click="modalVisible = true"><i class="fa fa-plus"></i>Add {{type}}</button>
    <!-- <button class="primary" @click="showModalIngredient('hop')">Add Hops</button>
    <button class="alert" @click="showModalIngredient('yeast')">Add Yeast</button> -->
    <modal
      v-if="modalVisible"
      :title="modalTitle"
      :cancelText='""'
      :okText='""'
      :size='"large"'
      @close="modalVisible = false"
      @cancel="modalVisible = false"
      @ok="modalVisible = false">
      <div slot="header" class="grid">
        <div class="col flex-expend">
          <h4 class="txtcenter">{{ modalTitle }}</h4>
        </div>
        <div class="col">
          <input type="text" placeholder="Search" name="query" v-model="filterKey">
        </div>
        <div class="col">
          <label>
            <input type="checkbox" v-model="instock">In stock
          </label>
        </div>
      </div>
      <div v-show="loading" class="center">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </div>
      <div v-if="modalIngredients">
        <add-ingredient-item
          slot="body"
          v-for="ingredient in filteredData"
          :key="ingredient"
          ref="modalIngredients"
          :ingredientData="ingredient"
          :type="type"
          @add-ingredient="addIngredient"
          @content-visible="toggleContent">
        </add-ingredient-item>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from 'components/layout/Modal'
import AddIngredientItem from 'components/modules/test/AddIngredientItem'
// import { db } from 'api/firebase'
// let hopsRef = db.ref('hops')

export default {
  name: 'add-ingredient',

  components: {
    Modal,
    AddIngredientItem
  },

  pouch: {
    /* fermentables: {},
    hops: {},
    yeasts: {} */
    modalIngredients: function () {
      // console.log(this)
      return {
        database: this.type + 's'
      }
    }
  },

  props: {
    type: ''
  },

  data () {
    return {
      loading: false,
      // modalTitle: '',
      // modalIngredients: [],
      modalVisible: false,
      filterKey: '',
      instock: false
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
    addIngredient (ingredient) {
      this.$emit('add', this.type, ingredient)
    },
    fetchData () {
      switch (this.type) {
        case 'fermentable':
          // this.modalTitle = 'Select a fermentable'
          // this.modalIngredients = this.fermentables
          /* this.loading = true
          this.$pouch.get('fermentables').then(data => {
            this.modalIngredients = data
            this.loading = false
          }).catch(err => {
            this.$notification.error('fetch of fermentables failed: ' + err)
          }) */
          break
        case 'hop':
          // this.modalTitle = 'Select a hop'
          // this.modalIngredients = this.hops
          /* db.ref('hops').once('value').then((snapshot) => {
            this.modalIngredients = snapshot.val()
            this.loading = false
          }) */
          break
        case 'yeast':
          // this.modalTitle = 'Select a yeast'
          // this.modalIngredients = this.yeasts
          /* db.ref('yeasts').once('value').then((snapshot) => {
            this.modalIngredients = snapshot.val()
            this.loading = false
          }) */
          break
      }
    },
    showModalIngredient (type) {
      this.modalVisible = true
    },
    toggleContent (comp) {
      let items = this.$refs.modalIngredients
      for (let i = 0; i < items.length; i++) {
        let tempItem = items[i]
        if (tempItem !== comp && tempItem.contentVisible) tempItem.contentVisible = false
      }
    }
  },
  watch: {
    modalVisible (val) {
      if (val) {
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss">
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

.loader {
  margin: 1em auto;
  font-size: 10%;
  position: relative;
  text-indent: -9999em;
  border-top: 0.7em solid rgba(0, 0, 0, 0.2);
  border-right: 0.7em solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.7em solid rgba(0, 0, 0, 0.2);
  border-left: 0.7em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
