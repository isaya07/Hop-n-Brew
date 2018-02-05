<template>
  <div class="field is-horizontal">
    <div v-if="label" class="field-label is-normal has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded">
          <input 
            class="input"
            :type="type"
            id="datepicker"
            ref="input"
            :name="label"
            :placeholder="label"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-validate="rules"
            :disabled="disabled"
            :readonly="readonly"
            :class="errors.has(label) ? 'is-danger ' + this.align : this.align ">
          <p v-show="errors.has(label)" class="help is-danger">
            {{ errors.first(label) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'bulma-calendar/datepicker'

export default {
  name: "date-picker",

  props: {
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: "text"
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
    },
  },

  data () {
    return {
      datepicker: null
    }
  },

  mounted () {
    this.datepicker = new DatePicker( document.getElementById( 'datepicker' ), {startDate: new Date(this.value), dataFormat: 'dd/mm/yy',} )
  },

  methods: {
    updateValue: function(value) {
      this.$emit('input', value)
    }
  }

}
</script>