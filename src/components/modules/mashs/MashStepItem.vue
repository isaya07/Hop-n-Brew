<template>
  <item @delete="removeStep">
    <div class="item-data">
      <div class="item-data-base">
        <div class="item-name">
          <input class="input" type="text" v-model.lazy="mashStep.name" placeholder="Step name">
        </div>

        <div class="item-unit">
          <div class="select">
            <select v-model.lazy="mashStep.type">
              <option v-for="option in typeSelect" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="item-data-plus">
        <div class="item-value">
          <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="mashStep.stepTemp" placeholder="Step temperature" >
        </div>
        <div class="item-unit">
          <div class="select">
            <select v-model.lazy="$config.tempUnitie">
              <option v-for="option in unitList.temp" :value=option :key="option">
                °{{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="item-value">
          <input class="input" type="text" v-debounce="debounceDelay" v-model.number.lazy="mashStep.stepTime" placeholder="Step time">
        </div>
        <div class="item-unit">
            <div class="select">
              <select v-model.lazy="$config.timeUnitie">
                <option v-for="option in unitList.time" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline" slot="content">
      <div class="column is-6">
        <v-input label="Ramp Time" v-debounce="debounceDelay" v-model.number.lazy="mashStep.rampTime" :unitie="$config.timeUnitie"></v-input>
      </div>
      <div class="column is-6">
        <v-input label="Warter Grain Ratio" v-debounce="debounceDelay" v-model.number.lazy="waterGrainRatio" :unitie="$config.ratioUnitie" :readonly="mashStep.type === 'Temperature' ? true : false"></v-input>
      </div>
      <div v-if="mashStep.type === 'Decoction'"  class="column is-6">
        <v-input label="Decoction Amount" v-debounce="debounceDelay" v-model.number.lazy="mashStep.decoctionAmt" :unitie="$config.volUnitie.toUpperCase()"></v-input>
      </div>
      <template v-else-if="mashStep.type === 'Infusion'">
        <div class="column is-6">
          <v-input label="Infuse Amount" v-debounce="debounceDelay" v-model.number.lazy="infuseAmount" :unitie="$config.volUnitie.toUpperCase()"></v-input>
        </div>
        <div class="column is-6">
          <v-input label="Infuse Temp" v-debounce="debounceDelay" v-model.number.lazy="mashStep.infuseTemp" :unitie="'°' + $config.tempUnitie" :readonly="true"></v-input>
        </div>
      </template>
      <div class="column is-12">
        <v-input label="Description" v-debounce="debounceDelay" v-model.number.lazy="mashStep.description" :readonly="true"></v-input>
      </div>
    </div>
  </item>
</template>

<script>
import MashStep from 'api/recettes/MashStep'
import Item from 'components/ui/Item'
import VInput from 'components/ui//base/Input'

export default {
  name: 'MashStepItem',

  props: {
    mashStep: Object,
    index: Number
  },

  components: {
    Item,
    VInput
  },

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
  },

  methods: {
    removeStep () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<style>

</style>
