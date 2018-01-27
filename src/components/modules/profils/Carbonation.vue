<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <carbonations-edit-form
        :formData="formdata"
        @validated="validated">
      </carbonations-edit-form>
    </list>
  </div>
</template>

<script>
import CarbonationsEditForm from 'components/ui/form/CarbonationsEditForm'
import Carbonation from 'api/recettes/Carbonation'
import List from 'components/ui/list/List'

export default {
  name: 'carbonation',

  components: {
    List,
    CarbonationsEditForm
  },

  data () {
    return {
      columns: ['name', 'carbonationUsed', 'carbonationTemp'],
      type: 'carbonation',
      getNew: function (option) {
        return new Carbonation(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Carbonation.fromBeerXml(option)
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
