<template>
  <div>
    <list
      :card="true"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <equipments-edit-form
        :formData="formdata"
        @validated="validated">
      </equipments-edit-form>
    </list>
  </div>
</template>

<script>
import EquipmentsEditForm from 'components/ui/form/EquipmentsEditForm'
import Equipment from 'api/recettes/Equipment'
import List from 'components/ui/list/List'

export default {
  name: 'equipment',

  components: {
    List,
    EquipmentsEditForm
  },

  data () {
    return {
      // columns: ['name', 'batchSize', 'tunVolume'],
      type: 'equipment',
      form: 'card',
      getNew: function (option) {
        return new Equipment(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Equipment.fromBeerXml(option)
      },
      formdata: null
    }
  },

  methods: {
    validated (status, liste) {
      console.log('test')
      this.$bus.$emit('validated', status, liste)
    },
    updateFormData (data) {
      this.formdata = data
    }
  }
}
</script>
