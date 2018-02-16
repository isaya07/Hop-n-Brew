<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-6">
      <v-input label="Name" v-model="formData.name"></v-input>
    </div>
    <div class="column is-6">
      <v-select label="Type" v-model="formData.type" :typeList="typeList"></v-select>
    </div>
    <div class="column is-6">
      <v-select label="Use" v-model="formData.use" :typeList="useList"></v-select>
    </div>
    <div class="column is-6">
      <v-input label="Time" v-model.number="formData.time" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Amount" v-model.number="formData.amount" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Use For" v-model="formData.useFor"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Inventory" v-model.number="formData.inventory" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Price" v-model.number="formData.price" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column">
      <v-textarea label="Notes" v-model="formData.notes" :rules="'myAlpha'"></v-textarea>
    </div>
  </div>
</template>

<script>
import Misc from 'api/recettes/Misc'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import VSelect from 'components/ui/base/Select'

export default {
  name: 'YeastEditForm',

  components: {
    VInput,
    VTextarea,
    VSelect
  },

  props: {
    formData: Object
  },

  data () {
    return {
      useList: Misc.getUseList(),
      typeList: Misc.getTypeList()
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
