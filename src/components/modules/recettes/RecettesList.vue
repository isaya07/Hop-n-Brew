<template>
  <section class="section">
    <card-list
      :ingredientsData="data"
      :butEdit="true"
      :butDelete="true"
      :type="'recipes'"
      :search="true"
      :createImport="true"
      @import="importPress"
      @supress="supress"
      @create="add"
      @edit="edit">
    </card-list>
  </section>
</template>

<script>
import Import from 'components/ui/Import'
import Recipe from 'api/recettes/Recipe'
import CardList from 'components/ui/list/CardList'

export default {
  name: 'recettesList',

  components: {
    Import,
    CardList
  },

  mounted () {
  },

  firestore () {
    return {
      // Collection
      data: this.$db.collection(this.db).orderBy('name').limit(20)
      // Doc
      // ford: this.$db.collection('cars').doc('ford')
    }
  },

  data () {
    var sortOrders = {}
    const data = {
      showModal: false,
      columns: ['id', 'nom', 'origine', 'type', 'couleur', 'potentiel', 'max', 'stock', 'prix'],
      sortKey: '',
      filterKey: '',
      sortOrders: sortOrders,
      modalTitle: '',
      modalData: null,
      db: 'recipes',
      data: []
    }
    data.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return data
  },

  computed: {
    filteredData () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      if (this.data !== undefined) {
        var data = this.data
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

  methods: {
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    importPress (data) {
      // console.log(data)
      let recipe = Recipe.fromBeerXml(data)
      console.log(recipe)
      let item
      let number = 0
      let error = false
      for (item in recipe) {
        let data = recipe[item]
        number++
        data['_id'] = data.name
        // console.log(data)
        this.$db.put(this.db, data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          error = true
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + name + ' failed: ' + err)
        })
      }
      if (!error) this.$notification.success(number + ' ' + this.db + ' successfully imported')
    },
    add () {
      this.$router.push({name: 'edit', params: { name: 'new' }})
    },
    edit (entry) {
      this.$router.push({name: 'edit', params: { name: entry.id }})
    },
    supress (entry) {
      this.$http.delete('/api/recettes/' + entry.id)
        .then(response => {
          this.$store.dispatch('getAllRecettes')
        }, response => {
          console.log('error from delete request /api/recettes')
        })
    }
  }
}
</script>

<style lang="scss">

</style>
