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
        <label class="midle">Origin</label>
      </div>
      <div class="col is-1-3">
        <input name="origin" v-model="formData.origin" v-validate:origin.initial="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('origin') }" type="text" placeholder="origin">
        <span v-show="errors.has('origin')" class="form-message is-alert">{{ errors.first('origin') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Substitutes</label>
      </div>
      <div class="col is-1-3">
        <input name="substitutes" v-model="formData.substitutes" v-validate:substitutes.initial="'myAlpha'" :class="{'input': true, 'is-alert': errors.has('substitutes') }" type="text" placeholder="substitutes">
        <span v-show="errors.has('substitutes')" class="form-message is-alert">{{ errors.first('substitutes') }}</span>
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
        <label class="midle">Form</label>
      </div>
      <div class="col is-1-3">
        <select name="form" v-model="formData.form" v-validate:form.initial="'required'" :class="{'input': true, 'is-alert': errors.has('form') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in formList" selected="selected" :key="option">
            {{ option }}
          </option>
        </select>
        <span v-show="errors.has('form')" class="form-message is-alert">{{ errors.first('form') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="label">Alpha</label>
      </div>
      <div class="col is-1-3">
        <input name="alpha" v-model="formData.alpha" v-validate:alpha.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('alpha') }" type="text" placeholder="Couleur">
        <span v-show="errors.has('alpha')" class="form-message is-alert">{{ errors.first('alpha') }}</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Beta</label>
      </div>
      <div class="col is-1-3">
        <input name="beta" v-model="formData.beta" v-validate:beta.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('beta') }" type="text">
        <span v-show="errors.has('beta')" class="form-message is-alert">{{ errors.first('beta') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="midle">Stability</label>
      </div>
      <div class="col is-1-3">
        <input name="hsi" v-model="formData.hsi" v-validate:hsi.initial="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('hsi') }" type="text">
        <span v-show="errors.has('hsi')" class="form-message is-alert">{{ errors.first('hsi') }}</span>
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
import Hop from 'api/recettes/Hop'

export default {
  props: {
    formData: Hop
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
