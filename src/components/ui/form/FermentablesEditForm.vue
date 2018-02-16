<template>
    <div class="columns is-1 is-multiline is-mobile">
      <div class="column is-half">
        <v-input label="Name" v-model="formData.name"></v-input>
      </div>
      <div class="column is-half">
        <v-select label="Type" v-model="formData.type" :typeList="typeList"></v-select>
      </div>
      <div class="column is-half">
        <v-input label="Supplier" v-model="formData.supplier"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Origin" v-model="formData.origin"></v-input>
      </div>
      <div class="column  is-half">
        <v-input label="Color" v-model.number="formData.color" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Yield" v-model.number="formData.yield" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-half">
        <v-input label="% Max" v-model.number="formData.maxInBatch" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Inventory" v-model.number="formData.inventory" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Potential" v-model.number="formData.potential" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-one-quarter">
        <v-checkbox label="Recommend Mash" v-model="formData.recommendMash" :rules="''"></v-checkbox>
      </div>
      <div class="column is-one-quarter">
        <v-checkbox label="Add after Boil" v-model="formData.addAfterBoil" :rules="''"></v-checkbox>
      </div>
      <div class="column is-half">
        <v-input label="Coarse Fine Diff" v-model.number="formData.coarseFineDiff" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Moisture" v-model.number="formData.moisture" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Diastatic Power" v-model.number="formData.diastaticPower" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Protein" v-model.number="formData.protein" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Ibu Gal Per Lb" v-model.number="formData.ibuGalPerLb" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column is-half">
        <v-input label="Price" v-model.number="formData.price" :rules="'myNumeric'"></v-input>
      </div>
      <div class="column">
        <v-textarea label="Notes" v-model="formData.notes" :rules="'myAlpha'"></v-textarea>
      </div>
    </div>
</template>

<script>
import Fermentable from 'api/recettes/Fermentable'
import VInput from 'components/ui/base/Input'
import VSelect from 'components/ui/base/Select'
import VTextarea from 'components/ui/base/Textarea'
import VCheckbox from 'components/ui/base/Checkbox'

export default {
  name: 'FermentableEditForm',

  components: {
    VInput,
    VSelect,
    VTextarea,
    VCheckbox
  },

  props: {
    formData: [Fermentable, Object]
  },

  computed: {
    typeList () {
      return Fermentable.getTypeList()
    }
  },

  methods: {
    validateBeforeSubmit () {
      // this.$validator.validateAll().then(() => {
      this.$emit('validated', true, this.formData)
      /* }).catch(() => {
        this.$emit('validated', false, this.formData)
      }) */
    }
  },

  mounted () {
    this.$bus.$on('validateForm', () => {
      this.validateBeforeSubmit()
    })
  }
}
</script>
