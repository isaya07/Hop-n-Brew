<template>
  <section>
    <h3 class="txtcenter">Fermentables</h3>
    <table-list
      :colName="columns"
      :ingredientsData="fermentables"
      :butEdit="editBut"
      :butDelete="deleteBut"
      :search="true"
      :inStock="true"
      :createImport="true"
      @import="importFermentable"
      @supress="deleteFermentable"
      @create="createFermentable"
      @edit="editFermentable">
    </table-list>
    <modal
      v-if="editFermentableShow"
      :title="editFermentableTitle"
      :cancelText='"Cancel"'
      :okText='"Save"'
      :size='"large"'
      @close="editFermentableShow = false"
      @cancel="editFermentableShow = false"
      @ok="$bus.$emit('validateForm')">
      <fermentables-edit-form
        :formData="editFermentableData"
        @validated="validEditFermentable">
      </fermentables-edit-form>
    </modal>
  </section>
</template>

<script>
import TableList from 'components/ui/TableList'
import Modal from 'components/layout/Modal'
import FermentablesEditForm from 'components/ui/FermentablesEditForm'
// import fromBeerXml from 'api/import/fermentable'
import Fermentable from 'api/recettes/Fermentable'

export default {
  name: 'fermentables',

  components: {
    TableList,
    FermentablesEditForm,
    Modal
  },

  props: {
    recipeAdd: {
      type: Boolean,
      default: false
    }
  },

  pouch: {
    // The simplest usage. queries all documents from the "todos" pouch database and assigns them to the "todos" vue property.
    fermentables: {}
  },

  created () {
    this.$pouch.sync('fermentables', 'http://localhost:5984/fermentables')
  },

  data () {
    return {
      editFermentableShow: false,
      editFermentableTitle: '',
      editFermentableData: null,
      editBut: true,
      deleteBut: true,
      columns: ['name', 'origin', 'type', 'color', 'yield', 'maxInBatch', 'inventory']
    }
  },

  methods: {
    createFermentable () {
      this.editFermentableTitle = 'Add Fermentable'
      this.editFermentableData = new Fermentable()
      this.editFermentableShow = true
    },
    editFermentable (fermentable) {
      this.editFermentableTitle = 'Edit Fermentable'
      this.editFermentableData = new Fermentable(fermentable)
      this.editFermentableShow = true
    },
    deleteFermentable (fermentable) {
      let name = fermentable.name
      this.$pouch.remove('fermentables', fermentable, {force: false}).then(result => {
        this.$notification.success(name + ' successfully removed')
      }).catch(err => {
        this.$notification.error('Remove of ' + name + ' failed: ' + err)
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    },
    validEditFermentable (status, fermentable) {
      if (status) {
        this.saveFermentable(fermentable)
        this.editFermentableShow = false
      }
    },
    saveFermentable (fermentable) {
      console.log(fermentable)
      if (fermentable['_id'] != null) {
        this.$pouch.put('fermentables', fermentable, {force: false}).then(() => {
          this.$notification.success(fermentable.name + ' successfully updated')
        }).catch(err => {
          this.$notification.error('Update of ' + fermentable.name + ' failed: ' + err)
          console.error('Update of ' + name + ' failed: ' + err)
        })
      } else {
        fermentable._id = fermentable.name
        this.$pouch.put('fermentables', fermentable, {force: false}).then(() => {
          this.$notification.success(fermentable.name + ' successfully created')
        }).catch(err => {
          this.$notification.error('Creation of' + fermentable.name + ' failed: ' + err)
          console.error('Creation of ' + name + ' failed: ' + err)
        })
      }
    },
    importFermentable (xml) {
      // console.log(xml)
      let newfermentables = Fermentable.fromBeerXml(xml)
      let item
      let number = 0
      let error = false
      for (item in newfermentables) {
        let data = newfermentables[item]
        data['_id'] = data.name
        this.$pouch.put('fermentables', data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          error = true
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + data.name + ' failed: ' + err)
        })
        number++
      }
      if (!error) this.$notification.success(number + ' fermentables successfully imported')
      // var item
      // var item2
      // let number = 0
      /* for (item in newfermetable) {
        var data = {}
        for (item2 in newfermetable[item]) {
          data[item2] = newfermetable[item][item2]
        }
        data['_id'] = data.name
        console.log(data)
        this.$pouch.put('fermentables', data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + name + ' failed: ' + err)
        })
        number++
      }
      this.$notification.success(number + ' fermentables successfully imported') */
    }
  }
}
</script>
