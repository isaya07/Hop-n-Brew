<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-6">
      <v-input label="Name" v-model="data.name"></v-input>
    </div>
    <div class="column is-6">
      <v-checkbox label="Calc Boil Volume" v-model="data.calcBoilVolume" :rules="''"></v-checkbox>
    </div>
    <div class="column is-4">
      <v-input label="Batch Size" :align="'has-text-right'" v-model="batchSize" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        {{ $config.volUnitie | capitalize}}
      </div>
    </div>
    <div class="column is-4">
      <v-input label="Boil Size" :align="'has-text-right'" v-model="boilSize" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        {{ $config.volUnitie | capitalize}}
      </div>
    </div>
    <div class="column  is-4">
      <v-input label="Tun Volume" :align="'has-text-right'" v-model="tunVolume" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        {{ $config.volUnitie | capitalize}}
      </div>
    </div>
    <div class="column  is-4">
      <v-input label="Tun Weight" :align="'has-text-right'" v-model="tunWeight" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.weightUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Tun SpecificHeat" :align="'has-text-right'" v-model="data.tunSpecificHeat" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        cal/g/°C
      </div>
    </div>
    <div class="column  is-4">
      <v-input label="Top Up Water" :align="'has-text-right'" v-model="topUpWater" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.volUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Turb Chiller Loss" :align="'has-text-right'" v-model="turbChillerLoss" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.volUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Evap Rate" :align="'has-text-right'" v-model="data.evapRate" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        %/hours
      </div>
    </div>
    <div class="column  is-4">
      <v-input label="Boil Time" :align="'has-text-right'" v-model="data.boilTime" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.timeUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Lauter Dead Space" :align="'has-text-right'" v-model="lauterDeadspace" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.volUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Top Up Kettle" :align="'has-text-right'" v-model="topUpKettle" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">         {{ $config.volUnitie | capitalize}}  </div>
    </div>
    <div class="column  is-4">
      <v-input label="Hop Utilization" :align="'has-text-right'" v-model="data.hopUtilization" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        %
      </div>
    </div>
    <div class="column">
      <v-textarea label="Notes" v-model="data.notes" :rules="'myAlpha'"></v-textarea>
    </div>
  </div>
</template>

<script>
import Equipment from 'api/recettes/Equipment'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import VCheckbox from 'components/ui/base/Checkbox'

export default {
  name: 'EquipmentEditForm',

  components: {
    VInput,
    VTextarea,
    VCheckbox
  },

  props: {
    formData: Object
  },

  data () {
    return {
      data: new Equipment(this.formData)
    }
  },

  computed: {
    batchSize: {
      get: function () {
        return this.data.getBatchSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setBatchSize(value, this.$config.volUnitie)
      }
    },
    boilSize: {
      get: function () {
        return this.data.getBoilSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setBoilSize(value, this.$config.volUnitie)
      }
    },
    tunVolume: {
      get: function () {
        return this.data.getTunVolume(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setTunVolume(value, this.$config.volUnitie)
      }
    },
    tunWeight: {
      get: function () {
        return this.data.getTunWeight(this.$config.weightUnitie)
      },
      set: function (value) {
        this.data.setTunWeight(value, this.$config.weightUnitie)
      }
    },
    topUpWater: {
      get: function () {
        return this.data.getTopUpWater(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setTopUpWater(value, this.$config.volUnitie)
      }
    },
    turbChillerLoss: {
      get: function () {
        return this.data.getTurbChillerLoss(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setTurbChillerLoss(value, this.$config.volUnitie)
      }
    },
    lauterDeadspace: {
      get: function () {
        return this.data.getLauterDeadspace(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setLauterDeadspace(value, this.$config.volUnitie)
      }
    },
    topUpKettle: {
      get: function () {
        return this.data.getTopUpKettle(this.$config.volUnitie)
      },
      set: function (value) {
        this.data.setTopUpKettle(value, this.$config.volUnitie)
      }
    }
  },

  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(() => {
        this.$emit('validated', true, {...this.data, ...{id: this.formData.id}})
      }).catch(() => {
        this.$emit('validated', false, this.data)
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
