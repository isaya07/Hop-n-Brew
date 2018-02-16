<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-6">
      <v-input label="Name" v-model="formData.name"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Origin" v-model="formData.origin"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Substitutes" v-model="formData.substitutes"></v-input>
    </div>
    <div class="column is-6">
      <v-select label="Type" v-model="formData.type" :typeList="typeList"></v-select>
    </div>
    <div class="column is-6">
      <v-select label="Form" v-model="formData.form" :typeList="formList"></v-select>
    </div>
    <div class="column is-6">
      <v-input label="Alpha" v-model.number="formData.alpha" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Beta" v-model.number="formData.beta" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Stability" v-model.number="formData.hsi" :align="'has-text-right'" :rules="'myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Inventory" v-model.number="formData.inventory" :align="'has-text-right'" :rules="'myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Price" v-model.number="formData.price" :align="'has-text-right'" :rules="'myNumeric'"></v-input>
    </div>
    <div class="column">
      <v-textarea label="Notes" v-model="formData.notes" :rules="'myAlpha'"></v-textarea>
    </div>
  </div>
</template>

<script>
import Hop from 'api/recettes/Hop'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import VSelect from 'components/ui/base/Select'

export default {
  name: 'HopEditForm',

  components: {
    VInput,
    VTextarea,
    VSelect
  },

  props: {
    formData: Object
  },

  computed: {
    useList () {
      return Hop.getUseList()
    },
    typeList () {
      return Hop.getTypeList()
    },
    formList () {
      return Hop.getFormList()
    }
  },

  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(() => {
        this.$emit('validated', true, this.formData)
      }).catch(() => {
        this.$emit('validated', false, this.formData)
      })
    }
  },

  mounted () {
    this.$bus.$on('validateForm', () => {
      this.validateBeforeSubmit()
    })
  }
}
</script>
