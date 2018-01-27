<template>
  <div>
    <list
      :columns="columns"
      :type="type"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <hops-edit-form
        :formData="formdata"
        @validated="validated">
      </hops-edit-form>
    </list>
  </div>
</template>

<script>
import HopsEditForm from 'components/ui/form/HopsEditForm'
import Hop from 'api/recettes/Hop'
import List from 'components/ui/list/List'

export default {
  name: 'hop',

  components: {
    List,
    HopsEditForm
  },

  data () {
    return {
      columns: ['name', 'origin', 'type', 'alpha', 'beta', 'use', 'inventory'],
      type: 'hop',
      getNew: function (option) {
        return new Hop(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Hop.fromBeerXml(option)
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
