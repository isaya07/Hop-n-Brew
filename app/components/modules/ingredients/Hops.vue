<template>
  <section>
    <h3 class="txtcenter">Hops</h3>
    <table-list
      :colName="columns"
      :ingredientsData="hops"
      :butEdit="editBut"
      :butDelete="deleteBut"
      :search="true"
      :inStock="true"
      :createImport="true"
      @import="importHop"
      @supress="deleteHop"
      @create="createHop"
      @edit="editHop">
    </table-list>
    <modal
      v-if="editHopShow"
      :title="editHopTitle"
      :cancelText='"Cancel"'
      :okText='"Save"'
      :size='"large"'
      @close="editHopShow = false"
      @cancel="editHopShow = false"
      @ok="$bus.$emit('validateForm')">
      <hops-edit-form
        :formData="editHopData"
        @validated="validEditHop">
      </hops-edit-form>
    </modal>
  </section>
</template>

<script>
import TableList from 'components/ui/TableList'
import Modal from 'components/layout/Modal'
import HopsEditForm from 'components/ui/HopsEditForm'
import fromBeerXml from 'api/import/hops'
import Hop from 'api/recettes/Hop'

export default {
  name: 'hops',

  components: {
    TableList,
    HopsEditForm,
    Modal
  },

  pouch: {
    hops: {}
  },

  created () {
    this.$pouch.sync('hops', 'http://localhost:5984/hops')
  },

  props: {
    recipeAdd: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      editHopShow: false,
      editHopTitle: '',
      editHopData: null,
      editBut: true,
      deleteBut: true,
      columns: ['name', 'origin', 'type', 'alpha', 'beta', 'use', 'inventory']
    }
  },

  methods: {
    createHop () {
      this.editHopTitle = 'Add Hop'
      this.editHopData = new Hop()
      this.editHopShow = true
    },
    editHop (hop) {
      this.editHopTitle = 'Edit Hop'
      this.editHopData = new Hop(hop)
      this.editHopShow = true
    },
    deleteHop (hop) {
      let name = hop.name
      this.$pouch.remove('hops', hop, {force: false}).then(result => {
        this.$notification.success(name + ' successfully removed')
      }).catch(err => {
        this.$notification.error('Remove of ' + name + ' failed: ' + err)
        console.error('Remove of' + name + ' failed: ' + err)
      })
    },
    validEditHop (status, hop) {
      if (status) {
        this.saveHop(hop)
        this.editHopShow = false
      }
    },
    saveHop (hop) {
      if (hop['_id'] != null) {
        this.$pouch.put('hops', hop, {force: false}).then(() => {
          this.$notification.success(hop.name + ' successfully updated')
        }).catch(err => {
          this.$notification.error('Update of ' + hop.name + ' failed: ' + err)
          console.error('Update of ' + name + ' failed: ' + err)
        })
      } else {
        hop._id = hop.name
        this.$pouch.put('hops', hop, {force: false}).then(() => {
          this.$notification.success(hop.name + ' successfully created')
        }).catch(err => {
          this.$notification.error('Creation of ' + hop.name + ' failed: ' + err)
          console.error('Creation of ' + name + ' failed: ' + err)
        })
      }
    },
    importHop (xml) {
      var newhops = fromBeerXml(xml)
      var item
      var item2
      let number = 0
      // console.log(newhops)
      for (item in newhops) {
        var data = {}
        for (item2 in newhops[item]) {
          data[item2] = newhops[item][item2]
        }
        data['_id'] = data.name
        console.log(data)
        this.$pouch.put('hops', data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + name + ' failed: ' + err)
        })
        number++
      }
      this.$notification.success(number + ' hops successfully imported')
    }
  }
}
</script>
