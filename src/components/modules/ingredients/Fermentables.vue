<template>
  <section class="section">
    <list
      :columns="columns"
      :type="type"
      :title="true"
      :forEdit="true"
      :withAdd="true"
      :search="true"
      :inStock="true"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <fermentables-edit-form
        :formData="formdata"
        @validated="validated">
      </fermentables-edit-form>
    </list>
  </section>
</template>

<script>
import FermentablesEditForm from 'components/ui/form/FermentablesEditForm'
import Fermentable from 'api/recettes/Fermentable'
import List from 'components/ui/list/List'

export default {
  name: 'fermentable',

  components: {
    List,
    FermentablesEditForm
  },

  data () {
    return {
      columns: ['name', 'origin', 'type', 'color', 'yield', 'maxInBatch', 'inventory'],
      type: 'fermentable',
      getNew: function (option) {
        return new Fermentable(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Fermentable.fromBeerXml(option)
      },
      formdata: null
    }
  },

  methods: {
    validated (status, liste) {
      this.$bus.$emit('validated', status, liste)
    },
    updateFormData (data) {
      this.formdata = data
    }
  }
}
</script>
