<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <fermentations-edit-form
        :formData="formdata"
        @validated="validated">
      </fermentations-edit-form>
    </list>
  </div>
</template>

<script>
import FermentationsEditForm from 'components/ui/form/FermentationsEditForm'
import Fermentation from 'api/recettes/Fermentation'
import List from 'components/ui/list/List'

export default {
  name: 'fermentation',

  components: {
    List,
    FermentationsEditForm
  },

  data () {
    return {
      columns: ['name', 'fermentationStages', 'age'],
      type: 'fermentation',
      getNew: function (option) {
        return new Fermentation(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Fermentation.fromBeerXml(option)
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
