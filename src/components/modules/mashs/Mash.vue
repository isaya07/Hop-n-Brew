<template>
  <div>
  <!-- <div class="columns is-multiline is-mobile"> -->
    <!--  <div class='column is-full'> -->
      <div class="columns is-multiline is-mobile">
        <div class="column is-12-mobile">
          <v-input label="Name" v-model="mash.name"></v-input>
        </div>
        <div class="column is-narrow">
          <v-checkbox label="Adjust temp equipment" v-model="mash.equipAdjust" :rules="''"></v-checkbox>
        </div>
      </div>
      <div class="columns is-multiline is-mobile">
        <div class="column is-6-mobile is-6-tablet is-3-desktop">
          <v-input label="Grain temp" v-model.number="mash.grainTemp" :unitie="'°' + $config.tempUnitie"></v-input>
        </div>
        <div class="column is-6-mobile is-6-tablet is-3-desktop">
          <v-input label="Tun temp" v-model.number="mash.tunTemp" :unitie="'°' + $config.tempUnitie"></v-input>
        </div>

        <div class="column is-6-mobile is-6-tablet is-3-desktop">
          <v-input label="Sparge temp" v-model.number="mash.spargeTemp" :unitie="'°' + $config.tempUnitie"></v-input>
        </div>
        <div class="column is-6-mobile is-6-tablet is-3-desktop">
          <v-input label="Sparge vol" v-model.number="spargeVol" :unitie="$config.volUnitie.toUpperCase()" readonly></v-input>
        </div>
      </div>
    <!-- </div>
    <div class='column is-full'> -->
      <div class="box is-clearfix">
        <h5 class="is-size-6 has-text-weight-bold">Mash Steps :</h5>
        <hr>
        <mash-step-item v-for="(steps, index) in mashSteps" :key="index"
          :mashStep="steps"
          :index="index"
          @delete="removeStep">
        </mash-step-item>
        <button class="button is-info is-pulled-right" @click="addStep">
        <span class="icon is-small">
          <icon :icon="['fas', 'plus']" />
        </span>
        <span>Add Step</span>
      </button>
      </div>
    <!-- </div>
    <div class="column is-full"> -->
      <area-chart :chartData="chartData" :xLabel="'min'" :yLabel="'°' + $config.tempUnitie"></area-chart>
    <!-- </div>
    <div class="column is-full"> -->
      <v-textarea label="Mash Notes" v-model="mash.notes"></v-textarea>
    <!-- </div> -->
  </div>
</template>

<script>
import AreaChart from 'components/ui/AreaChart'
import VTextarea from 'components/ui/base/Textarea'
import VInput from 'components/ui//base/Input'
import VCheckbox from 'components/ui/base/Checkbox'
import MashStepItem from 'components/modules/mashs/MashStepItem'

export default {
  name: 'mash',

  components: {
    AreaChart,
    VTextarea,
    VInput,
    VCheckbox,
    MashStepItem
  },

  props: {
    mash: Object
  },

  computed: {
    chartData () {
      let mashsteps = this.mashSteps
      // console.log(this.mash.getMashSteps())
      let data = []
      let time = 0
      let temp = 0
      if (mashsteps && mashsteps.length !== 0) {
        for (let i = 0; i < mashsteps.length; i++) {
          if (mashsteps[i].rampTime !== 0) {
            data.push({x: time, y: temp})
            time = time + mashsteps[i].rampTime
          }
          data.push({x: time, y: mashsteps[i].stepTemp})
          // temp = mashsteps[i].stepTemp
          time = time + mashsteps[i].stepTime
          data.push({x: time, y: mashsteps[i].endTemp})
          temp = mashsteps[i].endTemp
        }
        // data.push({x: time, y: temp})
      }
      return data
    },
    spargeVol () {
      return this.mash.getSpargeVol(this.$config.volUnitie)
    },
    mashSteps () {
      return this.mash.getMashSteps()
    }
  },
  methods: {
    addStep () {
      this.mash.add()
    },
    removeStep (id) {
      this.mash.remove(id)
    }
  }
}
</script>

<style>

</style>
