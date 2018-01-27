<template>
  <form>
    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Name</label>
      </div>
      <div class="col is-1-3">
        <input name="name" v-model="formData.name" v-validate:name.initial="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('name') }" type="text" placeholder="Nom">
        <span v-show="errors.has('name')" class="form-message is-alert">{{ errors.first('name') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Calcium</label>
      </div>
      <div class="col is-1-3">
        <input name="calcium" v-model="formData.calcium" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('calcium') }" type="text">
        <span v-show="errors.has('calcium')" class="form-message is-alert">{{ errors.first('calcium') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Bicarbonate</label>
      </div>
      <div class="col is-1-3">
        <input name="bicarbonate" v-model="formData.bicarbonate" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('bicarbonate') }" type="text">
        <span v-show="errors.has('bicarbonate')" class="form-message is-alert">{{ errors.first('bicarbonate') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Sulfate</label>
      </div>
      <div class="col is-1-3">
        <input name="sulfate" v-model="formData.sulfate" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('sulfate') }" type="text">
        <span v-show="errors.has('sulfate')" class="form-message is-alert">{{ errors.first('sulfate') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Chloride</label>
      </div>
      <div class="col is-1-3">
        <input name="chloride" v-model="formData.chloride" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('chloride') }" type="text">
        <span v-show="errors.has('chloride')" class="form-message is-alert">{{ errors.first('chloride') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Sodium</label>
      </div>
      <div class="col is-1-3">
        <input name="sodium" v-model="formData.sodium" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('sodium') }" type="text">
        <span v-show="errors.has('sodium')" class="form-message is-alert">{{ errors.first('sodium') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Magnesium</label>
      </div>
      <div class="col is-1-3">
        <input name="magnesium" v-model="formData.magnesium" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('magnesium') }" type="text">
        <span v-show="errors.has('magnesium')" class="form-message is-alert">{{ errors.first('magnesium') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">PH</label>
      </div>
      <div class="col is-1-3">
        <input name="ph" v-model="formData.ph" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('ph') }" type="text">
        <span v-show="errors.has('ph')" class="form-message is-alert">{{ errors.first('ph') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Amount</label>
      </div>
      <div class="col is-1-3">
        <input name="amount" v-model="formData.amount" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('amount') }" type="text" placeholder="Amount">
        <span v-show="errors.has('amount')" class="form-message is-alert">{{ errors.first('amount') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Inventory</label>
      </div>
      <div class="col is-1-3">
        <input name="inventory" v-model="formData.inventory" v-validate:inventory.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('inventory') }" type="text">
        <span v-show="errors.has('inventory')" class="form-message is-alert">{{ errors.first('inventory') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Price</label>
      </div>
      <div class="col is-1-3">
        <input name="price" v-model="formData.price" v-validate:price.initial="'myNumeric'" :class="{'input': true, 'is-alert': errors.has('price') }" type="text">
        <span v-show="errors.has('price')" class="form-message is-alert">{{ errors.first('price') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Notes</label>
      </div>
      <div class="col is-5-6">
        <textarea name="notes" v-model="formData.notes" v-validate:notes.initial="'myAlpha'" :class="{'input': true, 'is-alert': errors.has('notes') }" type="text"></textarea>
        <span v-show="errors.has('notes')" class="form-message is-alert">{{ errors.first('notes') }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import Water from 'api/recettes/Water'

export default {
  props: {
    formData: Water
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
