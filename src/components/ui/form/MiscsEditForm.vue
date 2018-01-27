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
        <label class="midle">Type</label>
      </div>
      <div class="col is-1-3">
        <select name="type" v-model="formData.type" v-validate:type.initial="'required'" :class="{'input': true, 'is-alert': errors.has('type') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in typeList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('type')" class="form-message is-alert">{{ errors.first('type') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Use</label>
      </div>
      <div class="col is-1-3">
        <select name="use" v-model="formData.use" v-validate:form.initial="'required'" :class="{'input': true, 'is-alert': errors.has('use') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in useList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('use')" class="form-message is-alert">{{ errors.first('use') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Time</label>
      </div>
      <div class="col is-1-3">
        <input name="time" v-model="formData.time" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('time') }" type="text" placeholder="Time">
        <span v-show="errors.has('time')" class="form-message is-alert">{{ errors.first('time') }}</span>
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
        <label class="midle">Use For</label>
      </div>
      <div class="col is-1-3">
        <input name="useFor" v-model="formData.useFor" v-validate:hsi.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('useFor') }" type="text">
        <span v-show="errors.has('useFor')" class="form-message is-alert">{{ errors.first('useFor') }}</span>
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
import Misc from 'api/recettes/Misc'

export default {
  props: {
    formData: Misc
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
