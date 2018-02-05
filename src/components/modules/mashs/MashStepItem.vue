<template>
        <item class="column is-full">
          <div class="control is-expanded">
            <input class="input" type="text" v-model.lazy="mashStep.name" placeholder="Step name">
          </div>
          <div class="control">
            <div class="select">
              <select v-model.lazy="mashStep.type">
                <option v-for="option in typeSelect" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="mashStep.stepTemp" placeholder="Step temperature" >
          </div>
          <div class="control">
            <div class="select">
              <select v-model.lazy="$config.tempUnitie">
                <option v-for="option in unitList.temp" :value=option :key="option">
                  °{{ option }}
                </option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="mashStep.stepTime" placeholder="Step time">
          </div>
          <div class="control">
            <div class="select">
              <select v-model.lazy="$config.timeUnitie">
                <option v-for="option in unitList.time" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <div class="control">
            <button class="button is-danger" @click="removeStep(index)">
              <span class="icon is-small">
                <icon :icon="['fas', 'trash']" />
              </span>
              <span class="is-hidden-touch">Remove</span>
            </button>
          </div>
          <div class="columns" slot="content">
            <div class="column is-4">
              <v-input label="Ramp Time" v-debounce="debounceDelay" v-model.number.lazy="mashStep.rampTime"></v-input>
            </div>
            <div class="column is-2">
              {{$config.timeUnitie}}
            </div>
            <div class="column is-2">
              <label>Warter Grain Ratio:</label>
            </div>
            <div class="column is-2">
              <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="waterGrainRatio" :readonly="mashStep.type === 'Temperature' ? true : false">
            </div>
            <div class="column is-2">
              {{$config.ratioUnitie}}
            </div>
          </div>
          <div v-if="mashStep.type === 'Decoction'" class="columns" slot="content">
            <div class="column is-2">
              <label>Decoction Amount:</label>
            </div>
            <div class="column is-2">
              <input class="input" v-debounce="debounceDelay" type="text" v-model.number.lazy="mashStep.decoctionAmt">
            </div>
            <div class="column is-2">
              {{$config.volUnitie.toUpperCase()}}
            </div>
          </div>
          <div v-else-if="mashStep.type === 'Infusion'" class="columns" slot="content">
            <div class="column is-2">
              <label>Infuse Amount:</label>
            </div>
            <div class="column is-2">
              <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="infuseAmount">
            </div>
            <div class="column is-2">
              {{$config.volUnitie.toUpperCase()}}
            </div>
            <div class="column is-2">
              <label>Infuse Temp:</label>
            </div>
            <div class="column is-2">
              <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="mashStep.infuseTemp" readonly>
            </div>
            <div class="column is-2">
              °{{$config.tempUnitie}}
            </div>
          </div>
          <div class="columns" slot="content">
            <div class="column is-2">
              <label>Description:</label>
            </div>
            <div class="column is-10">
              <input class="input" type="text" v-model.lazy="mashStep.description" readonly>
            </div>
          </div>
        </item>
</template>

<script>
import MashStep from 'api/recettes/MashStep'
import Item from 'components/ui/Item'
import VInput from 'components/ui//base/Input'
import debounce from 'components/directive/debounce'

export default {
  name: 'MashStepItem',

  props: {
    mashStep: Object
  },

  components: {
    Item,
    VInput
  },

  directives: {debounce},

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      typeSelect: MashStep.getTypeList(),
      debounceDelay: 1000
    }
  },

  computed: {
    waterGrainRatio: {
      get: function () {
        return this.mashStep.mash.getStepWaterRatio(this.mashStep.name, this.$config.ratioUnitie)
      },
      set: function (value) {
         this.mashStep.setWaterGrainRatio(value, this.$config.ratioUnitie)
      }
    },
    infuseAmount: {
      get: function () {
        return this.mashStep.getInfuseAmount(this.$config.volUnitie)
      },
      set: function (value) {
         this.mashStep.setInfuseAmount(value, this.$config.volUnitie)
      }
    }
  }
}
</script>

<style>

</style>
