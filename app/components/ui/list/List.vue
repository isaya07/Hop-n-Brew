<template>
  <div>
    <h3 class="txtcenter">{{ type | capitalize}}</h3>
    <card-list
      v-if="card"
      :ingredientsData="data"
      :butEdit="editBut"
      :butDelete="deleteBut"
      :search="true"
      :createImport="true"
      @import="importList"
      @supress="deleteList"
      @create="createList"
      @edit="editList">
    </card-list>
    <table-list
      v-else
      :colName="columns"
      :ingredientsData="data"
      :butEdit="editBut"
      :butDelete="deleteBut"
      :search="true"
      :inStock="false"
      :createImport="true"
      @import="importList"
      @supress="deleteList"
      @create="createList"
      @edit="editList">
    </table-list>
    <modal
      v-if="editListeShow"
      :title="editListeTitle"
      :cancelText='"Cancel"'
      :okText='"Save"'
      :size='"large"'
      @close="editListeShow = false"
      @cancel="editListeShow = false"
      @ok="$bus.$emit('validateForm')">
      <slot></slot>
    </modal>
  </div>
</template>

<script>
import TableList from 'components/ui/list/TableList'
import CardList from 'components/ui/list/CardList'
import Modal from 'components/layout/Modal'

export default {
  name: 'List',

  props: {
    card: false,
    type: String,
    columns: Array,
    newFunc: Function,
    staticFunc: Function
  },

  components: {
    TableList,
    CardList,
    Modal
  },

  data () {
    return {
      data: [],
      db: this.type + 's',
      object: null,
      editListeShow: false,
      editListeTitle: '',
      editBut: true,
      deleteBut: true
    }
  },

  created () {
    this.$bus.$emit('progress', 'pause')
  },

  mounted () {
    // this.$db.sync(this.db, 'http://localhost:5984/' + this.db)
    this.fetchData()
    this.$bus.$on('validated', (status, liste) => {
      this.validEditList(status, liste)
    })
  },

  methods: {
    fetchData () {
      this.$db.gets(this.db).then(rows => {
        this.$bus.$emit('progress', 'play')
        this.data = rows
      }).catch(err => {
        this.$bus.$emit('progress', 'stop')
        console.log(err)
      })
    },
    importList (xml) {
      let newLists = this.staticFunc(xml)
      let item
      let number = 0
      let error = null
      let data = null
      for (item in newLists) {
        data = newLists[item]
        number++
        data['_id'] = data.name
        // console.log(data)
        this.$db.put(this.db, data, {force: false}).then(() => {
          // this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          error = err
        })
        if (error) break
      }
      if (error) {
        this.$notification.error('Import of ' + data.name + ' failed: ' + error)
        console.error('Import of ' + name + ' failed: ' + error)
      }
      if ( !error && number > 1 ) {
        this.$notification.success(number + ' ' + this.db + ' successfully imported')
      } else if (!error) {
        this.$notification.success(data.name + ' successfully imported')
      }
      this.fetchData()
    },
    createList () {
      this.editListeTitle = 'Add ' + this.$options.filters.capitalize(this.type)
      this.$emit('dataForm', this.newFunc())
      console.log('create', this.editListData)
      this.editListeShow = true
    },
    editList (liste) {
      this.editListeTitle = 'Edit ' + this.$options.filters.capitalize(this.type)
      this.$emit('dataForm', this.newFunc(liste))
      this.editListeShow = true
    },
    deleteList (liste) {
      let name = liste.name
      let vm = this
      this.$db.remove(this.db, liste).then(result => {
        vm.$notification.success(name + ' successfully removed')
        vm.fetchData()
      }).catch(err => {
        vm.$notification.error('Remove of ' + name + ' failed: ' + err)
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    },
    saveList (liste) {
      let newList = JSON.parse(JSON.stringify(liste))
      if (liste['_id'] && liste['_rev']) {
        let rev = { _id: liste['_id'], _rev: liste['_rev'] }
        newList = Object.assign(newList, rev)
      }
      if (newList['_id'] != null) {
        this.$db.put(this.db, newList).then(() => {
          this.$notification.success(newList.name + ' successfully updated')
          this.fetchData()
        }).catch(err => {
          console.log(this)
          this.$notification.error('Update of ' + newList.name + ' failed: ' + err)
          console.error('Update of ' + newList + ' failed: ' + err)
        })
      } else {
        newList._id = newList.name
        this.$db.put(this.db, newList).then(response => {
          this.$notification.success(newList.name + ' successfully created')
          this.fetchData()
        }).catch(err => {
          console.log(this)
          this.$notification.error('Creation of' + newList.name + ' failed: ' + err)
          console.error('Creation of ' + newList + ' failed: ' + err)
        })
      }
    },
    validEditList (status, liste) {
      console.log('retest')
      if (status) {
        this.saveList(liste)
        this.editListeShow = false
      }
    }
  }
}
</script>
