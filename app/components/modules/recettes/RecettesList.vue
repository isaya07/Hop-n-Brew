<template>
<section class="section">
  <div class="field is-horizontal">
    <div class="field-body">
      <p class="control field has-icons-right">
        <input class="input" type="text" placeholder="Search" name="query" v-model="filterKey">
        <span class="icon is-small is-right">
          <icon :icon="['fas', 'search']" />
        </span>
      </p>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <import @import="importPress">Import</import>
        <button type="button" class="button" @click="add">
          <span class="icon is-small">
            <icon :icon="['fas', 'plus']" />
          </span>
          <span>Create</span>
        </button>
      </div>
    </div>
  </div>
  <ul id="example-1">
    <li v-for="(item, index) in filteredData" :key="index">
      <router-link :to="{ name: 'edit', params: { name: item.name }}">{{ item.name }}</router-link>
    </li>
  </ul>
  <router-view></router-view>
</section>
</template>

<script>
import Import from 'components/ui/Import'
import Recipe from 'api/recettes/Recipe'

export default {
  name: 'recettesList',

  components: {
    Import
  },

  mounted () {
    // this.$db.sync(this.db, 'http://localhost:5984/' + this.db)
    this.fetchData()
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
    fetchData () {
      this.$db.gets(this.db).then(rows => {
        this.data = rows
      }).catch(err => {
        console.log(err)
      })
    },
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
    // toggle (index) {
    //  this.index = (this.index === index) ? '' : index
    // }
    add () {
      this.$router.push({name: 'edit', params: { name: 'new' }})
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
  }
}
</script>

<style lang="scss">

.title .icon.is-angle.asc {
  transform: rotate(180deg);
}
</style>
