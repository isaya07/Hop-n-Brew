<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <yeasts-edit-form
        :formData="formdata"
        @validated="validated">
      </yeasts-edit-form>
    </list>
  </div>
</template>

<script>
import YeastsEditForm from 'components/ui/form/YeastsEditForm'
import Yeast from 'api/recettes/Yeast'
import List from 'components/ui/list/List'

export default {
  name: 'yeast',

  components: {
    List,
    YeastsEditForm
  },

  data () {
    return {
      columns: ['name', 'laboratory', 'productId', 'type', 'form', 'attenuation', 'flocculation', 'inventory'],
      type: 'yeast',
      getNew: function (option) {
        return new Yeast(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Yeast.fromBeerXml(option)
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
