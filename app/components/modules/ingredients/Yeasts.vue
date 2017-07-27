<template>
  <section>
    <h3 class="txtcenter">Yeasts</h3>
    <table-list
      :colName="columns"
      :ingredientsData="yeasts"
      :butEdit="editBut"
      :butDelete="deleteBut"
      :search="true"
      :inStock="true"
      :createImport="true"
      @import="importYeast"
      @supress="deleteYeast"
      @create="createYeast"
      @edit="editYeast">
    </table-list>
    <modal
      v-if="editYeastShow"
      :title="editYeastTitle"
      :cancelText='"Cancel"'
      :okText='"Save"'
      :size='"large"'
      @close="editYeastShow = false"
      @cancel="editYeastShow = false"
      @ok="$bus.$emit('validateForm')">
      <yeasts-edit-form
        :formData="editYeastData"
        @validated="validEditYeast">
      </yeasts-edit-form>
    </modal>
  </section>
</template>

<script>
import TableList from 'components/ui/TableList'
import Modal from 'components/layout/Modal'
import YeastsEditForm from 'components/ui/YeastsEditForm'
import fromBeerXml from 'api/import/yeasts'
import Yeast from 'api/recettes/Yeast'

export default {
  name: 'yeasts',

  components: {
    TableList,
    YeastsEditForm,
    Modal
  },

  props: {
    recipeAdd: {
      type: Boolean,
      default: false
    }
  },

  pouch: {
    yeasts: {}
  },

  created () {
    this.$pouch.sync('yeasts', 'http://localhost:5984/yeasts')
  },

  data () {
    return {
      editYeastShow: false,
      editYeastTitle: '',
      editYeastData: null,
      editBut: true,
      deleteBut: true,
      columns: ['name', 'laboratory', 'productId', 'type', 'form', 'attenuation', 'flocculation', 'inventory']
    }
  },

  methods: {
    createYeast () {
      this.editYeastTitle = 'Add Yeast'
      this.editYeastData = new Yeast()
      this.editYeastShow = true
    },
    editYeast (yeast) {
      this.editYeastTitle = 'Edit Yeast'
      this.editYeastData = new Yeast(yeast)
      this.editYeastShow = true
    },
    onComplete () {
      // console.log('onComplete')
    },
    deleteYeast (yeast) {
      let name = yeast.name
      this.$pouch.remove('yeasts', yeast, {force: false}).then(result => {
        this.$notification.success(name + ' successfully removed')
      }).catch(err => {
        this.$notification.error('Remove of ' + name + ' failed: ' + err)
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    },
    validEditYeast (status, yeast) {
      if (status) {
        this.saveYeast(yeast)
        this.editYeastShow = false
      }
    },
    saveYeast (yeast) {
      if (yeast['_id'] != null) {
        this.$pouch.put('yeasts', yeast, {force: false}).then(() => {
          this.$notification.success(yeast.name + ' successfully updated')
        }).catch(err => {
          this.$notification.error('Update of ' + yeast.name + ' failed: ' + err)
          console.error('Update of ' + name + ' failed: ' + err)
        })
      } else {
        yeast._id = yeast.name
        this.$pouch.put('yeasts', yeast, {force: false}).then(() => {
          this.$notification.success(yeast.name + ' successfully created')
        }).catch(err => {
          this.$notification.error('Creation of ' + yeast.name + ' failed: ' + err)
          console.error('Creation of ' + name + ' failed: ' + err)
        })
      }
    },
    importYeast (xml) {
      var newyeasts = fromBeerXml(xml)
      var item
      var item2
      let number = 0
      for (item in newyeasts) {
        var data = {}
        for (item2 in newyeasts[item]) {
          data[item2] = newyeasts[item][item2]
        }
        data['_id'] = data.name
        console.log(data)
        this.$pouch.put('yeasts', data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + name + ' failed: ' + err)
        })
        number++
      }
      this.$notification.success(number + ' yeasts successfully imported')
    }
  }
}
</script>
