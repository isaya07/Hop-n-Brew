<template>
    <form>
      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Name</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="name" v-model="formData.name" v-validate="'required|myAlpha'" :class="{'is-alert': errors.has('name') }" type="text" placeholder="Name">
          <span v-show="errors.has('name')" class="pure-form-message is-alert">{{ errors.first('name') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Type</label>
        </div>
        <div class="col is-1-3">
          <select class="pure-input-1" v-model="formData.type" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('type') }">
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
          <label class="middle">Supplier</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="supplier" v-model="formData.supplier" v-validate="'myAlpha'" :class="{'is-alert': errors.has('supplier') }" type="text" placeholder="supplier">
          <span v-show="errors.has('supplier')" class="pure-form-message is-alert">{{ errors.first('supplier') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Origin</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="origin" v-model="formData.origin" v-validate="'myAlpha'" :class="{'is-alert': errors.has('origin') }" type="text" placeholder="origin">
          <span v-show="errors.has('origin')" class="pure-form-message is-alert">{{ errors.first('origin') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Color</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="color" v-model="formData.color" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('color') }" type="number" step=".1" placeholder="Couleur">
          <span v-show="errors.has('color')" class="pure-form-message is-alert">{{ errors.first('color') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Yield</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="yield" v-model="formData.yield" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('yield') }" type="number">
          <span v-show="errors.has('yield')" class="pure-form-message is-alert">{{ errors.first('yield') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">% Max</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="maxInBatch" v-model="formData.maxInBatch" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('maxInBatch') }" type="number" step="any">
          <span v-show="errors.has('maxInBatch')" class="pure-form-message is-alert">{{ errors.first('maxInBatch') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Inventory</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="inventory" v-model="formData.inventory" v-validate="'myNumeric'" :class="{'is-alert': errors.has('inventory') }" type="number" step="any">
          <span v-show="errors.has('inventory')" class="pure-form-message is-alert">{{ errors.first('inventory') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Potential</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="potential" v-model="formData.potential" v-validate="'myNumeric'" :class="{'input': true, 'is-alert': errors.has('potential') }" type="number" step="any">
          <span v-show="errors.has('potential')" class="pure-form-message is-alert">{{ errors.first('potential') }}</span>
        </div>
        <div class="col is-1-4">
          <label class="pure-checkbox middle">
            <input type="checkbox" v-model="formData.recomendMash">
            Recomend Mash
          </label>
        </div>
        <div class="col is-1-4">
          <label class="pure-checkbox middle">
            <input type="checkbox" v-model="formData.addAfterBoil">
            Add after Boil
          </label>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Coarse Fine Dif</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="coarseFineDif" v-model="formData.coarseFineDif" v-validate="'myNumeric'" :class="{'is-alert': errors.has('coarseFineDif') }" type="number" step="any">
          <span v-show="errors.has('coarseFineDif')" class="pure-form-message is-alert">{{ errors.first('coarseFineDif') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Moisture</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="moisture" v-model="formData.moisture" v-validate="'myNumeric'" :class="{'is-alert': errors.has('moisture') }" type="number" step="any">
          <span v-show="errors.has('moisture')" class="pure-form-message is-alert">{{ errors.first('moisture') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Diastatic Power</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="diastaticPower" v-model="formData.diastaticPower" v-validate="'myNumeric'" :class="{'is-alert': errors.has('diastaticPower') }" type="number" step="any">
          <span v-show="errors.has('diastaticPower')" class="pure-form-message is-alert">{{ errors.first('diastaticPower') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Proteine</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="proteine" v-model="formData.proteine" v-validate="'myNumeric'" :class="{'is-alert': errors.has('proteine') }" type="number" step="any">
          <span v-show="errors.has('proteine')" class="pure-form-message is-alert">{{ errors.first('proteine') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Ibu Gal Per Lb</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="ibuGalPerLb" v-model="formData.ibuGalPerLb" v-validate="'myNumeric'" :class="{'is-alert': errors.has('ibuGalPerLb') }" type="number" step="any">
          <span v-show="errors.has('ibuGalPerLb')" class="pure-form-message is-alert">{{ errors.first('ibuGalPerLb') }}</span>
        </div>
        <div class="col is-1-6">
          <label class="middle">Price</label>
        </div>
        <div class="col is-1-3">
          <input class="pure-input-1" name="price" v-model="formData.price" v-validate="'myNumeric'" :class="{'is-alert': errors.has('price') }" type="number" step="any">
          <span v-show="errors.has('price')" class="pure-form-message is-alert">{{ errors.first('price') }}</span>
        </div>
      </div>

      <div class="grid-4">
        <div class="col is-1-6">
          <label class="middle">Notes</label>
        </div>
        <div class="col is-5-6">
          <textarea class="pure-input-1" name="notes" v-model="formData.notes" v-validate="'myAlpha'" :class="{'is-alert': errors.has('notes') }" type="text"></textarea>
          <span v-show="errors.has('notes')" class="pure-form-message is-alert">{{ errors.first('notes') }}</span>
        </div>
      </div>

    </form>
</template>

<script>
import Fermentable from 'api/recettes/Fermentable'

export default {
  props: {
    formData: Fermentable
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
