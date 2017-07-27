<template>
  <div>
    <modal
      :title="title"
      :cancelText="textcancel"
      :okText="textok"
      @close="close"
      @cancel="cancel"
      @ok="close">
      <fermentables-edit-form
        :formData="dataForm"
        @validated="validated">
      </fermentables-edit-form>
    </modal>
  </div>
</template>

<script>
import Modal from 'layout/Modal'
import FermentablesEditForm from './FermentablesEditForm'

export default {
  name: 'modal-fermentables',

  components: {
    Modal,
    FermentablesEditForm
  },

  props: {
    title: String,
    id: String
  },

  data () {
    return {
      dataForm: {},
      textok: 'Save',
      textcancel: 'Cancel'
    }
  },

  methods: {
    setValue (data) {
      this.dataForm = data
    },
    validated () {
      this.$emit('validated')
    },
    cancel () {
      this.$emit('cancel')
    },
    close () {
      this.$emit('close')
    }
  },

  mounted () {
    this.$parent.$on('update', this.setValue)
  }
}
</script>
