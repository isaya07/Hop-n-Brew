<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-6">
      <v-input label="Name" v-model="formData.name"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Laboratory" v-model="formData.laboratory"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Product Id" v-model="formData.productId"></v-input>
    </div>
    <div class="column is-6">
      <v-select label="Type" v-model="formData.type" :typeList="typeList"></v-select>
    </div>
    <div class="column is-6">
      <v-select label="Form" v-model="formData.form" :typeList="formList"></v-select>
    </div>
    <div class="column is-6">
      <v-input label="Attenuation" v-model="formData.attenuation" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-select label="Flocculation" v-model="formData.flocculation" :typeList="flocculationList"></v-select>
    </div>
    <div class="column is-6">
      <v-input label="Max Reuse" v-model="formData.maxReuse" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-checkbox label="Add to Secondary" v-model="formData.addToSecondary" :rules="''"></v-checkbox>
    </div>
    <div class="column is-6">
      <v-input label="Times Cultured" v-model="formData.timesCultured" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Inventory" v-model="formData.inventory" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-6">
      <v-input label="Price" v-model="formData.price" :align="'has-text-right'" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column">
      <v-textarea label="Notes" v-model="formData.notes" :rules="'myAlpha'"></v-textarea>
    </div>
  </div>
</template>

<script>
import Yeast from 'api/recettes/Yeast'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import VSelect from 'components/ui/base/Select'
import VCheckbox from 'components/ui/base/Checkbox'

export default {
  name: 'YeastEditForm',

  components: {
    VInput,
    VTextarea,
    VSelect,
    VCheckbox
  },

  props: {
    formData: Object
  },

  computed: {
    flocculationList () {
      return Yeast.getFlocculationList()
    },
    typeList () {
      return Yeast.getTypeList()
    },
    formList () {
      return Yeast.getFormList()
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
