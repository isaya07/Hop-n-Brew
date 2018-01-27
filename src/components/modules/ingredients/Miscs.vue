<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <miscs-edit-form
        :formData="formdata"
        @validated="validated">
      </miscs-edit-form>
    </list>
  </div>
</template>

<script>
import MiscsEditForm from 'components/ui/form/MiscsEditForm'
import Misc from 'api/recettes/Misc'
import List from 'components/ui/list/List'

export default {
  name: 'misc',

  components: {
    List,
    MiscsEditForm
  },

  data () {
    return {
      columns: ['name', 'type', 'use', 'inventory'],
      type: 'misc',
      getNew: function (option) {
        return new Misc(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Misc.fromBeerXml(option)
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
