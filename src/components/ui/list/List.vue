<template>
  <div>
    <h3 class="title is-3 has-text-centered">{{ type | capitalize}}</h3>
    <card-list
      v-if="card"
      :ingredientsData="data"
      :type="type"
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
      :inStock="true"
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

  firestore() {
    return {
        // Collection
        data: this.$db.collection(this.db)
        // Doc
        // ford: this.$db.collection('cars').doc('ford')
    }
  },

  mounted () {
    this.$bus.$on('validated', (status, liste) => {
      this.validEditList(status, liste)
    })
  },

  methods: {
    importList (xml) {
      let newLists = this.staticFunc(xml)
      let item
      let number = 0
      let error = null
      let data = null
      for (item in newLists) {
        data = newLists[item]
        number++
        this.$firestoreRefs.data.add(data).catch(err => {
          error = err
        })
        if (error) break
      }
      if (error) {
        this.$store.commit('setMessage', {type: 'error', text: 'Import of ' + data.name + ' failed: ' + error})
        console.error('Import of ' + name + ' failed: ' + error)
      }
      if ( !error && number > 1 ) {
        this.$store.commit('setMessage', {type: 'succes', text: number + ' ' + this.db + ' successfully imported'})
      } else if (!error) {
        this.$store.commit('setMessage', {type: 'succes', text: data.name + ' successfully imported'})
      }
    },
    createList () {
      this.editListeTitle = 'Add ' + this.$options.filters.capitalize(this.type)
      this.$emit('dataForm', this.newFunc())
      console.log('create', this.editListData)
      this.editListeShow = true
    },
    editList (liste) {
      this.editListeTitle = 'Edit ' + liste.name
      // let newList = {...this.newFunc(liste), ...{id: liste.id}}
      // console.log(newList)
      this.$emit('dataForm', liste)
      this.editListeShow = true
    },
    deleteList (liste) {
      let name = liste.name
      this.$firestoreRefs.data.doc(liste.id).delete().then(result => {
        this.$store.commit('setMessage', {type: 'succes', text: name + ' successfully removed'})
      }).catch(err => {
        this.$store.commit('setMessage', {type: 'error', text: 'Remove of ' + name + ' failed: ' + err})
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    },
    saveList (liste) {
      console.log('savelist')
      let newList = JSON.parse(JSON.stringify(liste))
      if (liste.id) {
        console.log('merde savelist', this.$firestoreRefs)
        this.$firestoreRefs.data.doc(liste.id).set(newList).then(() => {
          this.$store.commit('setMessage', {type: 'succes', text: newList.name + ' successfully updated'})
        }).catch(err => {
          this.$store.commit('setMessage', {type: 'error', text: 'Update of ' + newList.name + ' failed: ' + err})
          console.error('Update of ' + newList + ' failed: ' + err)
        })
      } else {
        this.$firestoreRefs.data.add(newList).then(response => {
          this.$store.commit('setMessage', {type: 'succes', text: newList.name + ' successfully created'})
        }).catch(err => {
          this.$store.commit('setMessage', {type: 'error', text: 'Creation of ' + newList.name + ' failed: ' + err})
          console.error('Creation of ' + newList + ' failed: ' + err)
        })
      }
    },
    validEditList (status, liste) {
      if (status) {
        this.saveList(liste)
        this.editListeShow = false
      } else {
        console.log('Validation error')
      }
    }
  },
}
</script>
