<template>
  <section class="section">
    <list
      :columns="columns"
      :type="type"
      :forEdit="true"
      :withAdd="true"
      :search="true"
      :title="true"
      :newFunc="getNew"
      :staticFunc="getStatic"
      @dataForm="updateFormData">
      <styles-edit-form
        :formData="formdata"
        @validated="validated">
      </styles-edit-form>
    </list>
  </section>
</template>

<script>
import StylesEditForm from 'components/ui/form/StylesEditForm'
import Style from 'api/recettes/Style'
import List from 'components/ui/list/List'

export default {
  name: 'style',

  components: {
    List,
    StylesEditForm
  },

  data () {
    return {
      columns: ['name', 'type', 'category', 'styleGuide'],
      type: 'style',
      getNew: function (option) {
        return new Style(option)
      }, // .bind(this),
      getStatic: function (option) {
        return Style.fromBeerXml(option)
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
