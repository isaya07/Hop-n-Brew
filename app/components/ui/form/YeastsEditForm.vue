<template>
  <form>
    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Name</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="name" v-model="formData.name" v-validate:name.initial="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('name') }" type="text" placeholder="Nom">
        <span v-show="errors.has('name')" class="pure-form-message is-alert">{{ errors.first('name') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Laboratory</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="laboratory" v-model="formData.laboratory" v-validate:laboratory.initial="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('laboratory') }" type="text" placeholder="laboratory">
        <span v-show="errors.has('laboratory')" class="pure-form-message is-alert">{{ errors.first('laboratory') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Product Id</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="productId" v-model="formData.productId" v-validate:productId.initial="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('productId') }" type="text" placeholder="productId">
        <span v-show="errors.has('productId')" class="pure-form-message is-alert">{{ errors.first('productId') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Type</label>
      </div>
      <div class="col is-1-3">
        <select class="pure-input-1" name="type" data-vv-name="type" v-model="formData.type" v-validate:type.initial="'required'" :class="{'input': true, 'is-alert': errors.has('type') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in typeList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('type')" class="pure-form-message is-alert">{{ errors.first('type') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Form</label>
      </div>
      <div class="col is-1-3">
        <select class="pure-input-1" name="form" v-model="formData.form" v-validate:form.initial="'required'" :class="{'input': true, 'is-alert': errors.has('form') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in formList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('form')" class="pure-form-message is-alert">{{ errors.first('form') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Attenuation</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="attenuation" v-model="formData.attenuation" v-validate:attenuation.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('attenuation') }" type="text" placeholder="Couleur">
        <span v-show="errors.has('attenuation')" class="pure-form-message is-alert">{{ errors.first('attenuation') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Flocculation</label>
      </div>
      <div class="col is-1-3">
        <select class="pure-input-1" name="flocculation" v-model="formData.flocculation" v-validate:flocculation.initial="'required'" :class="{'input': true, 'is-alert': errors.has('flocculation') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in flocculationList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('flocculation')" class="pure-form-message is-alert">{{ errors.first('flocculation') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Max Reuse</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="maxReuse" v-model="formData.maxReuse" v-validate:maxReuse.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('maxReuse') }" type="text">
        <span v-show="errors.has('maxReuse')" class="pure-form-message is-alert">{{ errors.first('maxReuse') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-2">
        <label class="pure-checkbox middle">
          <input class="pure-input-1" type="checkbox" v-model="formData.addToSecondary">
          Add to Secondary
        </label>
      </div>
      <div class="col is-1-6">
        <label class="label">Times Cultured</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="timesCultured" v-model="formData.timesCultured" v-validate:timesCultured.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('timesCultured') }" type="text">
        <span v-show="errors.has('timesCultured')" class="pure-form-message is-alert">{{ errors.first('timesCultured') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Inventory</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="inventory" v-model="formData.inventory" v-validate:inventory.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('inventory') }" type="text">
        <span v-show="errors.has('inventory')" class="pure-form-message is-alert">{{ errors.first('inventory') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Price</label>
      </div>
      <div class="col is-1-3">
        <input class="pure-input-1" name="price" v-model="formData.price" v-validate:price.initial="'myNumeric'" :class="{'input': true, 'is-alert': errors.has('price') }" type="text">
        <span v-show="errors.has('price')" class="pure-form-message is-alert">{{ errors.first('price') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Notes</label>
      </div>
      <div class="col is-5-6">
        <textarea class="pure-input-1" name="notes" v-model="formData.notes" v-validate:notes.initial="'myAlpha'" :class="{'input': true, 'is-alert': errors.has('notes') }" type="text"></textarea>
        <span v-show="errors.has('notes')" class="pure-form-message is-alert">{{ errors.first('notes') }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import Yeast from 'api/recettes/Yeast'

export default {

  props: {
    formData: Yeast
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
