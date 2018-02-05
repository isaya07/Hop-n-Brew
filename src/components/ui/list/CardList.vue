<template>
  <section class="txtcenter">
    <div class="columns is-multiline is-mobile">
      <div class="column is-12-mobile is-6-tablet">
        <v-search-input v-model="filterKey"></v-search-input>
      </div>
      <div class="column"></div>
      <div  v-if="createImport" class="column is-narrow">
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <import @import="importPress">Import</import>
          </p>
          <p class="control">
            <button type="button" class="button is-info" @click="create">
              <span class="icon is-small">
                <icon :icon="['fas', 'plus']" />
              </span>
              <span>Create</span>
            </button>
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-multiline is-mobile" v-if="filteredData">
      <div class="column is-6-mobile is-4-tablet is-3-desktop is-2-widescreen" v-for="(entry, index) in filteredData" :key="index">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-info" @click="edit(entry)">
              {{ entry.name }}
            </p>
            <a class="card-header-icon tooltip" data-tooltip="Delete item" @click="supress(entry)">
              <span class="icon is-small has-text-danger">
                <icon :icon="['fas', 'trash']" />
              </span>
              <!-- <span>Delete</span> -->
            </a>
          </header>
          <div class="card-content">
              <img v-if="type === 'equipment'" src="~assets/img/marmite.svg" @click="edit(entry)" alt="Equipment">
              <img v-else-if="type === 'recipes'" src="~assets/img/bottle-longneck.svg" @click="edit(entry)" alt="bottle">
          </div>
          <footer class="card-footer">
            <div class="card-footer-item" v-if="type === 'equipment' || type === 'recipes'">Batch : {{ entry.batchSize + ' '}}{{$config.volUnitie | capitalize}}</div>
            <div class="card-footer-item" v-if="type === 'equipment'">Boil : {{ entry.boilSize + ' ' }}{{$config.volUnitie | capitalize}}</div>
            <div class="card-footer-item" v-if="type === 'recipes'">Bitterness : {{ entry.ibu + ' ' }}</div>
            <div class="card-footer-item" v-if="type === 'recipes'">Alc : {{ entry.estAbv + ' ' }}</div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Import from 'components/ui/Import'
import VSearchInput from 'components/ui/base/SearchInput'

export default {
  name: 'cardlist',

  components: {
    Import,
    VSearchInput
  },

  props: {
    type: String,
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

<style lang="scss" scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-content {
    flex-grow: 2;
    img {
      max-height: 10em;
      cursor: pointer;
    }
  }
  .card-header-title {
    cursor: pointer;
  }
  .card-footer {
    flex-direction: column;
  }
}

</style>
