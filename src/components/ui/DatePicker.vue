<template>
  <div class="field is-horizontal">
    <div v-if="label" class="field-label is-normal has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field is-expanded">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              :type="type"
              id="datepicker"
              ref="input"
              :name="label"
              :placeholder="label"
              :value="value"
              @input="updateValue($event.target.value)"
              v-validate="rules"
              :disabled="disabled"
              :readonly="readonly"
              :class="errors.has(label) ? 'is-danger ' + this.align : this.align ">
          </div>
          <div class="control">
            <button class="button is-primary" @click="showCal = !showCal">
               <icon :icon="['fas', 'calendar']" />
            </button>
          </div>
        </div>
        <p v-if="errors.has(label)" class="help is-danger">
          {{ errors.first(label) }}
        </p>
        <calendar v-if="showCal" :date="value" @selected="updateValue"></calendar>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from 'components/ui/Calendar'

export default {
  name: 'date-picker',

  components: {
    Calendar
  },

  props: {
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    id: '',
    disabled: {
      type: [String, Boolean],
      default: false
    },
    readonly: {
      type: [String, Boolean],
      default: false
    },
    rules: {
      type: String,
      default: 'required|myAlpha'
    },
    align: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      datepicker: null,
      showCal: false
    }
  },

  methods: {
    updateValue (value) {
      this.$emit('input', value)
      this.showCal = false
    }
  }

}
</script>
