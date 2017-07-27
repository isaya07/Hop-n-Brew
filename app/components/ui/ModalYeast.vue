<template>
  <div>
    <modal
      :id="id"
      :title="title"
      :cancelText="textcancel"
      :okText="textok"
      @close="close"
      @cancel="cancel"
      @ok="close" animation="zoom">
      <yeasts-edit-form
        :formData="dataForm"
        @validated="validated">
      </yeasts-edit-form>
    </modal>
  </div>
</template>

<script>
import Modal from 'layout/Modal'
import YeastsEditForm from './YeastsEditForm'

export default {
  name: 'modalyeast',

  components: {
    Modal,
    YeastsEditForm
  },

  props: {
    title: String,
    id: String
  },

  data () {
    return {
      dataForm: {},
      textok: 'Save',
      textcancel: 'Cancel',
      size: 'small'
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
