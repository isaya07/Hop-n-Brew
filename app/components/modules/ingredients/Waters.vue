<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <waters-edit-form
        :formData="formdata"
        @validated="validated">
      </waters-edit-form>
    </list>
  </div>
</template>

<script>
import WatersEditForm from 'components/ui/form/WatersEditForm'
import Water from 'api/recettes/Water'
import List from 'components/ui/list/List'

export default {
  name: 'water',

  components: {
    List,
    WatersEditForm
  },

  data () {
    return {
      columns: ['name', 'ph', 'calcium', 'bicarbonate', 'sulfate', 'chloride', 'sodium', 'magnesium'],
      type: 'water',
      getNew: function (option) {
        return new Water(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Water.fromBeerXml(option)
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
