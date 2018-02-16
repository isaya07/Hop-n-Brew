<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-full">
      <area-chart :chartData="chartData" :width="500" :height="150" :xLabel="'day'" :yLabel="'°' + $config.tempUnitie"></area-chart>
    </div>
    <div class="column is-6">
      <v-input label="Name" v-model="data.name"></v-input>
    </div>
    <div class="column is-6">
      <v-select label="Type" v-model="data.fermentationStages" :typeList="stagesList" :optionType="true"></v-select>
    </div>
    <template v-if="data.fermentationStages >= 1">
      <div class="column is-4">
        <v-input label="Primary Age" :align="'has-text-right'" v-model.number="data.primaryAge" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ ageUnit | capitalize}}
        </div>
      </div>
      <div class="column  is-4">
        <v-input label="Primary Temp" :align="'has-text-right'" v-model.number="primaryTemp" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ $config.tempUnitie | capitalize}}
        </div>
      </div>
    </template>
    <template v-if="data.fermentationStages >= 2">
      <div class="column is-4">
        <v-input label="Secondary Age" :align="'has-text-right'" v-model.number="data.secondaryAge" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ ageUnit | capitalize}}
        </div>
      </div>
      <div class="column  is-4">
        <v-input label="Secondary Temp" :align="'has-text-right'" v-model.number="secondaryTemp" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ $config.tempUnitie | capitalize}}
        </div>
      </div>
    </template>
    <template v-if="data.fermentationStages >= 3">
      <div class="column is-4">
        <v-input label="Tertiary Age" :align="'has-text-right'" v-model.number="data.tertiaryAge" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ ageUnit | capitalize}}
        </div>
      </div>
      <div class="column  is-4">
        <v-input label="Tertiary Temp" :align="'has-text-right'" v-model.number="tertiaryTemp" :rules="'required|myNumeric'"></v-input>
      </div>
      <div class="column  is-2">
        <div class="field-label is-normal has-text-weight-bold has-text-left">
          {{ $config.tempUnitie | capitalize}}
        </div>
      </div>
    </template>
    <div class="column is-4">
      <v-input label="Age" :align="'has-text-right'" v-model.number="data.age" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        {{ ageUnit | capitalize}}
      </div>
    </div>
    <div class="column  is-4">
      <v-input label="Age Temp" :align="'has-text-right'" v-model.number="ageTemp" :rules="'required|myNumeric'"></v-input>
    </div>
    <div class="column  is-2">
      <div class="field-label is-normal has-text-weight-bold has-text-left">
        {{ $config.tempUnitie | capitalize}}
      </div>
    </div>
    <div class="column">
      <v-textarea label="Notes" v-model="data.notes" :rules="'myAlpha'"></v-textarea>
    </div>
  </div>
</template>

<script>
import Fermentation from 'api/recettes/Fermentation'
// import Chart from 'components/ui/Chart'
import AreaChart from 'components/ui/AreaChart'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'
import VSelect from 'components/ui/base/Select'

export default {
  name: 'FermentationEditForm',

  components: {
    AreaChart,
    VInput,
    VSelect,
    VTextarea
  },

  props: {
    formData: Object
  },

  data () {
    return {
      data: new Fermentation(this.formData),
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      },
      ageUnit: 'Day'
    }
  },

  computed: {
    chartData () {
      let data = []
      let x = 0
      data.push({x: x, y: this.primaryTemp})
      x += this.data.primaryAge
      data.push({x: x, y: this.primaryTemp})
      if (this.data.fermentationStages >= 2) {
        x += this.data.secondaryAge
        data.push({x: x, y: this.secondaryTemp})
      }
      if (this.data.fermentationStages >= 3) {
        x += this.data.tertiaryAge
        data.push({x: x, y: this.tertiaryTemp})
      }
      x += this.data.age
      data.push({x: x, y: this.ageTemp})
      return data
      // return [this.primaryTemp, this.secondaryTemp, this.tertiaryTemp, this.ageTemp]
      /* return {
        datasets: [
          {
            lineTension: 0,
            steppedLine: 'after',
            label: '',
            backgroundColor: 'rgba(255, 51, 51, 0.5)',
            borderColor: 'rgba(255, 51, 51, 1)',
            radius: 0,
            borderWidth: 2,
            data: data
          }
        ]
      } */
    },
    stagesList () {
      return Fermentation.getStagesList()
    },
    primaryTemp: {
      get: function () {
        return this.data.getPrimaryTemp(this.$config.tempUnitie.toLowerCase())
      },
      set: function (value) {
        this.data.setPrimaryTemp(value, this.$config.tempUnitie.toLowerCase())
      }
    },
    secondaryTemp: {
      get: function () {
        return this.data.getSecondaryTemp(this.$config.tempUnitie.toLowerCase())
      },
      set: function (value) {
        this.data.setSecondaryTemp(value, this.$config.tempUnitie.toLowerCase())
      }
    },
    tertiaryTemp: {
      get: function () {
        return this.data.getTertiaryTemp(this.$config.tempUnitie.toLowerCase())
      },
      set: function (value) {
        this.data.setTertiaryTemp(value, this.$config.tempUnitie.toLowerCase())
      }
    },
    ageTemp: {
      get: function () {
        return this.data.getAgeTemp(this.$config.tempUnitie.toLowerCase())
      },
      set: function (value) {
        this.data.setAgeTemp(value, this.$config.tempUnitie.toLowerCase())
      }
    }
  },

  methods: {
    validateBeforeSubmit () {
      let send = {...this.data, ...{id: this.formData.id}}
      this.$validator.validateAll().then(() => {
        this.$emit('validated', true, send)
      }).catch(() => {
        this.$emit('validated', false, send)
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

<style lang="scss">
.chart {
  display: flex;
  height: 150px;
  margin:0 auto;
}
</style>
