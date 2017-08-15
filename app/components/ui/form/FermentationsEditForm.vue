<template>
  <form>
    <div class="grid-4">
      <div class="col is-1-6">
        <label class="middle">Name</label>
      </div>
      <div class="col is-1-3">
        <input name="name" v-model="formData.name" v-validate="'required|myAlpha'" :class="{'is-alert': errors.has('name') }" type="text" placeholder="Name">
        <span v-show="errors.has('name')" class="pure-form-message is-alert">{{ errors.first('name') }}</span>
      </div>
      <div class="col is-1-6">
        <label class="middle">Type</label>
      </div>
      <div class="col is-1-3">
        <select name="fermentationStages" v-model.number="formData.fermentationStages" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('fermentationStages') }">
          <option disabled value="">Please select one</option>
          <option v-for="option in stagesList" :value="option.value" selected="selected" :key="option">
            {{ option.text }}
          </option>
        </select>
        <span v-show="errors.has('fermentationStages')" class="pure-form-message is-alert">{{ errors.first('fermentationStages') }}</span>
      </div>
    </div>

    <div class="grid">
      <div class="col chart">
        <chart :chartData="chartData" :options="chartOptions"></chart>
      </div>
    </div>

    <div v-if="formData.fermentationStages >= 1" class="grid-4">
      <div class="col is-1-6">
        <label class="middle">Primary Age</label>
      </div>
      <div class="col is-1-6">
        <input name="primaryAge" v-model.number="formData.primaryAge" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('primaryAge') }" type="text" placeholder="primary age">
        <span v-show="errors.has('primaryAge')" class="pure-form-message is-alert">{{ errors.first('primaryAge') }}</span>
      </div>
      <div class="col is-1-6">
        {{ ageUnit }}
      </div>
      <div class="col is-1-6">
        <label class="middle">Primary Temp</label>
      </div>
      <div class="col is-1-6">
        <input name="primaryTemp" v-model.number="primaryTemp" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('primaryTemp') }" type="text">
        <span v-show="errors.has('primaryTemp')" class="pure-form-message is-alert">{{ errors.first('primaryTemp') }}</span>
      </div>
      <div class="col is-1-6">
        °{{ $config.tempUnitie }}
      </div>
    </div>
    <div v-if="formData.fermentationStages >= 2" class="grid-4">
      <div class="col is-1-6">
        <label class="middle">Secondary Age</label>
      </div>
      <div class="col is-1-6">
        <input name="secondaryAge" v-model.number="formData.secondaryAge" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('secondaryAge') }" type="text" placeholder="secondary age">
        <span v-show="errors.has('secondaryAge')" class="pure-form-message is-alert">{{ errors.first('secondaryAge') }}</span>
      </div>
      <div class="col is-1-6">
        {{ ageUnit }}
      </div>
      <div class="col is-1-6">
        <label class="middle">Secondary Temp</label>
      </div>
      <div class="col is-1-6">
        <input name="secondaryTemp" v-model.number="secondaryTemp" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('secondaryTemp') }" type="text">
        <span v-show="errors.has('secondaryTemp')" class="pure-form-message is-alert">{{ errors.first('secondaryTemp') }}</span>
      </div>
      <div class="col is-1-6">
        °{{ $config.tempUnitie }}
      </div>
    </div>
    <div v-if="formData.fermentationStages >= 3" class="grid-4">
      <div class="col is-1-6">
        <label class="middle">Tertiary Age</label>
      </div>
      <div class="col is-1-6">
        <input name="tertiaryAge" v-model.number="formData.tertiaryAge" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('tertiaryAge') }" type="text" placeholder="tertiary age">
        <span v-show="errors.has('tertiaryAge')" class="pure-form-message is-alert">{{ errors.first('tertiaryAge') }}</span>
      </div>
      <div class="col is-1-6">
        {{ ageUnit }}
      </div>
      <div class="col is-1-6">
        <label class="middle">Tertiary Temp</label>
      </div>
      <div class="col is-1-6">
        <input name="tertiaryTemp" v-model.number="tertiaryTemp" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('tertiaryTemp') }" type="text">
        <span v-show="errors.has('tertiaryTemp')" class="pure-form-message is-alert">{{ errors.first('tertiaryTemp') }}</span>
      </div>
      <div class="col is-1-6">
        °{{ $config.tempUnitie }}
      </div>
    </div>
    <div class="grid-4">
      <div class="col is-1-6">
        <label class="middle">Age</label>
      </div>
      <div class="col is-1-6">
        <input name="age" v-model.number="formData.age" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('age') }" type="text" placeholder="age">
        <span v-show="errors.has('age')" class="pure-form-message is-alert">{{ errors.first('age') }}</span>
      </div>
      <div class="col is-1-6">
        {{ ageUnit }}
      </div>
      <div class="col is-1-6">
        <label class="middle">Age Temp</label>
      </div>
      <div class="col is-1-6">
        <input name="ageTemp" v-model.number="ageTemp" v-validate="'required|myNumeric'" :class="{'is-alert': errors.has('ageTemp') }" type="text">
        <span v-show="errors.has('ageTemp')" class="pure-form-message is-alert">{{ errors.first('ageTemp') }}</span>
      </div>
      <div class="col is-1-6">
        °{{ $config.tempUnitie }}
      </div>
    </div>
  </form>
</template>

<script>
import Fermentation from 'api/recettes/Fermentation'
import Chart from 'components/ui/Chart'

export default {
  name: 'FermentationEditForm',

  components: {
    Chart
  },

  props: {
    formData: Fermentation
  },

  data () {
    return {
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
      x += this.formData.primaryAge
      data.push({x: x, y: this.primaryTemp})
      if (this.formData.fermentationStages >= 2) {
        x += this.formData.secondaryAge
        data.push({x: x, y: this.secondaryTemp})
      }
      if (this.formData.fermentationStages >= 3) {
        x += this.formData.tertiaryAge
        data.push({x: x, y: this.tertiaryTemp})
      }
      x += this.formData.age
      data.push({x: x, y: this.ageTemp})

      return {
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
      }
    },
    stagesList () {
      return this.formData.getStagesList()
    },
    primaryTemp: {
      get: function () {
        return this.formData.getPrimaryTemp(this.$config.tempUnitie)
      },
      set: function (value) {
        this.formData.setPrimaryTemp(value, this.$config.tempUnitie)
      }
    },
    secondaryTemp: {
      get: function () {
        return this.formData.getSecondaryTemp(this.$config.tempUnitie)
      },
      set: function (value) {
        this.formData.setSecondaryTemp(value, this.$config.tempUnitie)
      }
    },
    tertiaryTemp: {
      get: function () {
        return this.formData.getTertiaryTemp(this.$config.tempUnitie)
      },
      set: function (value) {
        this.formData.setTertiaryTemp(value, this.$config.tempUnitie)
      }
    },
    ageTemp: {
      get: function () {
        return this.formData.getAgeTemp(this.$config.tempUnitie)
      },
      set: function (value) {
        this.formData.setAgeTemp(value, this.$config.tempUnitie)
      }
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

<style lang="scss">
.chart {
  display: flex;
  height: 150px;
  margin:0 auto;
}
</style>

