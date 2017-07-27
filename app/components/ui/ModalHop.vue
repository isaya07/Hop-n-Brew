<template>
  <div>
    <modal
      :id="id"
      :title="title"
      :cancelText="textcancel"
      :okText="textok"
      :size="size"
      @close="close"
      @cancel="cancel"
      @ok="close" animation="zoom">
      <hops-edit-form
        :formData="dataForm"
        @validated="validated">
      </hops-edit-form>
    </modal>
  </div>
</template>

<script>
import Modal from 'layout/Modal'
import HopsEditForm from './HopsEditForm'

export default {
  name: 'modal-hops',

  components: {
    Modal,
    HopsEditForm
  },

  props: {
    title: String,
    id: String
  },

  data () {
    const data = {
      dataForm: {},
      textok: 'Save',
      textcancel: 'Cancel',
      size: 'small'
    }
    return data
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
