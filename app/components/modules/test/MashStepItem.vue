<template>
  <div class="item center">
    <div class="item-inline" v-if="stepData">
      <button class="btn first" @click="toggleContent">
        <span class="right-arrow" :class="contentVisible ? 'close' : ''"></span>
      </button>
      <input class="is-flex-grow-2" type="text" v-model="stepData.name" placeholder="Step name">
      <div class="select is-flex-grow-4">
        <select v-model="stepData.type">
          <option v-for="option in typeSelect" selected="selectedUse">
            {{ option }}
          </option>
        </select>
      </div>
      <input class="is-flex-grow-1" type="text" v-model="stepData.stepTemp" placeholder="Step temperature">
      <div class="select is-flex-grow-4">
        <select v-model="tempUnitie">
          <option v-for="option in tempUnitieSelect" selected="selectedWeight">
            {{ option }}
          </option>
        </select>
      </div>
      <input class="is-flex-grow-1" type="text" v-model="stepData.stepTime" placeholder="Step time">
      <div class="select is-flex-grow-4">
        <select v-model="timeUnitie">
          <option v-for="option in timeUnitieSelect" selected="selectedTime">
            {{ option }}
          </option>
        </select>
      </div>
      <button class="btn last" @click="deleteMashStep(stepData)"><i class="fa fa-trash-o"></i><span class="desktop-only">Remove</span></button>
    </div>
    <transition name="fade">
      <div v-show="contentVisible" class="item-content grid-2 medium-1 small-1">
        <div v-for="(value, key) in stepData" class="item-data col middle grid-2" :class="key === 'notes' ? 'item-last is-full' : ''">
          <div :class="key === 'notes' ? 'col is-1-6' : 'col is-1-3'">
            <label>{{ key | capitalize }}:</label>
          </div>
          <div :class="key === 'notes' ? 'col is-5-6' : 'col is-2-3'">
            <textarea v-if="key === 'notes'" :value="value" type="text" disabled></textarea>
            <input v-else-if="key === 'alpha'" type="text" :value="value">
            <input v-else type="text" :value="value" disabled>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MashStep from 'api/recettes/MashStep'

export default {
  name: 'mash-step-item',

  props: {
    stepData: Object,
    id: Number
  },

  data () {
    return {
      contentVisible: false,
      timeUnitie: 'min',
      tempUnitie: '°C'
    }
  },

  computed: {
    tempUnitieSelect () {
      return ['°C', '°F']
    },
    timeUnitieSelect () {
      return ['min', 'hour', 'day', 'week']
    },
    typeSelect () {
      return MashStep.getTypeList()
    }
  },

  filters: {
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
  },

  methods: {
    toggleContent () {
      this.contentVisible = !this.contentVisible
      if (this.contentVisible) this.$emit('content-visible', this)
    },
    deleteMashStep (step) {
      this.$emit('remove-step', this.id)
    }
  }
}
</script>
