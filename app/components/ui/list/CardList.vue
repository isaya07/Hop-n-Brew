<template>
  <section class="txtcenter">
    <div class="grid-3 middle">
      <div class="col right">
        <input type="text" placeholder="Search" name="query" v-model="filterKey">
        <i class="input fa fa-search"></i>
      </div>
      <div class="col left">
        <div class="grid-2">
          <import v-if="createImport" @import="importPress">Import</import>
          <button v-if="createImport" type="button" class="" @click="create">
            <i class="fa fa-plus"></i>
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
    <div class="grid-4" v-if="filteredData">
      <div class="col" v-for="(entry, index) in filteredData" :key="index">
        <div class="card">
          <header class="card-header txtcenter">
              <p class="card-header-title" @click="edit(entry)">{{ entry.name }}</p>
              <button @click="supress(entry)">Delete</button>
          </header>
          <div class="card-content">
              <img src="./../../../assets/img/marmite.svg" alt="Equipment">
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">Batch : {{ entry.batchSize + ' '}}{{$config.volUnitie | capitalize}}</div>
            <div class="card-footer-item">Boil : {{ entry.boilSize + ' ' }}{{$config.volUnitie | capitalize}}</div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Import from 'components/ui/Import'

export default {
  name: 'cardlist',

  components: {
    Import
  },

  props: {
    types: String,
    butAdd: {
      type: Boolean,
      default: false
    },
    butEdit: {
      type: Boolean,
      default: false
    },
    butDelete: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    createImport: {
      type: Boolean,
      default: false
    },
    ingredientsData: Array
  },

  data () {
    var sortOrders = {}
    const data = {
      columns: ['name'],
      sortKey: '',
      filterKey: '',
      sortOrders: sortOrders,
      addBut: this.butAdd,
      editBut: this.butEdit,
      deleteBut: this.butDelete
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
      if (this.ingredientsData !== undefined) {
        var data = this.ingredientsData
        if (filterKey) {
          data = data.filter((row) => {
            return Object.keys(row).some((key) => {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort((a, b) => {
            a = a[sortKey]
            b = b[sortKey]
            if (/^[0-9.]+$/.test(a) && /^[0-9.]+$/.test(b)) {
              a = parseFloat(a)
              b = parseFloat(b)
            }
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
    add (entry) {
      this.$emit('add', entry)
    },
    edit (entry) {
      this.$emit('edit', entry)
    },
    importPress (data) {
      this.$emit('import', data)
    },
    create () {
      this.$emit('create')
    },
    supress (entry) {
      this.$emit('supress', entry)
    }
  }
}
</script>
