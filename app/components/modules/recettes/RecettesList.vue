<template>
<section class="section">
  <div class="field is-grouped">
    <p class="control">
      <button class="button is-primary modal-button" @click="add">Creer une recette</button>
    </p>
    <p class="control is-expanded">
      <form id="search">
        <input class="input" type="text" placeholder="Search" name="query" v-model="filterKey">
      </form>
    </p>
  </div>

<ul id="example-1">
  <li v-for="item in filteredData">
    {{ item.message }}
  </li>
</ul>
</section>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
// import router from 'vue-router'

export default {
  name: 'levures',

  data () {
    var sortOrders = {}
    const data = {
      showModal: false,
      columns: ['id', 'nom', 'origine', 'type', 'couleur', 'potentiel', 'max', 'stock', 'prix'],
      sortKey: '',
      filterKey: '',
      sortOrders: sortOrders,
      modalTitle: '',
      modalData: null
    }
    data.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return data
  },

  computed: {
    /* ...mapGetters({
      recettes: 'allRecettes'
    }), */

    filteredData () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      if (this.recettes !== undefined) {
        var data = this.recettes
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      } else {
        return null
      }
    }
  },

  filters: {
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1)
  },

  methods: {
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    // toggle (index) {
    //  this.index = (this.index === index) ? '' : index
    // }
    add () {
      this.$router.push('editrecette')
      // router.push({ name: 'user', params: { userId: 123 }})
    },
    edit (entry) {
      this.modalTitle = 'Editer Recettes'
      this.$emit('update', entry)
      this.showModal = true
    },
    supress (entry) {
      this.$http.delete('/api/recettes/' + entry.id)
        .then(response => {
          this.$store.dispatch('getAllRecettes')
        }, response => {
          console.log('error from delete request /api/recettes')
        })
    },
    closeModal () {
      this.showModal = false
    }
  },
  mounted () {
    this.$store.dispatch('getAllRecettes')
  }
}
</script>

<style lang="scss">

.title .icon.is-angle.asc {
  transform: rotate(180deg);
}
</style>
