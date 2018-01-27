<template>
  <div class="txtcenter">
    <div class="field is-horizontal">
      <div class="field-body">
        <p class="control field has-icons-right">
          <input class="input" type="text" placeholder="Search" name="query" v-model="filterKey">
          <span class="icon is-small is-right">
            <icon :icon="['fas', 'search']" />
          </span>
        </p>
      </div>
      <div v-if="inStock" class="field-label">
        <label class="label">In stock</label>
      </div>
      <div v-if="inStock" class="field-body">
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="instock">
            </label>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <import v-if="createImport" @import="importPress">Import</import>
          <button v-if="createImport" type="button" class="button" @click="create">
            <span class="icon is-small">
              <icon :icon="['fas', 'plus']" />
            </span>
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
    <div class="center">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th class="" v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
            </th>
            <th class="">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in filteredData" :key="index">
            <td v-for="key in columns" :key="key" @dblclick="editable($event,key,entry)" :data-th="key | capitalize">
              {{entry[key]}}
            </td>
            <td data-th='Action'>
              <div class="field is-grouped">
                <p class="control">
                  <button type="button" v-if="editBut" class="button is-info is-small has-tooltip" data-tooltip="edit entry" @click="edit(entry)">
                    <span class="icon is-small">
                      <icon :icon="['fas', 'edit']" />
                    </span>
                    <span>Edit</span>
                  </button>
                </p>
                <p class="control">
                  <button type="button" v-if="deleteBut" class="button is-danger is-small has-tooltip" data-tooltip="delete entry" @click="supress(entry)">
                    <span class="icon is-small">
                      <icon :icon="['fas', 'trash']" />
                    </span>
                    <span>Delete</span>
                  </button>
                </p>
                <p class="control">
                  <button type="button" v-if="addBut" class="button is-success is-small has-tooltip" data-tooltip="add entry" @click="add(entry)">
                    <span class="icon is-small">
                      <icon :icon="['fas', 'plus']" />
                    </span>
                    <span>Add</span>
                  </button>
                </p>
              </div>
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
// @import './../../../assets/scss/table';
@import './../../../assets/scss/tooltip';
</style>