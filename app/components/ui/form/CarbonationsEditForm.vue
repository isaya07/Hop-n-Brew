<template>
  <form>
    <div class="grid-4">
      <div class="col is-1-4">
        <label class="midle">Name</label>
      </div>
      <div class="col is-1-2">
        <input name="name" v-model="formData.name" v-validate="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('name') }" type="text" placeholder="Nom">
        <span v-show="errors.has('name')" class="form-message is-alert">{{ errors.first('name') }}</span>
      </div>
      <div class="col is-1-4">
        <label class="">
          Forced Carbonation
          <input type="checkbox" v-model="formData.forcedCarbonation">
        </label>
      </div>
      <!-- <div class="col is-1-6">
        <label class="label">Carbonation</label>
      </div>
      <div class="col is-1-3">
        <input name="carbonation" v-model="formData.carbonation" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('carbonation') }" type="text">
        <span v-show="errors.has('carbonation')" class="form-message is-alert">{{ errors.first('carbonation') }}</span>
      </div> -->
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Carbonation Used</label>
      </div>
      <div class="col is-1-4">
        <select name="carbonationUsed" v-model="formData.carbonationUsed" v-validate="'required|myAlpha'" :class="{'is-alert': errors.has('carbonationUsed') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in usedList" selected="formData.carbonationUsed" :key="option">
            {{ option }}
          </option>
        </select>
        <!-- <input name="carbonationUsed" v-model="formData.carbonationUsed" v-validate="'required|myText'" :class="{'input': true, 'is-alert': errors.has('carbonationUsed') }" type="text"> -->
        <span v-show="errors.has('carbonationUsed')" class="form-message is-alert">{{ errors.first('carbonationUsed') }}</span>
      </div>
        <div class="col is-1-4">
        <label class="label">Carbonation Temp</label>
      </div>
      <div class="col is-1-8">
        <input name="carbonationTemp" v-model="carbTemp" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('carbonationTemp') }" type="text">
        <span v-show="errors.has('carbonationTemp')" class="form-message is-alert">{{ errors.first('carbonationTemp') }}</span>
      </div>
      <div class="col is-1-8">
        °{{ $config.tempUnitie }}
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Priming Sugar Name</label>
      </div>
      <div class="col is-1-4">
        <input name="primingSugarName" v-model="formData.primingSugarName" v-validate="'required|myAlpha'" :class="{'input': true, 'is-alert': errors.has('primingSugarName') }" :disabled="formData.forcedCarbonation" type="text">
        <span v-show="errors.has('primingSugarName')" class="form-message is-alert">{{ errors.first('primingSugarName') }}</span>
      </div>
      <div class="col is-1-4">
        <label class="label">Priming Sugar Equivalent</label>
      </div>
      <div class="col is-1-8">
        <input name="primingSugarEquiv" v-model="formData.primingSugarEquiv" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('primingSugarEquiv') }" :disabled="formData.forcedCarbonation" type="text">
        <span v-show="errors.has('primingSugarEquiv')" class="form-message is-alert">{{ errors.first('primingSugarEquiv') }}</span>
      </div>
      <div class="col is-1-8">
        %
      </div>
    </div>

    <!-- <div class="grid-4">
      <div class="col is-1-6">
        <label class="label">Keg Priming Factor</label>
      </div>
      <div class="col is-1-3">
        <input name="kegPrimingFactor" v-model="formData.kegPrimingFactor" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('kegPrimingFactor') }" type="text">
        <span v-show="errors.has('kegPrimingFactor')" class="form-message is-alert">{{ errors.first('kegPrimingFactor') }}</span>
      </div>
    </div> -->

    <div class="grid-4">
      <div class="col is-1-6">
        <label class="midle">Notes</label>
      </div>
      <div class="col is-5-6">
        <textarea name="notes" v-model="formData.notes" v-validate="'myAlpha'" :class="{'input': true, 'is-alert': errors.has('notes') }" type="text"></textarea>
        <span v-show="errors.has('notes')" class="form-message is-alert">{{ errors.first('notes') }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import Carbonation from 'api/recettes/Carbonation'

export default {
  props: {
    formData: Carbonation
  },

  data () {
    return {
      usedList: Carbonation.getUsedList()
    }
  },

  computed: {
    carbTemp: {
      get: function () {
        return this.formData.getCarbonationTemp(this.$config.tempUnitie)
      },
      set: function (value) {
        this.formData.setCarbonationTemp(value, this.$config.tempUnitie)
      }
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
