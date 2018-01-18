<template>
  <div class="txtcenter">
    <div class="grid-3 middle">
      <div class="col right">
        <div class="has-icon">
          <input type="text" placeholder="Search" name="query" v-model="filterKey">
          <icon name="search" class="fa icon-right"></icon>
        </div>
      </div>
      <div v-if="inStock" class="col middle">
        <label class="checkbox">
          <input type="checkbox" v-model="instock">
          In stock
        </label>
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
    <div class="center">
      <table class="rounded">
        <thead>
          <tr>
            <th class="small" v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
            </th>
            <th class="small">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in filteredData" :key="index">
            <td v-for="key in columns" :key="key" @dblclick="editable($event,key,entry)" :data-th="key | capitalize">
              {{entry[key]}}
            </td>
            <td data-th='Action'>
              <button type="button" v-if="editBut" class="small primary has-tooltip" data-tooltip="edit entry" @click="edit(entry)">
                <i class="fa fa-pencil-square-o"></i>
                <span class="desktop-only">Edit</span>
              </button>
              <button type="button" v-if="deleteBut" class="small alert has-tooltip" data-tooltip="delete entry" @click="supress(entry)">
                <i class="fa fa-times-circle"></i>
                <span class="desktop-only">Delete</span>
              </button>
              <button type="button" v-if="addBut" class="small success has-tooltip" data-tooltip="add entry" @click="add(entry)">
                <i class="fa fa-plus"></i>
                <span class="desktop-only">Add</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Import from 'components/ui/Import'

export default {
  name: 'tablelist',

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
    inStock: {
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
    colName: Array,
    ingredientsData: Array
  },

  data () {
    var sortOrders = {}
    const data = {
      columns: this.colName,
      sortKey: '',
      filterKey: '',
      sortOrders: sortOrders,
      instock: false,
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
        if (this.instock) {
          data = data.filter((row) => {
            return row.inventory > 0
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
    }, /*,    toggle (index) {
      this.index = (this.index === index) ? '' : index
    } */
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

<style lang="scss">
@import './../../../assets/scss/table';
@import './../../../assets/scss/tooltip';
</style>
