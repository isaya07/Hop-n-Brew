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
          CalcBoilVolume
          <input type="checkbox" v-model="formData.calcBoilVolume">
        </label>
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Batch Size</label>
      </div>
      <div class="col is-1-8">
        <input name="batchSize" v-model="batchSize" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('batchSize') }" type="text">
        <span v-show="errors.has('batchSize')" class="form-message is-alert">{{ errors.first('batchSize') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
      <div class="col is-1-4">
        <label class="label">Boil Size</label>
      </div>
      <div class="col is-1-8">
        <input name="boilSize" v-model="boilSize" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('boilSize') }" type="text">
        <span v-show="errors.has('boilSize')" class="form-message is-alert">{{ errors.first('boilSize') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Tun Volume</label>
      </div>
      <div class="col is-1-8">
        <input name="tunVolume" v-model="tunVolume" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('tunVolume') }" type="text">
        <span v-show="errors.has('tunVolume')" class="form-message is-alert">{{ errors.first('tunVolume') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
      <div class="col is-1-4">
        <label class="label">Tun Weight</label>
      </div>
      <div class="col is-1-8">
        <input name="tunWeight" v-model="tunWeight" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('tunWeight') }" type="text">
        <span v-show="errors.has('tunWeight')" class="form-message is-alert">{{ errors.first('tunWeight') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.weightUnitie }}
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Tun SpecificHeat</label>
      </div>
      <div class="col is-1-8">
        <input name="tunSpecificHeat" v-model="formData.tunSpecificHeat" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('tunSpecificHeat') }" type="text">
        <span v-show="errors.has('tunSpecificHeat')" class="form-message is-alert">{{ errors.first('tunSpecificHeat') }}</span>
      </div>
      <div class="col is-1-8">
        cal/g/°C
      </div>
      <div class="col is-1-4">
        <label class="label">topUpWater</label>
      </div>
      <div class="col is-1-8">
        <input name="topUpWater" v-model="topUpWater" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('topUpWater') }" type="text">
        <span v-show="errors.has('topUpWater')" class="form-message is-alert">{{ errors.first('topUpWater') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Turb Chiller Loss</label>
      </div>
      <div class="col is-1-8">
        <input name="turbChillerLoss" v-model="turbChillerLoss" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('turbChillerLoss') }" type="text">
        <span v-show="errors.has('turbChillerLoss')" class="form-message is-alert">{{ errors.first('turbChillerLoss') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
      <div class="col is-1-4">
        <label class="label">Evap Rate</label>
      </div>
      <div class="col is-1-8">
        <input name="evapRate" v-model="formData.evapRate" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('evapRate') }" type="text">
        <span v-show="errors.has('evapRate')" class="form-message is-alert">{{ errors.first('evapRate') }}</span>
      </div>
      <div class="col is-1-8">
        %/hours
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Boil Time</label>
      </div>
      <div class="col is-1-8">
        <input name="boilTime" v-model="formData.boilTime" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('boilTime') }" type="text">
        <span v-show="errors.has('boilTime')" class="form-message is-alert">{{ errors.first('boilTime') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.timeUnitie }}
      </div>
      <div class="col is-1-4">
        <label class="label">Lauter Dead Space</label>
      </div>
      <div class="col is-1-8">
        <input name="lauterDeadspace" v-model="lauterDeadspace" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('lauterDeadspace') }" type="text">
        <span v-show="errors.has('lauterDeadspace')" class="form-message is-alert">{{ errors.first('lauterDeadspace') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
    </div>

    <div class="grid-4">
      <div class="col is-1-4">
        <label class="label">Top Up Kettle</label>
      </div>
      <div class="col is-1-8">
        <input name="topUpKettle" v-model="topUpKettle" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('topUpKettle') }" type="text">
        <span v-show="errors.has('topUpKettle')" class="form-message is-alert">{{ errors.first('topUpKettle') }}</span>
      </div>
      <div class="col is-1-8">
        {{ $config.volUnitie }}
      </div>
      <div class="col is-1-4">
        <label class="label">Hop Utilization</label>
      </div>
      <div class="col is-1-8">
        <input name="hopUtilization" v-model="formData.hopUtilization" v-validate="'required|myNumeric'" :class="{'input': true, 'is-alert': errors.has('hopUtilization') }" type="text">
        <span v-show="errors.has('hopUtilization')" class="form-message is-alert">{{ errors.first('hopUtilization') }}</span>
      </div>
      <div class="col is-1-8">
        %
      </div>
    </div>

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
import Equipment from 'api/recettes/Equipment'

export default {
  props: {
    formData: Equipment
  },

  computed: {
    batchSize: {
      get: function () {
        return this.formData.getBatchSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setBatchSize(value, this.$config.volUnitie)
      }
    },
    boilSize: {
      get: function () {
        return this.formData.getBoilSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setBoilSize(value, this.$config.volUnitie)
      }
    },
    tunVolume: {
      get: function () {
        return this.formData.getTunVolume(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setTunVolume(value, this.$config.volUnitie)
      }
    },
    tunWeight: {
      get: function () {
        return this.formData.getTunWeight(this.$config.weightUnitie)
      },
      set: function (value) {
        this.formData.setTunWeight(value, this.$config.weightUnitie)
      }
    },
    topUpWater: {
      get: function () {
        return this.formData.getTopUpWater(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setTopUpWater(value, this.$config.volUnitie)
      }
    },
    turbChillerLoss: {
      get: function () {
        return this.formData.getTurbChillerLoss(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setTurbChillerLoss(value, this.$config.volUnitie)
      }
    },
    lauterDeadspace: {
      get: function () {
        return this.formData.getLauterDeadspace(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setLauterDeadspace(value, this.$config.volUnitie)
      }
    },
    topUpKettle: {
      get: function () {
        return this.formData.getTopUpKettle(this.$config.volUnitie)
      },
      set: function (value) {
        this.formData.setTopUpKettle(value, this.$config.volUnitie)
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
